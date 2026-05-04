import ThemeButton from "@/components/buttons/ThemeButton";
import { NavLink, Outlet } from "react-router-dom";
import LogoutButton from "../components/buttons/LogoutButton";
import { Link } from "react-router-dom";
import {
    House,
    Compass,
    MessageCircle,
    Bell,
    User,
    Settings,
    BookCheck,
} from "lucide-react";

// Mock data — reemplaza con datos reales de tu API/contexto
const suggestedUsers = [
    {
        id: 1,
        name: "Alex Turner",
        username: "@alexturner",
        avatar: "https://i.pravatar.cc/40?img=11",
    },
    {
        id: 2,
        name: "Lisa Ray",
        username: "@lisaray",
        avatar: "https://i.pravatar.cc/40?img=47",
    },
    {
        id: 3,
        name: "David Park",
        username: "@davidp",
        avatar: "https://i.pravatar.cc/40?img=53",
    },
];

const trending = [
    { tag: "#TechWeek2026", posts: "2K posts" },
    { tag: "#CampusLife", posts: "4K posts" },
    { tag: "#StudyTips", posts: "2K posts" },
    { tag: "#UniSports", posts: "7K posts" },
];
export default function MainLayout() {
    return (
        <div className="min-h-screen bg-background text-foreground flex">
            <aside className="w-64 h-screen sticky top-0 border-r border-border p-4 flex flex-col justify-between">
                <div>
                    <h1 className="text-2xl font-bold mb-8">UniConnect</h1>

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
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 rounded-xl transition ${isActive
                                    ? "bg-yellow-500 text-black font-semibold"
                                    : "hover:bg-muted"
                                }`
                            }
                        >
                            <Bell size={20} />
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

            <main className="flex-1 min-h-screen bg-background text-foreground p-4">
                <Outlet />
            </main>

            <aside className="w-72 h-screen sticky top-0 border-l border-border p-4 space-y-6 overflow-y-auto">
                <div className="bg-muted/40 rounded-2xl p-4">
                    <h2 className="text-base font-bold mb-4">
                        Sugerido para ti
                    </h2>
                    <div className="space-y-4">
                        {suggestedUsers.map((user) => (
                            <div
                                key={user.id}
                                className="flex items-center justify-between gap-2"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                                    />
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold leading-tight truncate">
                                            {user.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {user.username}
                                        </p>
                                    </div>
                                </div>
                                <button className="text-sm font-semibold px-3 py-1.5 rounded-full border border-border hover:bg-muted transition flex-shrink-0">
                                    Seguir
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-muted/40 rounded-2xl p-4">
                    <h2 className="text-base font-bold mb-4">Tendencia</h2>
                    <div className="space-y-4">
                        {trending.map((item) => (
                            <div
                                key={item.tag}
                                className="cursor-pointer group"
                            >
                                <p className="text-sm font-bold text-yellow-400 group-hover:underline">
                                    {item.tag}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {item.posts}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>

            <div className="fixed bottom-6 right-6 z-[9999]">
                <ThemeButton />
            </div>
        </div>
    );
}
