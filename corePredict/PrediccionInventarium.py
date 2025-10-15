import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from statsmodels.tsa.statespace.sarimax import SARIMAX
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
from sklearn.metrics import mean_absolute_error, mean_squared_error

plt.style.use("seaborn-v0_8")
np.random.seed(42)
n_periods = 120 

dates = pd.date_range('2014-01-01', periods=n_periods, freq='ME')

tendencia = np.linspace(100, 300, n_periods)  
estacionalidad = 50 * np.sin(2 * np.pi * np.arange(n_periods) / 12)  
ruido = np.random.normal(0, 10, n_periods) 

demanda = tendencia + estacionalidad + ruido

df = pd.DataFrame({
    "fecha": dates,
    "demanda": demanda
})

plt.figure(figsize=(15, 10))
plt.subplot(2,2,1)
plt.plot(df.index, df['demanda'])
plt.title("Serie temporal de demanda")
plt.xlabel("fecha")
plt.ylabel("demanda")
plt.grid(True)


tendencia_estimada = df['demanda'].rolling(window=12).mean()
plt.subplot(2, 2, 2)
plt.plot(df.index, tendencia_estimada, color='red', linewidth=2)
plt.title('Componente de Tendencia')
plt.xlabel('Fecha')
plt.ylabel('Demanda')
plt.grid(True)


estacionalidad_estimada = df['demanda'] - tendencia_estimada
plt.subplot(2, 2, 3)
plt.plot(df.index[:24], estacionalidad_estimada[:24], color='green')
plt.title('Componente Estacional (Primeros 2 años)')
plt.xlabel('Fecha')
plt.ylabel('Demanda')
plt.grid(True)

plt.subplot(2, 2, 4)
plot_acf(df['demanda'], lags=40, ax=plt.gca())
plt.title('Función de Autocorrelación (ACF)')
plt.tight_layout()

plt.show()


split_point = int(len(df) * 0.8)
train = df.iloc[:split_point]
test = df.iloc[split_point:]

print(f"Tamaño del conjunto de entrenamiento: {len(train)}")
print(f"Tamaño del conjunto de prueba: {len(test)}")

print("\n=== MODELO SARIMA ===")

modelo_sarima = SARIMAX(train['demanda'],
                        order=(1, 1, 1),
                        seasonal_order=(1, 1, 1, 12),
                        enforce_stationarity=False,
                        enforce_invertibility=False)

modelo_sarima_fit = modelo_sarima.fit(disp=False)

print("Resumen del modelo SARIMA:")
print(modelo_sarima_fit.summary())

predicciones_sarima = modelo_sarima_fit.forecast(steps=len(test))

mae_sarima = mean_absolute_error(test['demanda'], predicciones_sarima)
rmse_sarima = np.sqrt(mean_squared_error(test['demanda'], predicciones_sarima))

print(f"\nMétricas SARIMA:")
print(f"MAE: {mae_sarima:.2f}")
print(f"RMSE: {rmse_sarima:.2f}")



print("\n=== PREDICCIÓN FUTURA ===")

modelo_final = SARIMAX(df['demanda'],
                      order=(1, 1, 1),
                      seasonal_order=(1, 1, 1, 12),
                      enforce_stationarity=False,
                      enforce_invertibility=False)

modelo_final_fit = modelo_final.fit(disp=False)

periodos_futuros = 12
prediccion_futura = modelo_final_fit.forecast(steps=periodos_futuros)
intervalo_confianza = modelo_final_fit.get_forecast(steps=periodos_futuros).conf_int()

ultima_fecha = df['fecha'].iloc[-1]
print("ult", ultima_fecha)
fechas_futuras = pd.date_range(ultima_fecha + pd.DateOffset(months=1),
                              periods=periodos_futuros, freq='M')

plt.figure(figsize=(15, 6))

plt.plot(df['fecha'], df['demanda'], label='Histórico', color='blue')

plt.plot(fechas_futuras, prediccion_futura, label='Predicción', color='red', linewidth=2)
plt.fill_between(fechas_futuras,
                intervalo_confianza.iloc[:, 0],
                intervalo_confianza.iloc[:, 1],
                color='red', alpha=0.2, label='Intervalo 95% confianza')

plt.title('Predicción de Demanda de Productos - Próximos 12 Meses')
plt.xlabel('Fecha')
plt.ylabel('Demanda')
plt.legend()
plt.grid(True)
plt.show()

print("Predicciones para los próximos 12 meses:")
predicciones_df = pd.DataFrame({
    'Fecha': fechas_futuras,
    'Demanda_Predicha': prediccion_futura,
    'Limite_Inferior': intervalo_confianza.iloc[:, 0],
    'Limite_Superior': intervalo_confianza.iloc[:, 1]
})
print(predicciones_df.round(2))
