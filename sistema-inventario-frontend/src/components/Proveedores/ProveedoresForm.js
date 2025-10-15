import React, { useState } from "react";
import { createProveedor } from "../../services/api";

function ProveedorForm({ onSaved }) {
  const [form, setForm] = useState({
    nombre: "",
    contacto: "",
    email: "",
    telefono: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProveedor(form);
    setForm({ nombre: "", contacto: "", email: "", telefono: "" });
    if (onSaved) onSaved();
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title mb-4 text-primary">📝 Registrar Nuevo Proveedor</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                name="nombre"
                className="form-control"
                placeholder="Nombre del proveedor"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contacto</label>
              <input
                type="text"
                name="contacto"
                className="form-control"
                placeholder="Nombre del contacto"
                value={form.contacto}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="correo@ejemplo.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input
                type="text"
                name="telefono"
                className="form-control"
                placeholder="(+51) 987654321"
                value={form.telefono}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-success w-100">
              Guardar Proveedor
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProveedorForm;
