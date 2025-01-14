import React from "react";
import './ContactForm.css'
import image from '../../assets/contactForm.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
function ContactForm() {
    return (
        <div className=" w-100 ">
            <div className='contact-form-container  w-100' >
                <div className="contact-form-left-container text-start w-100">
                    <h1 className="fw-bold" style={{ textAlign: "left" }}> Contact Us </h1>
                    <h5 className="pb-3">Fun That Shapes The Future</h5>
                    <div className="contact-form-image-container">
                        <img
                            src={image}
                            alt='Kigage Contact Form Image'
                            className="contact-form-image" />
                    </div>
                </div>
                <div className="contact-form-rigth-container w-100">
                    <div className="contact-form-form">
                        <form className="w-100">
                            <label className="fw-bold pb-2">Name</label><br />
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="contact-form-input w-100 px-3" />
                            <label className="fw-bold pb-2">Email</label><br />
                            <input
                                type="text"
                                placeholder="Enter your email"
                                className="contact-form-input w-100 px-3" />
                            <label className="fw-bold pb-2">Message</label><br />
                            <textarea
                                rows="3"
                                placeholder="Enter your message"
                                className="contact-form-input w-100 px-3" />

                        </form>
                        <div className="">
                            <button className="text-start w-100 contact-form-submit-button">
                                Submit
                            </button>
                            <FontAwesomeIcon className='fs-5 map-arrow' icon={faArrowRight} style={{ marginLeft: '-31px', color: '#ffff' }} />
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}
export default ContactForm