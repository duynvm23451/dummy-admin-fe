export const ACCESS_TOKEN = "accessToken";

export const setToken = (token) => {
  localStorage.setItem(ACCESS_TOKEN, token);
};

export const getToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
};

export const removeToken = () => {
  return localStorage.removeItem(ACCESS_TOKEN);
};
