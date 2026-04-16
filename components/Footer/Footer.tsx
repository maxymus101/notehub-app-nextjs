import Link from "next/link";
import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Akimov Maksym</p>
          <p>
            Contact us:&nbsp;
            <Link href="mailto:maxym.akimov01@gmail.com">
              maxym.akimov01@gmail.com
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
