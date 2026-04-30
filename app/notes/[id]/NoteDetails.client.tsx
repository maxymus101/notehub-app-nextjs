"use client";

import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import css from "./NoteDetails.module.css";
import { useGetNotesById } from "@/hooks/useGetNoteById";
import { useParams } from "next/navigation";
import Link from "next/link";
import Loader from "@/components/Loader/Loader";

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const { data: note, isLoading, error } = useGetNotesById(id);

  return (
    <main className={css.main}>
      <div className={css.link_wrap}>
        <Link href={`/notes`} className={css.link_goBack}>
          ←
        </Link>
      </div>
      {id && note && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note?.title}</h2>
            </div>
            <p className={css.tag}>{note?.tag}</p>
            <p className={css.content}>{note?.content}</p>
            <p className={css.date}>{note?.createdAt}</p>
          </div>
        </div>
      )}
      {!id && <ErrorMessage message="Note with this ID does not exist." />}
      {id && isLoading && <Loader />}
      {id && !isLoading && error && (
        <ErrorMessage
          message={error.message || "Failed to load note."}
          onClick={() => window.location.reload()}
        />
      )}

      {id && !isLoading && !error && !note && (
        <ErrorMessage message="Note not found." />
      )}
    </main>
  );
}
