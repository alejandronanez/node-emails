require('dotenv').config();

const express = require('express');
const app = express();
const expressPort = process.env.PORT || 3000;

app.get('/', function handlePost(req, res) {
  res
    .status(200)
    .json({
      message: 'hello world'
    });
});

app.listen(expressPort, function () {
  console.log(`Running on port ${expressPort}`);
});
