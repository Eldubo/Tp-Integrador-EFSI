import React, { useState } from 'react';

const BuscadorEventos = ({ onBuscar }) => {
  const [filtros, setFiltros] = useState({ name: '', startdate: '', tag: '' });

  const handleChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onBuscar(filtros);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={filtros.name}
        onChange={handleChange}
      />
      <input
        type="date"
        name="startdate"
        value={filtros.startdate}
        onChange={handleChange}
      />
      <input
        type="text"
        name="tag"
        placeholder="Tag"
        value={filtros.tag}
        onChange={handleChange}
      />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default BuscadorEventos; 