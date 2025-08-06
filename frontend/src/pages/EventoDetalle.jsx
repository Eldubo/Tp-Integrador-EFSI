import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

function EventoDetalle() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [inscripto, setInscripto] = useState(false);
  const { usuario } = useAuth();

  const cargarEvento = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get(`/event/${id}`);
      setEvento(res.data);
      setInscripto(res.data.inscripto || false);
    } catch (error) {
      console.error('Error al cargar evento', error);
      setError('Error al cargar el evento. Intente nuevamente.');
      setEvento(null);
    } finally {
      setLoading(false);
    }
  };

  const inscribirse = async () => {
    try {
      await api.post(`/event/${id}/enrollment`);
      setInscripto(true);
    } catch (error) {
      console.error('Error al inscribirse', error);
      alert('Error al inscribirse en el evento. Intente nuevamente.');
    }
  };

  const cancelar = async () => {
    try {
      await api.delete(`/event/${id}/enrollment`);
      setInscripto(false);
    } catch (error) {
      console.error('Error al cancelar inscripción', error);
      alert('Error al cancelar la inscripción. Intente nuevamente.');
    }
  };

  useEffect(() => {
    cargarEvento();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!evento) return <p>Evento no encontrado</p>;

  return (
    <div className="container">
      <h2>{evento.name}</h2>
      <p>{evento.description}</p>
      <p>Fecha: {evento.date}</p>
      <p>Precio: ${evento.price}</p>
      <p>Ubicación: {evento.location?.name || 'Sin ubicación'}</p>
      <p>Provincia: {evento.location?.province || 'Sin provincia'}</p>
      <p>Localidad: {evento.location?.city || 'Sin localidad'}</p>
      <p>Capacidad: {evento.capacity}</p>
      <p>Tags: {evento.tags?.join(', ') || 'Sin tags'}</p>
      <p>Creador: {evento.creator?.name || 'Desconocido'}</p>

      {usuario && (
        inscripto
          ? <button onClick={cancelar}>Cancelar inscripción</button>
          : <button onClick={inscribirse}>Inscribirme</button>
      )}
    </div>
  );
}

export default EventoDetalle;
