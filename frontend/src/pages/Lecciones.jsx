import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Lecciones = () => {
    const [lecciones, setLecciones] = useState([]);
    const [nivelFiltro, setNivelFiltro] = useState('TODOS');
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarLecciones = async () => {
            try {
                const res = await api.get('/lecciones');
                setLecciones(res.data);
            } catch (error) {
                console.error('Error al cargar lecciones:', error);
            } finally {
                setCargando(false);
            }
        };
        cargarLecciones();
    }, []);

    const niveles = ['TODOS', 'A1', 'A2', 'B1', 'B2'];

    const leccionesFiltradas = nivelFiltro === 'TODOS'
        ? lecciones
        : lecciones.filter(l => l.nivel === nivelFiltro);

    if (cargando) return <div style={styles.cargando}>Cargando lecciones...</div>;

    return (
        <div style={styles.container}>
            <h1 style={styles.titulo}>📚 Lecciones</h1>

            {/* Filtros por nivel */}
            <div style={styles.filtros}>
                {niveles.map(nivel => (
                    <button
                        key={nivel}
                        onClick={() => setNivelFiltro(nivel)}
                        style={{
                            ...styles.botonFiltro,
                            background: nivelFiltro === nivel ? '#4f46e5' : '#e5e7eb',
                            color: nivelFiltro === nivel ? 'white' : '#374151'
                        }}
                    >
                        {nivel}
                    </button>
                ))}
            </div>

            {/* Lista de lecciones */}
            <div style={styles.grid}>
                {leccionesFiltradas.map(leccion => (
                    <div
                        key={leccion.id}
                        style={styles.card}
                        onClick={() => navigate(`/lecciones/${leccion.id}`)}
                    >
                        <span style={{
                            ...styles.nivel,
                            background: coloresNivel[leccion.nivel] || '#6b7280'
                        }}>
                            {leccion.nivel}
                        </span>
                        <h3 style={styles.cardTitulo}>{leccion.titulo}</h3>
                        <p style={styles.cardDesc}>{leccion.descripcion}</p>
                    </div>
                ))}
            </div>

            {leccionesFiltradas.length === 0 && (
                <p style={styles.vacio}>No hay lecciones para este nivel todavía.</p>
            )}
        </div>
    );
};

const coloresNivel = {
    A1: '#10b981',
    A2: '#3b82f6',
    B1: '#f59e0b',
    B2: '#ef4444'
};

const styles = {
    container: { padding: '2rem', maxWidth: '1000px', margin: '0 auto' },
    titulo: { color: '#4f46e5', marginBottom: '1.5rem' },
    filtros: { display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' },
    botonFiltro: { padding: '0.5rem 1.25rem', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' },
    card: { background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', cursor: 'pointer', transition: 'transform 0.2s' },
    nivel: { display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '20px', color: 'white', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.75rem' },
    cardTitulo: { color: '#1f2937', marginBottom: '0.5rem' },
    cardDesc: { color: '#6b7280', fontSize: '0.9rem' },
    cargando: { textAlign: 'center', padding: '3rem', color: '#6b7280' },
    vacio: { textAlign: 'center', color: '#6b7280', padding: '2rem' }
};

export default Lecciones;