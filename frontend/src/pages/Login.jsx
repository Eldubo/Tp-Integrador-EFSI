import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useForm } from '../hooks/useForm';
import './Login.css';
import { useAuth } from '../context/AuthContext';
function Login() {
  const { form, handleChange: handleFormChange } = useForm({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  console.log('Renderizando login');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validación básica
    if (!form.email || !form.password) {
      setError('Por favor complete todos los campos');
      return;
    }
    
    try {
      const res = await api.post('/user/login', form);
      login(res.data.user, res.data.token);
      navigate('/eventos');
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Credenciales incorrectas');
      } else {
        setError('Error de conexión. Intente nuevamente.');
      }
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleFormChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleFormChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>

      <p>¿No tenés cuenta? <Link to="/register">Registrate acá</Link></p>
    </div>
  );
}

export default Login;
