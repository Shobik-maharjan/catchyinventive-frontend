import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Email must be a valid email")
    .required("Please enter your email"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Please enter your password"),
});

export const registerSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Email must be a valid email")
    .required("Please enter your email"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Please enter your password"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must match")
    .required("Please confirm your password"),
});
