import { useState, useEffect } from 'react';
import api from '../services/api';

const Tutorias = () => {
    const [slots, setSlots] = useState([]);
    const [misReservas, setMisReservas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [reservando, setReservando] = useState(null);
    const [confirmacion, setConfirmacion] = useState('');

    const cargarDatos = async () => {
        try {
            const [resSlots, resReservas] = await Promise.all([
                api.get('/slots/disponibles'),
                api.get('/reservas/mias')
            ]);
            setSlots(resSlots.data);
            setMisReservas(resReservas.data);
        } catch (error) {
            console.error('Error al cargar tutorías:', error);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    const handleReservar = async (slotId) => {
        setReservando(slotId);
        setConfirmacion('');
        try {
            await api.post('/reservas', { slot_id: slotId });
            setConfirmacion('✅ ¡Tutoría reservada correctamente! Recibirás un email de confirmación.');
            cargarDatos();
        } catch (error) {
            setConfirmacion('❌ Error al reservar. Inténtalo de nuevo.');
        } finally {
            setReservando(null);
        }
    };

    const formatearFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (cargando) return <div style={styles.cargando}>Cargando tutorías...</div>;

    return (
        <div style={styles.container}>
            <h1 style={styles.titulo}>📅 Tutorías</h1>

            {/* Mensaje de confirmación */}
            {confirmacion && (
                <div style={{
                    ...styles.confirmacion,
                    background: confirmacion.includes('✅') ? '#d1fae5' : '#fee2e2',
                    color: confirmacion.includes('✅') ? '#065f46' : '#991b1b'
                }}>
                    {confirmacion}
                </div>
            )}

            {/* Slots disponibles */}
            <div style={styles.seccion}>
                <h2 style={styles.seccionTitulo}>Horarios disponibles</h2>
                {slots.length === 0 ? (
                    <p style={styles.vacio}>No hay horarios disponibles en este momento.</p>
                ) : (
                    <div style={styles.grid}>
                        {slots.map(slot => (
                            <div key={slot.id} style={styles.card}>
                                <div style={styles.cardIcono}>📆</div>
                                <div style={styles.cardInfo}>
                                    <p style={styles.cardFecha}>{formatearFecha(slot.fecha)}</p>
                                    <p style={styles.cardHora}>
                                        🕐 {slot.hora_inicio.slice(0, 5)} - {slot.hora_fin.slice(0, 5)}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleReservar(slot.id)}
                                    disabled={reservando === slot.id}
                                    style={styles.botonReservar}
                                >
                                    {reservando === slot.id ? 'Reservando...' : 'Reservar'}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Mis reservas */}
            <div style={styles.seccion}>
                <h2 style={styles.seccionTitulo}>Mis reservas</h2>
                {misReservas.length === 0 ? (
                    <p style={styles.vacio}>No tienes ninguna tutoría reservada todavía.</p>
                ) : (
                    <div style={styles.grid}>
                        {misReservas.map(reserva => (
                            <div key={reserva.id} style={styles.cardReserva}>
                                <div style={styles.cardIcono}>✅</div>
                                <div style={styles.cardInfo}>
                                    <p style={styles.cardFecha}>{formatearFecha(reserva.fecha)}</p>
                                    <p style={styles.cardHora}>
                                        🕐 {reserva.hora_inicio.slice(0, 5)} - {reserva.hora_fin.slice(0, 5)}
                                    </p>
                                    <span style={styles.estadoBadge}>{reserva.estado}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '2rem', maxWidth: '900px', margin: '0 auto' },
    titulo: { color: '#4f46e5', marginBottom: '1.5rem' },
    cargando: { textAlign: 'center', padding: '3rem', color: '#6b7280' },
    confirmacion: { padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontWeight: '600' },
    seccion: { marginBottom: '2.5rem' },
    seccionTitulo: { color: '#374151', marginBottom: '1rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' },
    vacio: { color: '#6b7280', padding: '1rem', background: '#f9fafb', borderRadius: '8px' },
    grid: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    card: { background: 'white', padding: '1.25rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '1rem' },
    cardReserva: { background: '#f0fdf4', padding: '1.25rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid #bbf7d0' },
    cardIcono: { fontSize: '2rem' },
    cardInfo: { flex: 1 },
    cardFecha: { fontWeight: '600', color: '#1f2937', margin: '0 0 0.25rem 0', textTransform: 'capitalize' },
    cardHora: { color: '#6b7280', margin: 0 },
    botonReservar: { padding: '0.6rem 1.25rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', whiteSpace: 'nowrap' },
    estadoBadge: { display: 'inline-block', marginTop: '0.25rem', padding: '0.2rem 0.75rem', background: '#d1fae5', color: '#065f46', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }
};

export default Tutorias;