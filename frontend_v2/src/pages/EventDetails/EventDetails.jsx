import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useParams } from "react-router";
import { getEventDetailsByIdApi } from "../../services/allApis"; // Import your API function
import "./EventDetails.css";

function EventDetails() {
    const [eventDetails, setEventDetails] = useState(null);
    const { eventId } = useParams();

    const fetchEventDetails = async () => {
        console.log({ eventId })
        const data = await getEventDetailsByIdApi({ eventId }); // Fetch event details
        if (data) setEventDetails(data);
    };

    useEffect(() => {
        if (eventId) fetchEventDetails();
    }, [eventId]);
    const formatEventDate = (startDate, endDate) => {
        const options = { day: "2-digit", month: "short", year: "numeric" };

        const formattedStartDate = new Date(startDate)
            .toLocaleDateString("en-GB", options)
            .replace(",", "")
            .toLowerCase();
        const formattedEndDate = new Date(endDate)
            .toLocaleDateString("en-GB", options)
            .replace(",", "")
            .toLowerCase();

        return (<>
            {formattedStartDate} to  {formattedEndDate}
        </>
        );
    };

    if (!eventDetails) return <p>Loading...</p>;
    const handleBookingClick = () => {
        if (eventDetails.link) {
            window.location.href = eventDetails.link; // Redirect to event link
        } else {
            alert("Booking link not available.");
        }
    };

    return (
        <div className="activity-details-row-1">
            <div className="activity-details-left-1">
                <div className="activity-img-container-1">
                    <img
                        className="activity-image-1"
                        src={eventDetails.image}
                        alt={eventDetails.name}
                    />
                </div>
                <div className="hide-on-mobile">
                    <div className="event-details-btn-container">
                        <h6 style={{ paddingLeft: "20px", paddingTop: "10px" }}>
                            {formatEventDate(eventDetails.startDate, eventDetails.endDate)}</h6>
                        <button className="event-details-button" onClick={handleBookingClick}>
                            <h6>Booking</h6>
                        </button>
                    </div>
                </div>
            </div>
            <div className="activity-details-right-1">
                <div className="rounded-4 activity-content-1">
                    <div className="event-details-heading fw-bold">
                        <h2 className="fw-bold">{eventDetails.name}</h2>
                        {/* <h6>Organised by {eventDetails.organiser}</h6> */}
                    </div>
                    <div className="event-details-description">
                        <h6>Surprise! We are back with</h6>
                        <p style={{ fontSize: "16px" }}>{eventDetails.description}</p>
                    </div>
                </div>
            </div>
            <div className="checkout-container">
                <div className="d-flex align-items-centre justify-content-between border rounded-3  age-box ">
                    <div className=" age-box-content ">
                        <p className="fw-bold" style={{ fontSize: "10px", marginTop: "15px" }}>
                            {formatEventDate(eventDetails.startDate, eventDetails.endDate)}
                        </p>

                    </div>
                    <button
                        className=" rounded-4 ctn-btn border-0 w-50 m-1 fw-bold"
                        style={{
                            backgroundImage: "linear-gradient(to right,#FDD687, #F5A691)",
                            width: "230px",
                            height: "50px",
                        }}
                        onClick={handleBookingClick}

                    >
                        Booking
                    </button>
                </div>
            </div>
        </div >
    );
}

export default EventDetails;
