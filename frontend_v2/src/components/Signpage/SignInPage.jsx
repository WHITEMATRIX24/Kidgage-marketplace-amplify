import React, { useContext, useState } from "react";
import "../ActivityDetailsInnerPage/ActivityDetailsInnerpage1.css";
import "./SignInPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { SelectedCourseContext } from "../../context/courseContext";
import CampDetails from "../../pages/CampDetails/CampDetails";

function SignInPage() {
  const { selectedCourseData } = useContext(SelectedCourseContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleContinue = () => {
    navigate("/signin-otp");
  };
  const sendOtp = async () => {
    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }
    console.log("frontend", email);
    try {
      // Send the request to the backend to send the OTP
      const response = await fetch("http://localhost:5000/api/leads/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Sending email in JSON format
      });

      // Check if the response is successful
      if (response.ok) {
        const data = await response.json(); // Parse the response as JSON
        alert(data.message); // Show success message
        navigate("/signin-otp", { state: { email } }); // Redirect to the OTP verification page
      } else {
        // Handle error if response is not successful
        const errorData = await response.json(); // Parse error response
        alert(errorData.message || "Failed to send OTP.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while sending the OTP.");
    }
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
            <CampDetails />
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
                ></input>
              </div>

              <div className="d-flex justify-content-center align-items-center">
                <div
                  className=" border rounded-4 d-flex align-items-center justify-content-between sign-up-btn-container"
                  style={{ width: "400px", height: "60px" }}
                >
                  <button className=" m-1 fw-bold sign-up-btn">
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
                  <button className="signin-btn border  w-100  fw-bold hide-on-large-screen  py-2">
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
                    <p className="fw-bold" style={{ fontSize: "16px" }}>
                      QAR 199:
                    </p>
                    <p style={{ fontSize: "12px" }}>Today will start</p>
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
