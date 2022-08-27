const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose');
const port = 3000

mongoose.connect(
  'mongodb://localhost:27017',
  {
    dbName: 'header',
    authSource: 'admin',
    user: "test",
    pass: "test",
  }
);

const HeaderSchema = new mongoose.Schema({
  headerid: Number,
  text: String,
});

const HeaderModel = mongoose.model('Header', HeaderSchema); // collection called 'headers'

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/header', (req, res) => {
  HeaderModel.find({ headerid: 1 }, (err, headers) => {
    res.send(headers[0]);
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
