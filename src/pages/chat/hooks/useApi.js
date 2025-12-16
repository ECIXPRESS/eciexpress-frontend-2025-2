import { useState } from 'react';
import { toast } from 'react-toastify';
export const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // Cambiar esta URL cuando conectes al API Gateway real
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081';
    const getAuthHeaders = () => {
        // Aquí obtendrías el token de autenticación si lo necesitas
        const token = localStorage.getItem('authToken');
        return {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        };
    };
    const get = async (endpoint) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'GET',
                headers: getAuthHeaders()
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            setError(errorMessage);
            toast.error(`Error: ${errorMessage}`);
            throw err;
        }
        finally {
            setLoading(false);
        }
    };
    const post = async (endpoint, body) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(body)
            });
            if (!response.ok) {
                throw new Error(`HTTP error!  status: ${response.status}`);
            }
            // Algunas peticiones POST no devuelven contenido (void)
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }
            return {};
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            setError(errorMessage);
            toast.error(`Error: ${errorMessage}`);
            throw err;
        }
        finally {
            setLoading(false);
        }
    };
    const del = async (endpoint, body) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'DELETE',
                headers: getAuthHeaders(),
                ...(body && { body: JSON.stringify(body) })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Algunas peticiones DELETE no devuelven contenido
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }
            return {};
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            setError(errorMessage);
            toast.error(`Error: ${errorMessage}`);
            throw err;
        }
        finally {
            setLoading(false);
        }
    };
    return {
        get,
        post,
        del,
        loading,
        error
    };
};
