// src/components/Productos/ProductoForm.js
// Formulario para registrar o actualizar productos.

import React, { useState, useEffect } from "react";
import { createProducto, updateProducto } from "../../services/api";

function ProductoForm({ productoSeleccionado, onSaved }) {
  const [form, setForm] = useState({
    sku: "",
    nombre: "",
    precio_unitario: "",
    stock_minimo: "",
  });

  // 1️⃣ Cargar datos si se va a editar
  useEffect(() => {
    if (productoSeleccionado) {
      setForm(productoSeleccionado);
    } else {
      setForm({ sku: "", nombre: "", precio_unitario: "", stock_minimo: "" });
    }
  }, [productoSeleccionado]);

  // 2️⃣ Manejar cambios en el formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 3️⃣ Enviar datos
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (productoSeleccionado) {
      await updateProducto(productoSeleccionado.id, form);
    } else {
      await createProducto(form);
    }
    onSaved(); // recarga la lista
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{productoSeleccionado ? "Editar Producto" : "Nuevo Producto"}</h3>
      <input
        type="text"
        name="sku"
        placeholder="SKU"
        value={form.sku}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="precio_unitario"
        placeholder="Precio unitario"
        value={form.precio_unitario}
        onChange={handleChange}
      />
      <input
        type="number"
        name="stock_minimo"
        placeholder="Stock mínimo"
        value={form.stock_minimo}
        onChange={handleChange}
      />
      <button type="submit">
        {productoSeleccionado ? "Actualizar" : "Guardar"}
      </button>
    </form>
  );
}

export default ProductoForm;
