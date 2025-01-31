import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const useRefreshAlert = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnLoad = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", handleBeforeUnLoad);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnLoad);
    };
  }, []);

  return;
};

export default useRefreshAlert;
