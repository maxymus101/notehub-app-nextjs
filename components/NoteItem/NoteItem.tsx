import { Note } from "@/types/note";
import css from "./NoteItem.module.css";
import Link from "next/link";

type NoteItemProps = {
  note: Note;
  onDelete: (id: string) => void;
};

export default function NoteItem({ note, onDelete }: NoteItemProps) {
  return (
    <li key={note.id} className={css.listItem}>
      <h2 className={css.title}>{note.title}</h2>
      <p className={css.content}>{note.content}</p>
      <div className={css.footer}>
        <span className={css.tag}>{note.tag}</span>
        <div className={css.buttons_wrap}>
          <Link href={`/notes/${note.id}`} className={css.link_detls}>
            View details
          </Link>
          <button className={css.button_del} onClick={() => onDelete(note.id)}>
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
