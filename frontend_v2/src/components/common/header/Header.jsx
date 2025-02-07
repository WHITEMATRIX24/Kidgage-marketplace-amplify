import React from "react";
import logo from "../../../assets/logo.png";
import UserDetailsPopup from "../../userDetailsPopup/UserDetailsPopup";
import { Col, Row } from "react-bootstrap";
import "./Header.css";
import { useNavigate } from "react-router";
function Header() {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/home");
  };
  return (
    <div className="Header-container">
      <Row>
        <Col md={1} />
        <Col md={10}>
          <div className="header-content">
            <img
              src={logo}
              className="header-logo"
              alt="Company Logo"
              style={{ cursor: "pointer" }}
              onClick={handleLogoClick}
            />
            <UserDetailsPopup />
          </div>
        </Col>
        <Col md={2} />
      </Row>
    </div>
  );
}

export default Header;
