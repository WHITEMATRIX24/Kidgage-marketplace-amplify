import React, { useEffect } from "react";
import Swal from "sweetalert2";
import "./SigninComponet.css";

const SigninComponent = ({ success, onPopupClose }) => {
  useEffect(() => {
    if (success) {
      Swal.fire({
        title: "Sign-in Success!",
        text: "Congrats! You have successfully signed in",
        icon: "success",
        confirmButtonColor: "#ACC29E",
        customClass: {
          popup: "custom-border-radius",
        },
      }).then(() => {
        // Trigger callback to inform the parent component
        onPopupClose();
      });
    }
  }, [success, onPopupClose]);

  return null; // No need to render anything directly in this component
};

export default SigninComponent;
