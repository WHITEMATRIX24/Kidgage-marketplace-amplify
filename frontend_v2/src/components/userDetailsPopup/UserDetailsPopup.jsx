import React, { useContext, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./UserDetailsPopup.css";
import "../common/header/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import profileIcon from "../../assets/icon/Group.png";
import ticketIcon from "../../assets/icon/ticket.png";
import settingsIcon from "../../assets/icon/settings.png";
import penIcon from "../../assets/icon/pen.png";
import { userDataContext } from "../../context/LoginUserContext";
import { useNavigate } from "react-router";
import SigninPopup from "../SigninPopup/SigninPopup";

function UserDetailsPopup({ viewFromFloatingNav, navBtnHandler }) {
  const { userData } = useContext(userDataContext);
  const [show, setShow] = useState(viewFromFloatingNav || false);
  const [showSigninPopup, setShowSigninPopup] = useState(false);

  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);

  const handleShow = () => setShow(!show);
  const handleClose = () => {
    viewFromFloatingNav && navBtnHandler(false);
    setShow(false);
    setShowSigninPopup(false);
  };
  const handleCloseSigninPopup = () => {
    setShowSigninPopup(false);
  };
  const handleSignUp = () => {
    setShow(false);
    setShowSigninPopup(true);
  };

  const handleLogout = () => {
    setShow(false);
    sessionStorage.removeItem("user");
    setIsLogin(false);
  };

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      setUser({});
      setIsLogin(true);
      const currentUser = JSON.parse(sessionStorage.getItem("user"));
      console.log(currentUser);
      setUser(currentUser);
      console.log(user);
    }
  }, [userData]);
  const handleGetStarted = () => {
    handleClose();
    navigate("/provider-joining-form");
  };

  const handleBookingPageNavigation = () => {
    handleClose();
    navigate("/mybooking");
  };
  return (
    <>
      {!isLogin && !viewFromFloatingNav && (
        <h4 className="header-login" onClick={handleShow}>
          Login
        </h4>
      )}
      {isLogin && !viewFromFloatingNav && (
        <h4 className="ms-auto" onClick={handleShow}>
          <FontAwesomeIcon className="text-light fs-2" icon={faBars} />
        </h4>
      )}

      {/* Popup Modal */}
      {show && (
        <div className="popup">
          <div className="header-popup-container"></div>
          <div className="header-popup-content">
            <div className="profile-container">
              <div className="customerProfile">
                <div className="row">
                  <div className="header-h2">
                    <h2>Profile</h2>
                  </div>
                  <div className="text-end">
                    <button className="close-button" onClick={handleClose}>
                      <FontAwesomeIcon icon={faX} />
                    </button>
                  </div>
                </div>
                {isLogin && (
                  <div className="row">
                    <div className="profile-details">
                      <div className="profile-icon">
                        <img src={profileIcon} />
                      </div>
                      <div className="profile-info">
                        <p className="profile-name">{user.name}</p>
                        <p className="profile-email">{user.email}</p>
                      </div>
                    </div>
                    <div
                      className="booking-details"
                      onClick={handleBookingPageNavigation}
                    >
                      <div className="profile-icon">
                        <img src={ticketIcon} />
                      </div>
                      <div>
                        <p className="my-booking">My Bookings</p>
                      </div>
                    </div>
                    {/* <div className="booking-details" onClick={handleLogout}>
                                        <div className='profile-icon'>
                                            <img
                                                src={profileIcon}
                                            />
                                        </div>
                                        <div >
                                            <p className="my-booking">LogOut</p>
    
                                        </div>
                                    </div> */}
                  </div>
                )}
                {!isLogin && (
                  <div className=" d-flex align-items-center ">
                    <div
                      className="bussiness-header-h2 mt-3"
                      onClick={handleSignUp}
                    >
                      <p className="text-light profile-email">
                        Login to Kidgage.com{" "}
                      </p>
                      <div className="booking-details mt-2">
                        <div className="profile-icon">
                          <img src={profileIcon} />
                        </div>
                        <div>
                          <p className="my-booking">Sign In</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="row px-4">
                <div className="bussiness-header-h2">
                  <h2>Business</h2>
                </div>
                <div className="profile-details">
                  <div className="profile-icon">
                    <img src={settingsIcon} />
                  </div>
                  <div className="profile-info">
                    <a
                      href="https://admin.kidgage.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="profile-name"
                      style={{
                        cursor: "pointer",
                        textDecoration: "none",
                        color: "white",
                      }}
                    >
                      Activity Manager
                    </a>
                    <p className="profile-email">
                      Manage and monitor your academy activities seamlessly.
                    </p>
                  </div>
                </div>
                <hr className="hr-popup" />

                <div className="profile-details">
                  <div className="profile-icon">
                    <img src={penIcon} />
                  </div>
                  <div className="profile-info" onClick={handleGetStarted}>
                    <p
                      className="profile-name"
                      style={{
                        cursor: "pointer",
                        textDecoration: "none",
                        color: "white",
                      }}
                    >
                      Get Started
                    </p>
                    <p className="profile-email">
                      Register your academy and become a part of Kidgage.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showSigninPopup && (
        <SigninPopup setShowSigninPopup={setShowSigninPopup} />
      )}
    </>
  );
}

export default UserDetailsPopup;
