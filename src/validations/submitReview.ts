import * as Yup from "yup";

export const submitReview = Yup.object().shape({
  title: Yup.string().required("Title is required"), // Mark title as required
});
