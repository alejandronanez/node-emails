require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const expressPort = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', function handleGet(req, res) {
  res
    .status(200)
    .json({
      message: 'hello world'
    });
});

app.post('/send-email', function handlePost(req, res) {
  const {
    name,
    email,
    message
  } = req.body;

  res
  .status(200)
  .json({
    name,
    email,
    message
  });
});

app.listen(expressPort, function () {
  console.log(`Running on port ${expressPort}`);
});
