import React, { useState } from "react";
import "./CalendarPopup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faArrowLeft,
  faArrowRight,
  faX,
} from "@fortawesome/free-solid-svg-icons";

const CalendarPopup = ({ isVisible, onClose, data }) => {
  const daysData = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [currentDate, setCurrentDate] = useState(
    new Date(data.courseStartDate)
  );
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);

    const startDate = new Date(data.courseStartDate);
    const endDate = new Date(data.courseEndDate);

    if (
      newDate.getMonth() >= startDate.getMonth() &&
      newDate.getMonth() <= endDate.getMonth()
    ) {
      setCurrentDate(newDate);
    }
  };

  const toggleDateSelection = (date) => {
    // const selectedDateString = date.toDateString();
    // if (selectedDates.includes(selectedDateString)) {
    //   setSelectedDates(selectedDates.filter((d) => d !== selectedDateString));
    // }

    let newSelectedDates = [];
    let count = 0;
    let selectedDate = new Date(date);
    const courseDurationDate = new Date(selectedDate);
    courseDurationDate.setDate(selectedDate.getDate() + 30);

    // while (count < 30 && selectedDate <= new Date(data.courseEndDate)) {
    //   const currentDayOfWeek = selectedDate.getDay();
    //   const isActiveDate = data?.totalActivityDays.includes(
    //     daysData[currentDayOfWeek]
    //   );

    //   if (isActiveDate) {
    //     newSelectedDates.push(selectedDate.toDateString());
    //     count++;
    //   }
    //   selectedDate.setDate(selectedDate.getDate() + 1);
    // }

    for (
      let day = selectedDate;
      day < courseDurationDate;
      day.setDate(day.getDate() + 1)
    ) {
      const currentDayOfWeek = selectedDate.getDay();

      if (data?.totalActivityDays.includes(daysData[currentDayOfWeek])) {
        newSelectedDates.push(day.toDateString());
      }
    }

    setSelectedDates(newSelectedDates);
  };

  const renderCalendar = () => {
    // date range
    const courseStartMonth = currentDate.getMonth();
    const courseStartYear = currentDate.getFullYear();

    const firstDayOfMonth = new Date(courseStartYear, courseStartMonth, 1);
    const lastDayOfMonth = new Date(courseStartYear, courseStartMonth + 1, 0);

    const daysInMonth = lastDayOfMonth.getDate();
    const startDay = firstDayOfMonth.getDay();

    const daysArray = [];
    for (let i = 0; i < startDay; i++) {
      daysArray.push(<div className="calendar-day empty" key={`empty-${i}`} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(courseStartYear, courseStartMonth, day);
      const dayOfWeek = currentDay.getDay();
      const isOffDays = !data?.totalActivityDays.includes(daysData[dayOfWeek]);
      const selected = selectedDates.includes(currentDay.toDateString());

      daysArray.push(
        <div
          className={`calendar-day ${isOffDays ? "disabled" : ""} ${
            selected ? "selected" : ""
          }`}
          key={`day-${day}`}
          onClick={isOffDays ? null : () => toggleDateSelection(currentDay)}
        >
          {day}
        </div>
      );
    }

    return daysArray;
  };

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

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
            <h1>Football Camp</h1>
            <h3>Age Limit: 06 to 10</h3>
          </div>
          <div className="row d-flex align-items-center justify-content-center p-3">
            <div className="col-6">
              <div className="calendar-header bg-dark px-2">
                <button
                  className="month-arrow prev text-light"
                  onClick={() => changeMonth(-1)}
                >
                  <FontAwesomeIcon
                    className="text-light ms-1"
                    icon={faArrowLeft}
                    size="sm"
                  />
                </button>
                <strong className="monthName text-light">
                  {currentDate.toLocaleString("default", { month: "long" })}
                </strong>
                <button
                  className="month-arrow next text-light"
                  onClick={() => changeMonth(1)}
                >
                  <FontAwesomeIcon
                    className="me-1"
                    icon={faArrowRight}
                    size="sm"
                  />
                </button>
              </div>
            </div>
            <div className="col-6">
              <select
                className="package p-2 rounded"
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
              >
                <option value="" disabled>
                  Package
                </option>
                <option value="basic">Basic</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </select>
            </div>
          </div>
          <div className="calendar-weekdays">
            {weekDays.map((day, index) => (
              <div className="calendar-day weekday" key={index}>
                {day}
              </div>
            ))}
          </div>
          <div className="calendar-grid">{renderCalendar()}</div>
          <div className="row calendarButtons rounded mt-3 mx-2  px-1">
            <div className="timeslotDropdown col-6 col-lg-5 p-1">
              <select
                className="timeSlot p-2 rounded"
                value={selectedTimeSlot}
                onChange={(e) => setSelectedTimeSlot(e.target.value)}
              >
                <option value="" disabled>
                  Select Time Slot
                </option>
                <option value="11am to 1pm">11am to 1pm</option>
                <option value="1pm to 3pm">1pm to 3pm</option>
                <option value="3pm to 5pm">3pm to 5pm</option>
              </select>
              <span className="dropdown-arrow">
                <FontAwesomeIcon icon={faAngleUp} />
              </span>{" "}
              {/* Custom up arrow */}
            </div>
            <div className="col-6 col-lg-7 p-1">
              <button className="CalContinueButton">Continue</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default CalendarPopup;
