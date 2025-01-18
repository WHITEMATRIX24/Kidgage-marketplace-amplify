import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faShareNodes } from "@fortawesome/free-solid-svg-icons";
// import ActivityDetailsInnerpage1 from '../../components/ActivityDetailsInnerPage/ActivityDetailsInnerpage1';
import "./SigninSuccess.css";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

function SigninSuccess() {
  const navigate = useNavigate();
  const handleContinue = () => {
    navigate("/order-summary");
  };
  return (
    <>
      <div className="activity-details-row-1">
        <div className="signinSuccessactivity-details-left">
          <div className="activity-img-container-1">
            <img
              className="activity-image-1"
              src="https://s3-alpha-sig.figma.com/img/805d/1f6b/b81629c19ca3ebeb8dc7604d3083c71e?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hwvGJXWfoANxMwH~BIlADVx5EXYX9w03x8wf6yE4BXnaqNKFmBA3O0t0rFxCZGih-K7spSlcNcHlB9Z5Q6jK0wSw3QkAw0uLtyLnBsYlgJ0-yoapBpG7b-enzj-3x0kaWHVpluj2u6K5CD~c3gfa9P9TbJVUDlC7-D8cnFbYPP-fes89dtRUVLy0OroGlEBaB8d19ihEMkG7p4MbG74fBfCxSweJZ8BYrokowK2aYG1G0UBW67ChIn8bbBYS1Qm8Sp54v02zSHR2FW3ttFamqNNP7NrW7dfiL8zMLOVOdcnJOloSSNDgMTZKmPvMa2fWWOkp95S7zuo57PcTi6bCuA__"
              alt="Activity"
            />
          </div>
          <div className="activity-btn-container-1">
            <button className="activity-button-1">About This Activity </button>
            <FontAwesomeIcon className="icon-arrow-1" icon={faArrowRight} />
          </div>
        </div>
        <div className="activity-details-right-1 ">
          <div
            className="signinSuccessshare-container float-end px-4"
            style={{
              borderTopLeftRadius: "0px",
              borderBottomLeftRadius: "15px",
              borderTopRightRadius: "15px",
              borderBottomRightRadius: "0px",
            }}
          >
            <span className="share-text">Edit</span>
          </div>
          <div className="signinSuccessactivity-content">
            <Row>
              <Col sm={12} md={6} lg={4} className="w-100">
                <div className="signinSuccessactivity-heading fw-bold mt-3 mt-xl-0 mt-xl-3">
                  <h2 className="campTitle">Evening Football Camp</h2>
                  <h6 className="campSubTitle">
                    Organised by ASPIRE SPORTS ACADEMY
                  </h6>
                </div>
              </Col>
            </Row>
            <div className="row signinSuccessCampDetails ms-0 ms-xl-3">
              <h3 className="campTitle3">1 Month pass </h3>
              <p>
                Economy, premium economy, business, and first class are the main
                seat classes. Economy is the most common and, Economy, premium
                economy,
              </p>
              <h4>Time: 9:00am to 11:00am</h4>
              <p>Age Limt: 06 to 10</p>
            </div>
            <div className="row signinSuccessPromoCodeDetails ms-0 ms-xl-3 mt-3">
              <div className="signinSuccessInputBoxContainer ">
                <input
                  className="form-control signinSuccessPromoCode"
                  placeholder="Promo Code"
                  type="text"
                />
                <button className="applyButton">Appy</button>
              </div>
            </div>
            <div className="signinSuccessOrderDetails ms-0 ms-xl-3 mt-3">
              <h3 className="orderTitle">Order Summary</h3>
              <div className="row mt-1 mt-md-0">
                <div className="col-6">
                  <h5 className="order">1 Month pass</h5>
                </div>
                <div className="col-6 text-end">
                  <h5 className="order">QAR 157.50</h5>
                </div>
              </div>
              <div className="row mt-1 mt-md-0">
                <div className="col-6">
                  <h5 className="order">Tax</h5>
                </div>
                <div className="col-6 text-end">
                  <h4 className="order">
                    <b>QAR 15.50</b>
                  </h4>
                </div>
              </div>
            </div>
            <div className="signinSuccessFinalDetails ms-0 ms-xl-3 mt-3 mb-4">
              <div className="row">
                <div className="col-6">
                  <h3 className="total">Total 199</h3>
                  <p className="font12">Today will start</p>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-center">
                  <button
                    className="signinSuccessContinueButton  "
                    onClick={handleContinue}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-lg-10 col-xl-4"></div> */}
        <div className="checkout-container">
          <div className="d-flex align-items-centre justify-content-between border rounded-3  age-box ">
            <div className=" age-box-content ">
              <p className="fw-bold" style={{ fontSize: "16px" }}>
                QAR 199:
              </p>
              <p style={{ fontSize: "12px" }}>Today will start</p>
            </div>
            <button
              className=" rounded-4 ctn-btn border-0 w-50 m-1 fw-bold"
              style={{
                backgroundImage: "linear-gradient(to right,#FDD687, #F5A691)",
                width: "230px",
                height: "50px",
              }}
              onClick={handleContinue}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SigninSuccess;
