import ThemeButton from "@/components/buttons/ThemeButton";
import { NavLink, Outlet } from "react-router-dom";
import LogoutButton from "../components/buttons/LogoutButton";
import {
    House,
    Compass,
    MessageCircle,
    Bell,
    User,
    Settings,
    BookCheck,
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { useEffect, useState } from "react";
import { getReceivedFriendRequestsRequest } from "@/api/user.api";
import { getMyNotificationsRequest } from "@/api/notification.api";
import UserSearch from "@/components/search/UserSearch";
import RightSidebar from "@/components/layout/RightSidebar";


export default function MainLayout() {
    const { user } = useAuthStore();
    const [notificationCount, setNotificationCount] = useState(0);

    const fullName =
        `${user?.profile?.firstName || ""} ${user?.profile?.lastName || ""}`.trim() ||
        "Estudiante";

    const username = user?.profile?.username || "usuario";

    const fetchNotificationCount = async () => {
        try {
            const [friendRequests, notifications] = await Promise.all([
                getReceivedFriendRequestsRequest(),
                getMyNotificationsRequest(),
            ]);

            const unreadNotifications = notifications.filter(
                (notification: any) => !notification.isRead,
            ).length;

            const pendingRequests = friendRequests.length;

            setNotificationCount(unreadNotifications + pendingRequests);
        } catch (error) {
            console.error("Error cargando contador de notificaciones", error);
        }
    };

    useEffect(() => {
        fetchNotificationCount();

        const interval = setInterval(() => {
            fetchNotificationCount();
        }, 15000);

        return () => clearInterval(interval);
    }, []);

    const notificationLabel =
        notificationCount > 9 ? "9+" : String(notificationCount);

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            <aside className="w-64 md:w-xs lg:w-25rem h-screen sticky top-0 border-r border-border p-4 flex flex-col justify-between">
                <div>
                    <div className="mb-8">
                        <NavLink
                            to="/home"
                            className="text-2xl font-bold hover:text-yellow-400 transition inline-block"
                        >
                            UniConnect
                        </NavLink>

                        <div className="mt-4 rounded-2xl bg-muted/50 border border-border px-4 py-3">
                            <p className="text-xs text-muted-foreground">
                                ¡Bienvenido!
                            </p>

                            <p className="text-sm font-semibold text-yellow-400 truncate">
                                {fullName}
                            </p>

                            <p className="text-xs text-muted-foreground truncate">
                                @{username}
                            </p>
                        </div>
                    </div>

                    <nav className="space-y-2">
                        <NavLink
                            to="/home"
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 rounded-xl transition ${isActive
                                    ? "bg-yellow-500 text-black font-semibold"
                                    : "hover:bg-muted"
                                }`
                            }
                        >
                            <House size={20} />
                            Inicio
                        </NavLink>

                        <NavLink
                            to="/my-posts"
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 rounded-xl transition ${isActive
                                    ? "bg-yellow-500 text-black font-semibold"
                                    : "hover:bg-muted"
                                }`
                            }
                        >
                            <BookCheck size={20} />
                            Mis Publicaciones
                        </NavLink>

                        <NavLink
                            to="/explore"
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 rounded-xl transition ${isActive
                                    ? "bg-yellow-500 text-black font-semibold"
                                    : "hover:bg-muted"
                                }`
                            }
                        >
                            <Compass size={20} />
                            Explorar
                        </NavLink>

                        <NavLink
                            to="/messages"
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 rounded-xl transition ${isActive
                                    ? "bg-yellow-500 text-black font-semibold"
                                    : "hover:bg-muted"
                                }`
                            }
                        >
                            <MessageCircle size={20} />
                            Mensajes
                        </NavLink>

                        <NavLink
                            to="/notifications"
                            onClick={() => setTimeout(fetchNotificationCount, 500)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 rounded-xl transition relative ${isActive
                                    ? "bg-yellow-500 text-black font-semibold"
                                    : "hover:bg-muted"
                                }`
                            }
                        >
                            <div className="relative">
                                <Bell size={20} />

                                {notificationCount > 0 && (
                                    <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center border border-background">
                                        {notificationLabel}
                                    </span>
                                )}
                            </div>

                            Notificaciones
                        </NavLink>

                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 rounded-xl transition ${isActive
                                    ? "bg-yellow-500 text-black font-semibold"
                                    : "hover:bg-muted"
                                }`
                            }
                        >
                            <User size={20} />
                            Perfil
                        </NavLink>

                        <NavLink
                            to="/settings"
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 rounded-xl transition ${isActive
                                    ? "bg-yellow-500 text-black font-semibold"
                                    : "hover:bg-muted"
                                }`
                            }
                        >
                            <Settings size={20} />
                            Ajustes
                        </NavLink>
                    </nav>
                </div>

                <div className="mt-6">
                    <LogoutButton />
                </div>
            </aside>

            <main className="flex-1 min-h-screen w-full bg-background text-foreground p-4">
                <UserSearch />
                <Outlet />
            </main>

            <RightSidebar />

            <div className="fixed bottom-6 right-6 z-999">
                <ThemeButton />
            </div>
        </div>
    );
}
