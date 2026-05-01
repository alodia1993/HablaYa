import { useState, useEffect } from 'react';
import api from '../../services/api';

const AdminTutorias = () => {
    const [slots, setSlots] = useState([]);
    const [reservas, setReservas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [form, setForm] = useState({ fecha: '', hora_inicio: '', hora_fin: '' });
    const [mensaje, setMensaje] = useState('');
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const cargarDatos = async () => {
        try {
            const [resSlots, resReservas] = await Promise.all([
                api.get('/slots'),
                api.get('/reservas')
            ]);
            setSlots(resSlots.data);
            setReservas(resReservas.data);
        } catch (error) {
            console.error('Error al cargar datos:', error);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => { cargarDatos(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/slots', form);
            setMensaje('✅ Horario creado correctamente');
            setForm({ fecha: '', hora_inicio: '', hora_fin: '' });
            setMostrarFormulario(false);
            cargarDatos();
        } catch (error) {
            setMensaje('❌ Error al crear el horario');
        }
    };

    const formatearFecha = (fecha) => new Date(fecha).toLocaleDateString('es-ES', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    if (cargando) return <p>Cargando...</p>;

    return (
        <div>
            <div style={styles.header}>
                <h2 style={styles.titulo}>📅 Gestión de Tutorías</h2>
                <button onClick={() => setMostrarFormulario(!mostrarFormulario)} style={styles.botonNuevo}>
                    {mostrarFormulario ? 'Cancelar' : '+ Nuevo horario'}
                </button>
            </div>

            {mensaje && (
                <div style={{ ...styles.mensaje, background: mensaje.includes('✅') ? '#d1fae5' : '#fee2e2', color: mensaje.includes('✅') ? '#065f46' : '#991b1b' }}>
                    {mensaje}
                </div>
            )}

            {mostrarFormulario && (
                <div style={styles.formulario}>
                    <h3>Nuevo horario disponible</h3>
                    <form onSubmit={handleSubmit} style={styles.fila}>
                        <div style={styles.campo}>
                            <label>Fecha</label>
                            <input type="date" value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })} style={styles.input} required />
                        </div>
                        <div style={styles.campo}>
                            <label>Hora inicio</label>
                            <input type="time" value={form.hora_inicio} onChange={(e) => setForm({ ...form, hora_inicio: e.target.value })} style={styles.input} required />
                        </div>
                        <div style={styles.campo}>
                            <label>Hora fin</label>
                            <input type="time" value={form.hora_fin} onChange={(e) => setForm({ ...form, hora_fin: e.target.value })} style={styles.input} required />
                        </div>
                        <button type="submit" style={styles.botonGuardar}>Crear</button>
                    </form>
                </div>
            )}

            {/* Todos los slots */}
            <h3 style={styles.seccionTitulo}>Horarios publicados</h3>
            {slots.length === 0 ? (
                <p style={styles.vacio}>No hay horarios publicados todavía.</p>
            ) : (
                <div style={styles.lista}>
                    {slots.map(slot => (
                        <div key={slot.id} style={styles.card}>
                            <div>
                                <p style={styles.cardFecha}>{formatearFecha(slot.fecha)}</p>
                                <p style={styles.cardHora}>🕐 {slot.hora_inicio.slice(0, 5)} - {slot.hora_fin.slice(0, 5)}</p>
                            </div>
                            <span style={{ ...styles.badge, background: slot.disponible ? '#d1fae5' : '#fee2e2', color: slot.disponible ? '#065f46' : '#991b1b' }}>
                                {slot.disponible ? 'Disponible' : 'Reservado'}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* Reservas */}
            <h3 style={{ ...styles.seccionTitulo, marginTop: '2rem' }}>Reservas de alumnos</h3>
            {reservas.length === 0 ? (
                <p style={styles.vacio}>No hay reservas todavía.</p>
            ) : (
                <div style={styles.lista}>
                    {reservas.map(reserva => (
                        <div key={reserva.id} style={styles.cardReserva}>
                            <div>
                                <p style={styles.cardFecha}>{formatearFecha(reserva.fecha)}</p>
                                <p style={styles.cardHora}>🕐 {reserva.hora_inicio.slice(0, 5)} - {reserva.hora_fin.slice(0, 5)}</p>
                            </div>
                            <div style={styles.alumnoInfo}>
                                <p style={styles.alumnoNombre}>👤 {reserva.nombre_alumno}</p>
                                <p style={styles.alumnoEmail}>{reserva.email_alumno}</p>
                            </div>
                            <span style={styles.confirmadaBadge}>Confirmada</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
    titulo: { color: '#1f2937', margin: 0 },
    botonNuevo: { padding: '0.6rem 1.25rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
    mensaje: { padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1rem', fontWeight: '600' },
    formulario: { background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', marginBottom: '1.5rem' },
    fila: { display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' },
    campo: { display: 'flex', flexDirection: 'column', gap: '0.25rem' },
    input: { padding: '0.6rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem' },
    botonGuardar: { padding: '0.6rem 1.25rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
    seccionTitulo: { color: '#374151', marginBottom: '1rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' },
    vacio: { color: '#6b7280', padding: '1rem', background: '#f9fafb', borderRadius: '8px' },
    lista: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
    card: { background: 'white', padding: '1rem 1.25rem', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    cardReserva: { background: 'white', padding: '1rem 1.25rem', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' },
    cardFecha: { margin: '0 0 0.25rem', fontWeight: '600', color: '#1f2937', textTransform: 'capitalize' },
    cardHora: { margin: 0, color: '#6b7280' },
    badge: { padding: '0.2rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' },
    alumnoInfo: { textAlign: 'center' },
    alumnoNombre: { margin: '0 0 0.2rem', fontWeight: '600', color: '#374151' },
    alumnoEmail: { margin: 0, color: '#6b7280', fontSize: '0.85rem' },
    confirmadaBadge: { padding: '0.2rem 0.75rem', background: '#d1fae5', color: '#065f46', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }
};

export default AdminTutorias;