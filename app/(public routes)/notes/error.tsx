"use client";
import css from "./error.module.css";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className={css.error_container}>
      <h3 className={css.error_title}>{error.message}</h3>
      <button className={css.error_button} onClick={reset}></button>
    </div>
  );
};

export default Error;
