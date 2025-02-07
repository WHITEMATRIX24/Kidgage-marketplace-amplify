import React, { useContext, useEffect, useState } from "react";
import "../ActivityDetailsInnerPage/ActivityDetailsInnerpage1.css";
import "./SignInPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { SelectedCourseContext } from "../../context/courseContext";
import CampDetails from "../../pages/CampDetails/CampDetails";
import { useGoogleLogin } from "@react-oauth/google";
import {
  getExistingUserDetailsAPi,
  getUserSignindetailsByGoogleSigninApi,
} from "../../services/allApis";
import { userDataContext } from "../../context/LoginUserContext";
import Swal from "sweetalert2";
import useRefreshAlert from "../../hooks/useRefreshAlert";
import { BookingCourseContext } from "../../context/bookingContext";
import { server_Url } from "../../services/constants";

function SignInPage() {
  useRefreshAlert();
  const { selectedCourseData } = useContext(SelectedCourseContext);
  const { bookingCourseData } = useContext(BookingCourseContext);
  const { userData, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();
  // if not data redirect
  if (!selectedCourseData) return window.location.replace("/");

  const [email, setEmail] = useState("");
  const [bookingDetails, setBBookingDetails] = useState(
    bookingCourseData || {}
  );
  const [totalFees, setTotalFees] = useState(
    bookingDetails.courseDuration.fee || ""
  );
  const handleContinue = async () => {
    sessionStorage.removeItem("user");

    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const result = await getExistingUserDetailsAPi({ email });

      console.log("API Response:", result); // Debugging

      if (!result || !result.code) {
        throw new Error("Invalid response from server");
      }

      if (result.code === "200") {
        sessionStorage.setItem("user", JSON.stringify(result.customer));
        setUserData(!userData);

        Swal.fire({
          title: "Signin Success!",
          text: "Congrats! You have successfully signed in",
          icon: "success",
          confirmButtonColor: "#ACC29E",
          customClass: { popup: "custom-border-radius" },
        });

        navigate("/signin-success");
      } else if (result.code === "205") {
        alert("Email ID is not registered");
      } else {
        alert("Unexpected response from server");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again.");
    }
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
      const response = await fetch(`${server_Url}/customers/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Sending email in JSON format
      });
      const data = await response.json();
      // Check if the response is successful
      if (response.ok) {
        if (data.alreadyRegistered) {
          // Show alert if user is already registered
          const proceed = window.confirm(
            "You are already registered. Click OK to continue."
          );
          if (proceed) {
            console.log(data.customer);
            sessionStorage.setItem("user", JSON.stringify(data.customer));

            navigate("/signin-success", { state: { email } });
          }
        } else {
          alert(data.message); // Show success message
          navigate("/signin-otp", { state: { email } });
        }
      } else {
        alert(data.message || "Failed to send OTP.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while sending the OTP.");
    }
  };
  /* Google Login Function */

  const handleLoginFailure = (error) => {
    // Handle the error if the login fails
    console.error("Login failed:", error);
  };

  const loginUsingGoogle = useGoogleLogin({
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
      navigate("/signin-success");
    },
    onError: handleLoginFailure,
    scope: "https://www.googleapis.com/auth/calendar.events",
    flow: "explicit", // explicut for retrieving data in backend
  });

  const handleGooglelogin = () => {
    const isUserLoggedIn = JSON.parse(sessionStorage.getItem("user"));

    if (isUserLoggedIn) navigate("/signin-success");
    else loginUsingGoogle();
  };

  return (
    <>
      <div className="activity-details-row-1">
        <div className="activity-details-left-1">
          <div className="hide-on-mobile">
            <div className="activity-img-container-1">
              <img
                className="activity-image-1"
                src={selectedCourseData?.images[0]}
                // src="https://s3-alpha-sig.figma.com/img/805d/1f6b/b81629c19ca3ebeb8dc7604d3083c71e?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hwvGJXWfoANxMwH~BIlADVx5EXYX9w03x8wf6yE4BXnaqNKFmBA3O0t0rFxCZGih-K7spSlcNcHlB9Z5Q6jK0wSw3QkAw0uLtyLnBsYlgJ0-yoapBpG7b-enzj-3x0kaWHVpluj2u6K5CD~c3gfa9P9TbJVUDlC7-D8cnFbYPP-fes89dtRUVLy0OroGlEBaB8d19ihEMkG7p4MbG74fBfCxSweJZ8BYrokowK2aYG1G0UBW67ChIn8bbBYS1Qm8Sp54v02zSHR2FW3ttFamqNNP7NrW7dfiL8zMLOVOdcnJOloSSNDgMTZKmPvMa2fWWOkp95S7zuo57PcTi6bCuA__"
                alt=""
              />
            </div>
            {/* <div className="activity-btn-container">
              <button className='w-100 activity-button text-start rounded-4' >About This Activities</button>       
              <button className="text-start activity-button">
                About This Activities
              </button>
              <FontAwesomeIcon className="icon-arrow" icon={faArrowRight} />
            </div> */}
            <CampDetails activityData={selectedCourseData} />
          </div>
        </div>
        <div className="activity-details-right-1">
          <div className="rounded-4 activity-content-1">
            <div className="mt-5 w-100">
              <div className="signIn-heading fw-bold">
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
                    onClick={() => handleGooglelogin()}
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
                    onClick={() => handleGooglelogin()}
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
              <div className="checkout-container">
                <div className="d-flex align-items-centre justify-content-between border rounded-3  age-box ">
                  <div className=" age-box-content ">
                    <p
                      className="fw-bold"
                      style={{ fontSize: "16px", marginTop: "15px" }}
                    >
                      {`QAR ${bookingDetails.courseDuration.fee}`}
                    </p>
                  </div>
                  <button
                    className=" rounded-4 ctn-btn border-0 w-50 m-1 fw-bold"
                    style={{
                      // backgroundImage:
                      //   "linear-gradient(to right,#FDD687, #F5A691)",
                      backgroundColor: "rgba(208, 208, 208, 1)",
                      width: "230px",
                      height: "50px",
                    }}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignInPage;
