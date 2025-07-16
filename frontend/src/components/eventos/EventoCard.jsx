import React from 'react';
import './EventoCard.css';

const EventoCard = ({ evento }) => {
  return (
    <div className="evento-card">
      <h3>{evento.nombre}</h3>
      <p>{evento.descripcion}</p>
      <p>Fecha: {evento.fecha}</p>
      <p>Precio: ${evento.precio}</p>
      <p>Lugar: {evento.lugar}</p>
      <p>Capacidad: {evento.capacidad}</p>
    </div>
  );
};

export default EventoCard; 