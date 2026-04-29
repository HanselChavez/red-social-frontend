import ThemeButton from "@/components/buttons/ThemeButton";
import { Outlet } from "react-router-dom";
import LogoutButton from "../components/buttons/LogoutButton";
import {
    House,
    Compass,
    MessageCircle,
    Bell,
    User,
    Settings,
    Hash
} from "lucide-react";

// Mock data — reemplaza con datos reales de tu API/contexto
const suggestedUsers = [
    { id: 1, name: "Alex Turner", username: "@alexturner", avatar: "https://i.pravatar.cc/40?img=11" },
    { id: 2, name: "Lisa Ray", username: "@lisaray", avatar: "https://i.pravatar.cc/40?img=47" },
    { id: 3, name: "David Park", username: "@davidp", avatar: "https://i.pravatar.cc/40?img=53" },
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

            {/* Sidebar */}
            <aside className="w-64 border-r border-border p-4 flex flex-col justify-between">

                {/* Logo + Menu */}
                <div>
                    <h1 className="text-2xl font-bold mb-8">UniConnect</h1>

                    <nav className="space-y-3">
                        <a href="/" className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition">
                            <House size={20} />
                            Inicio
                        </a>
                        <a href="/explorar" className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition">
                            <Compass size={20} />
                            Explorar
                        </a>
                        <a href="/mensajes" className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition">
                            <MessageCircle size={20} />
                            Mensajes
                        </a>
                        <a href="/notificaciones" className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition">
                            <Bell size={20} />
                            Notificaciones
                        </a>
                        <a href="/perfil" className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition">
                            <User size={20} />
                            Perfil
                        </a>
                        <a href="/ajustes" className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition">
                            <Settings size={20} />
                            Ajustes
                        </a>
                    </nav>
                </div>

                {/* Logout abajo */}
                <div className="mt-6">
                    <LogoutButton />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <Outlet />
            </main>

            {/* Right Sidebar */}
            <aside className="w-72 border-l border-border p-4 space-y-6 overflow-y-auto">

                {/* Suggested for you */}
                <div className="bg-muted/40 rounded-2xl p-4">
                    <h2 className="text-base font-bold mb-4">Sugerido para ti</h2>
                    <div className="space-y-4">
                        {suggestedUsers.map((user) => (
                            <div key={user.id} className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-3 min-w-0">
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                                    />
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold leading-tight truncate">{user.name}</p>
                                        <p className="text-xs text-muted-foreground truncate">{user.username}</p>
                                    </div>
                                </div>
                                <button className="text-sm font-semibold px-3 py-1.5 rounded-full border border-border hover:bg-muted transition flex-shrink-0">
                                    Seguir
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trending */}
                <div className="bg-muted/40 rounded-2xl p-4">
                    <h2 className="text-base font-bold mb-4">Tendencia</h2>
                    <div className="space-y-4">
                        {trending.map((item) => (
                            <div key={item.tag} className="cursor-pointer group">
                                <p className="text-sm font-bold text-yellow-400 group-hover:underline">
                                    {item.tag}
                                </p>
                                <p className="text-xs text-muted-foreground">{item.posts}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </aside>

            {/* Theme Button */}
            <div className="fixed bottom-6 right-6 z-[9999]">
                <ThemeButton />
            </div>

        </div>
    );
}
