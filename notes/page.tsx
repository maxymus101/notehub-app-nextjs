import css from "./App.module.css";
import { fetchNotes } from "../lib/api";
import { QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client";

export default async function Notes() {
  const queryClient = new QueryClient();

  const prefetchedData = await queryClient.prefetchQuery({
    queryKey: ["note"],
    queryFn: () => fetchNotes(),
  });

  return (
    <div className={css.app}>
      <h1>Notes</h1>
      <br />
      <NotesClient prefetchedData={prefetchedData} />
    </div>
  );
}
