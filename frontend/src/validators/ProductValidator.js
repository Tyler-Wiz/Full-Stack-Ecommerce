import * as yup from "yup";

export const productSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().min(8).required(),
  price: yup.number().required(),
  stock: yup.number().required(),
  discount: yup.number(),
  discount_name: yup.string(),
});
