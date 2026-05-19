"use client";

import css from "./NoteForm.module.css";
import type { PostNote } from "../../lib/api";
import { useRouter } from "next/navigation";
import { tags } from "@/lib/constants/constants";
import { usePostNote } from "@/hooks/usePostNote";
import { NoteTag } from "@/types/note";

export default function NoteForm() {
  const router = useRouter();
  const addNoteMutation = usePostNote();

  const handleCancel = () => {
    router.push("/notes/filter/all");
  };

  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tag = formData.get("tag") as NoteTag;

    const values: PostNote = { title, content, tag };
    addNoteMutation.mutate(values);
  };
  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">
          Title
          <input id="title" type="text" name="title" className={css.input} />
        </label>
        <label htmlFor="content">
          Content
          <textarea name="content" rows={8} className={css.textarea}></textarea>
        </label>
        <label htmlFor="tag">
          Tag
          <select name="tag" className={css.select}>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>
        <div className={css.actions}>
          <button
            type="button"
            onClick={handleCancel}
            className={css.cancelButton}
          >
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </div>
    </form>
  );

  // return (
  //   <Formik
  //     initialValues={initialValues}
  //     onSubmit={handleSubmit}
  //     validationSchema={SearchNoteSchema}
  //   >
  //     <Form className={css.form}>
  //       <div className={css.formGroup}>
  //         <label htmlFor="title">Title</label>
  //         <Field id="title" type="text" name="title" className={css.input} />
  //         <ErrorMessage className={css.error} component="span" name="title" />
  //       </div>

  //       <div className={css.formGroup}>
  //         <label htmlFor="content">Content</label>
  //         <Field
  //           id="content"
  //           as="textarea"
  //           name="content"
  //           rows={8}
  //           className={css.textarea}
  //         />
  //         <ErrorMessage className={css.error} component="span" name="content" />
  //       </div>

  //       <div className={css.formGroup}>
  //         <label htmlFor="tag">Tag</label>
  //         <Field as="select" name="tag" className={css.select}>
  //           {tags.map((tag) => (
  //             <option key={tag} value={tag}>
  //               {tag}
  //             </option>
  //           ))}
  //         </Field>
  //         <ErrorMessage className={css.error} component="span" name="tag" />
  //       </div>

  //       <div className={css.actions}>
  //         <button
  //           type="button"
  //           onClick={handleCancel}
  //           className={css.cancelButton}
  //         >
  //           Cancel
  //         </button>
  //         <button type="submit" className={css.submitButton} disabled={false}>
  //           Create note
  //         </button>
  //       </div>
  //     </Form>
  //   </Formik>
  // );
}
