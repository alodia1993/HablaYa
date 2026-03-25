import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../services/api';

const Progreso = () => {
    const [resumen, setResumen] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarResumen = async () => {
            try {
                const res = await api.get('/progreso/resumen');
                setResumen(res.data);
            } catch (error) {
                console.error('Error al cargar progreso:', error);
            } finally {
                setCargando(false);
            }
        };
        cargarResumen();
    }, []);

    if (cargando) return <div style={styles.cargando}>Cargando progreso...</div>;
    if (!resumen) return <div style={styles.cargando}>No hay datos de progreso todavía.</div>;

    const datosGrafica = resumen.resumenPorNivel.map(r => ({
        nivel: r.nivel,
        Completadas: parseInt(r.lecciones_completadas) || 0,
        Total: parseInt(r.total_lecciones) || 0,
        Puntuación: parseInt(r.puntuacion_media) || 0
    }));

    return (
        <div style={styles.container}>
            <h1 style={styles.titulo}>📊 Mi Progreso</h1>

            {/* Nivel actual */}
            <div style={styles.nivelCard}>
                <p style={styles.nivelLabel}>Tu nivel actual</p>
                <span style={styles.nivelBadge}>{resumen.nivelActual}</span>
            </div>

            {/* Gráfica de lecciones completadas */}
            <div style={styles.graficaCard}>
                <h2 style={styles.graficaTitulo}>Lecciones completadas por nivel</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={datosGrafica}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="nivel" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Total" fill="#e0e7ff" name="Total lecciones" />
                        <Bar dataKey="Completadas" fill="#4f46e5" name="Completadas" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Gráfica de puntuaciones */}
            <div style={styles.graficaCard}>
                <h2 style={styles.graficaTitulo}>Puntuación media por nivel</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={datosGrafica}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="nivel" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Bar dataKey="Puntuación" fill="#10b981" name="Puntuación media" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Resumen por nivel */}
            <div style={styles.resumenGrid}>
                {resumen.resumenPorNivel.map(r => (
                    <div key={r.nivel} style={styles.resumenCard}>
                        <span style={{ ...styles.nivelTag, background: coloresNivel[r.nivel] }}>
                            {r.nivel}
                        </span>
                        <p style={styles.resumenDato}>
                            {r.lecciones_completadas}/{r.total_lecciones} lecciones
                        </p>
                        <p style={styles.resumenPuntuacion}>
                            {r.puntuacion_media ? `${r.puntuacion_media} pts` : 'Sin datos'}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const coloresNivel = { A1: '#10b981', A2: '#3b82f6', B1: '#f59e0b', B2: '#ef4444' };

const styles = {
    container: { padding: '2rem', maxWidth: '900px', margin: '0 auto' },
    titulo: { color: '#4f46e5', marginBottom: '1.5rem' },
    cargando: { textAlign: 'center', padding: '3rem', color: '#6b7280' },
    nivelCard: { background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' },
    nivelLabel: { color: '#6b7280', margin: 0 },
    nivelBadge: { background: '#4f46e5', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '20px', fontWeight: '700', fontSize: '1.25rem' },
    graficaCard: { background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', marginBottom: '1.5rem' },
    graficaTitulo: { color: '#374151', marginBottom: '1rem' },
    resumenGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' },
    resumenCard: { background: 'white', padding: '1rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', textAlign: 'center' },
    nivelTag: { display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '20px', color: 'white', fontWeight: '700', marginBottom: '0.5rem' },
    resumenDato: { color: '#374151', margin: '0.25rem 0', fontWeight: '600' },
    resumenPuntuacion: { color: '#6b7280', margin: 0, fontSize: '0.9rem' }
};

export default Progreso;