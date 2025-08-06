import { useAuth } from './context/AuthContext';
import Router from './router';
import { Navigate } from 'react-router-dom';
import './App.css';

function App() {
  const { usuario } = useAuth();

  return (
    <>
      {usuario ? <Router /> : <Navigate to="/login" />}
    </>
  );
}

export default App;
