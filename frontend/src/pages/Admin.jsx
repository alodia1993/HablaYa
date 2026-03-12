import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const { usuario, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.titulo}>🗣️ HablaYa! - Panel Admin</h1>
                <h2>Bienvenida, {usuario?.nombre} 👋</h2>
                <p style={styles.rol}>Rol: <strong>{usuario?.rol}</strong></p>
                <p>Aquí gestionarás lecciones, ejercicios y tutorías próximamente.</p>
                <button onClick={handleLogout} style={styles.boton}>
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f4f8' },
    card: { background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: '100%', maxWidth: '500px' },
    titulo: { color: '#4f46e5' },
    rol: { color: '#6b7280', marginBottom: '1rem' },
    boton: { padding: '0.75rem 1.5rem', background: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '1rem' }
};

export default Admin;