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

const Footer = () => {
  const navigate = useNavigate();
  const handleTermsandCondition = () => {
    navigate('/terms-condition');
  }
  const handlePrivacyPolicy = () => {
    navigate('/privacy-policy');
  }
  const handleContactForm = () => {
    navigate('/contact-form');
  }
  return (
    <Row className="footer-section mx-0">
      <Col md={2}></Col>
      <Col md={8} className="footer-container">
        <div className="footer-row-one">
          <img
            src="https://s3-alpha-sig.figma.com/img/78b9/389f/2cf01e69719e3a612116ce01a1738e47?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZWBbILj0Oh3FAXwEQV-KiWixiK6~0pZ~Tbef9yxU6l8UOHFr7fzS13RL9a~USNaRBcl-MmeofIlOcZB4yzBPkeUVZzBSXD7v~rLYIfJy~rJArKPMg-qxYjfdA5ZZErKCN5s0vP0ITuhJlNufFri1XKX4SfUCCvCkUTafGlO~yw~SO0bIessprTGtDAmsa2OkEsRS4Vc1d0vrEIWnS3MMMI~KAi3EOq0dTARwoSc~yYHgXyMH0qqF6OWBLySK5oVY8kOlceTnzxogDZRbrT9daK7chKzswRhRiTqw5yHPIBE3uhhvL-YzIRPLbHdAaQx0t-27B8y5CVlL47h5EUtHDA__"
            alt="logo"
          />
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
          <p onClick={handleTermsandCondition} style={{ cursor: "pointer" }}>Terms & condition</p>
          <p onClick={handlePrivacyPolicy} style={{ cursor: "pointer" }}>Privacy policy</p>
          <p onClick={handleContactForm} style={{ cursor: "pointer" }}>Contact</p>
        </div>
      </Col>
      <Col md={2}></Col>
    </Row>
  );
};

export default Footer;
