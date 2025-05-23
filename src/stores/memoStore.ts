import { create } from "zustand";
import { toast } from "sonner";
import api from "../utils/api";
import type { Memo, MemoField } from "../types";

interface MemoState {
  memos: Memo[];
  fields: MemoField[];
  fetchMemos: () => Promise<void>;
  fetchFields: () => Promise<void>;
  createMemo: (memoData: {
    recipients?: string[];
    department?: string;
    content: { [key: string]: string | File };
  }) => Promise<void>;
  updateMemoStatus: (memoId: string, status: string) => Promise<void>;
}

export const useMemoStore = create<MemoState>((set) => ({
  memos: [],
  fields: [],
  fetchMemos: async () => {
    try {
      const response = await api.get("/api/memos");
      set({ memos: response.data });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch memos");
    }
  },
  fetchFields: async () => {
    try {
      const response = await api.get("/api/fields");
      set({ fields: response.data });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch fields");
    }
  },
  createMemo: async (memoData) => {
    try {
      const formData = new FormData();
      if (memoData.recipients) {
        formData.append("recipients", JSON.stringify(memoData.recipients));
      }
      if (memoData.department) {
        formData.append("department", memoData.department);
      }
      Object.entries(memoData.content).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value);
        }
      });

      const response = await api.post("/api/memos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set((state) => ({ memos: [...state.memos, response.data] }));
      toast.success("Memo created successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create memo");
      throw error;
    }
  },
  updateMemoStatus: async (memoId, status) => {
    try {
      const response = await api.put("/api/memos/status", { memoId, status });
      set((state) => ({
        memos: state.memos.map((memo) =>
          memo._id === memoId ? response.data : memo
        ),
      }));
      toast.success(`Memo marked as ${status}`);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to update memo status"
      );
    }
  },
}));
