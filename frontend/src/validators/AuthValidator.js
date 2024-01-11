import * as yup from "yup";

export const passwordSchema = yup.object({
  password: yup.string().min(8).max(32).required(),
  confirmPassword: yup
    .string()
    .min(8)
    .max(32)
    .required()
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

export const usernameSchema = yup
  .object({
    username: yup.string().required(),
  })
  .required();

export const loginSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().min(8).max(32).required(),
});

export const registerSchema = yup.object({
  email: yup
    .string()
    .email()
    .matches(/^(?!.*@[^,]*,)/)
    .required(),
  username: yup.string().required(),
  password: yup.string().min(8).max(32).required(),
  confirmPassword: yup
    .string()
    .min(8)
    .max(32)
    .required()
    .oneOf([yup.ref("password")], "Passwords do not match"),
});
