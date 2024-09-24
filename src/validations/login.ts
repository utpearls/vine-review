import * as Yup from "yup";

export const loginValidation = Yup.object().shape({
  email: Yup.string().required("Email is required"), // Mark title as required
  password: Yup.string().required("Password is required"), // Mark title as required
});
