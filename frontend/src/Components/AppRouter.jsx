import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import ProfilePage from "../Pages/ProfilePage";
import NotFoundPage from "../Pages/NotFoundPage";
import SettingsPage from "../Pages/SettingsPage";
import ChangePasswordPage from "../Pages/ChangePasswordPage";


export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route element={<PublicRoute />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/settings/password" element={<ChangePasswordPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}