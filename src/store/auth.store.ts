// src/store/auth.store.ts
import { create } from "zustand"
import type { User } from "@/types/auth"
import { loginRequest } from "@/api/auth.api"

interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null

  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const stored = localStorage.getItem("auth")

const initial = stored ? JSON.parse(stored) : null

export const useAuthStore = create<AuthState>((set) => ({
  user: initial?.user || null,
  accessToken: initial?.accessToken || null,
  refreshToken: initial?.refreshToken || null,

  login: async (email, password) => {
    try {
      const data = await loginRequest({ email, password })

      set({
        user: data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      })

      localStorage.setItem("auth", JSON.stringify(data))
    } catch (error: any) {
      throw error.response?.data || error
    }
  },

  logout: () => {
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
    })

    localStorage.removeItem("auth")
  },
}))
