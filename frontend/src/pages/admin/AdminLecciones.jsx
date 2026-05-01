import { useState, useEffect } from 'react';
import api from '../../services/api';

const AdminLecciones = () => {
    const [lecciones, setLecciones] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [leccionEditando, setLeccionEditando] = useState(null);
    const [form, setForm] = useState({ titulo: '', descripcion: '', nivel: 'A1', orden: '' });
    const [mensaje, setMensaje] = useState('');

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

    useEffect(() => { cargarLecciones(); }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (leccionEditando) {
                await api.put(`/lecciones/${leccionEditando.id}`, form);
                setMensaje('✅ Lección actualizada correctamente');
            } else {
                await api.post('/lecciones', form);
                setMensaje('✅ Lección creada correctamente');
            }
            setForm({ titulo: '', descripcion: '', nivel: 'A1', orden: '' });
            setMostrarFormulario(false);
            setLeccionEditando(null);
            cargarLecciones();
        } catch (error) {
            setMensaje('❌ Error al guardar la lección');
        }
    };

    const handleEditar = (leccion) => {
        setLeccionEditando(leccion);
        setForm({ titulo: leccion.titulo, descripcion: leccion.descripcion, nivel: leccion.nivel, orden: leccion.orden });
        setMostrarFormulario(true);
    };

    const handleEliminar = async (id) => {
        if (!window.confirm('¿Seguro que quieres eliminar esta lección?')) return;
        try {
            await api.delete(`/lecciones/${id}`);
            setMensaje('✅ Lección eliminada correctamente');
            cargarLecciones();
        } catch (error) {
            setMensaje('❌ Error al eliminar la lección');
        }
    };

    if (cargando) return <p>Cargando...</p>;

    return (
        <div>
            <div style={styles.header}>
                <h2 style={styles.titulo}>📚 Gestión de Lecciones</h2>
                <button onClick={() => { setMostrarFormulario(!mostrarFormulario); setLeccionEditando(null); setForm({ titulo: '', descripcion: '', nivel: 'A1', orden: '' }); }} style={styles.botonNuevo}>
                    {mostrarFormulario ? 'Cancelar' : '+ Nueva lección'}
                </button>
            </div>

            {mensaje && <div style={{ ...styles.mensaje, background: mensaje.includes('✅') ? '#d1fae5' : '#fee2e2', color: mensaje.includes('✅') ? '#065f46' : '#991b1b' }}>{mensaje}</div>}

            {mostrarFormulario && (
                <div style={styles.formulario}>
                    <h3>{leccionEditando ? 'Editar lección' : 'Nueva lección'}</h3>
                    <form onSubmit={handleSubmit}>
                        <div style={styles.campo}>
                            <label>Título</label>
                            <input name="titulo" value={form.titulo} onChange={handleChange} style={styles.input} required />
                        </div>
                        <div style={styles.campo}>
                            <label>Descripción</label>
                            <textarea name="descripcion" value={form.descripcion} onChange={handleChange} style={styles.input} rows={3} />
                        </div>
                        <div style={styles.fila}>
                            <div style={styles.campo}>
                                <label>Nivel</label>
                                <select name="nivel" value={form.nivel} onChange={handleChange} style={styles.input}>
                                    <option>A1</option>
                                    <option>A2</option>
                                    <option>B1</option>
                                    <option>B2</option>
                                </select>
                            </div>
                            <div style={styles.campo}>
                                <label>Orden</label>
                                <input name="orden" type="number" value={form.orden} onChange={handleChange} style={styles.input} required />
                            </div>
                        </div>
                        <button type="submit" style={styles.botonGuardar}>
                            {leccionEditando ? 'Guardar cambios' : 'Crear lección'}
                        </button>
                    </form>
                </div>
            )}

            <div style={styles.lista}>
                {lecciones.map(leccion => (
                    <div key={leccion.id} style={styles.card}>
                        <div style={styles.cardInfo}>
                            <span style={{ ...styles.nivelBadge, background: coloresNivel[leccion.nivel] }}>{leccion.nivel}</span>
                            <h3 style={styles.cardTitulo}>{leccion.titulo}</h3>
                            <p style={styles.cardDesc}>{leccion.descripcion}</p>
                        </div>
                        <div style={styles.acciones}>
                            <button onClick={() => handleEditar(leccion)} style={styles.botonEditar}>Editar</button>
                            <button onClick={() => handleEliminar(leccion.id)} style={styles.botonEliminar}>Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const coloresNivel = { A1: '#10b981', A2: '#3b82f6', B1: '#f59e0b', B2: '#ef4444' };

const styles = {
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
    titulo: { color: '#1f2937', margin: 0 },
    botonNuevo: { padding: '0.6rem 1.25rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
    mensaje: { padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1rem', fontWeight: '600' },
    formulario: { background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', marginBottom: '1.5rem' },
    campo: { marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 },
    fila: { display: 'flex', gap: '1rem' },
    input: { padding: '0.6rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem' },
    botonGuardar: { padding: '0.6rem 1.5rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
    lista: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    card: { background: 'white', padding: '1.25rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    cardInfo: { flex: 1 },
    nivelBadge: { display: 'inline-block', padding: '0.2rem 0.75rem', borderRadius: '20px', color: 'white', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem' },
    cardTitulo: { margin: '0 0 0.25rem', color: '#1f2937' },
    cardDesc: { margin: 0, color: '#6b7280', fontSize: '0.9rem' },
    acciones: { display: 'flex', gap: '0.5rem' },
    botonEditar: { padding: '0.4rem 0.9rem', background: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
    botonEliminar: { padding: '0.4rem 0.9rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }
};

export default AdminLecciones;