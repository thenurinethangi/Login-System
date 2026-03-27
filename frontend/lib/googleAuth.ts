export const googleOAuthConfig = {
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
    projectId: process.env.NEXT_PUBLIC_GOOGLE_PROJECT_ID || "",
    authUri: "https://accounts.google.com/o/oauth2/auth",
    tokenUri: "https://oauth2.googleapis.com/token",
    clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "",
    redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || "http://localhost:3000/api/auth/google/callback",
    javascriptOrigins: [process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"],
};

export const initializeGoogleSignIn = async () => {
    if (typeof window !== "undefined" && !window.google) {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        return new Promise((resolve) => {
            script.onload = () => {
                resolve(window.google);
            };
        });
    }
    return window.google;
};

export const handleGoogleSignInResponse = async (response: any, mode: "signin" | "signup") => {
    try {
        const res = await fetch("http://localhost:8080/api/auth/google/callback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                token: response.credential,
                mode: mode,
            }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to authenticate with Google");
        }

        const data = await res.json();
        return data;
    } catch (error: any) {
        console.error("Google authentication error:", error.message);
        throw error;
    }
};
