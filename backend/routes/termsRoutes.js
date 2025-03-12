const express = require('express');
const TermsAndCondition = require('../models/TermsAndCondition');
const router = express.Router();


//get terms and conditions only
router.get('/term-data', async (req, res) => {
  // const { search } = req.query;
  try {
    const termsAndpolicy = await TermsAndCondition.find({}, 'terms date');
    res.status(200).json(termsAndpolicy);
  } catch (error) {
    console.error("Error fetching termsAndpolicy:", error);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
});

//get privacy policy only
router.get('/policy-data', async (req, res) => {
  // const { search } = req.query;
  try {
    const termsAndpolicy = await TermsAndCondition.find({}, 'policy date');
    res.status(200).json(termsAndpolicy);
  } catch (error) {
    console.error("Error fetching termsAndpolicy:", error);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
});

module.exports = router;