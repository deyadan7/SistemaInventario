// src/components/Productos/ProductoList.js
// Muestra la lista de productos obtenidos desde la API Django.

import React, { useEffect, useState } from "react";
import { getProductos, deleteProducto } from "../../services/api";

function ProductoList({ onEdit }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const res = await getProductos();
    setProductos(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Deseas eliminar este producto?")) {
      await deleteProducto(id);
      cargarProductos();
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📦 Lista de Productos</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>SKU</th>
              <th>Nombre</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.sku}</td>
                <td>{p.nombre}</td>
                <td>{p.stock}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => onEdit(p)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(p.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {productos.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No hay productos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductoList;
