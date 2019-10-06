// import dependencies needed
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// initialize express
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// connect to database
mongoose.connect(
  'mongodb+srv://igks:igks@evendb-yqzkt.mongodb.net/eventdb?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// initialize/create database schema
const eventSchema = mongoose.Schema({
  title: String,
  location: String,
  participants: [String],
  date: Date,
  timeStart: String,
  timeEnd: String,
  notes: String
});

// create database model based on the schema
var Event = mongoose.model('Event', eventSchema);

// enable CORS policy for all domain/origin
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// GET api, to pull all the data/event list
app.get('/event', (req, res) => {
  Event.find()
    .exec()
    .then(events => {
      res.status(200).json(events);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

// POST api, save new data/event to the database by create an instance of model
app.post('/event', (req, res) => {
  const event = new Event({
    title: req.body.title,
    location: req.body.location,
    participants: req.body.participants,
    date: req.body.date,
    timeStart: req.body.timeStart,
    timeEnd: req.body.timeEnd,
    notes: req.body.notes
  });
  event
    .save()
    .then(result => {
      res.status(200).json({});
    })
    .catch(err => console.log(err));
});

// start the server to listen to the defined port
app.listen(5000, () => {
  console.log('App run in port 5000');
});
