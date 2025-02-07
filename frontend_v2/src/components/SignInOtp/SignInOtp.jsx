import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import './SignInOtp.css'
import '../Signpage/SignInPage.css'
import '../../pages/ActivityDetails/ActivityDetails.css'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from 'react-router'
import { SelectedCourseContext } from "../../context/courseContext";
import SigninComponent from '../SignInSuccessPopup/SigninComponent'
import { userDataContext } from '../../context/LoginUserContext'
import CampDetails from '../../pages/CampDetails/CampDetails'
function SignInOtp() {
  const [otp, setOtp] = useState(["", "", "", ""]); // 4 digit OTP
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [otpExpired, setOtpExpired] = useState(false);
  const { userData, setUserData } = useContext(userDataContext)
  const { selectedCourseData } = useContext(SelectedCourseContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  // const handleContinue = () => {
  //   navigate("/signin-success")
  // }
  const email = state?.email;
  const emailObject = { email };
  useEffect(() => {
    if (timer > 0 && !otpExpired) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setOtpExpired(true);
    }
  }, [timer, otpExpired]);
  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
  };
  const [success, setSuccess] = useState(false);

  // const handleContinue = () => {
  //   // Simulate successful sign-in logic
  //   
  //   navigate('/signin-success');
  // };

  const handlePopupClose = () => {
    // Navigate to the "order-summary" page after the popup is confirmed

    setSuccess(false)
  };
  const handleContinue = async () => {
    try {
      const enteredOtp = otp.join(""); // Join the OTP array to form a single string
      const email = emailObject; // Ensure email is correctly passed as a string

      if (enteredOtp.length !== 4) {
        alert('Please enter the complete OTP.');
        return;
      }

      if (otpExpired) {
        alert('OTP has expired. Please request a new OTP.');
        return;
      }

      // Call the API to verify OTP with the email
      const response = await fetch(`https://kidgage.com/api/customers/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: enteredOtp, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid OTP');
      }

      sessionStorage.setItem("user", JSON.stringify(data.customer));
      alert(data.message);
      setUserData(!userData)
      setSuccess(true);
      // navigate('/signin-success');
      navigateToSuccess();
    } catch (error) {
      alert(error.message || 'Something went wrong. Please try again.');
    }
  };
  const navigateToSuccess = () => {
    navigate('/signin-success');
  }
  // useEffect(() => {
  //   if (success) {
  //     navigate('/signin-success');
  //   }
  // }, [success]);



  return (
    <>
      <div className="activity-details-row-1">
        <div className="activity-details-left-1 ">
          <div className='hide-on-mobile'>
            <div className='activity-img-container-1'>
              <img className='activity-image-1' src={selectedCourseData?.images[0]} />
            </div>
            <CampDetails activityData={selectedCourseData} />
          </div>
        </div>
        <div className="activity-details-right-1 ">
          <div className='rounded-4 activity-content-1 ' >
            <div className='mt-4'>
              <div className='signIn-Otp-heading fw-bold '>
                <h2 className='fw-bold'>Sign In</h2>
                <h6>Enter the OTP</h6>
              </div>

              <div className='mb-2 w-100 d-flex align-items-center justify-content-evenly otp-container'>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type='text'
                    maxLength='1'
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    className='form-control fs-5 border rounded-4 m-2'
                    style={{ width: '60px', height: '60px' }}
                  />
                ))}
              </div>
              <div className='d-flex justify-content-center align-items-center '>
                <div className=' mx-3 border rounded-4 d-flex align-items-center justify-content-between sign-up-btn-container' style={{ width: '400px', height: '60px' }}>
                  <button
                    style={{
                      backgroundColor: '#D0D0D0',
                      color: '#ffff',
                      width: '150px',
                      height: '50px',
                      fontSize: '18px',
                      fontWeight: '700',
                    }}
                    className='btn m-1 fw-bold'
                    disabled={otpExpired}
                  >
                    OTP In {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                  </button>
                  <button style={{ backgroundImage: 'linear-gradient(to right,#FDD687, #F5A691)', width: '230px', height: '50px' }} className='btn w-50 m-1 fw-bold rounded-3 ' onClick={handleContinue}
                    disabled={otpExpired}>Continue</button>
                </div>
              </div>
              <div className='mt-2 ms-5 link-container' > <a href=''>Use a different email </a></div>
              <div className='mt-3'>
                <div className='d-flex justify-content-between align-items-center  line-seperator-container mt-5'>
                  <div className='line-seperator'></div>
                  <p>or Sign in with</p>
                  <div className='line-seperator'></div>
                </div>
                <div className=' mt-2 d-flex align-items-center justify-content-center flex-column  signin-btn-container mb-4'>
                  <button style={{ backgroundColor: '#D0D0D0' }} className='signin-btn border rounded-5 w-75 px-2 py-2 fw-bold  bg-transparent hide-on-mobile'><img src="https://img.icons8.com/?size=48&id=17949&format=png" alt="" className='me-3 google-icon' />Continue with Google</button>
                  <button className='signin-btn border  w-100  fw-bold hide-on-large-screen mt-3 p-2 mx-4'><img src="https://img.icons8.com/?size=48&id=17949&format=png" alt="" className='me-3 google-icon' /> Google</button>
                  <p className='hide-on-large-screen mt-4 mb-5 ms-3'>By sigining in, you agree to our <span className='text-primary'>Terms of Service </span>and<span className='text-primary'>Privacy policy </span></p>
                  <button style={{ backgroundColor: '#D0D0D0' }} className='border signin-btn rounded-5 w-75 px-2 py-2  mb-2 fw-bold bg-transparent hide-on-mobile'><img src="https://img.icons8.com/?size=50&id=30840&format=png" alt="" className='me-3 apple-icon' />Continue with Apple</button>
                </div>
              </div>
              <div className='checkout-container'>
                <div className='d-flex align-items-centre justify-content-between border rounded-3  age-box '>
                  <div className=' age-box-content '>
                    <p className='fw-bold' style={{ fontSize: '16px' }}>AED 199:</p>
                    <p style={{ fontSize: '12px' }}>Today will start</p>
                  </div>
                  <button className=' rounded-4 ctn-btn border-0 w-50 m-1 fw-bold' style={{
                    // backgroundImage:
                    //   "linear-gradient(to right,#FDD687, #F5A691)",
                    backgroundColor: "rgba(208, 208, 208, 1)",
                    width: "230px",
                    height: "50px",
                  }}>Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SigninComponent success={success} onPopupClose={handlePopupClose} />
      </div>
    </>
  )
}

export default SignInOtp