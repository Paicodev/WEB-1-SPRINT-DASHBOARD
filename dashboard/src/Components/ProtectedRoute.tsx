import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

interface ProtectedRouteProps {
    children: ReactNode;
}

/**
 * Componente que protege las rutas del Dashboard.
 * Si no hay token de autenticación, redirige al usuario a /login.
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}
