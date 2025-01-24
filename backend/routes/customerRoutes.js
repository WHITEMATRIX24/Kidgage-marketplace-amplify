const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer'); // Import the Customer model
const crypto = require('crypto');
let otpStore = {};
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465, // Use 587 for TLS
    secure: true, // true for 465, false for 587
    auth: {
        user: "hello@kidgage.com", // Your Zoho Mail email address
        pass: "t0zHp1RBgsmX", // Your Zoho Mail password or app password
    },
});
router.post('/send-otp', async (req, res) => {
    console.log(req.body);
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    try {
        // Check if the email already exists in the database
        const existingCustomer = await Customer.findOne({ email });

        if (existingCustomer) {
            return res.status(200).json({
                message: 'You are already registered. Click Continue.',
                alreadyRegistered: true
            });
        }

        // Generate OTP
        const otp = crypto.randomInt(1000, 9999);
        otpStore[email] = { otp, expires: Date.now() + 600000 }; // OTP expires in 10 minutes
        console.log(otpStore);

        // Send email with OTP
        const mailOptions = {
            from: 'hello@kidgage.com',
            to: email,
            subject: 'Your One-Time Password (OTP) for Kidgage',
            text: `Hi ${email},

Your One-Time Password (OTP) for accessing your Kidgage account is: ${otp}

This OTP is valid for the next 5 minutes. Please use it to complete your login or verification process.

If you did not request this OTP, please ignore this email or contact our support team immediately.

Thank you,  
The Kidgage Team`
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: 'OTP sent successfully.', alreadyRegistered: false });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error sending OTP.', error: err.message });
    }
});


router.post('/verify-otp', async (req, res) => {
    const { otp, email } = req.body;
    console.log('OTP from request:', otp);
    console.log('Email from request:', email);
    console.log('Current time:', Date.now());
    console.log('Stored OTP:', otpStore[email]?.otp);
    console.log('Stored Expiry:', otpStore[email]?.expires);

    if (!otp || !email) {
        return res.status(400).json({ message: 'OTP or email is missing.' });
    }

    const emailString = typeof email === 'string' ? email : email?.email;

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
                customer = new Customer({ name: '', email: emailString, bookings: [] });
                await customer.save();
            }

            // OTP verification successful
            return res.status(200).json({ message: 'OTP verified, email registered' });
        } catch (error) {
            console.error('Error inserting customer:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    return res.status(400).json({ message: 'Invalid or expired OTP.' });
});

module.exports = router;
