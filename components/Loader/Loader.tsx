import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.loader_container}>
      <div className={css.loader}></div>
    </div>
  );
}
