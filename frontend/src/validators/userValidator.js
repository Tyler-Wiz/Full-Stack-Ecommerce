import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const postcodeRegExp = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/;

export const userSchema = yup.object({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  address_line1: yup.string().required(),
  address_line2: yup.string().required(),
  city: yup.string().required(),
  postal_code: yup.string().matches(postcodeRegExp, "Postcode is not valid"),
  country: yup.string().required(),
  telephone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required(),
});
