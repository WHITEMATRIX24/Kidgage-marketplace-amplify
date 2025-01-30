import React, { useEffect, useState } from "react";
import './MyBookings.css'
function MyBooking() {
    return (
        <div className="">
            <div className="my-booking-container">
                <div className="my-booking-heading">
                    <h1>My Bookings</h1>
                </div>
                <div className="my-booking-box">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="booking-box">
                            <div className="booking-content">
                                <p className="booking-top-content">16 Jan 2024, 7:05 AM Booking ID: #12675</p>
                                <div className="booking-button-content">
                                    <div className="booking-text-content">
                                        <h3 >
                                            Event <span className="booking-text-span">Camp Name</span>
                                        </h3>
                                        <p>Status: <span className="booking-status-text">Booking Successfull</span> </p>
                                    </div>
                                    <div className="booking-button">
                                        <button className="booking-button-btn">
                                            Download
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default MyBooking;
