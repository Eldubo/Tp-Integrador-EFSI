import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../services/api';
import EventoCard from './EventoCard';
import './MisEventos.css';

const MisEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMisEventos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch('/event/', { params: { creadosPorMi: true } });
      setEventos(data.eventos || data.results || []);
    } catch (err) {
      setError(err?.error || 'Error al cargar mis eventos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMisEventos();
  }, []);

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este evento?')) return;
    try {
      await apiFetch(`/event/${id}`, { method: 'DELETE' });
      setEventos(eventos.filter(e => e.id !== id));
    } catch (err) {
      setError(err?.error || 'Error al eliminar evento');
    }
  };

  // Para editar, podrías redirigir a un formulario de edición

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="container">
      <h2>Mis Eventos</h2>
      {eventos.map(evento => (
        <div key={evento.id}>
          <EventoCard evento={evento} />
          <button onClick={() => {/* redirigir a edición */}}>Editar</button>
          <button onClick={() => handleEliminar(evento.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default MisEventos; 