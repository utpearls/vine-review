import * as Yup from "yup";

export const uploadProductValidation = Yup.object().shape({
  title: Yup.string().required("Title is required"), // Mark title as required
  price: Yup.number()
    .required("Price is required")
    .typeError("Price must be a number")
    .min(1, "Price must be at least 1"),
  file: Yup.mixed().required("File is required"), // Mark title as required
});
