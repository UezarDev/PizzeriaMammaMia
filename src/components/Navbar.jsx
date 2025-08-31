import React from 'react';
import { formatCurrency } from '../utils/formatCurrency';

const Navbar = () => {
  const total = 25000;
  const token = false; // Cambia a true para simular usuario logueado

  return (
    <nav className="navbar navbar-dark bg-dark px-3 d-flex justify-content-between align-items-center" style={{ minHeight: '56px' }}>
      <div className="d-flex align-items-center gap-2">
        <span className="navbar-brand mb-0 h1">Pizzería Mamma Mia!</span>
        <button className="btn btn-outline-warning btn-sm">🍕 Home</button>
        {token ? (
          <>
            <button className="btn btn-outline-warning btn-sm">🔓 Profile</button>
            <button className="btn btn-outline-warning btn-sm">🔒 Logout</button>
          </>
        ) : (
          <>
            <button className="btn btn-outline-warning btn-sm">🔐 Login</button>
            <button className="btn btn-outline-warning btn-sm">🔐 Register</button>
          </>
        )}
      </div>
      <button className="btn btn-outline-info btn-sm">
        🛒 Total: ${formatCurrency(total)}
      </button>
    </nav>
  );
};

export default Navbar;
