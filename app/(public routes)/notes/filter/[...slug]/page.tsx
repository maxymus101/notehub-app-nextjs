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

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const tagParam = slug?.[0] ?? "all";
  const isAll = tagParam === "all";

  const descTag = !isAll ? "All notes" : `Filtered by ${tagParam} tag`;

  const tagUrl =
    tagParam === "all"
      ? "https://notehub-app-nextjs.vercel.app/notes/filter/all"
      : `https://notehub-app-nextjs.vercel.app/notes/filter/${tagParam}`;

  return {
    title: `Tag: ${tagParam}`,
    description: `${descTag}`,
    openGraph: {
      title: `Tag: ${tagParam}`,
      description: `${descTag}`,
      url: tagUrl,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
      ],
    },
  };
}

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
