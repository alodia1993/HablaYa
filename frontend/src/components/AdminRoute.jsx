import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
    const { usuario, cargando } = useAuth();

    if (cargando) return <div>Cargando...</div>;
    if (!usuario) return <Navigate to="/login" />;
    if (usuario.rol !== 'admin') return <Navigate to="/dashboard" />;

    return children;
};

export default AdminRoute;