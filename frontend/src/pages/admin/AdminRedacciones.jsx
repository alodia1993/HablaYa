import { useState, useEffect } from 'react';
import api from '../../services/api';

const AdminRedacciones = () => {
    const [redacciones, setRedacciones] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [seleccionada, setSeleccionada] = useState(null);
    const [form, setForm] = useState({ feedback: '', puntuacion: '' });
    const [mensaje, setMensaje] = useState('');

    const cargarRedacciones = async () => {
        try {
            const res = await api.get('/redacciones/pendientes');
            setRedacciones(res.data);
        } catch (error) {
            console.error('Error al cargar redacciones:', error);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => { cargarRedacciones(); }, []);

    const handleCorregir = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/redacciones/${seleccionada.id}`, {
                feedback: form.feedback,
                puntuacion: parseInt(form.puntuacion)
            });
            setMensaje('✅ Corrección guardada correctamente');
            setSeleccionada(null);
            setForm({ feedback: '', puntuacion: '' });
            cargarRedacciones();
        } catch (error) {
            setMensaje('❌ Error al guardar la corrección');
        }
    };

    if (cargando) return <p>Cargando...</p>;

    return (
        <div>
            <h2 style={styles.titulo}>✍️ Corrección de Redacciones</h2>

            {mensaje && (
                <div style={{ ...styles.mensaje, background: mensaje.includes('✅') ? '#d1fae5' : '#fee2e2', color: mensaje.includes('✅') ? '#065f46' : '#991b1b' }}>
                    {mensaje}
                </div>
            )}

            {redacciones.length === 0 ? (
                <p style={styles.vacio}>No hay redacciones pendientes de corrección. 🎉</p>
            ) : (
                <div style={styles.lista}>
                    {redacciones.map(r => (
                        <div key={r.id} style={styles.card}>
                            <div style={styles.cardHeader}>
                                <div>
                                    <h3 style={styles.cardTitulo}>{r.titulo}</h3>
                                    <p style={styles.cardMeta}>
                                        Alumno: <strong>{r.nombre_alumno}</strong> · {new Date(r.created_at).toLocaleDateString('es-ES')}
                                    </p>
                                </div>
                                <span style={styles.pendienteBadge}>Pendiente</span>
                            </div>

                            <div style={styles.contenido}>
                                <p style={styles.contenidoLabel}>Redacción del alumno:</p>
                                <p style={styles.contenidoTexto}>{r.contenido}</p>
                            </div>

                            {seleccionada?.id === r.id ? (
                                <form onSubmit={handleCorregir} style={styles.formulario}>
                                    <div style={styles.campo}>
                                        <label>Feedback</label>
                                        <textarea
                                            value={form.feedback}
                                            onChange={(e) => setForm({ ...form, feedback: e.target.value })}
                                            style={styles.input}
                                            rows={4}
                                            placeholder="Escribe tu corrección aquí..."
                                            required
                                        />
                                    </div>
                                    <div style={styles.campo}>
                                        <label>Puntuación (0-10)</label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="10"
                                            value={form.puntuacion}
                                            onChange={(e) => setForm({ ...form, puntuacion: e.target.value })}
                                            style={{ ...styles.input, width: '100px' }}
                                            required
                                        />
                                    </div>
                                    <div style={styles.botonesFormulario}>
                                        <button type="submit" style={styles.botonGuardar}>Guardar corrección</button>
                                        <button type="button" onClick={() => setSeleccionada(null)} style={styles.botonCancelar}>Cancelar</button>
                                    </div>
                                </form>
                            ) : (
                                <button onClick={() => setSeleccionada(r)} style={styles.botonCorregir}>
                                    Corregir →
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    titulo: { color: '#1f2937', marginBottom: '1.5rem' },
    mensaje: { padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1rem', fontWeight: '600' },
    vacio: { color: '#6b7280', padding: '2rem', background: '#f9fafb', borderRadius: '8px', textAlign: 'center' },
    lista: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    card: { background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' },
    cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' },
    cardTitulo: { margin: '0 0 0.25rem', color: '#1f2937' },
    cardMeta: { margin: 0, color: '#6b7280', fontSize: '0.9rem' },
    pendienteBadge: { padding: '0.2rem 0.75rem', background: '#fef3c7', color: '#92400e', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' },
    contenido: { background: '#f9fafb', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' },
    contenidoLabel: { margin: '0 0 0.5rem', fontWeight: '600', color: '#374151', fontSize: '0.9rem' },
    contenidoTexto: { margin: 0, color: '#374151', lineHeight: '1.6' },
    formulario: { borderTop: '1px solid #e5e7eb', paddingTop: '1rem' },
    campo: { marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' },
    input: { padding: '0.6rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem' },
    botonesFormulario: { display: 'flex', gap: '0.75rem' },
    botonGuardar: { padding: '0.6rem 1.25rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
    botonCancelar: { padding: '0.6rem 1.25rem', background: '#e5e7eb', color: '#374151', border: 'none', borderRadius: '8px', cursor: 'pointer' },
    botonCorregir: { padding: '0.6rem 1.25rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }
};

export default AdminRedacciones;