import { apiClient } from "./apiClient";

export const register = (data: any) => {
    return apiClient("/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};

export const login = (data: any) => {
    return apiClient("/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};