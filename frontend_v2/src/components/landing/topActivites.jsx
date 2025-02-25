import React, { useEffect, useState } from "react";
import "./topActivites.css";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { getAllActivitesApi } from "../../services/allApis";

const TopActivites = () => {
  const [activitesData, setActivitesData] = useState([]);

  // scroll to left handler
  const handleScrollToleft = () => {
    const targetedElement = document.getElementById(
      "topActivites-scroll-container"
    );
    targetedElement.scrollBy({
      left: -250,
      behavior: "smooth",
    });
  };

  // scroll to right handler
  const handleScrollToRight = () => {
    const targetedElement = document.getElementById(
      "topActivites-scroll-container"
    );
    targetedElement.scrollBy({
      left: 250,
      behavior: "smooth",
    });
  };

  // initial data fetching
  const getActivityInitialData = async () => {
    const data = await getAllActivitesApi();
    if (data) {
      setActivitesData(data);
    }
  };
  useEffect(() => {
    getActivityInitialData();
  }, []);

  return (
    <div className="d-flex flex-column gap-4" id="activites">
      <div className="d-flex flex-column gap-1">
        <h6 className="m-0 top-activites-header">Top Activites</h6>
        <p className="m-0 top-activites-subheader">
          Fun that shapes the future
        </p>
      </div>
      <div className="cards-container">
        <div
          id="topActivites-scroll-container"
          className="cards-content-wrapper"
        >
          {activitesData.length > 0 ? (
            activitesData.map((activity) => (
              <Link
                to={{ pathname: `/activites/${activity.name}` }}
                key={activity._id}
                className="card-box"
              >
                <img src={activity.image} alt="activity-image" />
                <button className="card-box-btn">{activity.name}</button>
              </Link>
            ))
          ) : (
            <p>No data</p>
          )}
        </div>
        <button
          className="cards-container-btn card-btn-left"
          onClick={handleScrollToleft}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <button
          className="cards-container-btn card-btn-right"
          onClick={handleScrollToRight}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    </div>
  );
};

export default TopActivites;
