const mongoose   = require('mongoose')
const Schema     = mongoose.Schema

const voteanswerSchema = new Schema({
  iduser:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  idanswer:{
    type:Schema.Types.ObjectId,
    ref:'Answer'
  },
  vote :String
})

const Voteanswer = mongoose.model('Voteanswer', voteanswerSchema)

module.exports = Voteanswer;
