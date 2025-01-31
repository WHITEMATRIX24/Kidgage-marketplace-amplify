const express = require("express");
const multer = require("multer");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer"); // Include nodemailer
const User = require("../models/User"); // Adjust the path as necessary

const router = express.Router();

// Set up multer for file handling
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create a reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465, // Use 587 for TLS
  secure: true, // true for 465, false for 587
  auth: {
    user: "hello@kidgage.com", // Your Zoho Mail email address
    pass: "t0zHp1RBgsmX", // Your Zoho Mail password or app password
  },
});

// Signup Route
router.post(
  "/signup",
  upload.fields([{ name: "crFile", maxCount: 1 }]),
  async (req, res) => {
    try {
      const {
        username,
        email,
        phoneNumber,
        fullName,
        designation,
        description,
        website,
        instaId,
        address,
        licenseNo,
        agreeTerms,
        locations // Expecting an array of locations
      } = req.body;

      // Validate description character length on the server-side
      if (description.length < 450 || description.length > 500) {
        return res.status(400).json({
          message: "Description must be between 450 to 500 characters.",
        });
      }

      const files = req.files;
      const fileBase64 = {};

      if (files) {
        if (files.crFile)
          fileBase64.crFile = files.crFile[0].buffer.toString("base64");
      }

      // Process locations to ensure they are properly formatted as an array of objects
      let formattedLocations = [];

      if (locations) {
        try {
          const parsedLocations = JSON.parse(locations); // Convert string to array if sent as JSON string

          if (Array.isArray(parsedLocations)) {
            formattedLocations = parsedLocations.map(loc => ({
              locationName: loc.locationName || "Unnamed Location",

              latitude: parseFloat(loc.latitude) || 0,
              longitude: parseFloat(loc.longitude) || 0,
            }));
          }
        } catch (err) {
          return res.status(400).json({
            message: "Invalid locations format. Must be a valid JSON array.",
          });
        }
      }

      const existingUser = await User.findOne({
        $or: [{ email }, { phoneNumber }],
      });

      if (existingUser) {
        return res.status(400).json({
          message: "User with this email or phone number already exists.",
        });
      }

      // Create new user document
      const newUser = new User({
        username,
        email,
        phoneNumber,
        fullName,
        designation,
        description,
        locations: formattedLocations, // Store formatted locations array
        website: website || null,
        instaId: instaId || null,
        address,
        crFile: fileBase64.crFile,
        licenseNo,
        agreeTerms,
      });

      await newUser.save();

      // Send welcome email to the user
      const userMailOptions = {
        from: `"Kidgage Support" <hello@kidgage.com>`,
        to: email,
        subject: "Welcome to Our Provider List!",
        text: `Dear ${fullName},

Thank you for signing up as a provider on our platform! We're excited to have you onboard.

Below are your registration details:
- Academy Name:  ${username}
- Full Name:  ${fullName}
- Email:  ${email}
- Phone Number:  ${phoneNumber}
- Designation:  ${designation}
- Description:  ${description}
- Website:  ${website ? website : "N/A"}
- Instagram ID:  ${instaId ? instaId : "N/A"}
- Locations:
${formattedLocations.map(
          (loc, index) => `  ${index + 1}. ${loc.locationName}, ${loc.address} (Lat: ${loc.latitude}, Long: ${loc.longitude})`
        ).join("\n")}

Your account is under verification.

Please feel free to contact us if you have any questions.
`,
      };

      // Send notification email to admin
      const adminMailOptions = {
        from: `"Kidgage Support" <hello@kidgage.com>`,
        to: "whitematrix2024@gmail.com",
        subject: "New Provider Registration Request Submitted",
        text: `A new provider has submitted a registration request.

Details:
- Academy Name:  ${username}
- Full Name:  ${fullName}
- Email:  ${email}
- Phone Number:  ${phoneNumber}
- Designation:  ${designation}
- Locations:
${formattedLocations.map(
          (loc, index) => `  ${index + 1}. ${loc.locationName}, ${loc.address} (Lat: ${loc.latitude}, Long: ${loc.longitude})`
        ).join("\n")}

Please review the request.`,
      };

      // Send both emails simultaneously
      await Promise.all([
        transporter.sendMail(userMailOptions),
        transporter.sendMail(adminMailOptions),
      ]);

      // Respond to the user after successful signup
      res.status(201).json({
        message: "Signed up successfully and emails sent!",
      });

    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ message: "An error occurred during signup." });
    }
  }
);


// Sign-In Route
router.post("/signin", async (req, res) => {
  const { emailOrPhone, password } = req.body;

  try {
    // Find the user by email or phone number
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
    });

    if (!user) {
      return res.status(400).json({ message: "Email/phone is incorrect" });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    // Successful sign-in
    res.status(200).json({ message: "Sign-in successful", user });
  } catch (err) {
    console.error("Sign-in error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Search Route
router.get("/search", async (req, res) => {
  const { query } = req.query;

  try {
    // Find the user by email or phone number
    const user = await User.findOne({
      $or: [{ email: query }, { phoneNumber: query }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Send the user details
    res.status(200).json(user);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to get all users
// New route to get all verified users
router.get("/all", async (req, res) => {
  try {
    // Fetch only verified users with the specified fields (username, logo)
    const users = await User.find(
      { verificationStatus: "accepted", promoted: true },
      "username logo"
    );
    console.log("Fetched Users:", users); // Debugging log
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message); // Debugging log for errors
    res.status(400).json({ message: error.message });
  }
});

// Route to get provider details by providerId
router.get("/:providerId", async (req, res) => {
  const { providerId } = req.params;

  try {
    // Fetch provider details using the providerId
    const provider = await User.findById(providerId);

    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    // Respond with provider name and logo
    res.json({
      name: provider.name,
      logo: provider.logo,
    });
  } catch (error) {
    console.error("Error fetching provider:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to get provider details by providerId
router.get("/provider/:providerId", async (req, res) => {
  const { providerId } = req.params;

  try {
    // Fetch provider details using the providerId
    const provider = await User.findById(providerId);

    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    // Respond with all provider details
    res.json(provider);
  } catch (error) {
    console.error("Error fetching provider:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// <<<<<<>>>>>>
router.post("/send-email", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({ error: "Email is required" });
  }

  try {
    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465, // Use 587 for TLS
      secure: true, // true for 465, false for 587
      auth: {
        user: "hello@kidgage.com", // Your Zoho Mail email address
        pass: "t0zHp1RBgsmX", // Your Zoho Mail password or app password
      },
    });
    // Email options
    const mailOptions = {
      from: `"Kidgage Support" <hello@kidgage.com>`, // Sender name and address
      to: email,
      subject: "Welcome to Kidgage!",
      text: `Dear user,
      Welcome to Kidgage! We are thrilled to have you join our community.
      Thank you for choosing Kidgage. We look forward to serving you!
      Warm regards,
      The Kidgage Team`,
    };
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({ error: "Failed to send email" });
  }
});

router.post("/send-email-to", async (req, res) => {
  const {
    email,
    parentName,
    kidsAge,
    location,
    noOfChild,
    kigageGoalsArray,
  } = req.body;

  if (!email) {
    return res.status(400).send({ error: "Email is required" });
  }

  try {
    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465, // Use 587 for TLS
      secure: true, // true for 465, false for 587
      auth: {
        user: "hello@kidgage.com", // Your Zoho Mail email address
        pass: "t0zHp1RBgsmX", // Your Zoho Mail password or app password
      },
    });
    // Email options
    const mailOptions = {
      from: `"Kidgage Support" <hello@kidgage.com>`, // Sender name and address
      to: "hello@kidgage.com",
      subject: "New Enquiry",
      text: `Dear kidgage,

        New enquiry from email:  ${email} 

        Enquiry Details: 
        
        ParentName: ${parentName},
        No of kids: ${noOfChild},
        Ages: ${kidsAge},
        Location: ${location},
        Kidgage goals: ${kigageGoalsArray}
     `,
    };
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({ error: "Failed to send email" });
  }
});

module.exports = router;
