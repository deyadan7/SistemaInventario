from datetime import date, timedelta
from django.db.models import Sum
from django.db.models.functions import TruncMonth
from rest_framework import viewsets
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from .models import Proveedor, Producto, MovimientoInventario
from .serializers import (
    ProveedorSerializer,
    ProductoSerializer,
    MovimientoInventarioSerializer,
)


#ALERTAS DE INVENTARIO
@api_view(['GET'])
def alertas_inventario(request):
    hoy = date.today()
    proximos_vencer = Producto.objects.filter(fecha_vencimiento__lte=hoy + timedelta(days=10))
    stock_bajo = Producto.objects.filter(stock__lte=10)

    data = {
        "total_productos": Producto.objects.count(),
        "stock_bajo": stock_bajo.count(),
        "por_vencer": proximos_vencer.count(),
        "alertas": [],
    }

    if stock_bajo.exists():
        data["alertas"].append(f"{stock_bajo.count()} productos tienen stock bajo.")
    if proximos_vencer.exists():
        data["alertas"].append(f"{proximos_vencer.count()} productos están próximos a vencer.")
    if not data["alertas"]:
        data["alertas"].append("Todo está bajo control ✅")

    return Response(data)


#VENTAS MENSUALES
@api_view(['GET'])
def ventas_mensuales(request):
    ventas = (
        MovimientoInventario.objects
        .filter(tipo='OUT')
        .annotate(mes=TruncMonth('fecha'))
        .values('mes')
        .annotate(total_ventas=Sum('cantidad'))
        .order_by('mes')
    )

    data = [
        {"mes": v["mes"].strftime("%b"), "ventas": v["total_ventas"]}
        for v in ventas
    ]
    return Response(data)


#PRODUCTOS MÁS VENDIDOS
@api_view(['GET'])
def productos_mas_vendidos(request):
    ventas = (
        MovimientoInventario.objects
        .filter(tipo='OUT')
        .values('producto__nombre')
        .annotate(total_vendido=Sum('cantidad'))
        .order_by('-total_vendido')[:5]
    )

    data = [
        {"producto": v["producto__nombre"], "cantidad": v["total_vendido"]}
        for v in ventas
    ]
    return Response(data)


#VIEWSETS CRUD
class ProveedorViewSet(viewsets.ModelViewSet):
    queryset = Proveedor.objects.all().order_by('nombre')
    serializer_class = ProveedorSerializer


class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all().order_by('nombre')
    serializer_class = ProductoSerializer

    @action(detail=True, methods=['get'])
    def movimientos(self, request, pk=None):
        """Devuelve todos los movimientos de un producto."""
        producto = self.get_object()
        serializer = MovimientoInventarioSerializer(producto.movimientos.all(), many=True)
        return Response(serializer.data)


class MovimientoInventarioViewSet(viewsets.ModelViewSet):
    queryset = MovimientoInventario.objects.all().order_by('-fecha')
    serializer_class = MovimientoInventarioSerializer
