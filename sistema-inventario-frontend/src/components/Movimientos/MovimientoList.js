import React, { useEffect, useState } from "react";
import { getMovimientos } from "../../services/api";

function MovimientoList() {
  const [movimientos, setMovimientos] = useState([]);

  useEffect(() => {
    cargarMovimientos();
  }, []);

  const cargarMovimientos = async () => {
    const res = await getMovimientos();
    setMovimientos(res.data);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">📊 Historial de Movimientos</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Tipo</th>
              <th>Cantidad</th>
              <th>Fecha</th>
              <th>Usuario</th>
            </tr>
          </thead>
          <tbody>
            {movimientos.length > 0 ? (
              movimientos.map((m) => (
                <tr key={m.id}>
                  <td>{m.id}</td>
                  <td>{m.producto}</td>
                  <td>{m.tipo}</td>
                  <td>{m.cantidad}</td>
                  <td>{new Date(m.fecha).toLocaleString()}</td>
                  <td>{m.usuario || "—"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No hay movimientos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MovimientoList;
