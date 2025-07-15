import React, { useState } from 'react';
import { apiFetch } from '../../services/api';
import './CrearEventoForm.css';

const CrearEventoForm = () => {
  const [form, setForm] = useState({ nombre: '', descripcion: '', fecha: '', precio: '', lugar: '', capacidad: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!form.nombre || !form.descripcion || !form.fecha || !form.precio || !form.lugar || !form.capacidad) {
      setError('Todos los campos son obligatorios');
      return;
    }
    if (Number(form.precio) < 0 || Number(form.capacidad) < 0) {
      setError('Precio y capacidad deben ser positivos');
      return;
    }
    try {
      await apiFetch('/event/', {
        method: 'POST',
        body: form,
      });
      setError('Evento creado correctamente');
      // Podrías limpiar el formulario o redirigir
    } catch (err) {
      setError(err?.error || 'Error al crear evento');
    }
  };

  return (
    <div className="container">
      <h2>Crear Evento</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <input name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} required />
        <input type="date" name="fecha" value={form.fecha} onChange={handleChange} required />
        <input type="number" name="precio" placeholder="Precio" value={form.precio} onChange={handleChange} required />
        <input name="lugar" placeholder="Lugar" value={form.lugar} onChange={handleChange} required />
        <input type="number" name="capacidad" placeholder="Capacidad" value={form.capacidad} onChange={handleChange} required />
        <button type="submit">Crear</button>
      </form>
      {error && <p className={error.includes('correctamente') ? 'success' : 'error'}>{error}</p>}
    </div>
  );
};

export default CrearEventoForm; 