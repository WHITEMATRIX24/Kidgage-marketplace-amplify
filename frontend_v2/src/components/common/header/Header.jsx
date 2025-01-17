import React from "react";
import logo from '../../../assets/logo.png';
import UserDetailsPopup from '../../userDetailsPopup/UserDetailsPopup';
import { Col, Row } from "react-bootstrap";
import './Header.css';

function Header() {
    return (
        <div className="Header-container">
            <Row>
                <Col md={1} />
                <Col md={9}>
                    <div className="header-content">
                        <img
                            src={logo}
                            className="header-logo"
                            alt="Company Logo"
                        />
                        <UserDetailsPopup />
                    </div>
                </Col>
                <Col md={1} />
            </Row>
        </div>
    );
}

export default Header;
