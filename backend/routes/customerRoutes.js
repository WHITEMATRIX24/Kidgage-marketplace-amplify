const express = require("express");
const router = express.Router();
require("dotenv").config(); // add environments variable to prcess.env
const { google } = require("googleapis");
const Customer = require("../models/Customer"); // Import the Customer model
const User = require("../models/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const { findFirstDate, calculateNextDate } = require("../helpers/dateHelpers");

let otpStore = {};
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465, // Use 587 for TLS
  secure: true, // true for 465, false for 587
  auth: {
    user: "hello@kidgage.com", // Your Zoho Mail email address
    pass: "t0zHp1RBgsmX", // Your Zoho Mail password or app password
  },
});

router.post("/send-otp", async (req, res) => {
  console.log(req.body);
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    // Check if the email already exists in the database
    const existingCustomer = await Customer.findOne({ email });

    if (existingCustomer) {
      return res.status(200).json({
        message: "You are already registered. Click Continue.",
        alreadyRegistered: true,
        customer: existingCustomer,
      });
    }

    // Generate OTP
    const otp = crypto.randomInt(1000, 9999);
    otpStore[email] = { otp, expires: Date.now() + 600000 }; // OTP expires in 10 minutes
    console.log(otpStore);

    // Send email with OTP
    const mailOptions = {
      from: "hello@kidgage.com",
      to: email,
      subject: "Your One-Time Password (OTP) for Kidgage",
      text: `Hi ${email},

Your One-Time Password (OTP) for accessing your Kidgage account is: ${otp}

This OTP is valid for the next 5 minutes. Please use it to complete your login or verification process.

If you did not request this OTP, please ignore this email or contact our support team immediately.

Thank you,  
The Kidgage Team`,
    };

    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ message: "OTP sent successfully.", alreadyRegistered: false });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error sending OTP.", error: err.message });
  }
});

router.post("/verify-otp", async (req, res) => {
  const { otp, email } = req.body;
  console.log("OTP from request:", otp);
  console.log("Email from request:", email);
  console.log("Current time:", Date.now());
  console.log("Stored OTP:", otpStore[email]?.otp);
  console.log("Stored Expiry:", otpStore[email]?.expires);

  if (!otp || !email) {
    return res.status(400).json({ message: "OTP or email is missing." });
  }

  const emailString = typeof email === "string" ? email : email?.email;

  if (
    otpStore[emailString] &&
    Number(otpStore[emailString].otp) === Number(otp) &&
    otpStore[emailString].expires > Date.now()
  ) {
    try {
      // Check if the email already exists
      let customer = await Customer.findOne({ email: emailString });
      if (!customer) {
        // Create a new customer record
        customer = new Customer({ name: "", email: emailString, bookings: [] });
        await customer.save();
      }

      // OTP verification successful
      return res.status(200).json({
        message: "OTP verified, email registered",
        customer: customer,
      });
    } catch (error) {
      console.error("Error inserting customer:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  return res.status(400).json({ message: "Invalid or expired OTP." });
});

// Route to get user Details when login by google
router.post("/get-google-user", async (req, res) => {
  const { code } = req.body;

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "postmessage"
  );
  google.options({ auth: oauth2Client });

  let refresh_token = "";
  let access_token = "";
  oauth2Client
    .getToken(code)
    .then((res) => {
      const tokens = res.tokens;
      refresh_token = tokens.refresh_token;
      access_token = tokens.access_token;
      oauth2Client.setCredentials(tokens);
      const oauth2 = google.oauth2({ version: "v2" });
      return oauth2.userinfo.get();
    })
    .then(async (userData) => {
      /*  console.log(userData.data.email);
            console.log(userData.data.name); */
      let email = userData.data.email;
      let name = userData.data.name;
      // let customer = await Customer.findOne({ email: email });
      // if (!customer) {
      //   // Create a new customer record
      //   customer = new Customer({
      //     name: name,
      //     email: email,
      //     bookings: [],
      //     gToken: { access_token: access_token, refresh_token: refresh_token },
      //   });
      //   await customer.save();
      // }else{
      //   customer = await Customer.findOneAndUpdate({email:email},{
      //     gToken: { access_token: access_token, refresh_token: refresh_token }
      //   })
      // }
      let customer = await Customer.findOneAndUpdate(
        { email: email },
        {
          $set: {
            gToken: {
              access_token: access_token,
              refresh_token: refresh_token,
            },
          },
          $setOnInsert: { name: name, email: email, bookings: [] },
        },
        { new: true, upsert: true }
      );

      res
        .status(200)
        .json({ message: "Login Successfull.", customer: customer });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ message: "Invalid or error in log in." });
    });
});

router.post("/get-existing-user", async (req, res) => {
  const { email } = req.body;

  try {
    let customer = await Customer.findOne({ email: email });

    if (customer) {
      res.status(200).json({
        code: "200",
        message: "Login Successfull.",
        customer: customer,
      });
    } else {
      res.status(205).json({ code: "205", message: "User does not exist" });
    }
  } catch (error) {
    console.error("Error inserting customer:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// booking controller
router.post("/book-course/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const bookingData = req.body;

    const { nanoid } = await import("nanoid");
    const bookingId = nanoid(5);

    const finalBookingData = {
      bookingId,
      ...bookingData,
      status: true,
    };
    console.log(finalBookingData);

    const savedBookingData = await Customer.findByIdAndUpdate(
      userId,
      {
        $push: { bookings: finalBookingData },
      },
      { new: true }
    );

    const providerData = await User.findById(finalBookingData.providerId);

    const generatePDF = () => {
      return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const filePath = path.join(__dirname, "BookingDetails.pdf");

        // Pipe the document to a file
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        doc.fill("#ACC29E"); // RGB color for light green
        doc.rect(0, 0, doc.page.width, 50, "F"); // Draw filled rectangle covering the header area (A4 page width is 210mm)
        doc.rect(0, 0, doc.page.width, 50).fill("#ACC29E");

        // Add logo (positioning and size may need adjustment)
        /* const logoImage = logo;  // Path to your logo image
       doc.addImage(logoImage, 'PNG', 55, 5, 20, 20); // x, y, width, height */

        // Add company name
        doc.fontSize(24);
        doc.font("Helvetica-Bold");

        doc.fillColor("white");
        doc.text("Kidgage", 230, 18);

        doc.fontSize(14);
        doc.fillColor("black");
        doc.font("Helvetica", "normal");
        doc.text(
          `Thankyou ${savedBookingData.email} For Your Booking. `,
          30,
          65
        );
        doc.fontSize(16);
        doc.fillColor("#ACC29E");

        if (finalBookingData.status) {
          doc.text(`Your Booking was Successfull.`, 30, 85);
          doc.fillColor("black");
        } else {
          doc.text(`Your Booking was Under Verification.`, 30, 85);
          doc.fillColor("black");
        }
        // Add title for the booking details
        doc.fontSize(16);
        doc.text("Booking Details", 30, 110);
        const yValue = 140;
        // Add booking data
        doc.fontSize(12);
        doc.text(`Booking ID:  #${finalBookingData.bookingId}`, 30, 140);
        doc.text(`Email: ${savedBookingData.email}`, 30, 160);
        doc.text(`Email: ${providerData.username}`, 30, 180);
        doc.text(`Event Name: ${finalBookingData.courseName}`, 30, 200);
        doc.text(
          `Booking Date: ${finalBookingData.bookingDate.slice(0, 10)}`,
          30,
          220
        );
        doc.text(
          `Course Duration: ${finalBookingData.courseDuration.duration} ${finalBookingData.courseDuration.durationUnit} `,
          30,
          240
        );
        doc.text(
          `Start Date: ${finalBookingData.courseDuration.startDate.slice(
            0,
            10
          )}`,
          30,
          260
        );
        doc.text(
          `End Date: ${finalBookingData.courseDuration.endDate.slice(0, 10)}`,
          30,
          280
        );
        doc.text(
          `Total No of Sessions: ${bookingData.courseDuration.noOfSessions}`,
          30,
          300
        );
        doc.fillColor("black");

        doc.fontSize(16);
        doc.text(`Payment Details`, 30, 320);
        // Add payment details table header

        let yPosition = 350;
        const tableHeaders = ["Payment Method", "Amount", "Payment Date"];
        const columnWidth = [150, 150, 150]; // Width of each column
        const rowHeight = 30; // Row height

        // Draw header row
        doc.fontSize(14).text(tableHeaders[0], 40, yPosition + 10);
        doc.text(tableHeaders[1], 40 + columnWidth[0], yPosition + 10);
        doc.text(
          tableHeaders[2],
          40 + columnWidth[0] + columnWidth[1],
          yPosition + 10
        );

        yPosition += rowHeight; // Move down to the next row

        // Draw the header border (top row)
        doc
          .moveTo(30, yPosition)
          .lineTo(30 + columnWidth.reduce((a, b) => a + b), yPosition)
          .stroke();

        // Draw header cell borders
        doc.rect(30, yPosition - rowHeight, columnWidth[0], rowHeight).stroke();
        doc
          .rect(
            30 + columnWidth[0],
            yPosition - rowHeight,
            columnWidth[1],
            rowHeight
          )
          .stroke();
        doc
          .rect(
            30 + columnWidth[0] + columnWidth[1],
            yPosition - rowHeight,
            columnWidth[2],
            rowHeight
          )
          .stroke();

        // Draw a horizontal line after the header
        doc
          .moveTo(30, yPosition)
          .lineTo(30 + columnWidth.reduce((a, b) => a + b), yPosition)
          .stroke();

        doc.fontSize(12);

        // Table data

        // Loop through the payment details and draw rows

        // Draw table cells and text
        doc.text(
          finalBookingData.paymentDetails.paymentMethod
            .replace(/-/g, " ")
            .split(" ") // Split the string into words
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            ) // Capitalize first letter of each word
            .join(" "), // Join the words back together with spaces
          40,
          yPosition + 10
        );
        doc.text(
          `QAR ${finalBookingData.courseDuration.fee}`,
          40 + columnWidth[0],
          yPosition + 10
        );
        if (finalBookingData.paymentDetails.isPaid) {
          doc.text(
            "Done",
            40 + columnWidth[0] + columnWidth[1],
            yPosition + 10
          );
        } else {
          doc.fillColor("orange");
          doc.text(
            "Pending",
            40 + columnWidth[0] + columnWidth[1],
            yPosition + 10
          );
        }
        yPosition += rowHeight;

        // Draw cell borders for each row
        doc.rect(30, yPosition - rowHeight, columnWidth[0], rowHeight).stroke();
        doc
          .rect(
            30 + columnWidth[0],
            yPosition - rowHeight,
            columnWidth[1],
            rowHeight
          )
          .stroke();
        doc
          .rect(
            30 + columnWidth[0] + columnWidth[1],
            yPosition - rowHeight,
            columnWidth[2],
            rowHeight
          )
          .stroke();

        // Draw line after each row

        // Draw bottom border for the entire table
        //doc.rect(20, startY, columnWidths.reduce((a, b) => a + b, 0), (1 + 1) * 10);

        // Download the PDF

        doc.end();

        stream.on("finish", () => {
          resolve(filePath); // When finished, return the file path
        });

        stream.on("error", (err) => {
          reject(err); // Handle any errors during file writing
        });
      });
    };

    const pdfFilePath = await generatePDF(); // Generate the PDF

    //console.log(savedBookingData);

    // emailing
    const customerMailOptions = {
      from: "hello@kidgage.com",
      to: savedBookingData.email,
      subject: "Successfully booked the course",
      text: `Hi ${savedBookingData.email},

  You have successfully booked the course ${finalBookingData.courseName} provided by
  ${finalBookingData.providedAcademy} 

  Thank you,  
  The Kidgage Team`,
      attachments: [
        {
          filename: "BookingDetails.pdf",
          path: pdfFilePath,
        },
      ],
    };

    const providerMailOptions = {
      from: "hello@kidgage.com",
      to: providerData.email,
      subject: "course booked by a kidgage user",
      text: `Hi ${providerData.email},

  A kidgage user has been successfully booked ${finalBookingData.courseName}

  Thank you,  
  The Kidgage Team`,
    };

    await transporter.sendMail(customerMailOptions);
    // await transporter.sendMail(providerMailOptions)

    res.status(200).json({ message: "Booked sucessfully", finalBookingData });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error", error });
  }
});

// get userBy UserId

router.get("/get-user-byid/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const userData = await Customer.findOne({ _id: userId });
    if (userData) {
      console.log(userData);

      res.status(200).json({ message: "UserExist", userData });
    } else {
      res.status(400).json({ message: "User Doesnot exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// controller to mark event on user calender
router.post("/mark-event-on-calender/:userId/:bookingId", async (req, res) => {
  try {
    const { userId, bookingId } = req.params;

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      "postmessage"
    );

    const user = await Customer.findById(userId);
    oauth2Client.setCredentials(user.gToken);

    const courseDetails = user.bookings.find(
      (val) => val.bookingId === bookingId
    );

    const calender = google.calendar({ version: "v3", auth: oauth2Client });

    const event = {
      summary: courseDetails.courseName,
      location: "123",
      description: `${courseDetails.courseName} course provided by ${
        courseDetails.providedAcademy
      }
       starts on ${courseDetails.courseDuration.startDate.toDateString()}`,
      start: {
        date: findFirstDate(courseDetails.courseDuration.bookedDates),
      },
      end: {
        date: calculateNextDate(
          findFirstDate(courseDetails.courseDuration.bookedDates)
        ),
      },
      // attendees: [{ email: "example@example.com" }],
    };

    const calenderRes = await calender.events.insert({
      calendarId: "primary",
      requestBody: event,
    });

    if (calenderRes.status >= 200 && calenderRes.status < 300) {
      res
        .status(200)
        .json({ message: "successfully added to google calender" });
    } else {
      throw new Error("error in creating event on calender");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;
