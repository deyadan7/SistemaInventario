import React, { useEffect, useState } from "react";
import { createMovimiento, getProductos } from "../../services/api";

function MovimientoForm({ onSaved }) {
  const [form, setForm] = useState({
    producto: "",
    tipo: "IN",
    cantidad: "",
    notas: "",
  });
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const res = await getProductos();
    setProductos(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createMovimiento({
      producto: form.producto,
      tipo: form.tipo,
      cantidad: form.cantidad,
      notas: form.notas,
    });
    setForm({ producto: "", tipo: "IN", cantidad: "", notas: "" });
    if (onSaved) onSaved();
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title mb-4 text-primary">➕ Registrar Movimiento</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Producto</label>
              <select
                name="producto"
                value={form.producto}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Selecciona un producto</option>
                {productos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Tipo de Movimiento</label>
              <select
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                className="form-select"
              >
                <option value="IN">Ingreso</option>
                <option value="OUT">Salida</option>
                <option value="ADJ">Ajuste</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Cantidad</label>
              <input
                type="number"
                name="cantidad"
                placeholder="Cantidad"
                value={form.cantidad}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Notas u Observaciones</label>
              <textarea
                name="notas"
                placeholder="Notas u observaciones"
                value={form.notas}
                onChange={handleChange}
                className="form-control"
                rows="3"
              />
            </div>

            <button type="submit" className="btn btn-success w-100">
              Guardar Movimiento
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MovimientoForm;
