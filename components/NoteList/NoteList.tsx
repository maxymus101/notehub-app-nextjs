import type { Note } from "../../types/note";
import css from "./NoteList.module.css";
import NoteItem from "../NoteItem/NoteItem";

interface NoteListProps {
  notes: Note[];
  onClick: (id: string) => void;
}

export default function NoteList({ notes, onClick }: NoteListProps) {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} onDelete={() => onClick(note.id)} />
      ))}
    </ul>
  );
}
