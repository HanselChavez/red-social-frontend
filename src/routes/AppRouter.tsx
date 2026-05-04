import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/auth/Login";
import Home from "@/pages/private/Home";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import Register from "@/pages/auth/Register";
import Verify from "@/pages/auth/Verify";
import MyPosts from "@/pages/private/MyPosts";
import Maintenance from "@/pages/public/Maintenance";
import NotFound from "@/pages/public/NotFound";
import Settings from "@/pages/private/Setting";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/verify" element={<Verify />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/my-posts" element={<MyPosts />} />
                        <Route path="/explore" element={<Maintenance />} />
                        <Route path="/messages" element={<Maintenance />} />

                        <Route
                            path="/notifications"
                            element={<Maintenance />}
                        />
                        <Route path="/profile" element={<Maintenance />} />
                        <Route path="/settings" element={<Settings />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
