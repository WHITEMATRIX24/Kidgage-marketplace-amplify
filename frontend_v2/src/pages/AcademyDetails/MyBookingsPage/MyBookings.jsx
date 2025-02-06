import React, { useEffect, useState } from "react";
// import { jsPDF } from 'jspdf';

import "./MyBookings.css";
import logo from "../../../assets/KIDGAGE.png";
import {
  getExistingUserDetailsByIdAPi,
  getProviderDetailsApi,
} from "../../../services/allApis";
import { findFirstDate, findLastDate } from "../../../utils/dateFormater";

function MyBooking() {
  const [load, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [bookings, setBookings] = useState([]);
  /* const [bookingData, setBookingData] = useState({
    bookingId: '12345',
    customerName: 'John Doe',
    BookingDate: '2025-02-01',
    EventSartDate: '2025-02-07',
    EventEmdDate: '2025-02-07',
    eventName:'One Football Camp',
    academyName:'Aspire Academy',
    totalNoOfSessions:'3',
    totalAmount: '$500',
    paymentDetails: [
      { paymentMethod: 'Credit Card', amount: '$200', date: '2025-02-01' },
    ],
  }); */

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      const currentUser = JSON.parse(sessionStorage.getItem("user"));
      //console.log(currentUser);
      setUser(currentUser);
      getUserData(currentUser._id);
      /* setBookings(currentUser.bookings)
            console.log(bookings) */
    }
  }, []);

  const getUserData = async (id) => {
    const result = await getExistingUserDetailsByIdAPi(id);
    console.log(result);
    setBookings(result.userData.bookings);
  };

  //function to generate pdf

  //   const generatePDF = async (bookingData) => {
  // console.log(bookingData);

  //     const result = await getProviderDetailsApi(bookingData)
  //     //console.log(result);
  //     const startDate = findFirstDate(bookingData.courseDuration.bookedDates)

  //     const lastDate = findLastDate(bookingData.courseDuration.bookedDates)

  //     const doc = new jsPDF();
  //      // Set light green background color for the logo and company name area
  //      doc.setFillColor( '#ACC29E'); // RGB color for light green
  //      doc.rect(0, 0, 210, 30, 'F');  // Draw filled rectangle covering the header area (A4 page width is 210mm)

  //     // Add logo (positioning and size may need adjustment)
  //     /* const logoImage = logo;  // Path to your logo image
  //     doc.addImage(logoImage, 'PNG', 55, 5, 20, 20); // x, y, width, height */

  //     // Add company name
  //     doc.setFontSize(24);
  //     doc.setFont('helvetica', 'bold');
  //     doc.setTextColor('white')
  //     doc.text('Kidgage', 80, 18);

  //     doc.setFontSize(14);
  //     doc.setTextColor('black')
  //     doc.setFont('helvetica', 'normal');
  //     doc.text(`Thankyou ${user.email} For Your Booking. `, 20, 50);
  //     doc.setFontSize(16);
  //     doc.setTextColor('#ACC29E')

  //     if(bookingData.status){doc.text(`Your Booking was Successfull.`, 20, 60);
  //     doc.setTextColor('black')}
  //     else{

  //         doc.text(`Your Booking was Under Verification.`, 20, 60);
  //         doc.setTextColor('black')
  //     }

  //     // Add title for the booking details
  //     doc.setFontSize(16);
  //     doc.text('Booking Details', 20, 75);

  //     // Add booking data
  //     doc.setFontSize(12);
  //     doc.text(`Booking ID:  #${bookingData.bookingId}`, 20, 85);
  //     doc.text(`Email: ${user.email}`, 20, 95);
  //     doc.text(`Academy Name: ${result.username}`, 20, 105);

  //     doc.text(`Event Name: ${bookingData.courseName}`, 20, 115);
  //     doc.text(`Booking Date: ${bookingData.bookingDate.slice(0,9)}`, 20, 125);
  //     doc.text(`Course Duration: ${bookingData.courseDuration.duration} ${bookingData.courseDuration.durationUnit} `, 20, 135);
  //     doc.text(`Start Date: ${startDate.slice(0,10)}`, 20, 145);
  //     doc.text(`End Date: ${lastDate.slice(0,10)}`, 20, 155);
  //     doc.text(`Total No of Sessions: ${bookingData.courseDuration.noOfSessions}`, 20, 165);

  //     doc.setFontSize(14);
  //     doc.text(`Payment Details`, 20, 175);
  //     // Add payment details table header
  //     const startY = 185;
  //     // Draw the table headers with borders
  //     const cellPadding = 5;
  //     const columnWidths = [60, 50, 60]; // Widths for each column
  //     const tableHeaders = ['Payment Method', 'Amount', 'Payment Date'];

  //     // Draw headers
  //     doc.setFontSize(12);
  //     tableHeaders.forEach((header, index) => {
  //       const x = 20 + columnWidths.slice(0, index).reduce((a, b) => a + b, 0); // Calculate x position based on previous columns
  //       const y = startY;
  //       doc.text(header, x + cellPadding, y + cellPadding);

  //       // Draw the top border for the header
  //       doc.rect(x, y, columnWidths[index], 10);  // x, y, width, height
  //     });

  //     // Draw payment details rows with borders

  //       const rowY = startY + (0 + 1) * 10;

  //       // Draw cells with text and borders
  //       doc.text((bookingData.paymentDetails.paymentMethod.replace(/-/g, ' ').split(' ') // Split the string into words
  //       .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter of each word
  //       .join(' ') // Join the words back together with spaces
  //     ), 20 + cellPadding, rowY + cellPadding);
  //       doc.rect(20, rowY, columnWidths[0], 10);  // Payment Method cell
  //       doc.text(`QAR ${(bookingData.courseDuration.fee)}`, 20 + columnWidths[0] + cellPadding, rowY + cellPadding);
  //       doc.rect(20 + columnWidths[0], rowY, columnWidths[1], 10);  // Amount cell
  //       if(bookingData.paymentDetails.isPaid){doc.text(payment.date, 20 + columnWidths[0] + columnWidths[1] + cellPadding, rowY + cellPadding);
  //       doc.rect(20 + columnWidths[0] + columnWidths[1], rowY, columnWidths[2], 10);  // Payment Date cell
  //       }

  //       else{
  //             doc.setTextColor('orange')

  //         doc.text("Pending", 20 + columnWidths[0] + columnWidths[1] + cellPadding, rowY + cellPadding);
  //       doc.rect(20 + columnWidths[0] + columnWidths[1], rowY, columnWidths[2], 10);  // Payment Date cell
  //       }

  //     // Draw bottom border for the entire table
  //     doc.rect(20, startY, columnWidths.reduce((a, b) => a + b, 0), (1 + 1) * 10);

  //     // Download the PDF
  //     doc.save('booking-data.pdf');
  //   };

  return (
    <div className="">
      <div className="my-booking-container">
        <div className="my-booking-heading">
          <h1>My Bookings</h1>
        </div>
        <div className="row">
          {bookings.map((item) => (
            <div className="col-xl-6 m-0 mt-4">
              <div key={item.bookingId} className="booking-box">
                <div className="booking-content">
                  <p className="booking-top-content">
                    {item.bookingDate} Booking ID: #{item.bookingId}
                  </p>
                  <div className="booking-button-content">
                    <div className="booking-text-content">
                      <h3>
                        Event{" "}
                        <span className="booking-text-span">
                          {item.courseName}
                        </span>
                      </h3>
                      {item.status ? (
                        <div>
                          {" "}
                          <p>
                            Status:{" "}
                            <span className="booking-status-text">
                              Booking Successfull
                            </span>{" "}
                          </p>
                        </div>
                      ) : (
                        <div>
                          {" "}
                          <p>
                            Status:{" "}
                            <span className="booking-status-text text-warning">
                              Pending
                            </span>{" "}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="booking-button ">
                      <button
                        // onClick={()=>generatePDF(item)}
                        className="booking-button-btn"
                      >
                        Download
                      </button>
                    </div>
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
