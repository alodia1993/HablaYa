import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [token, setToken] = useState(null);
    const [cargando, setCargando] = useState(true);

    // Al cargar la app, leer token guardado
    useEffect(() => {
        const tokenGuardado = localStorage.getItem('token');
        const usuarioGuardado = localStorage.getItem('usuario');
        if (tokenGuardado && usuarioGuardado) {
            setToken(tokenGuardado);
            setUsuario(JSON.parse(usuarioGuardado));
        }
        setCargando(false);
    }, []);

    const login = (tokenNuevo, usuarioNuevo) => {
        localStorage.setItem('token', tokenNuevo);
        localStorage.setItem('usuario', JSON.stringify(usuarioNuevo));
        setToken(tokenNuevo);
        setUsuario(usuarioNuevo);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        setToken(null);
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value={{ usuario, token, login, logout, cargando }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);