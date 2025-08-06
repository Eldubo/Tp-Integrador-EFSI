import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';

function Register() {
  const { form, handleChange: handleFormChange } = useForm({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validación básica
    if (!form.email || !form.password || !form.name) {
      return setError('Todos los campos son obligatorios');
    }
    
    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return setError('Por favor ingrese un email válido');
    }
    
    // Validación de contraseña
    if (form.password.length < 6) {
      return setError('La contraseña debe tener al menos 6 caracteres');
    }

    try {
      await api.post('/user/register', form);
      navigate('/login');
    } catch (err) {
      if (err.response?.status === 409) {
        setError('El email ya está registrado');
      } else {
        setError('Error al registrar usuario. Intente nuevamente.');
      }
    }
  };

  return (
    <div className="container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre" onChange={handleFormChange} required />
        <input name="email" placeholder="Email" onChange={handleFormChange} required />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleFormChange} required />
        <button type="submit">Registrarse</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Register;
