"use client";

import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import css from "./NoteDetails.module.css";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleGoBack = () => {
    const isSure = confirm("Are you sure?");
    if (isSure) {
      router.back();
    }
  };

  return (
    <main className={css.main}>
      <div className={css.link_wrap}></div>
      {id && note && (
        <div className={css.container}>
          <div className={css.button_wrap}>
            <button className={css.button_goBack} onClick={handleGoBack}>
              Go Back
            </button>
          </div>
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
