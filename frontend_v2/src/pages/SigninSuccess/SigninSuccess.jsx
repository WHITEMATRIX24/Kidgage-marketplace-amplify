import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faShareNodes } from "@fortawesome/free-solid-svg-icons";
// import ActivityDetailsInnerpage1 from '../../components/ActivityDetailsInnerPage/ActivityDetailsInnerpage1';
import "./SigninSuccess.css";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { BookingCourseContext } from "../../context/bookingContext";
import { SelectedCourseContext } from "../../context/courseContext";
import { findFirstDate, formatTimeToString } from "../../utils/dateFormater";
import { ageFormatter } from "../../utils/ageFormatter";
import CampDetails from "../CampDetails/CampDetails";
import useRefreshAlert from "../../hooks/useRefreshAlert";

function SigninSuccess() {
  useRefreshAlert();
  const navigate = useNavigate();
  const { bookingCourseData } = useContext(BookingCourseContext);
  const { selectedCourseData } = useContext(SelectedCourseContext);

  // if not data redirect
  if (!bookingCourseData || !selectedCourseData)
    return window.location.replace("/home");

  const [selectedCourse, setSelectedCourse] = useState(
    selectedCourseData || {}
  );
  const [bookingDetails, setBBookingDetails] = useState(
    bookingCourseData || {}
  );
  const [totalFees, setTotalFees] = useState(
    bookingDetails.courseDuration.fee || ""
  );

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
              src={selectedCourse.images[0]}
              alt="Activity"
            />
          </div>
          {/* <div className="activity-btn-container-1">
            <button className="activity-button-1">About This Activity </button>
            <FontAwesomeIcon className="icon-arrow-1" icon={faArrowRight} />
          </div> */}
          <CampDetails activityData={selectedCourse} />
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
            <Row className="w-100">
              <Col sm={12} md={6} lg={4} className="w-100">
                <div className="signinSuccessactivity-heading fw-bold mt-3 mt-xl-0 mt-xl-3">
                  <h2 className="campTitle">{bookingDetails.courseName}</h2>
                  <h6 className="campSubTitle">
                    {`Organised by ${bookingDetails.providedAcademy}`}
                  </h6>
                </div>
              </Col>
            </Row>
            <div className="row signinSuccessCampDetails ms-0 ms-xl-3">
              <h3 className="campTitle3">{`${bookingDetails.courseDuration.duration} ${bookingDetails.courseDuration.durationUnit} pass `}</h3>
              <p className="m-0">
                {`Working days: ${selectedCourse?.days?.map(
                  (day) => ` ${day} `
                )}`}
              </p>
              <p>{`Starting day: ${findFirstDate(
                bookingDetails.courseDuration.bookedDates
              )}`}</p>
              <h4>{`Time: ${formatTimeToString(
                `${bookingDetails.courseDuration.selectedTimeSlot.from}-${bookingDetails.courseDuration.selectedTimeSlot.to}` ||
                  ""
              )}`}</h4>
              <p>{`Age Limt: ${selectedCourse.ageGroup.map((ages) =>
                ageFormatter({
                  rawStartAge: ages.ageStart,
                  rawEndAge: ages.ageEnd,
                })
              )}`}</p>
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
                  <h5 className="order">{`${bookingDetails.courseDuration.duration} ${bookingDetails.courseDuration.durationUnit} pass `}</h5>
                </div>
                <div className="col-6 text-end">
                  <h5 className="order">{`QAR ${bookingDetails.courseDuration.fee}`}</h5>
                </div>
              </div>
              <div className="row mt-1 mt-md-0">
                <div className="col-6">
                  <h5 className="order">Tax</h5>
                </div>
                <div className="col-6 text-end">
                  <h4 className="order">
                    <b>QAR 00.00</b>
                  </h4>
                </div>
              </div>
            </div>
            <div className="signinSuccessFinalDetails ms-0 ms-xl-3 mt-3 mb-4">
              <div className="row">
                <div className="col-6">
                  <h3 className="total m-3">{`Total: QAR ${totalFees} `}</h3>
                  {/* <p className="font12 m-0">Today will start</p> */}
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
              <p
                className="fw-bold"
                style={{ fontSize: "16px", marginTop: "15px" }}
              >
                {`Total: QAR ${bookingDetails.courseDuration.fee}`}
              </p>
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
