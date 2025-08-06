import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import EventosList from './pages/EventosList';
import EventoDetalle from './pages/EventoDetalle';
import CrearEventoForm from './pages/CrearEventoForm';
import UbicacionesList from './pages/UbicacionesList';
import MisEventos from './pages/MisEventos';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { usuario } = useAuth();
  return usuario ? children : <Navigate to="/login" />;
};

const Router = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/eventos" />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/eventos" element={<EventosList />} />
    <Route path="/eventos/:id" element={<EventoDetalle />} />
    <Route path="/crear-evento" element={<ProtectedRoute><CrearEventoForm /></ProtectedRoute>} />
    <Route path="/ubicaciones" element={<ProtectedRoute><UbicacionesList /></ProtectedRoute>} />
    <Route path="/mis-eventos" element={<ProtectedRoute><MisEventos /></ProtectedRoute>} />
  </Routes>
);

export default Router;
