const REGISTER_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/register`;
const LOGIN_API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/login`;
const FORGOT_PASSWORD_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/forgot`;
const RESET_PASSWORD_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/reset/`;
const GOOGLE_LOGIN_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/google`;

export default {
  REGISTER_URL,
  LOGIN_API_URL,
  FORGOT_PASSWORD_URL,
  RESET_PASSWORD_URL,
  GOOGLE_LOGIN_URL,
};
