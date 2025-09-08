import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = 'El email es obligatorio.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Introduce un email válido.';

    if (!password) e.password = 'La contraseña es obligatoria.';
    else if (password.length < 6) e.password = 'La contraseña debe tener al menos 6 caracteres.';

    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setStatus(null);
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setStatus('success');
      setEmail('');
      setPassword('');
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="center-container">
      <div className="login-root">
        <h2 className="mb-3">Iniciar sesión</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="login-email" className="form-label">Email</label>
            <input
              id="login-email"
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'login-error-email' : undefined}
            />
            {errors.email && <div id="login-error-email" className="invalid-feedback">{errors.email}</div>}
          </div>
  
          <div className="mb-3">
            <label htmlFor="login-password" className="form-label">Contraseña</label>
            <input
              id="login-password"
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-describedby={errors.password ? 'login-error-password' : undefined}
            />
            {errors.password && <div id="login-error-password" className="invalid-feedback">{errors.password}</div>}
          </div>
  
          <div className="form-actions">
            <button type="submit" className="btn btn-primary w-100">Entrar</button>
          </div>
        </form>
  
        {status === 'success' && (
          <div className="alert alert-success mt-3 mb-0" role="status">Inicio de sesión simulado con éxito.</div>
        )}
        {status === 'error' && (
          <div className="alert alert-danger mt-3 mb-0" role="alert">Hay errores en el formulario. Por favor corrígelos.</div>
        )}
      </div>
    </div>
  );
};

export default Login;
