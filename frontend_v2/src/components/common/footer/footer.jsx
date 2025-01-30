import React from "react";
import { Col, Row } from "react-bootstrap";
import "./footer.css";
import {
  faFacebook,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import logo from "../../../assets/logo.png";

const Footer = () => {
  const navigate = useNavigate();
  const handleTermsandCondition = () => {
    navigate("/terms-condition");
  };
  const handlePrivacyPolicy = () => {
    navigate("/privacy-policy");
  };
  const handleContactForm = () => {
    navigate("/contact-form");
  };
  return (
    <Row className="footer-section mx-0">
      <Col md={2}></Col>
      <Col md={8} className="footer-container">
        <div className="footer-row-one">
          <img src={logo} alt="logo" />
          <div className="footer-help-container">
            <p className="m-0 ps-3">
              Looking to advertise an activity? We can help.
            </p>
            <button>List your academy</button>
          </div>
          <div className="footer-social-container">
            <FontAwesomeIcon icon={faFacebook} size="2xl" />
            <FontAwesomeIcon icon={faWhatsapp} size="2xl" />
            <FontAwesomeIcon icon={faInstagram} size="2xl" />
          </div>
        </div>
        <div className="footer-row-two">
          <p onClick={handleTermsandCondition} style={{ cursor: "pointer" }}>
            Terms & condition
          </p>
          <p onClick={handlePrivacyPolicy} style={{ cursor: "pointer" }}>
            Privacy policy
          </p>
          <p onClick={handleContactForm} style={{ cursor: "pointer" }}>
            Contact
          </p>
        </div>
      </Col>
      <Col md={2}></Col>
    </Row>
  );
};

export default Footer;
