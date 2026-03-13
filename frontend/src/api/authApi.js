const API_BASE_URL = "http://localhost:3000/api"

export default async function loginUser(credentials) {
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