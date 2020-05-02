const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    info: {
        type: String        
    },
    status: {
        type: String,
        default: 'in progress'
    }
})

module.exports = mongoose.model('taskdb', TaskSchema, 'task'); 

