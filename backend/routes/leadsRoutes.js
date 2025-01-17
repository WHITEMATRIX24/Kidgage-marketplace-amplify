// routes/leads.js
const express = require("express");
const Lead = require("../models/Leads");
const router = express.Router();
router.use(express.json());
const path = require("path");
const nodemailer = require("nodemailer");
const crypto = require('crypto');
const Enquiry = require("../models/Enquiry");
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
// Backend example
router.post('/send-otp', async (req, res) => {
  console.log(req.body);
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    const otp = crypto.randomInt(1000, 9999); // Generate 6-digit OTP
    otpStore[email] = { otp, expires: Date.now() + 300000 }; // OTP expires in 5 mins
    console.log(otpStore)
    // Send email with OTP
    const mailOptions = {
      from: 'hello@kidgage.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    // Send successful response
    return res.status(200).json({ message: 'OTP sent successfully.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error sending OTP.', error: err.message });
  }
});
router.post('/verify-otp', (req, res) => {
  const { otp, email } = req.body;
  console.log('OTP from request:', otp);

  console.log('Current time:', Date.now());
  // Check the email in otpStore

  if (!otp || !email) {
    return res.status(400).json({ message: 'OTP or email is missing.' });
  }

  // Ensure that email is a string (if it's an object, extract the email string)
  const emailString = typeof email === 'string' ? email : email?.email;
  console.log('Stored OTP:', otpStore[emailString].otp);
  console.log('Expiration time:', otpStore[emailString].expires);
  if (Number(otpStore[emailString].otp) === Number(otp) && otpStore[emailString].expires > Date.now()) {
    return res.status(200).json({ message: 'OTP verified' });
  }


  return res.status(400).json({ message: 'Invalid or expired OTP.' });
});



router.post("/track", async (req, res) => {
  try {
    const {
      parentName,
      parentEmail,
      parentPhone,
      childAge,
      providerId,
      courseId,
    } = req.body;

    // enquiry details
    const newEnquiryDetails = await new Enquiry({
      parentDetails: {
        email: parentEmail,
        name: parentName,
        phone: parentPhone,
      },
      childDetails: {
        age: childAge,
      },
      providerId,
      courseId,
    }).save();

    // Find the single document where click count is stored or create if not exists
    let lead = await Lead.findOne();

    if (lead) {
      // Increment the click count
      lead.clickCount += 1;
      await lead.save();
    } else {
      // Initialize the lead document with one click
      lead = new Lead({ clickCount: 1 });
      await lead.save();
    }

    res.status(200).json({
      message: "Lead count updated successfully",
      clickCount: lead.clickCount,
      newEnquiryDetails,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update lead count", error });
  }
});
router.post("/send-booking-emails", async (req, res) => {
  const {
    parentName,
    parentEmail,
    parentPhone,
    childAge,
    courseName,
    providerName,
    selectedDate,
    selectedTime,
    providerEmail,
  } = req.body;

  try {
    // Path to the footer image
    // const footerImagePath = path.join(__dirname, "footer-image.jpg"); // Replace with your image path
    // const footerImagePath = path.join(
    //     __dirname,
    //     "../assets/E_sign-12.png"
    // );

    // Parent Email Content
    const parentEmailContent = `
        <h3>Kidgage Booking Request</h3>
        <p>Hello ${parentName},</p>
        <p>Thank you for choosing Kidgage!</p>
        <p>We’ve forwarded your booking request to the provider.</p>
        <p><strong>Booking Details:</strong></p>
        <ul>
          <li>Course: ${courseName}</li>
          <li>Provider: ${providerName}</li>
          <li>Date: ${selectedDate}</li>
          <li>Time: ${selectedTime}</li>
          <li>Parent Name: ${parentName}</li>
          <li>Child’s Age: ${childAge}</li>
        </ul>
        <p>The provider will contact you directly to confirm the booking or share further details.</p>
        <br/>
        
      `;

    // Provider Email Content
    const providerEmailContent = `
        <h3>New Booking Request via Kidgage</h3>
        <p>Hello ${providerName},</p>
        <p>You’ve received a new booking request from Kidgage!</p>
        <p><strong>Booking Details:</strong></p>
        <ul>
          <li>Course: ${courseName}</li>
          <li>Provider: ${providerName}</li>
          <li>Date: ${selectedDate}</li>
          <li>Time: ${selectedTime}</li>
          <li>Parent Name: ${parentName}</li>
          <li>Child’s Age: ${childAge}</li>
        </ul>
        <p>Please contact the parent directly at ${parentPhone} to confirm the booking or discuss further details.</p>
        <br/>
        
      `;

    // Sending email to Parent
    await transporter.sendMail({
      from: '"Kidgage" <hello@kidgage.com>', // Sender address
      to: parentEmail, // Parent's email
      subject: "Your Kidgage Booking Request", // Subject line
      html: parentEmailContent, // HTML body
      // attachments: [
      //     {
      //         filename: "footer-image.jpg", // File name
      //         path: footerImagePath, // Image path
      //         cid: "footerImage", // Content-ID for inline embedding
      //     },
      // ],
    });

    // Sending email to Provider
    await transporter.sendMail({
      from: '"Kidgage" <hello@kidgage.com>', // Sender address
      to: providerEmail, // Provider's email
      subject: "New Booking Request", // Subject line
      html: providerEmailContent, // HTML body
      // attachments: [
      //     {
      //         filename: "footer-image.jpg", // File name
      //         path: footerImagePath, // Image path
      //         cid: "footerImage", // Content-ID for inline embedding
      //     },
      // ],
    });

    res.status(200).json({ message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ error: "Failed to send emails." });
  }
});

module.exports = router;
