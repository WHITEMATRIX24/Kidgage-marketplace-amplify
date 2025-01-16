import React from "react";
import { Row, Col } from "react-bootstrap";
import "./mainLayout.css";
import Header from "../components/common/header/Header";
import Footer from "../components/common/footer/footer";
import { Outlet, useLocation } from "react-router";

const MainLayout = () => {
  const location = useLocation();

  // Exclude footer for the activity details page
  const hideFooterRoutes = ["/activity-details", "/", "/signin", "/signin-otp", "/order-summary", "/signin-success"];

  return (
    <>
      <Header />
      <Row className="m-0">
        <Col md={2} />
        <Col md={8} className="content-layout">
          <Outlet />
        </Col>
        <Col md={2} />
      </Row>
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};

export default MainLayout;
