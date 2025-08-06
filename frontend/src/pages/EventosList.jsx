import { useEffect, useState } from 'react';
import api from '../services/api';
import EventoCard from '../components/EventoCard';
import { useSearchParams } from 'react-router-dom';

function EventosList() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [searchParams] = useSearchParams();

  const fetchEventos = async () => {
    setLoading(true);
    setError('');
    try {
      const query = new URLSearchParams(searchParams);
      query.set('page', page);
      const res = await api.get(`/event?${query.toString()}`);
      setEventos(res.data.eventos || []);
      setHasNextPage(res.data.hasNextPage || false);
    } catch (error) {
      console.error('Error al cargar eventos', error);
      setError('Error al cargar eventos. Intente nuevamente.');
      setEventos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, [page, searchParams]);

  return (
    <div className="container">
      <h2>Listado de eventos</h2>
      {loading && <p>Cargando eventos...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && eventos.length === 0 && <p>No se encontraron eventos</p>}
      {!loading && !error && eventos.map((evento) => (
        <EventoCard key={evento.id} evento={evento} />
      ))}
      {!loading && (
        <div>
          <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>Anterior</button>
          <span>Página {page}</span>
          <button onClick={() => setPage((p) => hasNextPage ? p + 1 : p)} disabled={!hasNextPage}>Siguiente</button>
        </div>
      )}
    </div>
  );
}

export default EventosList;
