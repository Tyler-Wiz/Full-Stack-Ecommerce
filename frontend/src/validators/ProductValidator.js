import * as yup from "yup";

export const productSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().min(8).required(),
  price: yup.string().required(),
  stock: yup.number().required(),
  colors: yup.string().required(),
});
