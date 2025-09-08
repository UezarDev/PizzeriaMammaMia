import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = 'El email es obligatorio.';
    // simple email pattern
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Introduce un email válido.';

    if (!password) e.password = 'La contraseña es obligatoria.';
    else if (password.length < 6) e.password = 'La contraseña debe tener al menos 6 caracteres.';

    if (!confirm) e.confirm = 'Confirma la contraseña.';
    else if (password && password !== confirm) e.confirm = 'Las contraseñas no coinciden.';

    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setStatus(null);
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      // simulate success
      setStatus('success');
      // clear fields (optional)
      setEmail('');
      setPassword('');
      setConfirm('');
    } else {
      setStatus('error');
    }
  };

  return (
    <div className='center-container'>
      <div className="register-root">
        <h2 className="mb-3">Registro</h2>
        <form className="register-form" onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'error-email' : undefined}
            />
            {errors.email && <div id="error-email" className="invalid-feedback">{errors.email}</div>}
          </div>
  
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              id="password"
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-describedby={errors.password ? 'error-password' : undefined}
            />
            {errors.password && <div id="error-password" className="invalid-feedback">{errors.password}</div>}
          </div>
  
          <div className="mb-3">
            <label htmlFor="confirm" className="form-label">Confirmar contraseña</label>
            <input
              id="confirm"
              type="password"
              className={`form-control ${errors.confirm ? 'is-invalid' : ''}`}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              aria-invalid={errors.confirm ? 'true' : 'false'}
              aria-describedby={errors.confirm ? 'error-confirm' : undefined}
            />
            {errors.confirm && <div id="error-confirm" className="invalid-feedback">{errors.confirm}</div>}
          </div>
  
          <div className="form-actions">
            <button type="submit" className="btn btn-primary w-100">Enviar</button>
          </div>
        </form>
  
        {status === 'success' && (
          <div className="alert alert-success mt-3 mb-0" role="status">Registro completado con éxito.</div>
        )}
        {status === 'error' && (
          <div className="alert alert-danger mt-3 mb-0" role="alert">Hay errores en el formulario. Por favor corrígelos.</div>
        )}
      </div>
    </div>
  );
};

export default Register;
