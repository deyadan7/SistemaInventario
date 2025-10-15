import logo from './logo.svg';
import './App.css';

import React, { useState } from "react";
import ProductoList from "./components/Productos/ProductoList";
import ProductoForm from "./components/Productos/ProductoForm";


function App() {
   const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [recargar, setRecargar] = useState(false);

  // Recargar productos cuando se guarda
  const handleSaved = () => {
    setProductoSeleccionado(null);
    setRecargar(!recargar);
  };

 return (
    <div style={{ margin: "20px" }}>
      <h1>🧠 Sistema Inteligente de Inventario</h1>

      <ProductoForm
        productoSeleccionado={productoSeleccionado}
        onSaved={handleSaved}
      />

      <hr />

      <ProductoList onEdit={setProductoSeleccionado} key={recargar} />
    </div>
  );
}

export default App;
