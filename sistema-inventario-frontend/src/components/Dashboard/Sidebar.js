import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ onLogout }) {
  const location = useLocation();

 
  const linkClass = (path) =>
    `list-group-item list-group-item-action border-0 rounded-0 ${
      location.pathname === path ? "active fw-bold" : ""
    }`;

  return (
    <div
      className="bg-dark text-white d-flex flex-column justify-content-between"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      
      <div>
        <div className="text-center py-4 border-bottom border-secondary">
          <h4 className="fw-bold mb-0">🧠 Inventario</h4>
          <small className="text-secondary">Panel Inteligente</small>
        </div>

        {/* 🔹 Enlaces del menú */}
        <div className="list-group list-group-flush mt-3">
          <Link to="/dashboard" className={linkClass("/dashboard")}>
            🏠 Inicio
          </Link>

          <Link to="/productos" className={linkClass("/productos")}>
            📦 Productos
          </Link>

          <Link to="/proveedores" className={linkClass("/proveedores")}>
            🏢 Proveedores
          </Link>

          <Link to="/movimientos" className={linkClass("/movimientos")}>
            📊 Movimientos
          </Link>
        </div>
      </div>

     
      <div className="p-3 border-top border-secondary">
        <button
          className="btn btn-outline-light w-100 fw-bold"
          onClick={onLogout}
        >
          🔒 Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
