import { create } from "zustand";
import { PostNote } from "../api";

type NoteDraftStore = {
  draft: PostNote;
  setDraft: (note: PostNote) => void;
  clearDraft: () => void;
};

const initialDraft: PostNote = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteDraftStore = create<NoteDraftStore>()((set) => ({
  draft: initialDraft,
  setDraft: (note: PostNote) => set(() => ({ draft: note })),
  clearDraft: () => set(() => ({ draft: initialDraft })),
}));
