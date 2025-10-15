from rest_framework import serializers
from .models import Proveedor, Producto, MovimientoInventario


class ProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedor
        fields = '__all__'
        read_only_fields = ('creado_en',)


class ProductoSerializer(serializers.ModelSerializer):
    proveedor = ProveedorSerializer(read_only=True)
    proveedor_id = serializers.PrimaryKeyRelatedField(
        write_only=True, source='proveedor', queryset=Proveedor.objects.all(), required=False, allow_null=True
    )

    class Meta:
        model = Producto
        fields = [
            'id',
            'sku',
            'nombre',
            'proveedor',
            'proveedor_id',
            'precio_unitario',
            'stock',
            'stock_minimo',
            'fecha_vencimiento',
            'creado_en',
        ]
        read_only_fields = ('creado_en', 'stock')


class MovimientoInventarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovimientoInventario
        fields = '__all__'
        read_only_fields = ('fecha',)
