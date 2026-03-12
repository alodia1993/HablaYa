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
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.titulo}>🗣️ HablaYa!</h1>
                <h2 style={styles.subtitulo}>Iniciar sesión</h2>
                {error && <p style={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div style={styles.campo}>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.campo}>
                        <label>Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>
                    <button type="submit" style={styles.boton} disabled={cargando}>
                        {cargando ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
                <p style={styles.link}>
                    ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f4f8' },
    card: { background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' },
    titulo: { textAlign: 'center', color: '#4f46e5', marginBottom: '0.5rem' },
    subtitulo: { textAlign: 'center', color: '#374151', marginBottom: '1.5rem' },
    error: { background: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem' },
    campo: { marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' },
    input: { padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem' },
    boton: { width: '100%', padding: '0.75rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer', marginTop: '0.5rem' },
    link: { textAlign: 'center', marginTop: '1rem', color: '#6b7280' }
};

export default Login;