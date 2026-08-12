/**
 * Utilidades sencillas de autenticación basadas en localStorage
 */

export interface AuthUser {
    id: number;
    name: string;
    email: string;
}

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

// Obtener el token JWT guardado
export function getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
}

// Guardar el token JWT
export function setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
}

// Obtener los datos del usuario guardados
export function getUser(): AuthUser | null {
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;
    try {
        return JSON.parse(userStr) as AuthUser;
    } catch {
        return null;
    }
}

// Guardar los datos del usuario
export function setUser(user: AuthUser): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// Eliminar sesión (Logout)
export function logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}

// Comprobar si el usuario tiene sesión activa
export function isAuthenticated(): boolean {
    return Boolean(localStorage.getItem(TOKEN_KEY));
}
