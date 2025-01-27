import React, { useContext, useEffect, useState } from "react";
import '../ActivityDetails/ActivityDetails-1.css';
import './EventDetails.css';
import CampDetails from "../CampDetails/CampDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faShareNodes } from "@fortawesome/free-solid-svg-icons";

function EventDetails() {

    return (
        <>
            <div className="activity-details-row-1">
                <div className="activity-details-left-1">
                    <div className="activity-img-container-1">
                        <img
                            className="activity-image-1"
                            // src={selectedCourseData?.images[0]}
                            src="https://s3-alpha-sig.figma.com/img/805d/1f6b/b81629c19ca3ebeb8dc7604d3083c71e?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hwvGJXWfoANxMwH~BIlADVx5EXYX9w03x8wf6yE4BXnaqNKFmBA3O0t0rFxCZGih-K7spSlcNcHlB9Z5Q6jK0wSw3QkAw0uLtyLnBsYlgJ0-yoapBpG7b-enzj-3x0kaWHVpluj2u6K5CD~c3gfa9P9TbJVUDlC7-D8cnFbYPP-fes89dtRUVLy0OroGlEBaB8d19ihEMkG7p4MbG74fBfCxSweJZ8BYrokowK2aYG1G0UBW67ChIn8bbBYS1Qm8Sp54v02zSHR2FW3ttFamqNNP7NrW7dfiL8zMLOVOdcnJOloSSNDgMTZKmPvMa2fWWOkp95S7zuo57PcTi6bCuA__"
                            alt=""
                        />
                    </div>
                    <div className="hide-on-mobile">
                        <div className="event-details-btn-container">
                            {/* <button className='w-100 activity-button text-start rounded-4' >About This Activities</button>        */}
                            <h6 style={{ paddingLeft: "20px", paddingTop: "10px" }}>Date: Jan 6 to 8</h6>
                            <button className="event-details-button"> <h6>Booking</h6>
                                <FontAwesomeIcon className="event-icon-arrow" icon={faArrowRight} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="activity-details-right-1">
                    <div className="rounded-4 activity-content-1">
                        <div
                            className="share-container float-end px-4"
                            style={{
                                borderTopLeftRadius: "0px",
                                borderBottomLeftRadius: "15px",
                                borderTopRightRadius: "15px",
                                borderBottomRightRadius: "0px",
                            }}
                        >
                            <span className="share-text">share</span>
                            <FontAwesomeIcon className="share-icon" icon={faShareNodes} />
                        </div>
                        <div className="event-details-heading fw-bold">
                            <h2 className="fw-bold">Event Name</h2>
                            <h6>Organised by </h6>
                        </div>
                        <div className="event-details-description">
                            <h6 style={{ marginBottom: "15px" }}>Surprise! We’re back with</h6>
                            <p>Sporthood Academy for Football brings the latest in coaching methodologies to take your budding football star from grassroots to greatness. AFC and FIFA licensed coaches impart age-appropriate international curriculum to the kids with the primary aim of moulding them into professional footballers.
                                Working in association with BFC Soccer Schools, our coaching philosophy targets the holistic development of the child while incorporating a true lifelong passion for the game. Our best players even get a chance win scholarships and scouted by the famous Bengaluru Football Club.</p>
                            <p>Sporthood Academy for Football brings the latest in coaching methodologies to take your budding football star from grassroots to greatness. AFC and FIFA licensed coaches impart age-appropriate international curriculum to the kids with the primary aim of moulding them into professional footballers.
                                Working in association with BFC Soccer Schools, our coaching philosophy targets the holistic development of the child while incorporating a true lifelong passion for the game. Our best players even get a chance win scholarships and scouted by the famous Bengaluru Football Club.
                                Sporthood Academy for Football brings the latest in coaching methodologies to take your budding football star from grassroots to greatness. AFC and FIFA licensed coaches impart age-appropriate international curriculum to the kids with the primary aim of moulding them into professional footballers.</p>
                        </div>
                    </div>
                </div>
                <div className="checkout-container">
                    <div className="d-flex align-items-centre justify-content-between border rounded-3  age-box ">
                        <div className=" age-box-content ">
                            <p className="fw-bold" style={{ fontSize: "16px", marginTop: "15px" }}>
                                Date : jan 6 to 8
                            </p>

                        </div>
                        <button
                            className=" rounded-4 ctn-btn border-0 w-50 m-1 fw-bold"
                            style={{
                                backgroundImage: "linear-gradient(to right,#FDD687, #F5A691)",
                                width: "230px",
                                height: "50px",
                            }}

                        >
                            Booking
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EventDetails;
