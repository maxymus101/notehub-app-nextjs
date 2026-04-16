import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../lib/api";

export const useNotes = (searchQuery: string, currentPage: number) => {
  return useQuery({
    queryKey: ["notes", searchQuery, currentPage],
    queryFn: () => fetchNotes(searchQuery, currentPage),
    placeholderData: keepPreviousData,
  });
};
