const mongoose   = require('mongoose')
const Schema     = mongoose.Schema

const answerSchema = new Schema({
    iduser:{
      type:Schema.Types.ObjectId,
      ref:'User'
    },
    idquestion:{
      type:Schema.Types.ObjectId,
      ref:'Question'
    },
    content : String
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer;
