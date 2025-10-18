from rest_framework.routers import DefaultRouter

from .views import ProveedorViewSet, ProductoViewSet, MovimientoInventarioViewSet

from django.urls import path
from . import views

router = DefaultRouter()
router.register(r'proveedores', ProveedorViewSet, basename='proveedor')
router.register(r'productos', ProductoViewSet, basename='producto')
router.register(r'movimientos', MovimientoInventarioViewSet, basename='movimiento')
urlpatterns = [
    path("alertas/", views.alertas_inventario, name="alertas_inventario"),
    path('ventas_mensuales/', views.ventas_mensuales, name='ventas_mensuales'),
    path('productos_mas_vendidos/', views.productos_mas_vendidos, name='productos_mas_vendidos'),
]


urlpatterns = router.urls




