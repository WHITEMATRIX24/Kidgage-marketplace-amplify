import React, { useEffect, useState } from "react";
import "./recentEvents.css";
import { getAllRecentEventsApi } from "../../services/allApis";
import { dateFormater } from "../../utils/dateFormater";
import { Link, useNavigate } from "react-router";

const RecentEvents = () => {
  const [recentEvents, setRecentEvents] = useState([]);
  const navigate = useNavigate();

  // Fetch initial data
  const getRecentEventsInitialData = async () => {
    const data = await getAllRecentEventsApi();
    if (data) setRecentEvents(data);
    console.log("event-details", data);
  };

  useEffect(() => {
    getRecentEventsInitialData();
  }, []);

  const eventdetails = (eventId) => {
    if (!eventId) {
      console.error("Invalid eventId:", eventId);
      return;
    }
    navigate(`/event-details`, { state: { eventId } });
  };
  return (
    <div className="recentEvents-container w-100">
      <div className="recentEvents-header">
        <h1 className="mb-0 text-align-left recent-events-heading">Recent Events</h1>
        <h6 className="mb-0 recent-events-subheading">Fresh Updates, Just for You</h6>
      </div>
      <div className="recentEvents-grid-container">
        {recentEvents.length > 0 ? (
          recentEvents.map((recentEvent) => (
            <div className="recentEvents-tile" key={recentEvent._id}>
              <Link
                to={`/event-details/${recentEvent._id}`}
                key={recentEvent._id}
              >
                <img
                  src={recentEvent.image}
                  className="img-fluid"
                  alt="event image"
                // onClick={() => eventdetails(recentEvent._id)}
                />
              </Link>
              <h6 className="fw-bold pt-3 text-align-left">{recentEvent.name}</h6>
              <div className="d-flex justify-content-between">
                <p className="text-align-left" style={{ marginBottom: "0" }}>{recentEvent.location}</p>
              </div>
              <p>{`Date: ${dateFormater(recentEvent.startDate)}`}</p>

            </div>
          ))
        ) : (
          <p>No recent events</p>
        )}
      </div>
    </div>
  );
};

export default RecentEvents;
