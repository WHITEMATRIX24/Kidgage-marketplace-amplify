const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    courseName: { type: String },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    providerName: { type: String },
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    startDate: { type: Date },
    endDate: { type: Date },
    cost: { type: Number },
});

const CustomerSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    bookings: [BookingSchema]
});

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
