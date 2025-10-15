// src/components/Productos/ProductoForm.js
// Formulario para registrar o actualizar productos con estilo Bootstrap

import React, { useState, useEffect } from "react";
import { createProducto, updateProducto } from "../../services/api";

function ProductoForm({ productoSeleccionado, onSaved }) {
  const [form, setForm] = useState({
    sku: "",
    nombre: "",
    precio_unitario: "",
    stock_minimo: "",
  });

  // Cargar datos si se está editando
  useEffect(() => {
    if (productoSeleccionado) {
      setForm(productoSeleccionado);
    } else {
      setForm({ sku: "", nombre: "", precio_unitario: "", stock_minimo: "" });
    }
  }, [productoSeleccionado]);

  // Manejar cambios en los campos
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Guardar o actualizar producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (productoSeleccionado) {
      await updateProducto(productoSeleccionado.id, form);
    } else {
      await createProducto(form);
    }
    onSaved();
  };

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">
          {productoSeleccionado ? "✏️ Editar Producto" : "Nuevo Producto"}
        </h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">SKU</label>
            <input
              type="text"
              name="sku"
              className="form-control"
              placeholder="Ingrese código SKU"
              value={form.sku}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Nombre del Producto</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              placeholder="Ej: Leche Gloria Lata"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Precio Unitario (S/)</label>
            <input
              type="number"
              step="0.01"
              name="precio_unitario"
              className="form-control"
              placeholder="Ej: 4.50"
              value={form.precio_unitario}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Stock Mínimo</label>
            <input
              type="number"
              name="stock_minimo"
              className="form-control"
              placeholder="Ej: 10"
              value={form.stock_minimo}
              onChange={handleChange}
            />
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-success px-4">
              {productoSeleccionado ? "💾 Actualizar" : "🧾 Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductoForm;
