export const baseQuery = async <T>(
    endpoint: string,
    data: Record<string, unknown> = {},
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET'
): Promise<T> => {
    const token = localStorage.getItem('auth-token');

    const options: RequestInit = {
        method,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    if (['POST', 'PUT', 'PATCH'].includes(method)) {
        options.body = JSON.stringify(data);
    } else if (method === 'GET' && Object.keys(data).length > 0) {
        endpoint = generateUrlWithQueryParams(endpoint, data);
    }
    
    try {
        const response = await fetch(import.meta.env.VITE_API_URL + endpoint, options);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    } catch (error) {
        throw error;
    }
}

export const generateUrlWithQueryParams = (endpoint: string, data: Record<string, unknown>) => {
    const url = new URL(endpoint, import.meta.env.VITE_API_URL);
    
    Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            // Gérer les tableaux avec la notation []
            value.forEach(item => {
                url.searchParams.append(`${key}[]`, String(item));
            });
        } else if (value !== null && value !== undefined) {
            // Gérer les valeurs simples
            url.searchParams.append(key, String(value));
        }
    });
    
    return url.pathname + url.search;
}
