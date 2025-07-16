import React, { useState } from 'react';
import { apiFetch } from '../../services/api';
import './Register.css';

const Register = () => {

  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState(null);
  const expresionMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if(expresionMail.test(form.email)){
      setError('Mail inválido');
    }
    try {
      await apiFetch('/user/register', {
        method: 'POST',
        body: { email: form.email, password: form.password },
      });
      // Registro exitoso, podrías redirigir o mostrar mensaje
      setError('Registro exitoso, ahora puedes iniciar sesión');
    } catch (err) {
      setError(err?.error || 'Error al registrar');
    }
  };

  return (
    <div className="container">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar contraseña"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Registrarse</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Register; 