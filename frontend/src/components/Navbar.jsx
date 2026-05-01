import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { usuario, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!usuario) return null;

    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>
                🗣️ HablaYa!
            </div>
            <div style={styles.links}>
                {usuario.rol === 'alumno' && (
                    <>
                        <Link to="/dashboard" style={styles.link}>Inicio</Link>
                        <Link to="/lecciones" style={styles.link}>Lecciones</Link>
                        <Link to="/writing" style={styles.link}>Redacciones</Link>
                        <Link to="/tutorias" style={styles.link}>Tutorías</Link>
                        <Link to="/progreso" style={styles.link}>Progreso</Link>
                    </>
                )}
                {usuario.rol === 'admin' && (
                    <>
                        <Link to="/admin" style={styles.link}>Panel Admin</Link>
                        
                    </>
                )}
                <span style={styles.nombre}>{usuario.nombre}</span>
                <button onClick={handleLogout} style={styles.boton}>
                    Salir
                </button>
            </div>
        </nav>
    );
};

const styles = {
    nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: '#4f46e5', color: 'white' },
    logo: { fontSize: '1.25rem', fontWeight: 'bold', color: 'white' },
    links: { display: 'flex', alignItems: 'center', gap: '1.5rem' },
    link: { color: 'white', textDecoration: 'none', fontWeight: '500' },
    nombre: { color: '#c7d2fe', fontSize: '0.9rem' },
    boton: { padding: '0.5rem 1rem', background: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }
};

export default Navbar;