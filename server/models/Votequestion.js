const mongoose   = require('mongoose')
const Schema     = mongoose.Schema

const votequestionSchema = new Schema({
    iduser:{
      type:Schema.Types.ObjectId,
      ref:'User'
    },
    idquestion:{
      type:Schema.Types.ObjectId,
      ref:'Question'
    },
    vote :Number
})

const Votequestion = mongoose.model('Votequestion', votequestionSchema)

module.exports = Votequestion;
