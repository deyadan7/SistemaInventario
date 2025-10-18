import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import DashboardHome from "../components/Dashboard/DashboardHome";
import ProductoForm from "../components/Productos/ProductoForm";
import ProductoList from "../components/Productos/ProductoList";
import ProveedorForm from "../components/Proveedores/ProveedoresForm";
import ProveedorList from "../components/Proveedores/ProveedoresList";
import MovimientoForm from "../components/Movimientos/MovimientoForm";
import MovimientoList from "../components/Movimientos/MovimientoList";

function RoutePages({ onLogout }) {
  return (
    <Routes>
      <Route element={<DashboardLayout onLogout={onLogout} />}>
        <Route path="/dashboard" element={<DashboardHome />} />

        <Route
          path="/productos"
          element={
            <div className="row">
              <div className="col-md-5">
                <ProductoForm />
              </div>
              <div className="col-md-7">
                <ProductoList />
              </div>
            </div>
          }
        />

        <Route
          path="/proveedores"
          element={
            <div className="row">
              <div className="col-md-5">
                <ProveedorForm />
              </div>
              <div className="col-md-7">
                <ProveedorList />
              </div>
            </div>
          }
        />

        <Route
          path="/movimientos"
          element={
            <div className="row">
              <div className="col-md-5">
                <MovimientoForm />
              </div>
              <div className="col-md-7">
                <MovimientoList />
              </div>
            </div>
          }
        />

      
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Route>
    </Routes>
  );
}

export default RoutePages;
