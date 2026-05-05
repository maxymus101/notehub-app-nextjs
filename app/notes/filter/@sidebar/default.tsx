import css from "";
import Link from "next/link";

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {/* список тегів */}
      <li className={css.menuItem}>
        <Link href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </Link>
      </li>
      <li className={css.menuItem}>
        <a
          href={`url до сторінки за відповідним тегом`}
          className={css.menuLink}
        >
          Назва тегу
        </a>
      </li>
    </ul>
  );
}
