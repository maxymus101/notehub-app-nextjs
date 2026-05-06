import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../lib/api";
import { NoteTag } from "@/types/note";

export const useNotes = (
  searchQuery: string,
  currentPage: number,
  tag?: NoteTag | undefined,
  perPage = 12,
) => {
  return useQuery({
    queryKey: ["notes", searchQuery, tag ?? "all", currentPage],
    queryFn: () => fetchNotes(searchQuery, tag, currentPage, perPage),
    placeholderData: keepPreviousData,
  });
};
