"use client";

import css from "./NoteForm.module.css";
import { createNote, type PostNote } from "../../lib/api";
import { useRouter } from "next/navigation";
import { tags } from "@/lib/constants/constants";
import { NoteTag } from "@/types/note";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { useMutation } from "@tanstack/react-query";

export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      router.push("/notes/filter/all");
    },
  });

  const handleCancel = () => {
    router.push("/notes/filter/all");
  };

  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tag = formData.get("tag") as NoteTag;

    const values: PostNote = { title, content, tag };
    mutate(values);
  };
  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label className={css.label} htmlFor="title">
          Title
          <input
            id="title"
            type="text"
            name="title"
            defaultValue={draft?.title}
            onChange={handleChange}
            className={css.input}
          />
        </label>
        <label className={css.label} htmlFor="content">
          Content
          <textarea
            name="content"
            rows={8}
            defaultValue={draft?.content}
            onChange={handleChange}
            className={css.textarea}
          ></textarea>
        </label>
        <label className={css.label} htmlFor="tag">
          Tag
          <select
            name="tag"
            defaultValue={draft?.tag}
            onChange={handleChange}
            className={css.select}
          >
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
