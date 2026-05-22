import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/auth/Login";
import Home from "@/pages/private/Home";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import Register from "@/pages/auth/Register";
import Verify from "@/pages/auth/Verify";
import MyPosts from "@/pages/private/MyPosts";
import Messages from "@/pages/private/Messages";
import Maintenance from "@/pages/public/Maintenance";
import NotFound from "@/pages/public/NotFound";
import Settings from "@/pages/private/Setting";
import Profile from "@/pages/private/Profile";
import UserProfile from "@/pages/private/UserProfile";
import Notifications from "@/pages/private/Notifications";
import Explore from "@/pages/private/Explore";

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
                        <Route path="/explore" element={<Explore />} />
                        <Route path="/messages" element={<Messages />} />

                        <Route path="/notifications" element={<Notifications />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/users/:id" element={<UserProfile />} />
                        <Route path="/settings" element={<Settings />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
