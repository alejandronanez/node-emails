require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');

const app = express();
const expressPort = process.env.PORT || 3000;

// Sendgrid config
sgMail.setApiKey(process.env.SENDGRID_API);

// Express config
app.use(bodyParser.json());

// Express routes
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

  const messageToSend = {
    to: process.env.TO_EMAIL,
    from: email,
    subject: 'Contact from your website!',
    text: message
  };

  sgMail.send(messageToSend).then(console.log).catch(console.error);

  res
  .status(200)
  .json({
    status: 'OK'
  });
});

// Start Express
app.listen(expressPort, function () {
  console.log(`Running on port ${expressPort}`);
});
