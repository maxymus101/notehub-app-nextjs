import { tags } from "@/lib/constants/constants";
import css from "./SidebarNotes.module.css";
import Link from "next/link";

export default async function SidebarNotes() {
  return (
    <>
      <Link href="/notes/action/create">Create note</Link>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href="/notes/filter/all" className={css.menuLink}>
            All notes
          </Link>
        </li>
        {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
