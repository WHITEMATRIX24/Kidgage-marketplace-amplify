import React, { useContext, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import './UserDetailsPopup.css';
import '../common/header/Header.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import profileIcon from '../../assets/icon/Group.png';
import { userDataContext } from "../../context/LoginUserContext";


function UserDetailsPopup() {
    const {userData} = useContext(userDataContext)
    const [show, setShow] = useState(false);
    const [user,setUser] = useState({})
    

    const [isLogin,setIsLogin] = useState(false)

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(()=>{
        if(sessionStorage.getItem("user")){
            setUser({})
            setIsLogin(true)
            const currentUser = JSON.parse(sessionStorage.getItem("user"))
            console.log(currentUser);
            setUser(currentUser)
            console.log(user);
            
           

        }

    },[userData])
    return (
        <>
            {!isLogin &&<h4 className="header-login" onClick={handleShow}>Login</h4>}
            {isLogin &&<h4 onClick={handleShow}><FontAwesomeIcon className="text-light fs-2" icon={faBars} /></h4>}

            {/* Popup Modal */}
            {show && (
                <div className="popup">
                    <div className="header-popup-container"></div>
                    <div className="header-popup-content">
                        <div className="profile-container">
                            <div className='row'>
                                <div className='header-h2'><h2>Profile</h2></div>
                                <div className='text-end'>
                                    <button className="close-button" onClick={handleClose}><FontAwesomeIcon icon={faX} /></button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="profile-details">
                                    <div className='profile-icon'>
                                        <img
                                            src={profileIcon}
                                        />
                                    </div>
                                    <div className="profile-info">
                                        <p className="profile-name">{user.name}</p>
                                        <p className='profile-email'>{user.email}</p>

                                    </div>
                                </div>
                                <div className="booking-details">
                                    <div className='profile-icon'>
                                        <img
                                            src={profileIcon}
                                        />
                                    </div>
                                    <div >
                                        <p className="my-booking">My Bookings</p>

                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="bussiness-header-h2"><h2>Bussiness</h2></div>
                                <div className="profile-details">
                                    <div className='profile-icon'>
                                        <img
                                            src={profileIcon}
                                        />
                                    </div>
                                    <div className="profile-info">
                                        <p className="profile-name">Activity Manager</p>
                                        <p className='profile-email'>The pass for your order has<br />
                                            been created.</p>

                                    </div>
                                </div>
                                <hr className="hr-popup" />

                                <div className="profile-details">
                                    <div className='profile-icon'>
                                        <img
                                            src={profileIcon}
                                        />
                                    </div>
                                    <div className="profile-info">
                                        <p className="profile-name">Get Started</p>
                                        <p className='profile-email'>The pass for your order has<br />
                                            been created.</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            )
            }
        </>
    );

};

export default UserDetailsPopup;
