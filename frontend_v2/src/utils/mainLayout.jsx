import React from "react";
import { Row, Col } from "react-bootstrap";
import "./mainLayout.css";
import Header from "../components/common/header/Header";
import Footer from "../components/common/footer/footer";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <>
      {/* <Header /> */}
      <Row className="m-0">
        <Col md={2} />
        <Col md={8} className="content-layout">
          <Outlet />
        </Col>
        <Col md={2} />
      </Row>
      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;
