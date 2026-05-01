import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../services/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    const { usuario } = useAuth();
    const navigate = useNavigate();
    const [abierta, setAbierta] = useState(null);
    const [progreso, setProgreso] = useState(null);
    const [slots, setSlots] = useState([]);
    const [redacciones, setRedacciones] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [resProgreso, resSlots, resRedacciones] = await Promise.all([
                    api.get('/progreso/resumen'),
                    api.get('/slots/disponibles'),
                    api.get('/redacciones/mias'),
                ]);
                setProgreso(resProgreso.data);
                setSlots(resSlots.data.slice(0, 3));
                setRedacciones(resRedacciones.data);
            } catch (e) {
                console.error(e);
            } finally {
                setCargando(false);
            }
        };
        cargarDatos();
    }, []);

    const toggleTarjeta = (id) => {
        setAbierta(abierta === id ? null : id);
    };

    const tarjetas = [
        { id: 'lecciones', emoji: '📚', titulo: 'Lecciones', subtitulo: 'Explora y aprende' },
        { id: 'progreso', emoji: '📊', titulo: 'Mi progreso', subtitulo: 'Tu evolución por nivel' },
        { id: 'tutorias', emoji: '🗓️', titulo: 'Tutorías', subtitulo: 'Clases con Alodía' },
        { id: 'redacciones', emoji: '✍️', titulo: 'Redacciones', subtitulo: 'Tus escritos' },
    ];

    const datosGrafica = progreso?.resumenPorNivel?.map(r => ({
        nivel: r.nivel,
        completadas: parseInt(r.lecciones_completadas) || 0,
        total: parseInt(r.total_lecciones) || 0,
    })) || [];

    const totalCompletadas = datosGrafica.reduce((acc, r) => acc + r.completadas, 0);

    return (
        <div style={styles.page}>
            {/* BIENVENIDA */}
            <div style={styles.bienvenida}>
                <div>
                    <h1 style={styles.saludo}>¡Hola, {usuario?.nombre?.split(' ')[0]}! 👋</h1>
                    <p style={styles.saludoSub}>Bienvenido a tu espacio de aprendizaje · Welcome to your learning space</p>
                </div>
                {progreso && (
                    <div style={styles.nivelBadge}>
                        <span style={styles.nivelLabel}>Nivel actual</span>
                        <span style={styles.nivelValor}>{progreso.nivelActual}</span>
                        <span style={styles.leccionesLabel}>{totalCompletadas} lecciones completadas</span>
                    </div>
                )}
            </div>

            {/* TARJETAS */}
            <div style={styles.grid}>
                {tarjetas.map((t) => (
                    <div key={t.id} style={styles.tarjeta}>
                        {/* CABECERA — siempre visible */}
                        <div style={styles.tarjetaHeader} onClick={() => toggleTarjeta(t.id)}>
                            <div style={styles.tarjetaIzq}>
                                <span style={styles.tarjetaEmoji}>{t.emoji}</span>
                                <div>
                                    <p style={styles.tarjetaTitulo}>{t.titulo}</p>
                                    <p style={styles.tarjetaSubtitulo}>{t.subtitulo}</p>
                                </div>
                            </div>
                            <span style={styles.chevron}>{abierta === t.id ? '▲' : '▼'}</span>
                        </div>

                        {/* CONTENIDO — se expande al pulsar */}
                        {abierta === t.id && (
                            <div style={styles.tarjetaContenido}>

                                {/* LECCIONES */}
                                {t.id === 'lecciones' && (
                                    <div style={styles.contenidoInner}>
                                        <p style={styles.contenidoTexto}>Accede a todas las lecciones organizadas por nivel: A1, A2, B1 y B2.</p>
                                        <button onClick={() => navigate('/lecciones')} style={styles.botonIr}>
                                            Ver todas las lecciones →
                                        </button>
                                    </div>
                                )}

                                {/* PROGRESO */}
                                {t.id === 'progreso' && (
                                    <div style={styles.contenidoInner}>
                                        {cargando ? (
                                            <p style={styles.contenidoTexto}>Cargando...</p>
                                        ) : datosGrafica.length > 0 ? (
                                            <>
                                                <ResponsiveContainer width="100%" height={160}>
                                                    <BarChart data={datosGrafica} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                                                        <XAxis dataKey="nivel" tick={{ fontSize: 12 }} />
                                                        <YAxis tick={{ fontSize: 12 }} />
                                                        <Tooltip />
                                                        <Bar dataKey="completadas" name="Completadas" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                                                        <Bar dataKey="total" name="Total" fill="#e0e7ff" radius={[4, 4, 0, 0]} />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                                <button onClick={() => navigate('/progreso')} style={styles.botonIr}>
                                                    Ver progreso completo →
                                                </button>
                                            </>
                                        ) : (
                                            <p style={styles.contenidoTexto}>Aún no tienes progreso registrado. ¡Empieza una lección!</p>
                                        )}
                                    </div>
                                )}

                                {/* TUTORÍAS */}
                                {t.id === 'tutorias' && (
                                    <div style={styles.contenidoInner}>
                                        {cargando ? (
                                            <p style={styles.contenidoTexto}>Cargando...</p>
                                        ) : slots.length > 0 ? (
                                            <>
                                                <p style={styles.contenidoTexto}>Próximos slots disponibles:</p>
                                                {slots.map((slot) => (
                                                    <div key={slot.id} style={styles.slotItem}>
                                                        <span>📅 {new Date(slot.fecha).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                                                        <span>🕐 {slot.hora_inicio} – {slot.hora_fin}</span>
                                                    </div>
                                                ))}
                                                <button onClick={() => navigate('/tutorias')} style={styles.botonIr}>
                                                    Ver todos los slots →
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <p style={styles.contenidoTexto}>No hay slots disponibles ahora mismo.</p>
                                                <button onClick={() => navigate('/tutorias')} style={styles.botonIr}>
                                                    Ver tutorías →
                                                </button>
                                            </>
                                        )}
                                    </div>
                                )}

                                {/* REDACCIONES */}
                                {t.id === 'redacciones' && (
                                    <div style={styles.contenidoInner}>
                                        {cargando ? (
                                            <p style={styles.contenidoTexto}>Cargando...</p>
                                        ) : redacciones.length > 0 ? (
                                            <>
                                                {redacciones.map((r) => (
                                                    <div key={r.id} style={styles.redaccionItem}>
                                                        <div style={styles.redaccionIzq}>
                                                            <p style={styles.redaccionTitulo}>{r.titulo}</p>
                                                            <p style={styles.redaccionFecha}>{new Date(r.created_at).toLocaleDateString('es-ES')}</p>
                                                        </div>
                                                        <span style={r.estado === 'revisada' ? styles.badgeRevisada : styles.badgePendiente}>
                                                            {r.estado === 'revisada' ? '✅ Revisada' : '⏳ Pendiente'}
                                                        </span>
                                                    </div>
                                                ))}
                                                <button onClick={() => navigate('/writing')} style={styles.botonIr}>
                                                    Ir a redacciones →
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <p style={styles.contenidoTexto}>Aún no has enviado ninguna redacción.</p>
                                                <button onClick={() => navigate('/writing')} style={styles.botonIr}>
                                                    Enviar una redacción →
                                                </button>
                                            </>
                                        )}
                                    </div>
                                )}

                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    page: { maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' },
    bienvenida: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', borderRadius: '16px', padding: '2rem', color: 'white' },
    saludo: { fontSize: '1.8rem', fontWeight: '800', margin: 0 },
    saludoSub: { opacity: 0.85, margin: '0.25rem 0 0', fontStyle: 'italic', fontSize: '0.95rem' },
    nivelBadge: { background: 'rgba(255,255,255,0.2)', borderRadius: '12px', padding: '1rem 1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.25rem' },
    nivelLabel: { fontSize: '0.8rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.05em' },
    nivelValor: { fontSize: '2rem', fontWeight: '800' },
    leccionesLabel: { fontSize: '0.8rem', opacity: 0.8 },
    grid: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    tarjeta: { background: 'white', borderRadius: '14px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', overflow: 'hidden', border: '1px solid #e5e7eb' },
    tarjetaHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', cursor: 'pointer', userSelect: 'none' },
    tarjetaIzq: { display: 'flex', alignItems: 'center', gap: '1rem' },
    tarjetaEmoji: { fontSize: '1.8rem' },
    tarjetaTitulo: { fontWeight: '700', color: '#1f2937', margin: 0, fontSize: '1rem' },
    tarjetaSubtitulo: { color: '#6b7280', margin: 0, fontSize: '0.85rem' },
    chevron: { color: '#9ca3af', fontSize: '0.8rem' },
    tarjetaContenido: { borderTop: '1px solid #f3f4f6', background: '#fafafa' },
    contenidoInner: { padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' },
    contenidoTexto: { color: '#374151', margin: 0, fontSize: '0.95rem' },
    botonIr: { alignSelf: 'flex-start', padding: '0.6rem 1.25rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' },
    slotItem: { display: 'flex', gap: '1.5rem', flexWrap: 'wrap', background: '#ede9fe', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.9rem', color: '#3730a3' },
    redaccionItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' },
    redaccionIzq: { display: 'flex', flexDirection: 'column', gap: '0.15rem' },
    redaccionTitulo: { fontWeight: '600', color: '#1f2937', margin: 0, fontSize: '0.9rem' },
    redaccionFecha: { color: '#9ca3af', margin: 0, fontSize: '0.8rem' },
    badgeRevisada: { background: '#d1fae5', color: '#065f46', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600', whiteSpace: 'nowrap' },
    badgePendiente: { background: '#fef3c7', color: '#92400e', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600', whiteSpace: 'nowrap' },
};

export default Dashboard;
