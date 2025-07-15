import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../services/api';
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await apiFetch('/user/login', {
        method: 'POST',
        body: { email, password },
      });
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      setError(err?.error || 'Credenciales incorrectas');
    }
  };

  return (
    <div className="container">
      <h2 className='login-title'>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login; 