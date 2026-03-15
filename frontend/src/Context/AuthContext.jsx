import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, refreshSession, logoutUser, getMe } from "../api/authApi";

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [accessToken, setAccessToken] = useState(null)

    const [isAuthLoading, setIsAuthLoading] = useState(true)

    // On vérifie les valeurs booléenne de nos variables => Valeurs dérivées
    // Si user et accessToken sont "true" alors isAuthenticated est "true"
    // Equivalence - const isAuthenticated = Boolean(user) && Boolean(accessToken)
    const isAuthenticated = !!user && !!accessToken

    // Fonction de connexion
    const login = async (credentials) => {
        // On centralise également l'appel API
        const data = await loginUser(credentials)
        /**
        * On met à jour les variables d'états de notre contexte d'authentification
        * Avec les valeurs récupéréw depuis le backend
        */
        setAccessToken(data.accessToken)
        setUser(data.user)

        return data
    }

    // Fonction de déconnexion
    const logout = async () => {
        try {
            await logoutUser()
        } catch (error) {
            console.error(error)
        } finally {
            setUser(null)
            setAccessToken(null)
        }
    }

    useEffect(() => {
        const restoreSession = async () => {
            try {
                const refreshData = await refreshSession()
                const newAccessToken = refreshData.accessToken

                setAccessToken(newAccessToken)
                
                const myData = await getMe(newAccessToken)
                setUser(myData)
            } catch (error) {
                setUser(null)
                setAccessToken(null)
            } finally {
                setIsAuthLoading(false)
            }   
        }

        restoreSession()
    }, [])
    
    const value = {
        user,
        accessToken,
        isAuthenticated,
        isAuthLoading,
        login,
        logout
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