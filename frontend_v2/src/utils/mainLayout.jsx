import React from "react";
import { Row, Col } from "react-bootstrap";
import "./mainLayout.css";
import Header from "../components/common/header/Header";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Row className="m-0">

        <Col md={2} />
        <Col md={8} className="content-layout">
          {children}
        </Col>
        <Col md={2} />
      </Row>
    </>
  );
};

export default MainLayout;
