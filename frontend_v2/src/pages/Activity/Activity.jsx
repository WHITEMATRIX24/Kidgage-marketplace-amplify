import React, { useEffect, useState } from "react";
import Banner from "../../components/common/banner/banner";
import Search from "../../components/common/search/search";
import AcitivityImage1 from "../../assets/Activity1.png";
import AcitivityImage4 from "../../assets/Activity4.png";
import AcitivityImage2 from "../../assets/Activity2.png";
import AcitivityImage3 from "../../assets/Activity3.png";
import { Col, Container, Row } from "react-bootstrap";
import { getAllActivityByCategoryApi } from "../../services/allApis";
import { useParams } from "react-router";
import "./Activity.css";

function ActivityPage() {
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
  }, [category]);

  return (
    <div className="d-flex flex-column gap-5 pb-5">
      <Search />
      <Banner />
      <div className="activitypage-container w-100">
        <h1 className="text-align-left fw-bold"> Football</h1>
        <h5 className="pb-3">Fun That Shapes The Future</h5>
        <div className="activity-grid-container">
          {activitesBasedonCategory.length > 0 ? (
            activitesBasedonCategory.map((activity) => (
              <div className="activity-tile">
                <img
                  src={AcitivityImage1}
                  className="img-fluid"
                  alt="Image 1"
                />
                <h6 className="fw-bold pt-3 text-align-left">
                  Football Camp Name
                </h6>
                <p className="text-align-left" style={{ marginBottom: "0" }}>
                  Location: City, Country
                </p>
                <p>Available Dates: Jan 15 - Jan 20</p>
              </div>
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
