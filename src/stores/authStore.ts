import { create } from "zustand";
import { toast } from "sonner";
import api from "../utils/api";
import type { User } from "../types";

interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  login: async (email, password) => {
    try {
      const response = await api.post("/api/auth/login", { email, password });
      set({ user: response.data, token: response.data.token });
      localStorage.setItem("token", response.data.token);
      toast.success("Logged in successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
      throw error;
    }
  },
  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
  },
  loadUser: async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await api.get("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        set({ user: response.data, token });
      } catch (error) {
        set({ user: null, token: null });
        localStorage.removeItem("token");
      }
    }
  },
}));
