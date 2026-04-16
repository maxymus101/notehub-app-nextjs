import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../lib/api";
import { toast } from "react-hot-toast";

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteNote(id);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note deleted succesfully!");
    },
    onError: (error) => {
      toast.error(`Delete failure.`);
      console.error(error.message);
    },
  });
};
