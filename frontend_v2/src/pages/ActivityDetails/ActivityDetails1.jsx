import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ActivityDetailsInnerpage1 from "../../components/ActivityDetailsInnerPage/ActivityDetailsInnerpage1";
import "./ActivityDetails-1.css";
import CampDetails from "../CampDetails/CampDetails";
import { useParams } from "react-router";
import { getActivitydetailsByIdApi } from "../../services/allApis";

function ActivityDetails1() {
  const { activityId } = useParams();
  const [activityDetails, setActivityDetails] = useState({
    isLoading: true,
    activityData: null,
  });

  // initial activity page data
  const getInitialActivityPageData = async () => {
    const data = await getActivitydetailsByIdApi({ activityId });
    if (data) {
      return setActivityDetails({ isLoading: false, activityData: data });
    } else {
      setActivityDetails({ isLoading: false, activityData: null });
    }
  };
  useEffect(() => {
    if (activityId) getInitialActivityPageData();
  }, [activityId]);
  console.log(activityDetails);

  //   loading check
  if (activityDetails.isLoading) return <p>loading......</p>;

  //   error check
  if (!activityDetails.isLoading && activityDetails.activityData == null)
    return <p>Something went wrong</p>;

  if (!activityDetails.isLoading && activityDetails.activityData != null)
    return (
      <>
        <div className="activity-details-row-1">
          <div className="activity-details-left-1">
            <div className="activity-img-container-1">
              <img
                className="activity-image-1"
                src={activityDetails?.activityData?.images[0]}
                alt="Activity"
              />
            </div>

            {/* <button className="activity-button">About This Activity</button> */}

            <CampDetails />
          </div>
          <div className="activity-details-right-1">
            <div className="activity-content-1">
              <ActivityDetailsInnerpage1
                activityData={activityDetails.activityData}
              />
            </div>
          </div>
        </div>
      </>
    );
}

export default ActivityDetails1;
