var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
var mongoUrl = 'mongodb://localhost:27017/students';
var db; //global so all of our routes have access to the db connection
// var mongoose = require('mongoose');
// var Students = require('../models/students');
// mongoose.connect(mongoUrl);

mongoClient.connect(mongoUrl, (error, database) => {
  error ? console.log(error) : db=database, console.log('Connected to Mongo Successfully');
})

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {});
})
//GET alphebetical student list
router.get('/students', function(req, res, next) {
  db.collection('studentList').find().toArray((error, studentResults) => {
    var studentArray = [];
    if(error){
      console.log(error)
    }else{
      for(student of studentResults){
        studentArray.push(student.name);
      }
      studentArray.sort();

    }
    if(req.query.student){
      var queryString = req.query.student
      console.log(queryString);
    }
    console.log(studentArray);
    res.render('students', {
      studentList: studentArray,
      path: '/students/reverse',
      queryString: queryString
     });
  })
});

//GET reverse student list
router.get('/students/reverse', function(req, res, next) {
  db.collection('studentList').find().toArray((error, studentResults) => {
    var studentArray = [];
    if(error){
      console.log(error)
    }else{
      for(student of studentResults){
        studentArray.push(student.name);
      }
      studentArray.sort();
      studentArray.reverse();
    }
    if(req.query.student){
      var queryString = req.query.student
    }
    console.log(studentArray);
    res.render('students', {
      studentList: studentArray,
      path: '/students',
      queryString: queryString
     });
  })
});

router.get('/:searchTerm')
var studentQuery = '';
var searchedUrl = '/students?';


module.exports = router;
