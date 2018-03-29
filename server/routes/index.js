var express = require('express');
var router = express.Router();
var overflowcontroller  = require('../controllers/overflowcontroller')
var auth                = require('../midleware/auth')

router.post('/register', overflowcontroller.register)
router.post('/signin', overflowcontroller.signin)
router.get('/checkjwt', auth.check, overflowcontroller.checkjwt)

router.get('/showquestiondetail/:id',overflowcontroller.showquestiondetail)
router.post('/addquestion', overflowcontroller.addquestion)
router.get('/showquestion', overflowcontroller.showquestion)
router.put('/updatequestion/:id', overflowcontroller.updatequestion)
router.delete('/deletequestion/:id', overflowcontroller.deletequestion)
router.post('/addvotequestion', overflowcontroller.addvotequestion)

router.post('/addanswer', overflowcontroller.addanswer)
router.delete('/deleteanswer/:id', overflowcontroller.deleteanswer)
router.get('/showanswer', overflowcontroller.showanswer)
router.post('/addvoteanswer', overflowcontroller.addvoteanswer)

module.exports = router;
