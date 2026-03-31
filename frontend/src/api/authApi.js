const API_BASE_URL = "http://localhost:3000/api"

// Requête permettant de faire appel à la route backend /login
export async function loginUser(credentials) {
    const response = await fetch((`${API_BASE_URL}/auth/login`), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(credentials)
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Une erreur est survenue lors de la connexion")
    }

    return data
}

// Requête permettant de faire appel à la route backend /refresh (génération d'un nouvel access token)
export async function refreshSession() {
        const response = await fetch((`${API_BASE_URL}/auth/refresh`), {
        method: "POST",
        credentials: "include",
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error("Session expirée")
    }

    return data
}

// Requête permettant de faire appel à la route backend /register
export async function registerUser(credentials) {
    const response = await fetch((`${API_BASE_URL}/auth/register`), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Une erreur est survenue lors de l'inscription.")
    }

    return data
}

// Requête permettant de faire appel à la route backend /logout
export async function logoutUser() {
    await fetch((`${API_BASE_URL}/auth/logout`), {
        method: "POST",
        credentials: "include",
    })
}

// Requête permettant de récupérer les informations utilisateurs en passant par l'access token
export async function getMe(accessToken) {
    const response = await fetch((`${API_BASE_URL}/user/me`), {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error("Impossible de récupérer l'utilisateur")
    }

    return data
}

// Requête permettant de réaliser l'update des données username et email de l'utilisateur connecté
export async function updateProfile(accessToken, credentials) {
    const response = await fetch((`${API_BASE_URL}/user/me`), {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        },
        credentials: "include",
        body: JSON.stringify(credentials)
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Une erreur est survenue lors de la mise à jour des données.")
    }

    return data
}