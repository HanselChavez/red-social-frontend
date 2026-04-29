import axios from "axios";
import type { AuthResponse } from "@/types/auth";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});


export const loginRequest = async (data: {
    email: string;
    password: string;
}): Promise<AuthResponse> => {
    const res = await api.post("/auth/login", data);
    return res.data.data;
};
