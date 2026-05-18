"use client";

import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import css from "./NoteForm.module.css";
import type { PostNote } from "../../lib/api";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { tags } from "@/lib/constants/constants";

interface NoteFormProps {
  onSubmit: (inputData: PostNote | null) => void;
}

const initialValues: PostNote = {
  title: "",
  content: "",
  tag: "Todo",
};

const SearchNoteSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .max(50, "Title is too long")
    .required("Enter title"),
  content: Yup.string().required("No content found"),
});

export default function NoteForm({ onSubmit }: NoteFormProps) {
  const router = useRouter();

  const handleCancel = () => {
    router.push("/notes/filter/all");
  };

  const handleSubmit = (values: PostNote, actions: FormikHelpers<PostNote>) => {
    actions.resetForm();
    onSubmit(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={SearchNoteSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage className={css.error} component="span" name="title" />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            id="content"
            as="textarea"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage className={css.error} component="span" name="content" />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          {tags.map((tag) => (
            <Field as="select" key={tag} name={tag} className={css.select}>
              <option value={tag}>{tag}</option>
            </Field>
          ))}

          <ErrorMessage className={css.error} component="span" name="tag" />
        </div>

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
      </Form>
    </Formik>
  );
}
