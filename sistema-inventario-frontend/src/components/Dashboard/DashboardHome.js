import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DashboardHome() {
  const [alertas, setAlertas] = useState([]);
  const [totales, setTotales] = useState({
    total_productos: 0,
    stock_bajo: 0,
    por_vencer: 0,
  });
  const [ventasMensuales, setVentasMensuales] = useState([]);
  const [productosMasVendidos, setProductosMasVendidos] = useState([]);

  
  const cargarAlertas = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/alertas/");
      const nuevasAlertas = res.data.alertas;

      if (JSON.stringify(nuevasAlertas) !== JSON.stringify(alertas)) {
        nuevasAlertas.forEach((a) => {
          toast.info(a, { position: "top-right", autoClose: 4000 });
        });
        setAlertas(nuevasAlertas);
      }

      setTotales({
        total_productos: res.data.total_productos,
        stock_bajo: res.data.stock_bajo,
        por_vencer: res.data.por_vencer,
      });
    } catch (error) {
      console.error("Error al cargar alertas:", error);
    }
  };

  
  const cargarVentasMensuales = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/ventas_mensuales/");
      setVentasMensuales(res.data);
    } catch (error) {
      console.error("Error al cargar ventas mensuales:", error);
    }
  };

  
  const cargarProductosMasVendidos = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/productos_mas_vendidos/");
      setProductosMasVendidos(res.data);
    } catch (error) {
      console.error("Error al cargar productos más vendidos:", error);
    }
  };

  useEffect(() => {
    cargarAlertas();
    cargarVentasMensuales();
    cargarProductosMasVendidos();

    const intervalo = setInterval(() => {
      cargarAlertas();
      cargarVentasMensuales();
      cargarProductosMasVendidos();
      console.log("♻️ Refrescando datos del backend...");
    }, 60000);

    return () => clearInterval(intervalo);
  }, []);

  const categorias = [
    { name: "Alimentos", value: 45 },
    { name: "Bebidas", value: 25 },
    { name: "Limpieza", value: 15 },
    { name: "Cuidado Personal", value: 15 },
  ];

  const COLORS = ["#4e73df", "#1cc88a", "#36b9cc", "#f6c23e"];

  return (
    <div className="container-fluid">
      <ToastContainer />
      <h2 className="text-primary fw-bold mb-4">📊 Panel Inteligente de Inventario</h2>

     
      <div className="alert alert-info shadow-sm">
        <h5 className="fw-bold">Alertas del Sistema:</h5>
        <ul className="mb-0">
          {alertas.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      </div>

    
      <div className="row my-4">
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm border-0 text-center">
            <div className="card-body">
              <h5>Productos Totales</h5>
              <h2 className="fw-bold text-success">{totales.total_productos}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm border-0 text-center">
            <div className="card-body">
              <h5>Stock Bajo</h5>
              <h2 className="fw-bold text-warning">{totales.stock_bajo}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm border-0 text-center">
            <div className="card-body">
              <h5>Por Vencer</h5>
              <h2 className="fw-bold text-danger">{totales.por_vencer}</h2>
            </div>
          </div>
        </div>
      </div>

     
      <div className="row mt-4">
       
        <div className="col-lg-8 mb-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-primary text-white fw-bold">
              Ventas Mensuales (Datos Reales)
            </div>
            <div className="card-body">
              {ventasMensuales.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={ventasMensuales}>
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="ventas" fill="#4e73df" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center text-muted">No hay datos de ventas aún.</p>
              )}
            </div>
          </div>
        </div>

       
        <div className="col-lg-4 mb-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-success text-white fw-bold">
              Distribución por Categorías
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categorias}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {categorias.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      
      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-warning text-dark fw-bold">
              🥇 Productos Más Vendidos
            </div>
            <div className="card-body">
              {productosMasVendidos.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={productosMasVendidos}>
                    <XAxis dataKey="producto" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="cantidad" fill="#f6c23e" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center text-muted">No hay datos de productos vendidos.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
