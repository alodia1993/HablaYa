import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        pais: '',
        ciudad: '',
        codigoPostal: '',
    });
    const [terminos, setTerminos] = useState(false);
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!terminos) {
            setError('Debes aceptar los términos y condiciones para continuar.');
            return;
        }
        setCargando(true);
        setError('');
        try {
            await api.post('/auth/register', {
                nombre: `${form.nombre} ${form.apellido}`.trim(),
                email: form.email,
                password: form.password,
                rol: 'alumno'
            });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Error al registrarse');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h1 style={styles.logo}>🗣️ HablaYa!</h1>
                <h2 style={styles.titulo}>Crear cuenta nueva</h2>
                <p style={styles.subtitulo}>Create your free account · Crea tu cuenta gratis</p>

                {error && <p style={styles.error}>{error}</p>}

                <form onSubmit={handleSubmit}>
                    {/* Nombre y apellido */}
                    <div style={styles.fila}>
                        <div style={styles.campo}>
                            <label style={styles.label}>Nombre *</label>
                            <input
                                type="text"
                                name="nombre"
                                value={form.nombre}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="Ana"
                                required
                            />
                        </div>
                        <div style={styles.campo}>
                            <label style={styles.label}>Apellido *</label>
                            <input
                                type="text"
                                name="apellido"
                                value={form.apellido}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="García"
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div style={styles.campoFull}>
                        <label style={styles.label}>Correo electrónico *</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="tu@email.com"
                            required
                        />
                    </div>

                    {/* Contraseña */}
                    <div style={styles.campoFull}>
                        <label style={styles.label}>Contraseña *</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="Mínimo 6 caracteres"
                            required
                        />
                    </div>

                    {/* País y ciudad */}
                    <div style={styles.fila}>
                        <div style={styles.campo}>
                            <label style={styles.label}>País</label>
                            <input
                                type="text"
                                name="pais"
                                value={form.pais}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="España"
                            />
                        </div>
                        <div style={styles.campo}>
                            <label style={styles.label}>Ciudad</label>
                            <input
                                type="text"
                                name="ciudad"
                                value={form.ciudad}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="Madrid"
                            />
                        </div>
                    </div>

                    {/* Código postal */}
                    <div style={styles.campoFull}>
                        <label style={styles.label}>Código postal</label>
                        <input
                            type="text"
                            name="codigoPostal"
                            value={form.codigoPostal}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="28001"
                        />
                    </div>

                    {/* Términos y condiciones */}
                    <div style={styles.terminosWrapper}>
                        <input
                            type="checkbox"
                            id="terminos"
                            checked={terminos}
                            onChange={(e) => setTerminos(e.target.checked)}
                            style={styles.checkbox}
                        />
                        <label htmlFor="terminos" style={styles.terminosLabel}>
                            He leído y acepto los <span style={styles.terminosLink}>términos y condiciones</span> y la <span style={styles.terminosLink}>política de privacidad</span> *
                        </label>
                    </div>

                    <button type="submit" style={styles.boton} disabled={cargando}>
                        {cargando ? 'Creando cuenta...' : 'Crear cuenta · Create account'}
                    </button>
                </form>

                <p style={styles.linkLogin}>
                    ¿Ya tienes cuenta? <Link to="/login" style={styles.link}>Inicia sesión</Link>
                </p>
            </div>
        </div>
    );
};

const styles = {
    page: { minHeight: '100vh', background: 'linear-gradient(135deg, #f0f4f8 0%, #e8e4ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' },
    card: { background: 'white', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 8px 40px rgba(0,0,0,0.12)', width: '100%', maxWidth: '560px' },
    logo: { textAlign: 'center', color: '#4f46e5', marginBottom: '0.25rem', fontSize: '1.8rem' },
    titulo: { textAlign: 'center', color: '#1f2937', marginBottom: '0.25rem', fontSize: '1.5rem' },
    subtitulo: { textAlign: 'center', color: '#6b7280', fontStyle: 'italic', marginBottom: '1.5rem', fontSize: '0.9rem' },
    error: { background: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' },
    fila: { display: 'flex', gap: '1rem', marginBottom: '1rem' },
    campo: { flex: 1, display: 'flex', flexDirection: 'column', gap: '0.35rem' },
    campoFull: { marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' },
    label: { fontSize: '0.9rem', fontWeight: '600', color: '#374151' },
    input: { padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem', width: '100%' },
    terminosWrapper: { display: 'flex', alignItems: 'flex-start', gap: '0.75rem', margin: '1rem 0' },
    checkbox: { marginTop: '0.2rem', width: '16px', height: '16px', flexShrink: 0, cursor: 'pointer' },
    terminosLabel: { fontSize: '0.88rem', color: '#374151', lineHeight: '1.5', cursor: 'pointer' },
    terminosLink: { color: '#4f46e5', fontWeight: '600' },
    boton: { width: '100%', padding: '0.85rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', marginTop: '0.5rem' },
    linkLogin: { textAlign: 'center', marginTop: '1.25rem', color: '#6b7280', fontSize: '0.9rem' },
    link: { color: '#4f46e5', fontWeight: '600', textDecoration: 'none' },
};

export default Register;
