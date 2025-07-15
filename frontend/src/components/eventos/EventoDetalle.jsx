import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiFetch } from '../../services/api';
import './EventoDetalle.css';

const EventoDetalle = () => {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [error, setError] = useState(null);
  const [inscripto, setInscripto] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchEvento = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch(`/event/${id}`);
      setEvento(data);
      setInscripto(data.inscripto || false);
    } catch (err) {
      setError(err?.error || 'Error al cargar evento');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvento();
    // eslint-disable-next-line
  }, [id]);

  const handleInscripcion = async () => {
    try {
      await apiFetch(`/event/${id}/enrollment/`, { method: 'POST' });
      setInscripto(true);
    } catch (err) {
      setError(err?.error || 'Error al inscribirse');
    }
  };

  const handleCancelar = async () => {
    try {
      await apiFetch(`/event/${id}/enrollment/`, { method: 'DELETE' });
      setInscripto(false);
    } catch (err) {
      setError(err?.error || 'Error al cancelar inscripción');
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!evento) return null;

  return (
    <div className="container">
      <h2>{evento.nombre}</h2>
      <p>{evento.descripcion}</p>
      <p>Fecha: {evento.fecha}</p>
      <p>Precio: ${evento.precio}</p>
      <p>Lugar: {evento.lugar}</p>
      <p>Capacidad: {evento.capacidad}</p>
      <p>Provincia: {evento.provincia}</p>
      <p>Localidad: {evento.localidad}</p>
      <p>Tags: {evento.tags?.join(', ')}</p>
      <p>Creador: {evento.creador}</p>
      {/* Botón de inscripción/cancelación si autenticado */}
      {localStorage.getItem('token') && (
        inscripto ?
          <button onClick={handleCancelar}>Cancelar inscripción</button>
        : <button onClick={handleInscripcion}>Inscribirse</button>
      )}
    </div>
  );
};

export default EventoDetalle; 