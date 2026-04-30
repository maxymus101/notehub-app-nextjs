import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetNotesById = (id: string) => {
  return useQuery({
    queryKey: ["notes", id],
    queryFn: () => fetchNoteById(id),
  });
};
