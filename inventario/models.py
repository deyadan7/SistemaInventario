from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()

class Proveedor(models.Model):
    nombre = models.CharField(max_length=200)
    contacto = models.CharField(max_length=200, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    telefono = models.CharField(max_length=50, blank=True, null=True)
    creado_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre


class Producto(models.Model):
    sku = models.CharField(max_length=100, unique=True)
    nombre = models.CharField(max_length=255)
    proveedor = models.ForeignKey(
        Proveedor, on_delete=models.SET_NULL, null=True, blank=True, related_name='productos'
    )
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    stock = models.IntegerField(default=0)
    stock_minimo = models.IntegerField(default=10)
    fecha_vencimiento = models.DateField(blank=True, null=True)
    creado_en = models.DateTimeField(auto_now_add=True)

    def esta_por_vencer(self, dias=7):
        """Devuelve True si el producto está próximo a vencer."""
        if not self.fecha_vencimiento:
            return False
        return (self.fecha_vencimiento - timezone.now().date()).days <= dias

    def __str__(self):
        return f"{self.sku} - {self.nombre}"


class MovimientoInventario(models.Model):
    TIPOS = (
        ('IN', 'Ingreso'),
        ('OUT', 'Salida'),
        ('ADJ', 'Ajuste'),
    )

    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='movimientos')
    tipo = models.CharField(max_length=3, choices=TIPOS)
    cantidad = models.IntegerField()
    fecha = models.DateTimeField(auto_now_add=True)
    usuario = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    notas = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ['-fecha']

    def save(self, *args, **kwargs):
        """Actualiza el stock del producto según el tipo de movimiento."""
        super().save(*args, **kwargs)
        if self.tipo == 'IN':
            self.producto.stock += self.cantidad
        elif self.tipo == 'OUT':
            self.producto.stock -= self.cantidad
        elif self.tipo == 'ADJ':
            self.producto.stock = self.cantidad
        if self.producto.stock < 0:
            self.producto.stock = 0
        self.producto.save()

    def __str__(self):
        return f"{self.tipo} - {self.producto.nombre} ({self.cantidad})"
