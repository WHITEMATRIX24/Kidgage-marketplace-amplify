import React, { useContext, useEffect, useState } from "react";
import "../CalendarPopup/CalendarPopup.css";
import './TimingPopup.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleUp,
    faArrowLeft,
    faArrowRight,
    faX,
} from "@fortawesome/free-solid-svg-icons";
import { BookingCourseContext } from "../../context/bookingContext";
import {
    checkTheDatesBeforeOrAfterThePackageDates,
    getSelectedDatedBasedOnPackageName,
    getTheinitialSelectedPackage,
} from "../../utils/bookingCalenderhelper";
import { SelectedCourseContext } from "../../context/courseContext";
import { ageFormatter } from "../../utils/ageFormatter";

const TimingPopup = ({
    isVisible,
    onClose,
    data,
    select_cnf_btn,
    coustomData,
    courseAvailableDays,
    timeSlots,
}) => {
    const daysData = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
    const { setCourseBookingData, bookingCourseData } =
        useContext(BookingCourseContext);
    const { selectedCourseData } = useContext(SelectedCourseContext);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDates, setSelectedDates] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(
        getTheinitialSelectedPackage({
            data,
            existingData: bookingCourseData?.courseDuration,
            coustomData,
        })
    );
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(
        bookingCourseData?.courseDuration?.selectedTimeSlot || ""
    );
    const [timeSlotData, setTimeSlotData] = useState(timeSlots || []);


    const handleContinue = () => {
        const { duration, durationUnit, endDate, startDate, noOfSessions, fee } =
            selectedPackage;

        if (
            selectedDates.length <= 0 ||
            !duration ||
            !durationUnit ||
            !startDate ||
            !endDate ||
            !noOfSessions ||
            !fee
        )
            return;

        setCourseBookingData({
            ...bookingCourseData,
            courseDuration: {
                duration: duration,
                durationUnit: durationUnit,
                startDate: startDate,
                endDate: endDate,
                bookedDates: selectedDates,
                noOfSessions,
                selectedTimeSlot,
                fee,
            },
        });
        select_cnf_btn(`${duration}${durationUnit}`);
        onClose();
    };

    useEffect(() => {
        if (selectedPackage) {
            setCurrentDate(new Date(selectedPackage.startDate));
            bookingCourseData &&
                setSelectedDates(
                    getSelectedDatedBasedOnPackageName({
                        existingData: bookingCourseData.courseDuration,
                        compareData: selectedPackage,
                    })
                );
        }
    }, [selectedPackage]);

    return isVisible ? (
        <div className="PopupCalendar">
            <div className="calendar-popup">
                <div className="calendar">
                    <div className="row cal-close">
                        <div className="text-end">
                            <button className="cal-close-button" onClick={onClose}>
                                <FontAwesomeIcon icon={faX} />
                            </button>
                        </div>
                    </div>
                    <div className="calenderHeading mx-3 m-2">
                        <h2 className="fw-bold">{selectedCourseData.name}</h2>
                        <h3>{`Age Limit: ${ageFormatter({
                            rawStartAge: selectedCourseData.ageGroup[0].ageStart,
                            rawEndAge: selectedCourseData.ageGroup[0].ageEnd,
                        })}`}</h3>
                    </div>
                    <div className="timing-container">
                        {[...Array(5)].map((_, index) => (

                            <div key={index} className="timing-box align-items-center justify-content-between px-1 mx-3">
                                <div className="timing-text mx-1">
                                    <p className="mb-0" style={{ color: "#D0D0D0" }}>Morning</p>
                                    <h4 className="timing-slot">9:00 am - 10:00 am</h4>
                                </div>
                                <input
                                    type="radio"
                                    name="timing-slot"
                                    className="timing-order-checkbox"
                                    style={{ width: "30px", height: "30px" }}
                                />
                            </div>

                        ))}
                    </div>


                    <div className="row calendarButtons  mt-3 mx-1 px-1">
                        <div className="timeslotDropdown col-6 col-lg-5 p-1 ps-2">
                            {/* <select
                className="timeSlot p-2 rounded"
                value={selectedTimeSlot}
                onChange={(e) => setSelectedTimeSlot(e.target.value)}
              >
                <option value="" disabled>
                  Select Time Slot
                </option>
                {timeSlotData.map((time) => (
                  <option value={`${time.from}-${time.to}`} key={time._id}>
                    {`${time.from} - ${time.to}`}
                  </option>
                ))}
              </select>
              <span className="dropdown-arrow">
                <FontAwesomeIcon icon={faAngleUp} />
              </span>{" "} */}
                            {/* Custom up arrow */}
                            <h6 className="m-0 fw-bold fs-5">{`QAR ${selectedPackage?.fee || ""
                                }`}</h6>
                            <p className="m-0">{`${selectedPackage?.noOfSessions} Sessions`}</p>
                        </div>
                        <div className="col-6 col-lg-7">
                            <button
                                className={`${selectedDates.length > 0
                                    ? "CalContinueButton"
                                    : "CalContinueDeselectButton"
                                    }`}
                                onClick={handleContinue}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default TimingPopup;
