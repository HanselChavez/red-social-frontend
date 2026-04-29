import ThemeButton from "@/components/buttons/ThemeButton";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground flex">

      <aside className="w-64 border-r border-border p-4">
        Sidebar
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>

      <aside className="w-72 border-l border-border p-4">
        Trends / Friends
      </aside>
        <div className="fixed bottom-6 right-6 z-[9999">
        <ThemeButton />
      </div>
    </div>
  );
}