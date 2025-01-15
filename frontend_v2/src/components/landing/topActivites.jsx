import React, { useEffect, useState } from "react";
import "./topActivites.css";
import { Link } from "react-router";
import { getAllActivitesApi } from "../../services/allApis";

const TopActivites = () => {
  const [activitesData, setActivitesData] = useState([]);

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
    <div className="d-flex flex-column gap-4">
      <div className="d-flex flex-column gap-1">
        <h6 className="m-0 fs-3 fw-bold">Top Activites</h6>
        <p className="m-0 fw-medium">Fun that shapes the future</p>
      </div>
      <div className="cards-container">
        <div className="cards-content-wrapper">
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
      </div>
    </div>
  );
};

export default TopActivites;
