import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Auth/Login";
import RoutePages from './routes/RoutePages';

function App() {
  const [autenticado, setAutenticado] = useState(
    !!localStorage.getItem("access")
  );

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setAutenticado(false);
  };

  if (!autenticado) {
    return <Login onLoginSuccess={() => setAutenticado(true)} />;
  }

  return (
    <Router>
      <RoutePages onLogout={handleLogout} />
    </Router>
  );
}

export default App;
