import AppRouter from "./routes/AppRouter";
import { useEffect } from "react";
import { initTheme } from "@/theme/initTheme";
import { useAuthStore } from "./store/auth.store";
import { api } from "./api/axios";

export default function App() {
    useEffect(() => {
        initTheme();
    }, []);
    useEffect(() => {
        const checkSession = async () => {
            const { refreshToken } = useAuthStore.getState();

            if (!refreshToken) return;

            try {
                const res = await api.post("/auth/refresh", {
                    refreshToken,
                });
                console.log("response") 

                const newAccessToken = res.data.data.accessToken;

                useAuthStore.setState({
                    accessToken: newAccessToken,
                });
            } catch (err) {
                console.log("entro catch")
                useAuthStore.getState().logout();
            }
        };

        checkSession();
    }, []);
    return <AppRouter />;
}
