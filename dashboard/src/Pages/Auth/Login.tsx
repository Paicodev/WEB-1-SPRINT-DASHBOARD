import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken, setUser } from '../../utils/auth';
import './Login.css';

export default function Login() {
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');

        if (!email.trim() || !password.trim()) {
            setErrorMsg('Por favor completa todos los campos.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok && data.token) {
                // Guardamos el token y datos del usuario en localStorage
                setToken(data.token);
                if (data.user) {
                    setUser(data.user);
                }
                // Redirigimos al panel principal
                navigate('/', { replace: true });
            } else {
                setErrorMsg(data.error || 'Credenciales inválidas.');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setErrorMsg('Error de conexión con el servidor.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page-container">
            <div className="login-card">
                <img src="/img/Negratone2.png" alt="Negratone Logo" className="login-logo" />

                <div className="login-header">
                    <h2>Panel de Administración</h2>
                    <p>Ingresa tus credenciales para acceder al Dashboard</p>
                </div>

                {errorMsg && (
                    <div className="login-error-alert">
                        <span>⚠️</span>
                        <span>{errorMsg}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="login-form-group">
                        <label htmlFor="login-email">Correo Electrónico</label>
                        <input
                            id="login-email"
                            type="email"
                            placeholder="admin@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoFocus
                        />
                    </div>

                    <div className="login-form-group">
                        <label htmlFor="login-password">Contraseña</label>
                        <input
                            id="login-password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-login-submit" disabled={isLoading}>
                        {isLoading ? 'Iniciando sesión...' : 'Ingresar al Panel'}
                    </button>
                </form>

                <div className="login-footer-hint">
                    Protegido con autenticación JWT &copy; Negratone
                </div>
            </div>
        </div>
    );
}
