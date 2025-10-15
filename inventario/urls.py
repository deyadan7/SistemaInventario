from rest_framework.routers import DefaultRouter
from .views import ProveedorViewSet, ProductoViewSet, MovimientoInventarioViewSet


router = DefaultRouter()
router.register(r'proveedores', ProveedorViewSet, basename='proveedor')
router.register(r'productos', ProductoViewSet, basename='producto')
router.register(r'movimientos', MovimientoInventarioViewSet, basename='movimiento')

urlpatterns = router.urls
