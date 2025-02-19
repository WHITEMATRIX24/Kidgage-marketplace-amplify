import React, { useContext, useEffect, useState } from "react";
import "./TimingPopup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { ageFormatter } from "../../utils/ageFormatter";
import { SelectedCourseContext } from "../../context/courseContext";
import { BookingCourseContext } from "../../context/bookingContext";
import { formatTimeToString } from "../../utils/dateFormater";

const TimingPopup = ({ closeTimePopup, cnfEnableHandler }) => {
  const { selectedCourseData } = useContext(SelectedCourseContext);
  const { bookingCourseData, setCourseBookingData } =
    useContext(BookingCourseContext);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(
    bookingCourseData?.courseDuration?.selectedTimeSlot || null
  );

  //   time slot change handler
  const handleTimeslotChange = (e) => {
    setSelectedTimeSlot(JSON.parse(e.target.value));
  };

  //   continue handler
  const handleContinue = () => {
    setCourseBookingData({
      ...bookingCourseData,
      courseDuration: {
        ...bookingCourseData.courseDuration,
        selectedTimeSlot: selectedTimeSlot,
      },
    });
    cnfEnableHandler(
      `${bookingCourseData.courseDuration.duration}${bookingCourseData.courseDuration.durationUnit}`
    );
    closeTimePopup();
  };
  console.log(selectedTimeSlot);

  return (
    <div className="PopupCalendar">
      <div className="calendar-popup">
        <div className="calendar">
          <div className="row cal-close">
            <div className="text-end">
              <button className="cal-close-button" onClick={closeTimePopup}>
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
            {selectedCourseData?.timeSlots.map((timeSlot, index) => (
              <div
                key={index}
                className="timing-box align-items-center justify-content-between px-1 mx-3"
              >
                <div className="timing-text mx-1">
                  <p className="mb-0" style={{ color: "#D0D0D0" }}>
                    Morning
                  </p>
                  <h4 className="timing-slot">
                    {formatTimeToString(`${timeSlot.from}-${timeSlot.to}`)}
                  </h4>
                </div>
                <input
                  type="radio"
                  name="timing-slot"
                  className="timing-order-checkbox"
                  checked={
                    selectedTimeSlot
                      ? selectedTimeSlot.from === timeSlot.from &&
                        selectedTimeSlot.to === timeSlot.to
                      : false
                  }
                  value={JSON.stringify(timeSlot)}
                  onChange={handleTimeslotChange}
                  style={{ width: "30px", height: "30px" }}
                />
              </div>
            ))}
          </div>

          <div className="row calendarButtons  mt-3 mx-1 px-1">
            <div className="timeslotDropdown col-6 col-lg-5 p-1 ps-2">
              {/* Custom up arrow */}
              <h6 className="m-0 fw-bold fs-5">{`QAR ${
                bookingCourseData.courseDuration.fee || ""
              }`}</h6>
              <p className="m-0">{`${bookingCourseData.courseDuration.noOfSessions} Sessions`}</p>
            </div>
            <div className="col-6 col-lg-7">
              <button
                className={`${
                  selectedTimeSlot
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
  );
};

export default TimingPopup;
