import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);
        setError('');
        try {
            const res = await api.post('/auth/login', { email, password });
            login(res.data.token, res.data.usuario);
            if (res.data.usuario.rol === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Error al iniciar sesión');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.wrapper}>

                {/* PANEL IZQUIERDO — LOGIN */}
                <div style={styles.panelLogin}>
                    <h1 style={styles.logo}>🗣️ HablaYa!</h1>
                    <h2 style={styles.titulo}>Iniciar sesión</h2>
                    <p style={styles.subtitulo}>Bienvenido de nuevo · Welcome back</p>
                    {error && <p style={styles.error}>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div style={styles.campo}>
                            <label style={styles.label}>Correo electrónico</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={styles.input}
                                placeholder="tu@email.com"
                                required
                            />
                        </div>
                        <div style={styles.campo}>
                            <label style={styles.label}>Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={styles.input}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <button type="submit" style={styles.botonLogin} disabled={cargando}>
                            {cargando ? 'Entrando...' : 'Iniciar sesión'}
                        </button>
                    </form>
                </div>

                {/* DIVISOR */}
                <div style={styles.divisor}>
                    <div style={styles.divisorLinea} />
                    <span style={styles.divisorTexto}>o</span>
                    <div style={styles.divisorLinea} />
                </div>

                {/* PANEL DERECHO — REGISTRO */}
                <div style={styles.panelRegistro}>
                    <div style={styles.registroIcono}>✨</div>
                    <h2 style={styles.registroTitulo}>¿Nuevo por aquí?</h2>
                    <p style={styles.registroSubtitulo}>New here? · Create your account</p>
                    <p style={styles.registroDesc}>
                        Crea tu cuenta gratis y empieza a aprender español con Alodía hoy mismo.
                    </p>
                    <p style={styles.registroDescEn}>
                        Create your free account and start learning Spanish with Alodía today.
                    </p>
                    <ul style={styles.beneficios}>
                        <li>✅ Acceso a lecciones interactivas</li>
                        <li>✅ Seguimiento de tu progreso</li>
                        <li>✅ Reserva tutorías con la profesora</li>
                        <li>✅ Envía redacciones para corrección</li>
                    </ul>
                    <Link to="/register" style={styles.botonRegistro}>
                        Crear cuenta nueva · Create account
                    </Link>
                </div>

            </div>
        </div>
    );
};

const styles = {
    page: { minHeight: '100vh', background: 'linear-gradient(135deg, #f0f4f8 0%, #e8e4ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' },
    wrapper: { display: 'flex', alignItems: 'stretch', background: 'white', borderRadius: '20px', boxShadow: '0 8px 40px rgba(0,0,0,0.12)', overflow: 'hidden', width: '100%', maxWidth: '860px' },
    panelLogin: { flex: 1, padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
    logo: { textAlign: 'center', color: '#4f46e5', marginBottom: '0.25rem', fontSize: '1.8rem' },
    titulo: { textAlign: 'center', color: '#1f2937', marginBottom: '0.25rem', fontSize: '1.5rem' },
    subtitulo: { textAlign: 'center', color: '#6b7280', fontStyle: 'italic', marginBottom: '1.5rem', fontSize: '0.9rem' },
    error: { background: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' },
    campo: { marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' },
    label: { fontSize: '0.9rem', fontWeight: '600', color: '#374151' },
    input: { padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem', outline: 'none' },
    botonLogin: { width: '100%', padding: '0.85rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', marginTop: '0.5rem' },
    divisor: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 1rem', gap: '0.5rem' },
    divisorLinea: { width: '1px', flex: 1, background: '#e5e7eb' },
    divisorTexto: { color: '#9ca3af', fontSize: '0.85rem', fontWeight: '500' },
    panelRegistro: { flex: 1, padding: '3rem 2.5rem', background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.75rem' },
    registroIcono: { fontSize: '2.5rem' },
    registroTitulo: { fontSize: '1.5rem', fontWeight: '700', margin: 0 },
    registroSubtitulo: { opacity: 0.8, fontStyle: 'italic', margin: 0, fontSize: '0.9rem' },
    registroDesc: { margin: 0, lineHeight: '1.6', fontSize: '0.95rem' },
    registroDescEn: { margin: 0, opacity: 0.8, fontStyle: 'italic', fontSize: '0.85rem' },
    beneficios: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem' },
    botonRegistro: { display: 'block', textAlign: 'center', padding: '0.85rem', background: 'white', color: '#4f46e5', borderRadius: '8px', fontWeight: '700', fontSize: '0.95rem', textDecoration: 'none', marginTop: '0.5rem' },
};

export default Login;
