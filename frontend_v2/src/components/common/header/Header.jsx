import React from "react";
import logo from '../../../assets/logo.png';
import UserDetailsPopup from '../../userDetailsPopup/UserDetailsPopup';
import { Col, Row } from "react-bootstrap";
import './Header.css';

function Header() {
    return (
        <div className="Header-container">
            <Row>
                <Col md={2} />
                <Col md={8}>
                    <div className="header-content">
                        <img
                            src={logo}
                            className="header-logo"
                            alt="Company Logo"
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
