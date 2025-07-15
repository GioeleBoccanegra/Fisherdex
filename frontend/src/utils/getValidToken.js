
import { logout } from '../features/authSlice';
import store from "../app/store";



export const getValidToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    store.dispatch(logout());
    window.location.href = "/login";

    return null;
  }
  return token;
};