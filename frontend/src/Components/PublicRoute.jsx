import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function PublicRoute() {
    const { isAuthenticated, isAuthLoading } = useAuth()

    if (isAuthLoading) {
        return <p>Chargement...</p>
    }

    if (isAuthenticated) {
        return <Navigate to="/profile" replace />
    }

    return <Outlet />
}   