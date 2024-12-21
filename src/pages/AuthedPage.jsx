import React from "react";
import NavHeader from "../components/NavHeader";
import { Outlet, useRouteLoaderData } from "react-router-dom";

const AuthedPage = () => {
  const token = useRouteLoaderData("root");
  return (
    <>
      <NavHeader />
      <main className="ml-56">
        <Outlet />
      </main>
    </>
  );
};

export default AuthedPage;
