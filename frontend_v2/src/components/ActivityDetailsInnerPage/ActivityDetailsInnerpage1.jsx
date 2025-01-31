import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./ActivityDetailsInnerpage1.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faLocationDot,
  faShareAlt,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";
import LocationDetails from "../../pages/LocationDetails/LocationDetails";
import CalendarPopup from "../../pages/CalendarPopup/CalendarPoup";
import { useNavigate } from "react-router";
import AcademyDetails from "../../pages/AcademyDetails/FootballAcademyDetails";
import { BookingCourseContext } from "../../context/bookingContext";
import { handleShare } from "../../utils/share";
import { ageFormatter } from "../../utils/ageFormatter";

function ActivityDetailsInnerpage1({ activityData }) {
  const navigate = useNavigate();
  const { bookingCourseData, setCourseBookingData } =
    useContext(BookingCourseContext);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [campDurationSelected, setCampDurationSelected] = useState(
    bookingCourseData?.courseDuration
      ? `${bookingCourseData.courseDuration.duration}${bookingCourseData.courseDuration.durationUnit}`
      : null
  );
  const [isAcademyVisible, setAcademyVisible] = useState(false);
  const [calenderActivityData, setCalenderActivityData] = useState({});
  const [coustomData, setCoustomData] = useState([]);
  const [courseAvailableDays, setCourseAvailableDays] = useState([]);
  const [selectedProviderId, setSelectedProviderId] = useState(null);
  const openCalendar = () => setIsCalendarVisible(true);
  const closeCalendar = () => setIsCalendarVisible(false);
  const openAcademyDetails = () => {
    setSelectedProviderId(activityData?.providerDetails?._id);
    // Store providerId
    setAcademyVisible(true);
    console.log("id pased", selectedProviderId);
  };

  const closeAcademyDetails = () => setAcademyVisible(false);
  const handleContinue = () => {
    if (campDurationSelected === null) return;
    const ifUserLogged = JSON.parse(sessionStorage.getItem("user"));
    if (ifUserLogged) return navigate("/signin-success");
    else return navigate("/signin");
  };

  // camp duration selection
  const handleSelectCoursePackeage = (
    activityDays,
    courseData,
    coustomData
  ) => {
    if (courseData) {
      setCalenderActivityData(courseData);
    } else setCalenderActivityData(null);

    setCourseBookingData({
      ...bookingCourseData,
      courseName: activityData.name,
      providedAcademy: activityData.providerDetails.fullName,
      courseId: activityData._id,
    });

    setCourseAvailableDays(activityDays);
    coustomData && setCoustomData(coustomData);
    openCalendar();
  };

  return (
    <>
      <Row>
        <Col sm={12} md={6} lg={4} className="w-100">
          <div
            className="share-container float-end px-4"
            style={{
              borderTopLeftRadius: "0px",
              borderBottomLeftRadius: "15px",
              borderTopRightRadius: "15px",
              borderBottomRightRadius: "0px",
            }}
          >
            <span
              onClick={() =>
                handleShare({
                  courseName: activityData.name,
                  courseDesc: activityData.description,
                })
              }
              className="share-text"
            >
              share
            </span>
            <FontAwesomeIcon className="share-icon" icon={faShareNodes} />
          </div>
          <div className="activity-heading fw-bold mt-4">
            <h2 className="fw-bold">{activityData.name}</h2>
            <h6>Organised by </h6>
            <h6 onClick={openAcademyDetails}>
              {" "}
              {activityData.name === "Evening Football Camp"
                ? "ASPIRE SPORTS ACADEMY"
                : activityData.providerDetails.fullName}
            </h6>
          </div>
        </Col>
      </Row>
      <div className="">
        <Row className="card-container-div g-1">
          {activityData?.courseDuration.slice(0, 2).map((courseType) => (
            <Col
              xs={6}
              sm={4}
              md={4}
              lg={4}
              className="d-flex  mt-2"
              key={courseType._id}
            >
              <Card className="d-flex card1 rounded-4">
                <Card.Body className="d-flex align-items-center justify-content-center flex-column">
                  <Card.Title>{`${courseType.duration} ${courseType.durationUnit}`}</Card.Title>
                  <Card.Text
                    className="text-center card-fnt-wt"
                    style={{ fontSize: "12px" }}
                  >
                    Seat Details and More options
                  </Card.Text>
                  <button
                    className={`border-0 mb-1 rounded-3 ${
                      campDurationSelected ===
                      `${courseType.duration}${courseType.durationUnit}`
                        ? "camp-duration-selected-btn"
                        : "card-btn"
                    }`}
                    onClick={() =>
                      handleSelectCoursePackeage(
                        activityData?.days,
                        courseType,
                        [courseType]
                      )
                    }
                  >
                    {campDurationSelected ===
                    `${courseType.duration}${courseType.durationUnit}`
                      ? "Selected"
                      : "Select"}
                  </button>
                </Card.Body>
              </Card>
            </Col>
          ))}
          <Col xs={12} sm={4} md={4} lg={4} className="d-flex  mt-2">
            <Card
              className="d-flex card3 rounded-4"
              onClick={() =>
                handleSelectCoursePackeage(
                  activityData.days,
                  null,
                  activityData.courseDuration
                )
              }
            >
              <Card.Body
                className=" d-flex align-items-center justify-content-center flex-column border rounded-4 px-3  m-1 custom-btn"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom,#FDD687, #F5A691)",
                }}
              >
                <div className="custom-btn">
                  <div className=" d-flex-coloum">
                    <Card.Title>Custom</Card.Title>
                    <Card.Text
                      className="text-center card-fnt-wt"
                      style={{ fontSize: "10px" }}
                    >
                      Seat Details and More options
                    </Card.Text>
                  </div>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "#000000" }}
                    className="fs-5 ms-4 cutom-arrow"
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="">
          <Col sm={12} md={4} lg={4} className="w-100">
            <div className="border rounded my-3 p-1 map-box ">
              <div className="d-flex">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  style={{ color: "#00040a", fontSize: "24px" }}
                  className="mx-3 mt-2"
                />
                <div style={{ lineHeight: "1px" }} className="flex-column mt-3">
                  <p className="fw-bold" style={{ fontSize: "18px" }}>
                    {" "}
                    {activityData.name === "Evening Football Camp"
                      ? "ASPIRE SPORTS ACADEMY"
                      : activityData.providerDetails.fullName}
                  </p>
                  <p style={{ fontSize: "12px", marginTop: "30px" }}></p>
                </div>
              </div>

              <LocationDetails
                providerId={activityData?.providerDetails?._id}
              />
            </div>
          </Col>
        </Row>

        <div className="age-container">
          <Row className="">
            <Col sm={12} md={6} lg={4} className="w-100">
              <div className="d-flex align-items-centre justify-content-between border rounded-3  age-box ">
                <div className=" age-box-content ">
                  <p className="fw-bold" style={{ fontSize: "16px" }}>
                    Age Limit:
                  </p>
                  <p style={{ fontSize: "12px" }}>
                    {ageFormatter({
                      rawStartAge: activityData.ageGroup[0].ageStart,
                      rawEndAge: activityData.ageGroup[0].ageEnd,
                    })}
                  </p>
                </div>
                <button
                  className={`ctn-btn border-0 w-50 m-1 fw-bold ${
                    campDurationSelected ? "activate-continue-btn" : ""
                  }`}
                  onClick={handleContinue}
                >
                  Continue
                </button>
              </div>
            </Col>
          </Row>
        </div>
        {isCalendarVisible && (
          <CalendarPopup
            isVisible={isCalendarVisible}
            onClose={closeCalendar}
            data={calenderActivityData || null}
            courseAvailableDays={courseAvailableDays}
            select_cnf_btn={setCampDurationSelected}
            coustomData={coustomData}
            timeSlots={activityData.timeSlots}
          />
        )}
        {isAcademyVisible && (
          <AcademyDetails
            isVisible={isAcademyVisible}
            onClose={closeAcademyDetails}
            providerId={selectedProviderId} // Pass providerId
          />
        )}
      </div>
    </>
  );
}

export default ActivityDetailsInnerpage1;
