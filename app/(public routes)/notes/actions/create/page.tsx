import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./page.module.css";

export async function generateMetadata() {
  return {
    title: "Create new note",
    description: "Create new note with adding title, content and tag.",
    openGraph: {
      title: "Create new note",
      description: "Create new note with adding title, content and tag.",
      url: "https://notehub-app-nextjs.vercel.app/notes/action/create",
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

export default function CreateNote() {
  return (
    <>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </>
  );
}
