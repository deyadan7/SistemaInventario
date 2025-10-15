from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Proveedor, Producto, MovimientoInventario
from .serializers import ProveedorSerializer, ProductoSerializer, MovimientoInventarioSerializer


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
