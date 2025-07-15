import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../services/api';
import './UbicacionesList.css';

const UbicacionesList = () => {
  const [ubicaciones, setUbicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ nombre: '', direccion: '' });
  const [editId, setEditId] = useState(null);

  const fetchUbicaciones = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch('/event-location');
      setUbicaciones(data.ubicaciones || data.results || []);
    } catch (err) {
      setError(err?.error || 'Error al cargar ubicaciones');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUbicaciones();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (editId) {
        await apiFetch(`/event-location/${editId}`, { method: 'PUT', body: form });
      } else {
        await apiFetch('/event-location', { method: 'POST', body: form });
      }
      setForm({ nombre: '', direccion: '' });
      setEditId(null);
      fetchUbicaciones();
    } catch (err) {
      setError(err?.error || 'Error al guardar ubicación');
    }
  };

  const handleEdit = (ubicacion) => {
    setForm({ nombre: ubicacion.nombre, direccion: ubicacion.direccion });
    setEditId(ubicacion.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta ubicación?')) return;
    try {
      await apiFetch(`/event-location/${id}`, { method: 'DELETE' });
      fetchUbicaciones();
    } catch (err) {
      setError(err?.error || 'Error al eliminar ubicación');
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="container">
      <h2>Mis Ubicaciones</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <input name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} required />
        <button type="submit">{editId ? 'Actualizar' : 'Crear'}</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setForm({ nombre: '', direccion: '' }); }}>Cancelar</button>}
      </form>
      <ul>
        {ubicaciones.map(u => (
          <li key={u.id}>
            {u.nombre} - {u.direccion}
            <button onClick={() => handleEdit(u)}>Editar</button>
            <button onClick={() => handleDelete(u.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UbicacionesList; 