const baseURL = import.meta.env.VITE_API_BASE_URL;

/* LOGIN */
export const AUTHENTICATE_USER_POST_REQUEST = `${baseURL}/auth/authenticate`;

/* SIGNUP */
export const REGISTER_USER_POST_REQUEST = `${baseURL}/auth/register`;
