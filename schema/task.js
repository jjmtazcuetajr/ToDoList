const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    info: {
        type: String        
    },
    status: {
        type: String
    }
})

module.exports = mongoose.model('Task', TaskSchema); 

