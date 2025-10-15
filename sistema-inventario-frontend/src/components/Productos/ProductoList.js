// src/components/Productos/ProductoList.js
// Muestra la lista de productos obtenidos desde la API Django.

import React, { useEffect, useState } from "react";
import { getProductos, deleteProducto } from "../../services/api";

function ProductoList({ onEdit }) {
  // 1️⃣ Estado para guardar los productos
  const [productos, setProductos] = useState([]);

  // 2️⃣ useEffect: se ejecuta al cargar el componente
  useEffect(() => {
    cargarProductos();
  }, []);

  // 3️⃣ Función que llama a la API
  const cargarProductos = async () => {
    const res = await getProductos();
    setProductos(res.data);
  };

  // 4️⃣ Función para eliminar producto
  const handleDelete = async (id) => {
    if (window.confirm("¿Deseas eliminar este producto?")) {
      await deleteProducto(id);
      cargarProductos();
    }
  };

  return (
    <div>
      <h2>📦 Lista de Productos</h2>
      <table border="1" cellPadding="5">
        <thead>
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
                <button onClick={() => onEdit(p)}>Editar</button>
                <button onClick={() => handleDelete(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductoList;
