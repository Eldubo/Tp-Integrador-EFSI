import { Link } from 'react-router-dom';

function EventoCard({ evento }) {
  return (
    <div className="evento-card">
      <h3>{evento.name || 'Sin título'}</h3>
      <p>{evento.description || 'Sin descripción'}</p>
      <p>Fecha: {evento.date || 'Sin fecha'}</p>
      <p>Precio: ${evento.price !== undefined ? evento.price : 'No especificado'}</p>
      <p>Lugar: {evento.location?.name || 'Sin ubicación'}</p>
      <p>Capacidad: {evento.capacity || 'No especificada'}</p>
      <Link to={`/eventos/${evento.id}`}>Ver más</Link>
    </div>
  );
}

export default EventoCard;
