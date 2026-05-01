import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminLecciones from './admin/AdminLecciones';
import AdminRedacciones from './admin/AdminRedacciones';
import AdminTutorias from './admin/AdminTutorias';

const Admin = () => {
    const { usuario, logout } = useAuth();
    const navigate = useNavigate();
    const [seccionActiva, setSeccionActiva] = useState('lecciones');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = [
        { id: 'lecciones', label: '📚 Lecciones' },
        { id: 'redacciones', label: '✍️ Redacciones' },
        { id: 'tutorias', label: '📅 Tutorías' },
    ];

    const renderSeccion = () => {
        if (seccionActiva === 'lecciones') return <AdminLecciones />;
        if (seccionActiva === 'redacciones') return <AdminRedacciones />;
        if (seccionActiva === 'tutorias') return <AdminTutorias />;
    };

    return (
        <div style={styles.container}>
            {/* Menú lateral */}
            <div style={styles.sidebar}>
                <div style={styles.sidebarHeader}>
                    <p style={styles.adminNombre}>{usuario?.nombre}</p>
                    <p style={styles.adminRol}>Administradora</p>
                </div>
                <nav style={styles.nav}>
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setSeccionActiva(item.id)}
                            style={{
                                ...styles.navItem,
                                background: seccionActiva === item.id ? '#4f46e5' : 'transparent',
                                color: seccionActiva === item.id ? 'white' : '#374151'
                            }}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>
                <button onClick={handleLogout} style={styles.botonSalir}>Cerrar sesión</button>
            </div>

            {/* Contenido principal */}
            <div style={styles.contenido}>
                {renderSeccion()}
            </div>
        </div>
    );
};

const styles = {
    container: { display: 'flex', minHeight: 'calc(100vh - 60px)' },
    sidebar: { width: '220px', background: '#f9fafb', borderRight: '1px solid #e5e7eb', padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column' },
    sidebarHeader: { marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' },
    adminNombre: { margin: '0 0 0.25rem', fontWeight: '700', color: '#1f2937' },
    adminRol: { margin: 0, color: '#6b7280', fontSize: '0.85rem' },
    nav: { display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 },
    navItem: { padding: '0.75rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: '500', fontSize: '0.95rem' },
    contenido: { flex: 1, padding: '2rem', background: '#f3f4f6' },
    botonSalir: { padding: '0.6rem 1rem', background: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '1rem' }
};

export default Admin;