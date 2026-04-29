import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/auth/Login";
import Home from "@/pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import Register from "@/pages/auth/Register";
import Verify from "@/pages/auth/Verify";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/verify" element={<Verify />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
