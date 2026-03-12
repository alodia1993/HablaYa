import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { usuario, cargando } = useAuth();

    if (cargando) return <div>Cargando...</div>;
    if (!usuario) return <Navigate to="/login" />;

    return children;
};

export default PrivateRoute;