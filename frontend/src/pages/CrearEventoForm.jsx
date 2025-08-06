import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';

function CrearEventoForm() {
  const { form, handleChange: handleFormChange } = useForm({
    name: '',
    description: '',
    date: '',
    price: 0,
    capacity: 0,
    locationId: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validación básica
    if (!form.name || !form.description || !form.date || !form.locationId) {
      setError('Por favor complete todos los campos obligatorios');
      return;
    }
    
    if (form.price < 0) {
      setError('El precio no puede ser negativo');
      return;
    }
    
    if (form.capacity <= 0) {
      setError('La capacidad debe ser mayor a 0');
      return;
    }

    setLoading(true);
    try {
      await api.post('/event', form);
      alert('Evento creado exitosamente');
      navigate('/mis-eventos');
    } catch (err) {
      console.error('Error al crear evento', err);
      if (err.response?.status === 400) {
        setError('Datos inválidos. Por favor revise los campos.');
      } else {
        setError('Error al crear evento. Intente nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Crear Evento</h2>
        {error && <p className="error">{error}</p>}
        <input name="name" placeholder="Nombre *" onChange={handleFormChange} required />
        <input name="description" placeholder="Descripción *" onChange={handleFormChange} required />
        <input name="date" type="date" placeholder="Fecha *" onChange={handleFormChange} required />
        <input name="price" type="number" placeholder="Precio" onChange={handleFormChange} />
        <input name="capacity" type="number" placeholder="Capacidad *" onChange={handleFormChange} required />
        <input name="locationId" placeholder="ID de ubicación *" onChange={handleFormChange} required />
        <button type="submit" disabled={loading}>
          {loading ? 'Creando...' : 'Crear evento'}
        </button>
      </form>
    </div>
  );
}

export default CrearEventoForm;
