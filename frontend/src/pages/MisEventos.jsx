import { useEffect, useState } from 'react';
import api from '../services/api';

function MisEventos() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMisEventos = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/event?createdByMe=true');
      setEventos(res.data.eventos || []);
    } catch (error) {
      console.error('Error al cargar eventos', error);
      setError('Error al cargar tus eventos. Intente nuevamente.');
      setEventos([]);
    } finally {
      setLoading(false);
    }
  };

  const eliminarEvento = async (id) => {
    if (!window.confirm('¿Está seguro que desea eliminar este evento?')) {
      return;
    }
    
    try {
      await api.delete(`/event/${id}`);
      setEventos(eventos.filter(e => e.id !== id));
    } catch (error) {
      console.error('Error al eliminar evento', error);
      alert('Error al eliminar el evento. Intente nuevamente.');
    }
  };

  useEffect(() => {
    fetchMisEventos();
  }, []);

  return (
    <div className="container">
      <h2>Mis eventos</h2>
      {loading && <p>Cargando eventos...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && eventos.length === 0 && <p>No tienes eventos creados</p>}
      {!loading && !error && eventos.map((evento) => (
        <div key={evento.id}>
          <h4>{evento.name}</h4>
          <button onClick={() => eliminarEvento(evento.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export default MisEventos;
