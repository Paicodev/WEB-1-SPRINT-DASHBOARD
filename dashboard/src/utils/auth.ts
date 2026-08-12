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

/**
 * Helper para realizar llamadas a la API agregando automáticamente el token JWT
 * Si el backend responde 401 (token expirado), limpia la sesión y redirige al login.
 */
export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
    const token = getToken();
    const headers = new Headers(options.headers || {});

    // Adjuntar el token JWT en el encabezado Authorization
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(url, {
        ...options,
        headers
    });

    // Si el backend rechaza por token inválido o expirado, cerrar sesión
    if (response.status === 401 && !url.includes('/api/auth/login')) {
        logout();
        window.location.href = '/login';
    }

    return response;
}
