import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ActivityDetailsInnerpage1 from "../../components/ActivityDetailsInnerPage/ActivityDetailsInnerpage1";
import "./ActivityDetails-1.css";
import CampDetails from "../CampDetails/CampDetails";
import { useParams } from "react-router";
import { getActivitydetailsByIdApi } from "../../services/allApis";
import { SelectedCourseContext } from "../../context/courseContext";

function ActivityDetails1() {
  const { setSelectedCourseData } = useContext(SelectedCourseContext);
  const { activityId } = useParams();
  const [activityDetails, setActivityDetails] = useState({
    isLoading: true,
    activityData: null,
  });

  // initial activity page data
  const getInitialActivityPageData = async () => {
    const data = await getActivitydetailsByIdApi({ activityId });
    if (data) {
      setSelectedCourseData(data);
      return setActivityDetails({ isLoading: false, activityData: data });
    } else {
      setActivityDetails({ isLoading: false, activityData: null });
    }
  };
  useEffect(() => {
    if (activityId) getInitialActivityPageData();
  }, [activityId]);

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
                // src="https://s3-alpha-sig.figma.com/img/805d/1f6b/b81629c19ca3ebeb8dc7604d3083c71e?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hwvGJXWfoANxMwH~BIlADVx5EXYX9w03x8wf6yE4BXnaqNKFmBA3O0t0rFxCZGih-K7spSlcNcHlB9Z5Q6jK0wSw3QkAw0uLtyLnBsYlgJ0-yoapBpG7b-enzj-3x0kaWHVpluj2u6K5CD~c3gfa9P9TbJVUDlC7-D8cnFbYPP-fes89dtRUVLy0OroGlEBaB8d19ihEMkG7p4MbG74fBfCxSweJZ8BYrokowK2aYG1G0UBW67ChIn8bbBYS1Qm8Sp54v02zSHR2FW3ttFamqNNP7NrW7dfiL8zMLOVOdcnJOloSSNDgMTZKmPvMa2fWWOkp95S7zuo57PcTi6bCuA__"
                alt="Activity"
              />
            </div>

            {/* <button className="activity-button">About This Activity</button> */}

            <CampDetails activityData={activityDetails.activityData} />
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
