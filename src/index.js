require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');

const app = express();
const expressPort = process.env.PORT || 8000;

// Sendgrid config
sgMail.setApiKey(process.env.SENDGRID_API);

// Configure CORS
const corsOptions = {
  origin: process.env.FRONTEND_HOST,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Express config
app.use(bodyParser.json());
app.use(cors(corsOptions));

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

  sgMail.send(messageToSend)
    .then(function() {
      res
        .status(200)
        .json({
          status: 'OK'
        });
    })
    .catch(function() {
      res
        .status(400)
        .json({
          status: 'ERROR'
        });
    });
});

// Start Express
app.listen(expressPort, function () {
  console.log(`Running on port ${expressPort}`);
});
