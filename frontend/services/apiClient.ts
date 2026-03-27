const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = async (endpoint: string, options = {}) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        credentials: "include",
        ...options,
    });

    if (res.status === 401) {
        try {
            const refreshRes = await fetch(`${BASE_URL}/auth/accessToken`, {
                method: "POST",
                credentials: "include",
            });

            if (refreshRes.ok) {
                return fetch(`${BASE_URL}${endpoint}`, {
                    credentials: "include",
                    ...options,
                }).then(r => r.json());
            } else {
                window.location.href = "/login";
                return;
            }
        } catch (err) {
            window.location.href = "/login";
            return;
        }
    }

    if (!res.ok) {
        throw new Error("API request failed");
    }

    return res.json();
};