import React from "react";
import { Row, Col } from "react-bootstrap";
import "./mainLayout.css";
import Header from "../components/common/header/Header";
import Footer from "../components/common/footer/footer";
import { Outlet, useLocation } from "react-router";
import FloatingNavbar from "../components/flotingNavbar/floatingNavbar";

const MainLayout = () => {
  const location = useLocation();

  // Exclude footer for the activity details page
  const hideFooterRoutes = [
    "/activity-detail",
    "/signin",
    "/signin-otp",
    "/order-summary",
    "/signin-success",
    "/event-details",
  ];

  return (
    <>
      <Header />
      <Row className="m-0">
        <Col md={1} />
        <Col md={9} className="content-layout">
          <Outlet />
        </Col>
        <Col md={1} />
      </Row>
      {!hideFooterRoutes.some((route) =>
        location.pathname.startsWith(route)
      ) && <Footer />}
      {/* floating navbar */}
      <FloatingNavbar />
    </>
  );
};

export default MainLayout;
