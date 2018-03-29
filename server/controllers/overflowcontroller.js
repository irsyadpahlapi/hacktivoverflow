const User = require('../models/User')
const Question = require('../models/Question')
const Answer = require('../models/Answer')
const Votequestion = require('../models/Votequestion')
const Voteanswer = require('../models/Voteanswer')
const jwt  = require('jsonwebtoken')

module.exports = {
  register: (req,res) => {
    User.create({
      name  : req.body.name,
      email  : req.body.email,
      password : req.body.password
    },(err,data) => {
      res.status(200).json({
        message : 'new account created succes',
        data : data
      })
    })
  },
  signin: (req,res) => {
    User.findOne({
      email:req.body.email,
      password:req.body.password
    })
    .then(data => {
      if (data) {
        let token = jwt.sign({userId : data._id, name : data.name, email : data.email}, process.env.SECRET)
        res.status(200).json({
          message : 'login succes',
          token : token
        })
      }else{
        res.status(500).json({
          message: 'login failed'
        })
      }
    })
    .catch(err => {
      res.status(404).json({
        message: err
      })
    })
  },
  checkjwt : (req,res) => {
    let token=req.headers.token
    let decoded  = jwt.verify(token, process.env.SECRET)
    res.status(200).json({
      message : 'jwt succes',
      data : decoded
    })
  },
  addquestion : (req,res) => {
    let token = req.headers.token
    let decoded  = jwt.verify(token, process.env.SECRET)
    let question= new Question()
    question.iduser=decoded.userId
    question.content=req.body.content
    question.title=req.body.title
    question.save().then(data=>{
      res.status(200).send(data)
    }).catch(error=>{
      res.status(500).send(error)
    })
  },
  showquestion : (req,res) => {
    Question.find().then(datas => {
      Votequestion.find().populate('idquestion').then(data => {
        res.status(200).json({question:datas,votequestion:data})
      }).catch(err => {
        res.status(500).send(err)
      })
    })
  },
  showquestiondetail : (req,res) => {
    Question.findOne( {_id:req.params.id} ).then(pertanyaan => {
      Votequestion.find({idquestion:req.params.id}).populate('idquestion').then(votepertanyaan => {
        Answer.find( {idquestion:req.params.id} ).then(answer => {
          Voteanswer.find().populate('idquestion').then(voteanswer => {
            res.status(200).json(
              {
                question:pertanyaan,
                votequestion:votepertanyaan,
                answer:answer,
                voteanswer:voteanswer
              })
          }).catch(err => {
            res.status(500).send(err)
          })
        })
      }).catch(err => {
        res.status(500).send(err)
      })
    })
  },
  updatequestion : (req,res) => {
    Question.updateOne(
      {
      _id:req.params.id
      },
    {$set:
      {
        title:req.body.title,
        content:req.body.content
      }
    }).then(data => {
      res.status(200).send(data)
    })
  },
  deletequestion : (req,res) => {
    Votequestion.deleteMany({idquestion:req.params.id}).then(data=>{
      Answer.deleteMany({idquestion:req.params.id}).then(data=>{
        Question.deleteOne(
          {
            _id: req.params.id
          })
          .then(data => {
            res.status(200).json(data)
          })
      })
    })
  },
  addvotequestion : (req,res) => {
    let token = req.headers.token
    let decoded  = jwt.verify(token, process.env.SECRET)
    let votequestion = new Votequestion()
    votequestion.iduser=decoded.userId
    votequestion.idquestion=req.body.questionid
    votequestion.vote=req.body.vote
    votequestion.save().then(data=>{
      res.status(200).send(data)
    }).catch(error=>{
      res.status(500).send(error)
    })
  },
  addanswer : (req,res) => {
    let token = req.headers.token
    let decoded  = jwt.verify(token, process.env.SECRET)
    let answer= new Answer()
    answer.iduser=decoded.userId
    answer.idquestion=req.body.idquestion
    answer.content=req.body.content
    answer.save().then(data=>{
      res.status(200).send(data)
    }).catch(error=>{
      res.status(500).send(error)
    })
  },
  showanswer : (req,res) => {
    Voteanswer.find().populate('idanswer').then(data => {
      res.status(200).json({answer:data})
    }).catch(err => {
      res.status(500).send(err)
    })
  },
  deleteanswer: (req,res) => {
    Answer.deleteOne(
      {
        _id: req.params.id
      })
      .then(data => {
        Voteanswer.deleteMany({idanswer:req.params.id}).then(datas=>{
          Question.deleteMany(
            {
              _id: req.params.id
            })
            .then(data => {
              res.status(200).json(datas)
            })
        })
      })
  },
  addvoteanswer: (req,res) => {
    let token = req.headers.token
    let decoded  = jwt.verify(token, process.env.SECRET)
    let voteanswer = new Voteanswer()
    voteanswer.iduser=decoded.userId
    voteanswer.idanswer=req.body.answerid
    voteanswer.vote=req.body.vote
    voteanswer.save().then(data=>{
      res.status(200).send(data)
    }).catch(error=>{
      res.status(500).send(error)
    })
  }
}
