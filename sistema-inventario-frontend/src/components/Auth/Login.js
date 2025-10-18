// src/components/Auth/Login.js
// Formulario de inicio de sesión con Bootstrap

import React, { useState } from "react";
import axios from "axios";

function Login({ onLoginSuccess }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
    
      const res = await axios.post("http://127.0.0.1:8000/api/token/", form);

      
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

     
      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      console.error(err);
      setError("Credenciales inválidas. Intente nuevamente.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <div className="text-center mb-4">
          <h3 className="text-primary fw-bold">Sistema Inteligente de Inventario</h3>
          <p className="text-muted">Inicia sesión para continuar</p>
        </div>

        {error && (
          <div className="alert alert-danger text-center py-2">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Ingrese su usuario"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Ingrese su contraseña"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Iniciar Sesión
            </button>
          </div>
        </form>

        <div className="mt-3 text-center text-muted" style={{ fontSize: "0.9rem" }}>
          © 2025 Tiendas Mass | Desarrollado con ❤️ en Django + React
        </div>
      </div>
    </div>
  );
}

export default Login;
