const express = require('express');
const Poster = require('../models/Poster'); // Adjust the path as necessary

const router = express.Router();



// Route to fetch all posters or wishlist posters based on query parameter
router.get('/', async (req, res) => {


  try {
    const posters = await Poster.find(
      { activeStatus: true }

    );

    console.log('Fetched posters:', posters.length); // Logging number of posters fetched
    res.status(200).json(posters);
  } catch (error) {
    console.error('Error fetching posters:', error); // More detailed logging
    res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
});

// Route to fetch a specific poster by ID
router.get('/poster/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const poster = await Poster.findById(id);
    if (!poster) {
      return res.status(404).json({ message: 'Poster not found' });
    }
    res.status(200).json(poster);
  } catch (error) {
    console.error('Error fetching poster:', error);
    res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
});


module.exports = router;
