const mongoose   = require('mongoose')
const Schema     = mongoose.Schema

const questionSchema = new Schema({
    iduser:{
      type:Schema.Types.ObjectId,
      ref:'User'
    },
    title: String,
    content : String
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question;
