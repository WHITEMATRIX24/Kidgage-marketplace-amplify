import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./Thankyou.css";
import CampDetails from "../CampDetails/CampDetails";
import { BookingCourseContext } from "../../context/bookingContext";
import { findFirstDate } from "../../utils/dateFormater";
import { Link, useNavigate } from "react-router";
import { SelectedCourseContext } from "../../context/courseContext";
import {
  addEventToCalenderApi,
  getActivitydetailsByIdApi,
  getMoreCampDetailsByProviderApi,
} from "../../services/allApis";
import AcademyDetails from "../AcademyDetails/FootballAcademyDetails";
import Swal from "sweetalert2";

function Thankyou() {
  const { selectedCourseData } = useContext(SelectedCourseContext);
  const navigate = useNavigate();
  const { bookingCourseData } = useContext(BookingCourseContext);
  const [otherCourses, setOtherCourses] = useState([]);
  const [providerName, setProviderName] = useState("");
  const [providerId, setProviderId] = useState("");
  const [isAcademyVisible, setAcademyVisible] = useState(false);
  const openAcademyDetails = () => {
    setAcademyVisible(true);
  };
  const closeAcademyDetails = () => setAcademyVisible(false);

  useEffect(() => {
    if (selectedCourseData?._id) {
      fetchCourseDetails(selectedCourseData._id);
      fetchOtherCourses(selectedCourseData._id);
      sessionStorage.setItem(
        "selectedCource",
        JSON.stringify(selectedCourseData)
      );
    }
  }, [selectedCourseData]);
  const fetchCourseDetails = async (courseId) => {
    try {
      const response = await getActivitydetailsByIdApi({
        activityId: courseId,
      });
      console.log("course", response);
      if (response && response.providerDetails?.fullName) {
        setProviderName(response.providerDetails.fullName);
        setProviderId(response.providerDetails?._id);
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };
  // useEffect(() => {
  //   console.log("coursedata", selectedCourseData);
  //   if (selectedCourseData?._id) {
  //     fetchOtherCourses(selectedCourseData._id);

  //   }
  // }, [selectedCourseData]);
  const fetchOtherCourses = async (courseId) => {
    try {
      console.log("Fetching other courses...");
      const response = await getMoreCampDetailsByProviderApi({ courseId });

      console.log("Response received in fetchOtherCourses:", response); // Check structure

      if (Array.isArray(response)) {
        setOtherCourses(response);
      } else {
        console.warn("Unexpected response format, setting empty array");
        setOtherCourses([]);
      }
    } catch (error) {
      console.error("Error fetching other courses:", error);
      setOtherCourses([]);
    }
  };

  // create event in calender handler
  const handleCreateCalenderEvent = async () => {
    const userData = JSON.parse(sessionStorage.getItem("user"));

    const response = await addEventToCalenderApi({
      userId: userData._id,
      bookingId: bookingCourseData.bookingId,
    });
    if (!response) return alert("something went wrong on adding to calender");

    Swal.fire({
      title: "Added successfully",
      text: "Congrats! You have successfully added the event on google calender",
      icon: "success",
      confirmButtonColor: "#ACC29E",
      customClass: {
        popup: "custom-border-radius",
      },
    });
  };

  useEffect(() => {
    console.log("Updated otherCourses:", otherCourses);
    console.log("provider Name", providerName);
    console.log("provider ID", providerId);
  }, [otherCourses]);
  const handleBookingPageNavigation = () => {
    navigate("/mybooking");
  };
  //   prevent from going back
  useEffect(() => {
    const handlePopState = () => {
      navigate("/home", { replace: true });
    };

    window.history.pushState(null, "", window.location.href);
    window.onpopstate = handlePopState;

    return () => {
      window.onpopstate = null;
    };
  }, [navigate]);

  return (
    <div className="activity-details-row-1">
      {/* <div className='thankYouOuterDiv row '> */}
      <div className="activity-details-right-1">
        <div className="thanksLeftOrder">
          <h1 className="">Thanks for order!</h1>
          <h6>{`Your order number is ${bookingCourseData?.bookingId}`}</h6>
          <h6 className="mt-3">
            The pass for your order has been created. Please check the
            <span className="myTickets" onClick={handleBookingPageNavigation}>
              <u> ‘My Bookings’ </u>
            </span>
            page or email shortly.
          </h6>
          <div className="eventAttending mt-4">
            <h6>You are attending</h6>
            <h1 className="eventName">{bookingCourseData?.courseName}</h1>
            {/* <h6>Event location</h6> */}
          </div>
          <p className="sendWhatsapp mt-4">Send pass via WhatsApp</p>
          <div className="row ">
            <h6 className="inputBoxContainer col-md-7">
              <input
                className="form-control whatsAppNoInput"
                placeholder="Add mobile number"
                type="text"
              />
              <button className="thanksSentButton">Sent</button>
            </h6>
            <div className="col-md-5">
              <p className="smallText">
                Your pass will be send to{" "}
                <span className="thanksEmail">xxxxxxxx@gmail.com</span>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="inputBoxContainer col-md-12 w-100">
              <input
                className="form-control calender "
                defaultValue={`${findFirstDate(
                  bookingCourseData.courseDuration.bookedDates
                )}`}
                type="text"
                readOnly
              />
              <button
                className="addToCalenderButton"
                onClick={handleCreateCalenderEvent}
              >
                Add to Calender
              </button>
            </div>
          </div>
        </div>

        <CampDetails activityData={selectedCourseData} />
      </div>
      <div className="activity-details-right-1">
        <div className="rightDivContent mt-4 mt-xl-0  ps-md-4 ">
          <h1 className="tittle">More camp</h1>
          <h3 className="subTitle mb-3">
            Organised by{" "}
            <u onClick={openAcademyDetails}>
              {providerName || "Unknown Provider"}
            </u>
          </h3>
          <div className="tileImageContainer">
            {otherCourses?.slice(0, 4).map((course) => (
              <div key={course._id} className="eventTiles">
                <Link
                  to={`/activity-detail/${course._id}`}
                  className="activity-tile text-decoration-none text-black"
                  key={course._id}
                >
                  <img
                    className="tileImage w-100"
                    src={course.images[0]}
                    alt=""
                  />
                  <div className="eventDetails">
                    <h4>{course.name}</h4>
                    <div className="eventDetailsText d-flex justify-content-between">
                      <p>
                        {course.location?.[0]?.city || "No address available"}
                      </p>
                    </div>
                    <p>
                      Days: {course.days?.join(", ") || "No days specified"}
                    </p>
                  </div>
                </Link>
              </div>
            )) ?? <p>No other courses available.</p>}
          </div>
        </div>
        {/* <div className="tileImageContainer">
          <div className="row ">
            <div className="eventTiles col-6">
              <div className="w-100">
                <img className="tileImage w-100" src={tileImage1} alt="" />
                <div className="eventDetails">
                  <h4 className="EventTitle">This camp Name</h4>
                  <div className="eventDetailsText d-flex justify-content-between">
                    <p>Dubai,1 main rode</p>
                    <p>6.2Km</p>
                  </div>
                  <p>Camp Days: SUD to FRI</p>
                </div>
              </div>
            </div>
            <div className="eventTiles col-6">
              <div className="w-100">
                <img className="tileImage w-100" src={tileImage2} alt="" />
                <div className="eventDetails">
                  <h4 className="EventTitle">This camp Name</h4>
                  <div className="eventDetailsText d-flex justify-content-between">
                    <p>Dubai,1 main rode</p>
                    <p>6.2Km</p>
                  </div>
                  <p>Camp Days: SUD to FRI</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="eventTiles col-6">
              <div className="w-100">
                <img className="tileImage w-100" src={tileImage3} alt="" />
                <div className="eventDetails">
                  <h4>This camp Name</h4>
                  <div className="d-flex justify-content-between">
                    <p>Dubai,1 main rode</p>
                    <p>6.2Km</p>
                  </div>
                  <p>Camp Days: SUD to FRI</p>
                </div>
              </div>
            </div>
            <div className="eventTiles col-6">
              <div className="w-100">
                <img className="tileImage w-100" src={tileImage4} alt="" />
                <div className="eventDetails">
                  <h4>This camp Name</h4>
                  <div className="d-flex justify-content-between">
                    <p>Dubai,1 main rode</p>
                    <p>6.2Km</p>
                  </div>
                  <p>Camp Days: SUD to FRI</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {isAcademyVisible && (
          <AcademyDetails
            isVisible={isAcademyVisible}
            onClose={closeAcademyDetails}
            providerId={providerId} // Pass providerId
          />
        )}
      </div>
    </div>
  );
}

export default Thankyou;
