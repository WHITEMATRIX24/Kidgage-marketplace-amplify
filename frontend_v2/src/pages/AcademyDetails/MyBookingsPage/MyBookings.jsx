import React, { useEffect, useState } from "react";
import { jsPDF } from 'jspdf';

import './MyBookings.css'
import logo from '../../../assets/logo.png';

function MyBooking() {
//function to generate pdf
const [bookingData, setBookingData] = useState({
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
  });

  const generatePDF = () => {

    const doc = new jsPDF();
     // Set light green background color for the logo and company name area
     doc.setFillColor( '#ACC29E'); // RGB color for light green
     doc.rect(0, 0, 210, 40, 'F');  // Draw filled rectangle covering the header area (A4 page width is 210mm)

    // Add logo (positioning and size may need adjustment)
    const logoImage = logo;  // Path to your logo image
    doc.addImage(logoImage, 'PNG', 80, 5, 30, 30); // x, y, width, height

    /* // Add company name
    doc.setFontSize(20);
    doc.setTextColor('white')
    doc.text('Kidgage.com', 80, 20);
     */
    doc.setFontSize(14);
    doc.setTextColor('black')

    doc.text(`Thankyou ${bookingData.customerName} For Your Booking. `, 20, 50);
    doc.setFontSize(16);
    doc.setTextColor('#ACC29E')

    doc.text(`Your Booking was Successfull.`, 20, 60);
    doc.setTextColor('black')

    // Add title for the booking details
    doc.setFontSize(16);
    doc.text('Booking Details', 20, 75);

    // Add booking data
    doc.setFontSize(12);
    doc.text(`Booking ID: ${bookingData.bookingId}`, 20, 85);
    doc.text(`Customer Name: ${bookingData.customerName}`, 20, 95);
    doc.text(`Event Name: ${bookingData.eventName}`, 20, 105);
    doc.text(`Academy Name: ${bookingData.academyName}`, 20, 115);
    doc.text(`StartDate: ${bookingData.EventSartDate}`, 20, 125);
    doc.text(`End Date: ${bookingData.EventEmdDate}`, 20, 135);
    doc.text(`Total No of Sessions: ${bookingData.totalNoOfSessions}`, 20, 145);

    doc.setFontSize(12);
    doc.text(`Payment Details`, 20, 160);
    // Add payment details table header
    const startY = 170;
    // Draw the table headers with borders
    const cellPadding = 5;
    const columnWidths = [60, 50, 60]; // Widths for each column
    const tableHeaders = ['Payment Method', 'Amount', 'Payment Date'];

    // Draw headers
    doc.setFontSize(12);
    tableHeaders.forEach((header, index) => {
      const x = 20 + columnWidths.slice(0, index).reduce((a, b) => a + b, 0); // Calculate x position based on previous columns
      const y = startY;
      doc.text(header, x + cellPadding, y + cellPadding);

      // Draw the top border for the header
      doc.rect(x, y, columnWidths[index], 10);  // x, y, width, height
    });

    // Draw payment details rows with borders
    bookingData.paymentDetails.forEach((payment, rowIndex) => {
      const rowY = startY + (rowIndex + 1) * 10;

      // Draw cells with text and borders
      doc.text(payment.paymentMethod, 20 + cellPadding, rowY + cellPadding);
      doc.rect(20, rowY, columnWidths[0], 10);  // Payment Method cell
      doc.text(payment.amount, 20 + columnWidths[0] + cellPadding, rowY + cellPadding);
      doc.rect(20 + columnWidths[0], rowY, columnWidths[1], 10);  // Amount cell
      doc.text(payment.date, 20 + columnWidths[0] + columnWidths[1] + cellPadding, rowY + cellPadding);
      doc.rect(20 + columnWidths[0] + columnWidths[1], rowY, columnWidths[2], 10);  // Payment Date cell
    });

    // Draw bottom border for the entire table
    doc.rect(20, startY, columnWidths.reduce((a, b) => a + b, 0), (bookingData.paymentDetails.length + 1) * 10);

    // Download the PDF
    doc.save('booking-data.pdf');
  };

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
                                        <button onClick={generatePDF} className="booking-button-btn">
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
