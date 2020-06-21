const mongoose = require('mongoose');
const { Schema } = mongoose;

const SessionSchema = mongoose.Schema({
    aId: {type:Schema.Types.ObjectId, ref: 'Activity'},  
    day: String,
    month: String,
    year: String,
    numMin: Number          
});

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;