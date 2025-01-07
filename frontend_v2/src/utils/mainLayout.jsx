import React from "react";
import { Row, Col } from "react-bootstrap";

const MainLayout = ({ children }) => {
  return (
    <Row>
      <Col md={1} />
      <Col md={10}>{children}</Col>
      <Col md={1} />
    </Row>
  );
};

export default MainLayout;
