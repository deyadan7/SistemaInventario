import numpy as np
import matplotlib.pyplot as plt
import datetime as dt
from datetime import timedelta
import matplotlib.dates as mdates

ventas_21 = [
    82, 80, 85, 88, 90, 91, 87,
    86, 89, 92, 95, 93, 94, 96,
    97, 98, 96, 95, 99, 100, 101
]
assert len(ventas_21) == 21


ultima_fecha = dt.date.today()
fechas_21 = [ultima_fecha - timedelta(days=20-i) for i in range(21)]

# Convertir fechas a numeros ordinales
X = np.array([f.toordinal() for f in fechas_21], dtype=float)
y = np.array(ventas_21, dtype=float)

X_ones = np.c_[np.ones(len(X)), X]

# Calculamos theta
theta = np.linalg.inv(X_ones.T @ X_ones) @ (X_ones.T @ y)
intercepto, pendiente = theta

# Prediccion de los 7 dias despues de HOY
fechas_future = [fechas_21[-1] + timedelta(days=i) for i in range(1, 8)]
X_future = np.array([f.toordinal() for f in fechas_future], dtype=float)
X_future_ones = np.c_[np.ones(len(X_future)), X_future]
y_future_pred = X_future_ones @ theta

fechas_todas = fechas_21 + fechas_future
X_todas = np.array([f.toordinal() for f in fechas_todas], dtype=float)
X_todas_ones = np.c_[np.ones(len(X_todas)), X_todas]
y_todas_pred = X_todas_ones @ theta

# Graficar
fig, ax = plt.subplots()

# Puntos reales
ax.scatter(fechas_21, y, s=40, label="Ventas observadas")

# Línea de regresión
ax.plot(fechas_todas, y_todas_pred, '-', label="Linea tendencia")

# Puntos de predicción
ax.scatter(fechas_future, y_future_pred, s=40, marker='x', label="Predicción de 7 días")

# Formato de fechas en X
ax.xaxis.set_major_locator(mdates.AutoDateLocator())
ax.xaxis.set_major_formatter(mdates.DateFormatter('%Y-%m-%d'))
fig.autofmt_xdate()

ax.set_xlabel("fecha")
ax.set_ylabel("ventas")
ax.set_title("Ventas diarias(3 semanas) + predicción(7 días)")
ax.grid(True)
ax.legend()
plt.show()

# Mostrar prediccion con su fecha
print("Parametros de la recta: intercepto =", intercepto, "pendiente =", pendiente)
print("\nPredicciones para los siguientes 7 días:")
for f, v in zip(fechas_future, y_future_pred):
    print(f"{f.isoformat()}: {v:.2f}")
