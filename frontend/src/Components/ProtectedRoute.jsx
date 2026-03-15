import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function ProtectedRoute() {
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) {
        return <Navigate to="/login" replace/>
    }

    /**
     * Outlet nous permettra d'englober un "groupement" de routes
     * Au lieu d'englober chaque page une par une
     */
    return <Outlet />
}