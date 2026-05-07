import { fetchNotes } from "@/lib/api";
import { NoteTag } from "@/types/note";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesByTag({ params }: Props) {
  const queryClient = new QueryClient();
  const { slug } = await params;
  const tagParam = slug?.[0] ?? "all";
  const isAll = tagParam === "all";

  const tag = isAll ? undefined : (tagParam as NoteTag);

  await queryClient.prefetchQuery({
    queryKey: ["note", tag ?? "all"],
    queryFn: () => fetchNotes(tag),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient tag={tag} />
      </HydrationBoundary>
    </>
  );
}
