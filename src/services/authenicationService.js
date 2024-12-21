import { redirect } from "react-router-dom";
import { getToken, removeToken } from "./localStorageService";

export const logOut = () => {
  removeToken();
  window.location.href = "/";
};

export const tokenLoader = () => {
  return getToken();
};

export const checkAuthLoader = () => {
  const token = getToken();
  if (!token) {
    return redirect("/");
  }
  return null;
};
