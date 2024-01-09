import * as yup from "yup";

export const contactSchema = yup.object({
  name: yup.string().required(),
  email: yup
    .string()
    .email()
    .matches(/^(?!.*@[^,]*,)/)
    .required(),
  message: yup.string().min(8).required(),
});
