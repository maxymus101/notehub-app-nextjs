"use client";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./NotesClient.module.css";
import { useDeleteNote } from "@/hooks/useDeleteNote";
import { useNotes } from "@/hooks/useNotes";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import { NoteTag } from "@/types/note";
import Link from "next/link";

type NotesClientProps = {
  tag?: NoteTag;
};

export default function NotesClient({ tag }: NotesClientProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isSuccess, isFetching, isLoading, isError, refetch } =
    useNotes(searchQuery, currentPage, tag);

  const [isRetrying, setIsRetrying] = useState(false);

  const deleteNoteMutation = useDeleteNote();

  const totalPages = data?.totalPages ?? 0;

  const handleError = async () => {
    setIsRetrying(true);
    await refetch();
    setIsRetrying(false);
  };

  const handleNoteDelete = (id: string) => {
    deleteNoteMutation.mutate(id);
  };

  return (
    <>
      <Toaster />
      <header className={css.toolbar}>
        <Link href="/notes/create/action" className={css.button}>
          Create note +
        </Link>
        <SearchBox value={searchQuery} onChange={setSearchQuery} />
      </header>
      {isLoading && isFetching && <Loader />}
      {isError && (
        <ErrorMessage
          message={error.message}
          onClick={handleError}
          isRetrying={isRetrying}
        />
      )}
      {isSuccess && data && data.notes.length > 0 && (
        <NoteList notes={data?.notes} onClick={handleNoteDelete} />
      )}

      {data && data.notes.length === 0 && (
        <ErrorMessage
          message={"Notes not found"}
          onClick={handleError}
          isRetrying={isRetrying}
        />
      )}
      {data && data.notes.length > 0 && (
        <Pagination
          pageCount={totalPages}
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          forcePage={currentPage - 1}
        />
      )}
    </>
  );
}
