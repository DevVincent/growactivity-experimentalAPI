const mongoose = require('mongoose');
const { Schema } = mongoose;

const CalendarSchema = mongoose.Schema({
    uId: {type:Schema.Types.ObjectId, ref: 'User'},  
    title: String,
    details: String,
    date: Date,
    deadline: Date,         
});

const Calendar = mongoose.model('Calendar', CalendarSchema);

module.exports = Calendar;