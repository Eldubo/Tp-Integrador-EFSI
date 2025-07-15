import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../services/api';
import EventoCard from './EventoCard';
import BuscadorEventos from './BuscadorEventos';
import './EventosList.css';

const EventosList = () => {
  const [eventos, setEventos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filtros, setFiltros] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEventos = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch('/event/', {
        params: { page, ...filtros, ...params },
      });
      setEventos(data.eventos || data.results || []);
      setTotalPages(data.totalPages || data.pages || 1);
    } catch (err) {
      setError(err?.error || 'Error al cargar eventos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventos();
    // eslint-disable-next-line
  }, [page, filtros]);

  const handleBuscar = (f) => {
    setFiltros(f);
    setPage(1);
  };

  return (
    <div className="container">
      <h2>Eventos</h2>
      <BuscadorEventos onBuscar={handleBuscar} />
      {loading && <p>Cargando...</p>}
      {error && <p className="error">{error}</p>}
      {eventos.map(evento => (
        <EventoCard key={evento.id} evento={evento} />
      ))}
      <div>
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Anterior</button>
        <span> Página {page} de {totalPages} </span>
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Siguiente</button>
      </div>
    </div>
  );
};

export default EventosList; 