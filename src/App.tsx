import AppRouter from "./routes/AppRouter";
import { useEffect } from "react";
import { initTheme } from "@/theme/initTheme";

export default function App() {
    useEffect(() => {
    initTheme();
  }, []);

  return <AppRouter />;
}