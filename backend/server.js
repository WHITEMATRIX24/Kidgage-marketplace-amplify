const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


// Import routes
const userRoutes = require('./routes/userRoutes'); // Existing routes for business sign-up
const personalRoutes = require('./routes/personalRoutes'); // New routes for personal sign-up
const courseCategoryRoutes = require('./routes/courseCategoryRoutes'); // New routes for course category
const courseRoutes = require('./routes/course');// New routes for courses
const bannerRoutes = require('./routes/bannerRoutes'); // New routes for banners
const posterRoutes = require('./routes/posterRoutes');
const advertisementRoutes = require('./routes/advertisementRoutes');
const leadsRoutes = require('./routes/leadsRoutes');
const desktopBannerRoutes = require('./routes/desktopBanner');
const mobileBannerRoutes = require('./routes/mobileBanner');
const newsRoutes = require('./routes/newsRoute');
const customerRoutes = require('./routes/customerRoutes');
const termsRoutes = require('./routes/termsRoutes');



const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Connect to MongoDB
mongoose.connect('mongodb+srv://whitematrix2024:5ah1qr0qo50c7yI7@kidgage.gafztzs.mongodb.net/kidgage?retryWrites=true&w=majority&appName=kidgage', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console
        .error('MongoDB connection error:', err));

// Add routes
app.use('/api/users', userRoutes);
app.use('/api/personal', personalRoutes); // Add the personal routes here
app.use('/api/course-category', courseCategoryRoutes); // Add the course category routes here
app.use('/api/courses', courseRoutes);
app.use('/api/banners', bannerRoutes); // Add the banner routes here
app.use('/api/posters', posterRoutes);
app.use('/api/advertisement', advertisementRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/desktop-banners', desktopBannerRoutes);
app.use('/api/mobile-banners', mobileBannerRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/customers', customerRoutes);
app.use("/api/terms-condition", termsRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
