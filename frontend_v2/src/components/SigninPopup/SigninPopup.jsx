import { faArrowRight, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import "./SigninPopup.css";
import Swal from "sweetalert2";
import {
  getExistingUserDetailsAPi,
  getUserSignindetailsByGoogleSigninApi,
} from "../../services/allApis";
import { SelectedCourseContext } from "../../context/courseContext";
import { userDataContext } from "../../context/LoginUserContext";
import { useNavigate } from "react-router";
import { useGoogleLogin } from "@react-oauth/google";
import SigninOtpPopup from "../SigninOtpPopup/SigninOtpPopup";

function SigninPopup({ setShowSigninPopup }) {
  const [email, setEmail] = useState("");
  const [showOTPPopup, setshowOTPPopup] = useState(false);
  const [showSigninPopup, setshowSigninPopup] = useState(true);

  const { selectedCourseData } = useContext(SelectedCourseContext);
  const { userData, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();

  const handleClose = () => {
    setShowSigninPopup(false);
  };

  const sendOtp = async () => {
    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }

    console.log("frontend", email);
    try {
      //sessionStorage.removeItem("user")

      // Send the request to the backend to send the OTP
      const response = await fetch(
        "http://localhost:5000/api/customers/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }), // Sending email in JSON format
        }
      );
      const data = await response.json();
      // Check if the response is successful
      if (response.ok) {
        if (data.alreadyRegistered) {
          // Show alert if user is already registered
          const proceed = window.confirm(
            "You are already registered. Click OK to continue."
          );
          if (proceed) {
            //console.log(data.customer);

            sessionStorage.setItem("user", JSON.stringify(data.customer));
            setUserData(!userData);
            Swal.fire({
              title: "Signin Success!",
              text: "Congrats! You have successfully signed in",
              icon: "success",
              confirmButtonColor: "#ACC29E",
              customClass: {
                popup: "custom-border-radius",
              },
            });
            setShowSigninPopup(false);
          }
        } else {
          alert(data.message); // Show success message
          setshowSigninPopup(false);
          setshowOTPPopup(true);
        }
      } else {
        alert(data.message || "Failed to send OTP.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while sending the OTP.");
    }
  };
  const handleContinue = async () => {
    sessionStorage.removeItem("user");

    if (email) {
      const result = await getExistingUserDetailsAPi({ email: email });
      if (result.code == "200") {
        sessionStorage.setItem("user", JSON.stringify(result.customer));
        setUserData(!userData);
        Swal.fire({
          title: "Signin Success!",
          text: "Congrats! You have successfully signed in",
          icon: "success",
          confirmButtonColor: "#ACC29E",
          customClass: {
            popup: "custom-border-radius",
          },
        });
        setUserData(!userData);
        setshowSigninPopup(false);
      } else {
        alert("Email Id is Not registered");
      }
    } else {
      alert("Please enter a valid email address.");
    }
  };
  /* Google Login Function */

  const handleLoginFailure = (error) => {
    alert("Something Went Wrong");
    // Handle the error if the login fails
    console.error("Login failed:", error);
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      sessionStorage.removeItem("user");
      let access_token = tokenResponse.access_token;

      console.log(access_token);

      const userInfo = await getUserSignindetailsByGoogleSigninApi(
        tokenResponse
      );

      console.log(userInfo);

      //sessionStorage.removeItem("user")
      sessionStorage.setItem("user", JSON.stringify(userInfo.customer));
      setUserData(!userData);
      Swal.fire({
        title: "Signin Success!",
        text: "Congrats! You have successfully signed in",
        icon: "success",
        confirmButtonColor: "#ACC29E",
        customClass: {
          popup: "custom-border-radius",
        },
      });
      setshowSigninPopup(false);
    },
    onError: handleLoginFailure,
    scope: "https://www.googleapis.com/auth/calendar.events",
    flow: "explicit", // explicut for retrieving data in backend
  });

  return (
    <div className="">
      {showSigninPopup && (
        <div className="signinPopup">
          <div className="SigninPopupContainer" style={{ background: "white" }}>
            <div
              className="signinPopupContent"
              style={{ position: "relative" }}
            >
              <div className="">
                <button className="popupCloseButton" onClick={handleClose}>
                  <FontAwesomeIcon icon={faX} />
                </button>
              </div>
              <div className="mt-5 w-100 ">
                <div className="signIn-heading  fw-bold">
                  <h2 className="fw-bold">Sign In</h2>
                  <h6>Enter your email</h6>
                </div>
                <div className="mt-3 mb-3   w-100 d-flex align-items-center justify-content-center input-container">
                  <input
                    type="text"
                    placeholder="example@mail.com"
                    className="form-control fs-5 border rounded-4 "
                    style={{ width: "400px", height: "60px" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>

                <div className="d-flex justify-content-center align-items-center">
                  <div
                    className=" border rounded-4 d-flex align-items-center justify-content-between sign-up-btn-container"
                    style={{ width: "400px", height: "60px" }}
                  >
                    <button
                      className=" m-1 fw-bold sign-up-btn"
                      onClick={sendOtp}
                    >
                      Sign Up
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        style={{ color: "#ffff" }}
                        className="ms-3"
                      />
                    </button>
                    <button
                      style={{
                        backgroundImage:
                          "linear-gradient(to right,#FDD687, #F5A691)",
                        width: "230px",
                        height: "50px",
                      }}
                      className="btn w-50 m-1 fw-bold rounded-3"
                      onClick={handleContinue}
                    >
                      Continue
                    </button>
                  </div>
                </div>

                {/* <SignInOtp/> */}
                <div className="mt-3">
                  <div className="d-flex justify-content-between align-items-center  line-seperator-container mt-5">
                    <div className="line-seperator "></div>
                    <p>or Sign in with</p>
                    <div className="line-seperator"></div>
                  </div>
                  <div className="d-flex align-items-center justify-content-center flex-column mb-1 signin-btn-container">
                    <button
                      onClick={() => login()}
                      style={{ backgroundColor: "#D0D0D0" }}
                      className="signin-btn border rounded-5 w-75  fw-bold  bg-transparent hide-on-mobile"
                    >
                      <img
                        src="https://img.icons8.com/?size=48&id=17949&format=png"
                        alt=""
                        className="me-3 google-icon"
                      />
                      Continue with Google
                    </button>
                    <button
                      onClick={() => login()}
                      className="signin-btn border  w-100  fw-bold hide-on-large-screen  py-2"
                    >
                      <img
                        src="https://img.icons8.com/?size=48&id=17949&format=png"
                        alt=""
                        className="me-3 google-icon"
                      />{" "}
                      Google
                    </button>
                    <p className="hide-on-large-screen mt-3 mb-4 ms-3">
                      By sigining in, you agree to our{" "}
                      <span className="text-primary">Terms of Service </span>and
                      <span className="text-primary">Privacy policy </span>
                    </p>
                    <button
                      style={{ backgroundColor: "#D0D0D0" }}
                      className="border signin-btn rounded-5 w-75 mb-5 fw-bold bg-transparent hide-on-mobile"
                    >
                      <img
                        src="https://img.icons8.com/?size=50&id=30840&format=png"
                        alt=""
                        className="me-3 apple-icon"
                      />
                      Continue with Apple
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showOTPPopup && (
        <div className="popup">
          <SigninOtpPopup email={email} setshowOTPPopup={setshowOTPPopup} />
        </div>
      )}
    </div>
  );
}

export default SigninPopup;
