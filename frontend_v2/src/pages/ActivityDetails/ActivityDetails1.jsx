import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ActivityDetailsInnerpage1 from '../../components/ActivityDetailsInnerPage/ActivityDetailsInnerpage1';
import './ActivityDetails.css';
import CampDetails from '../CampDetails/CampDetails';

function ActivityDetails1() {
    return (
        <>
            <div className="activity-details-row">
                <div className="activity-details-left">
                    <div className="activity-img-container-1">
                        <img
                            className="activity-image-1"
                            src="https://s3-alpha-sig.figma.com/img/805d/1f6b/b81629c19ca3ebeb8dc7604d3083c71e?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hwvGJXWfoANxMwH~BIlADVx5EXYX9w03x8wf6yE4BXnaqNKFmBA3O0t0rFxCZGih-K7spSlcNcHlB9Z5Q6jK0wSw3QkAw0uLtyLnBsYlgJ0-yoapBpG7b-enzj-3x0kaWHVpluj2u6K5CD~c3gfa9P9TbJVUDlC7-D8cnFbYPP-fes89dtRUVLy0OroGlEBaB8d19ihEMkG7p4MbG74fBfCxSweJZ8BYrokowK2aYG1G0UBW67ChIn8bbBYS1Qm8Sp54v02zSHR2FW3ttFamqNNP7NrW7dfiL8zMLOVOdcnJOloSSNDgMTZKmPvMa2fWWOkp95S7zuo57PcTi6bCuA__"
                            alt="Activity"
                        />
                    </div>

                    {/* <button className="activity-button">About This Activity</button> */}

                    <CampDetails />

                </div>
                <div className="activity-details-right">
                    <div className="activity-content">
                        <ActivityDetailsInnerpage1 />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ActivityDetails1;
