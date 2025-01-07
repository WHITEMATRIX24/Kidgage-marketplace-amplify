import React from "react";
import { Navigate, Outlet, redirect } from "react-router-dom";

const RouteProtector = () => {
  const isLoggedData = JSON.parse(sessionStorage.getItem("checkIsLogged"));

  if (!isLoggedData || isLoggedData.isLogged != true)
    return Navigate({ to: "/", replace: true });

  return <Outlet />;
};

export default RouteProtector;
