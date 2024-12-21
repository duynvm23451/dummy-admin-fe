import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import { logOut } from "../services/authenicationService";
import AuthedPage from "../pages/AuthedPage";

export const RootLayout = () => {
  const token = useRouteLoaderData("root");
  return (
    <div>
      {!token && <AuthPage />}
      {token && <AuthedPage />}
    </div>
  );
};
