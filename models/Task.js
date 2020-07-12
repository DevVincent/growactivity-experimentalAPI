const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = mongoose.Schema({
    aId: {type:Schema.Types.ObjectId, ref: 'Activity'}, 
    title: String,  
    description: String,
    status: {
        type: String,
        default: "todo",
    }            
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;