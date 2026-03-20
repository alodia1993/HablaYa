import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const LeccionDetalle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [leccion, setLeccion] = useState(null);
    const [ejercicios, setEjercicios] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarDetalle = async () => {
            try {
                const [resLeccion, resEjercicios] = await Promise.all([
                    api.get(`/lecciones/${id}`),
                    api.get(`/ejercicios/leccion/${id}`)
                ]);
                setLeccion(resLeccion.data);
                setEjercicios(resEjercicios.data);
            } catch (error) {
                console.error('Error al cargar la lección:', error);
            } finally {
                setCargando(false);
            }
        };
        cargarDetalle();
    }, [id]);

    if (cargando) return <div style={styles.cargando}>Cargando lección...</div>;
    if (!leccion) return <div style={styles.cargando}>Lección no encontrada.</div>;

    return (
        <div style={styles.container}>
            <button onClick={() => navigate('/lecciones')} style={styles.botonVolver}>
                ← Volver a lecciones
            </button>

            {/* Cabecera de la lección */}
            <div style={styles.cabecera}>
                <span style={{
                    ...styles.nivel,
                    background: coloresNivel[leccion.nivel] || '#6b7280'
                }}>
                    {leccion.nivel}
                </span>
                <h1 style={styles.titulo}>{leccion.titulo}</h1>
                <p style={styles.descripcion}>{leccion.descripcion}</p>
            </div>

            {/* Lista de ejercicios */}
            <h2 style={styles.subtitulo}>Ejercicios</h2>

            {ejercicios.length === 0 ? (
                <p style={styles.vacio}>Esta lección no tiene ejercicios todavía.</p>
            ) : (
                <div style={styles.listaEjercicios}>
                    {ejercicios.map((ejercicio, index) => (
                        <div key={ejercicio.id} style={styles.cardEjercicio}>
                            <div style={styles.cardHeader}>
                                <span style={styles.numero}>{index + 1}</span>
                                <span style={{
                                    ...styles.tipo,
                                    background: coloresTipo[ejercicio.tipo] || '#6b7280'
                                }}>
                                    {etiquetaTipo[ejercicio.tipo] || ejercicio.tipo}
                                </span>
                            </div>
                            <p style={styles.enunciado}>{ejercicio.enunciado}</p>
                            <button
                                style={styles.botonEjercicio}
                                onClick={() => alert('Los ejercicios interactivos se añaden en el Bloque 3 😊')}
                            >
                                Hacer ejercicio →
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const coloresNivel = {
    A1: '#10b981', A2: '#3b82f6', B1: '#f59e0b', B2: '#ef4444'
};

const coloresTipo = {
    OPCION_MULTIPLE: '#8b5cf6',
    ORDENAR_FRASES: '#f59e0b',
    READING: '#3b82f6'
};

const etiquetaTipo = {
    OPCION_MULTIPLE: 'Opción múltiple',
    ORDENAR_FRASES: 'Ordenar frases',
    READING: 'Reading'
};

const styles = {
    container: { padding: '2rem', maxWidth: '800px', margin: '0 auto' },
    botonVolver: { background: 'none', border: 'none', color: '#4f46e5', cursor: 'pointer', fontSize: '1rem', fontWeight: '600', marginBottom: '1.5rem', padding: 0 },
    cabecera: { background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', marginBottom: '2rem' },
    nivel: { display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '20px', color: 'white', fontSize: '0.85rem', fontWeight: '600', marginBottom: '1rem' },
    titulo: { color: '#1f2937', marginBottom: '0.75rem' },
    descripcion: { color: '#6b7280', lineHeight: '1.6' },
    subtitulo: { color: '#4f46e5', marginBottom: '1rem' },
    listaEjercicios: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    cardEjercicio: { background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' },
    cardHeader: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' },
    numero: { background: '#e5e7eb', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.85rem' },
    tipo: { padding: '0.2rem 0.65rem', borderRadius: '20px', color: 'white', fontSize: '0.8rem', fontWeight: '600' },
    enunciado: { color: '#374151', marginBottom: '1rem', lineHeight: '1.5' },
    botonEjercicio: { background: '#4f46e5', color: 'white', border: 'none', padding: '0.5rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
    cargando: { textAlign: 'center', padding: '3rem', color: '#6b7280' },
    vacio: { color: '#6b7280', textAlign: 'center', padding: '2rem' }
};

export default LeccionDetalle;