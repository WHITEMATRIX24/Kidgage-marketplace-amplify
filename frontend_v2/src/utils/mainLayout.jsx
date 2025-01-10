import React from "react";
import { Row, Col } from "react-bootstrap";
import "./mainLayout.css";

const MainLayout = ({ children }) => {
  return (
    <Row className="m-0">
      <Col md={2} />
      <Col md={8} className="content-layout">
        {children}
      </Col>
      <Col md={2} />
    </Row>
  );
};

export default MainLayout;
