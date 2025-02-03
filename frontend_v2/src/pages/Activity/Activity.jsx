import React, { useContext, useEffect, useState } from "react";
import Banner from "../../components/common/banner/banner";
import Search from "../../components/common/search/search";
import { getAllActivityByCategoryApi } from "../../services/allApis";
import { Link, useParams } from "react-router";
import "./Activity.css";
import { fromAndToDateFormatter } from "../../utils/dateFormater";
import { BookingCourseContext } from "../../context/bookingContext";

function ActivityPage() {
  const { setCourseBookingData } = useContext(BookingCourseContext);
  const { category } = useParams();
  const [activitesBasedonCategory, setActivitesBasedonCategory] = useState([]);

  // initial data fetching
  const getActivityInitialData = async () => {
    const data = await getAllActivityByCategoryApi({ category });
    if (data) setActivitesBasedonCategory(data);
  };

  useEffect(() => {
    if (category) {
      getActivityInitialData();
    }
    return () => setCourseBookingData(null);
  }, [category]);

  return (
    <div className="d-flex flex-column gap-5 pb-5">
      <Search />
      <Banner />
      <div className="activitypage-container w-100">
        <h1 className="text-align-left fw-bold">{category}</h1>
        <h5 className="pb-3">Fun That Shapes The Future</h5>
        <div className="activity-grid-container">
          {activitesBasedonCategory.length > 0 ? (
            activitesBasedonCategory.map((activity) => (
              <Link
                to={`/activity-detail/${activity._id}`}
                className="activity-tile text-decoration-none text-black"
                key={activity._id}
              >
                <img
                  src={activity.images[0]}
                  className="img-fluid"
                  alt="Image 1"
                />
                <h6 className="fw-bold pt-3 text-align-left m-0">
                  {activity.name}
                </h6>
                <p className="text-align-left" style={{ marginBottom: "0" }}>
                  {activity.location[0].city}
                </p>
                {/* <p>
                  {fromAndToDateFormatter(activity.startDate, activity.endDate)}
                </p> */}
              </Link>
            ))
          ) : (
            <p>No activites found</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default ActivityPage;
