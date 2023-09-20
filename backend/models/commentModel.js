const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({
    //define the rules for the data
    //key : dataType, required: true - only add required if you want to enforce the value
    
    user_id: {
        type: String,
        required: true
    },
    text: {
        type: String,
    }

}, {timestamps: true})
module.exports = mongoose.model('Comment', commentSchema)
