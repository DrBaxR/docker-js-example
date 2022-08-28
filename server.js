const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose');
const port = 3000

const HeaderSchema = new mongoose.Schema({
  headerid: Number,
  text: String,
});

const HeaderModel = mongoose.model('Header', HeaderSchema); // collection called 'headers'

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/header', (req, res) => {
  mongoose.connect( //don't do this in an actual application
    'mongodb://mongodb', // the name of the database container if used in container form
    {
      dbName: 'header',
      authSource: 'admin',
      user: "test",
      pass: "test",
    }
  ).then(conn => {
    HeaderModel.find({ headerid: 1 }, (err, headers) => {
      mongoose.disconnect();
      res.send(headers[0]);
    })
  });
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
