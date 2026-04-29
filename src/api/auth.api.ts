import type { AuthResponse } from "@/types/auth";
import { api, apiAuth } from "./axios";

export const loginRequest = async (data: {
    email: string;
    password: string;
}): Promise<AuthResponse> => {
    const res = await api.post("/auth/login", data);
    return res.data.data;
};

export const logoutRequest = (refreshToken: string) => {
    return apiAuth.post("/auth/logout", {
        refreshToken,
    });
};
