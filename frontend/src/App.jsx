import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Registro from './components/auth/Registro';
import EventosList from './components/eventos/EventosList';
import EventoDetalle from './components/eventos/EventoDetalle';
import MisEventos from './components/eventos/MisEventos';
import CrearEventoForm from './components/eventos/CrearEventoForm';
import UbicacionesList from './components/ubicaciones/UbicacionesList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/eventos" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/eventos" element={<EventosList />} />
        <Route path="/eventos/:id" element={<EventoDetalle />} />
        <Route path="/mis-eventos" element={<MisEventos />} />
        <Route path="/crear-evento" element={<CrearEventoForm />} />
        <Route path="/ubicaciones" element={<UbicacionesList />} />
      </Routes>
    </Router>
  );
}

export default App;
