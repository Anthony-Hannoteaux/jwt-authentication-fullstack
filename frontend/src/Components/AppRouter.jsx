import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/ProfilePage";
import NotFoundPage from "../pages/NotFoundPage";
import SettingsPage from "../pages/SettingsPage";
import ChangePasswordPage from "../pages/ChangePasswordPage";


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