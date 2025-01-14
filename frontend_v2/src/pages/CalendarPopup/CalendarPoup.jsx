import React, { useState } from 'react';
import '../CalendarPopUp/CalendarPopup.css'; // Import the styles for the calendar popup
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faArrowLeft, faArrowRight, faX } from '@fortawesome/free-solid-svg-icons';

const CalendarPopup = () => {
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDates, setSelectedDates] = useState([]);

    const openCalendar = () => setIsCalendarVisible(true);
    const closeCalendar = () => setIsCalendarVisible(false);

    // Function to handle month change
    const changeMonth = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + direction); // +1 for next month, -1 for previous month
        setCurrentDate(newDate);
    };

    // Function to toggle date selection
    const toggleDateSelection = (date) => {
        const selectedDateString = date.toDateString();

        if (selectedDates.includes(selectedDateString)) {
            // If date is already selected, remove it
            setSelectedDates(selectedDates.filter((d) => d !== selectedDateString));
        } else {
            // Otherwise, add it to the selected dates array
            setSelectedDates([...selectedDates, selectedDateString]);
        }
    };

    // Render the days of the current month
    const renderCalendar = () => {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);

        const daysInMonth = lastDayOfMonth.getDate();
        const startDay = firstDayOfMonth.getDay();

        const daysArray = [];
        for (let i = 0; i < startDay; i++) {
            daysArray.push(<div className="calendar-day empty" key={`empty-${i}`} />);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const currentDay = new Date(year, month, day);
            const dayOfWeek = currentDay.getDay();
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // 0 is Sunday, 6 is Saturday
            const selected = selectedDates.includes(currentDay.toDateString());

            daysArray.push(
                <div
                    className={`calendar-day ${isWeekend ? 'disabled' : ''} ${selected ? 'selected' : ''}`}
                    key={`day-${day}`}
                    onClick={isWeekend ? null : () => toggleDateSelection(currentDay)}
                >
                    {day}
                </div>
            );
        }

        return daysArray;
    };

    const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];


    const [selectedPackage, setSelectedPackage] = useState('');
    const [SelectedTimeSlot, setSelectedTimeSlot] = useState('');


    const handleChange = (event) => {
        setSelectedPackage(event.target.value);
    };
    const handleChangeTimeSlot = (event) => {
        setSelectedTimeSlot(event.target.value);
    };


    return (
        <div>
            <button className="open-calendar-btn" onClick={openCalendar}>
                Open Calendar
            </button>

            {isCalendarVisible && (
                <div className='PopupCalendar'>
                    <div className="calendar-popup">
                        <div className="calendar">
                            <div className='row cal-close'>
                                <div className='text-end'>
                                    <button className="cal-close-button" onClick={closeCalendar}><FontAwesomeIcon icon={faX} /></button>
                                </div>
                            </div>
                            <div className='calenderHeading m-3'>
                                <h1>Football camp</h1>
                                <h3>Agre Limt: 06 to 10</h3>
                            </div>
                            <div className="row d-flex align-items-center justify-content-center p-3">
                                <div className="col-6 "><div className="calendar-header bg-dark px-2 ">
                                    <button
                                        className="month-arrow prev text-light"
                                        onClick={() => changeMonth(-1)}
                                    >
                                        <FontAwesomeIcon className='text-light ms-1' icon={faArrowLeft} size='sm' />
                                    </button>
                                    <strong className='monthName text-light'>
                                        {new Date(currentDate).toLocaleString('default', { month: 'long' })}{' '}
                                        {/*                 {new Date(currentDate).getFullYear()}
     */}              </strong>
                                    <button
                                        className="month-arrow next text-light"
                                        onClick={() => changeMonth(1)}
                                    >
                                        <FontAwesomeIcon className='me-1' icon={faArrowRight} size='sm' />
                                    </button>
                                </div></div>
                                <div className="col-6">
                                    <div>
                                        
                                        <select
                                            className='package p-2 rounded'
                                            id="packages"
                                            value={selectedPackage}
                                            onChange={handleChange}
    
                                        >
                                            <option className='package ' value="" disabled>
                                                Package
                                            </option>
                                            <option value="basic">Basic</option>
                                            <option value="standard">Standard</option>
                                            <option value="premium">Premium</option>
                                        </select>
    
                                    </div>
                                </div>
                            </div>
    
                            {/* Weekdays Row */}
                            <div className="calendar-weekdays">
                                {weekDays.map((day, index) => (
                                    <div className="calendar-day weekday" key={index}>
                                        {day}
                                    </div>
                                ))}
                            </div>
                            <div className="calendar-grid">
                                {renderCalendar()}
                            </div>
                            <div className='row calendarButtons rounded mt-3 mx-2  py-2'>
                                <div className="col-6 p-1">
                                    <div className='timeslotDropDown px-1'>
                                        
                                        <select
                                            className='timeSlot p-2 rounded'
                                            id="packages"
                                            value={SelectedTimeSlot}
                                            onChange={handleChangeTimeSlot}
    
                                        >
                                            <option className='timeSlot ' value="" disabled>
                                                9am to 11am 
                                            </option>
                                            <option value="11am to 1pm">11am to 1pm</option>
                                            <option value="1pm to 3pm">1pm to 3pm</option>
                                            <option value="3pm to 5pm">3pm to 5pm</option>
                                        </select>
                                       <span className="dropdown-arrow"><FontAwesomeIcon icon={faAngleUp} /></span> {/* Custom up arrow */}
                                    </div>
                                    </div>
                                <div className="col-6 p-1 ">
                                    <button className='CalContinueButton  '>Continue</button>
                                </div>
                            </div>
                        </div>
    
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarPopup;
