import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Lecciones from './pages/Lecciones';           
import LeccionDetalle from './pages/LeccionDetalle';
import Writing from './pages/Writing';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    } />
                    <Route path="/admin" element={
                        <AdminRoute>
                            <Admin />
                        </AdminRoute>
                    } />
                    <Route path="/lecciones" element={
                        <PrivateRoute>
                            <Lecciones />
                        </PrivateRoute>
                    } />                              
                    <Route path="/lecciones/:id" element={
                        <PrivateRoute>
                            <LeccionDetalle />
                        </PrivateRoute>
                    } />

                    <Route path="/writing" element={
                        <PrivateRoute>
                            <Writing />
                        </PrivateRoute>
                    } />                            
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;