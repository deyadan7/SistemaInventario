import React, { useEffect, useState } from "react";
import { getProveedores, deleteProducto } from "../../services/api";

function ProveedorList({ onEdit }) {
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    cargarProveedores();
  }, []);

  const cargarProveedores = async () => {
    const res = await getProveedores();
    setProveedores(res.data);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">🏢 Lista de Proveedores</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Contacto</th>
              <th>Email</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.length > 0 ? (
              proveedores.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nombre}</td>
                  <td>{p.contacto}</td>
                  <td>{p.email}</td>
                  <td>{p.telefono}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No hay proveedores registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProveedorList;
