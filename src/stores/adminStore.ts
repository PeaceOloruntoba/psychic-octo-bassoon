import { create } from "zustand";
import { toast } from "sonner";
import api from "../utils/api";
import type { User, MemoField } from "../types";

interface AdminState {
  users: User[];
  fields: MemoField[];
  fetchUsers: () => Promise<void>;
  registerUser: (userData: {
    name: string;
    email: string;
    password: string;
    role: "Admin" | "Staff" | "Student";
    department?: string;
  }) => Promise<void>;
  updateUser: (id: string, userData: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  createMemoField: (fieldData: {
    name: string;
    type: "text" | "date" | "select" | "file";
    required: boolean;
    options?: string[];
  }) => Promise<void>;
}

export const useAdminStore = create<AdminState>((set) => ({
  users: [],
  fields: [],
  fetchUsers: async () => {
    try {
      const response = await api.get("/api/users");
      set({ users: response.data });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    }
  },
  registerUser: async (userData) => {
    try {
      const response = await api.post("/api/auth/register", userData);
      set((state) => ({ users: [...state.users, response.data] }));
      toast.success("User registered successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to register user");
      throw error;
    }
  },
  updateUser: async (id, userData) => {
    try {
      const response = await api.put(`/api/users/${id}`, userData);
      set((state) => ({
        users: state.users.map((user) =>
          user._id === id ? response.data : user
        ),
      }));
      toast.success("User updated successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update user");
    }
  },
  deleteUser: async (id) => {
    try {
      await api.delete(`/api/users/${id}`);
      set((state) => ({
        users: state.users.filter((user) => user._id !== id),
      }));
      toast.success("User deleted successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  },
  createMemoField: async (fieldData) => {
    try {
      const response = await api.post("/api/fields", fieldData);
      set((state) => ({ fields: [...state.fields, response.data] }));
      toast.success("Memo field created successfully");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to create memo field"
      );
      throw error;
    }
  },
}));
