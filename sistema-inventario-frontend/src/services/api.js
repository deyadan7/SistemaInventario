// src/services/api.js
// Este archivo centraliza todas las peticiones HTTP a la API de Django.

import axios from "axios";


const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", 
});

// 2️⃣ Funciones para cada entidad
// ---------- PRODUCTOS ----------
export const getProductos = () => api.get("productos/");
export const createProducto = (data) => api.post("productos/", data);
export const updateProducto = (id, data) => api.put(`productos/${id}/`, data);
export const deleteProducto = (id) => api.delete(`productos/${id}/`);

// ---------- PROVEEDORES ----------
export const getProveedores = () => api.get("proveedores/");
export const createProveedor = (data) => api.post("proveedores/", data);

// ---------- MOVIMIENTOS ----------
export const getMovimientos = () => api.get("movimientos/");
export const createMovimiento = (data) => api.post("movimientos/", data);

export default api;
