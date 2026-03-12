import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
// import RegisterPage from "../pages/RegisterPage";
// import ProfilePage from "../pages/ProfilePage";
// import NotFoundPage from "../pages/NotFoundPage";


export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />}/>
            {/* <Route path="/register" element={<RegisterPage />}/>
            <Route path="/profile" element={<ProfilePage />}/>
            <Route path="*" element={<NotFoundPage />}/> */}
        </Routes>
    )
}