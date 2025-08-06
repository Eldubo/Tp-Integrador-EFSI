import { useEffect, useState } from 'react';
import api from '../services/api';
import { useForm } from '../hooks/useForm';

function UbicacionesList() {
  const [ubicaciones, setUbicaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { form: nueva, handleChange: handleNuevaChange, resetForm: resetNuevaForm } = useForm({ name: '', province: '', city: '' });

  const cargarUbicaciones = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/event-location');
      setUbicaciones(res.data || []);
    } catch (error) {
      console.error('Error al cargar ubicaciones', error);
      setError('Error al cargar ubicaciones. Intente nuevamente.');
      setUbicaciones([]);
    } finally {
      setLoading(false);
    }
  };

  const crearUbicacion = async () => {
    // Validación básica
    if (!nueva.name || !nueva.province || !nueva.city) {
      setError('Por favor complete todos los campos');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      await api.post('/event-location', nueva);
      resetNuevaForm();
      cargarUbicaciones();
    } catch (error) {
      console.error('Error al crear ubicación', error);
      if (error.response?.status === 409) {
        setError('La ubicación ya existe');
      } else {
        setError('Error al crear ubicación. Intente nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const eliminarUbicacion = async (id) => {
    if (!window.confirm('¿Está seguro que desea eliminar esta ubicación?')) {
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      await api.delete(`/event-location/${id}`);
      cargarUbicaciones();
    } catch (error) {
      console.error('Error al eliminar ubicación', error);
      setError('Error al eliminar ubicación. Intente nuevamente.');
      // Still try to refresh the list
      cargarUbicaciones();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarUbicaciones();
  }, []);

  return (
    <div className="container">
      <h2>Mis ubicaciones</h2>
      {loading && <p>Cargando...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && ubicaciones.length === 0 && <p>No se encontraron ubicaciones</p>}
      {!loading && !error && ubicaciones.map(u => (
        <div key={u.id}>
          <span>{u.name} - {u.province}, {u.city}</span>
          <button onClick={() => eliminarUbicacion(u.id)}>Eliminar</button>
        </div>
      ))}
      <h3>Agregar nueva</h3>
      <input placeholder="Nombre" value={nueva.name} onChange={handleNuevaChange} />
      <input placeholder="Provincia" value={nueva.province} onChange={handleNuevaChange} />
      <input placeholder="Ciudad" value={nueva.city} onChange={handleNuevaChange} />
      <button onClick={crearUbicacion} disabled={loading}>
        {loading ? 'Creando...' : 'Crear'}
      </button>
    </div>
  );
}

export default UbicacionesList;
