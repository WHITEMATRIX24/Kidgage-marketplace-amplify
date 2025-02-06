import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const RouteProtector = () => {
  const isLogged = sessionStorage.getItem("checkIsLogged");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) navigate("/");
  }, [isLogged, navigate]);

  return isLogged ? <Outlet /> : null;
};

export default RouteProtector;
