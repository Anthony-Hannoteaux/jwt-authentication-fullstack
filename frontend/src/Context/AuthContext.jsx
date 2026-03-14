import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [accessToken, setAccessToken] = useState(null)

    // On vérifie les valeurs booléenne de nos variables
    // Si user et accessToken sont "true" alors isAuthenticated est "true"
    // Equivalence - const isAuthenticated = Boolean(user) && Boolean(accessToken)
    const isAuthenticated = !!user && !!accessToken

    const value = {
        user,
        accessToken,
        isAuthenticated,
        setUser,
        setAccessToken
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}