import React, { useState } from "react";
import ProductoList from "./components/Productos/ProductoList";
import ProductoForm from "./components/Productos/ProductoForm";
import ProveedorForm from "./components/Proveedores/ProveedoresForm";
import ProveedorList from "./components/Proveedores/ProveedoresList";
import MovimientoForm from "./components/Movimientos/MovimientoForm";
import MovimientoList from "./components/Movimientos/MovimientoList";

function App() {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [recargar, setRecargar] = useState(false);

  const handleSaved = () => {
    setProductoSeleccionado(null);
    setRecargar(!recargar);
  };

  return (
    <div style={{ margin: "20px" }}>
      <h1>🧠 Sistema Inteligente de Inventario</h1>

      <h2>Productos</h2>
      <ProductoForm
        productoSeleccionado={productoSeleccionado}
        onSaved={handleSaved}
      />
      <ProductoList onEdit={setProductoSeleccionado} key={recargar} />

      <hr />

      <h2>Proveedores</h2>
      <ProveedorForm onSaved={handleSaved} />
      <ProveedorList />

      <hr />

      <h2>Movimientos de Inventario</h2>
      <MovimientoForm onSaved={handleSaved} />
      <MovimientoList />
    </div>
  );
}

export default App;
