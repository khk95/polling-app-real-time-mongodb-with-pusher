const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

require('./config/db');

// app
const app = express();

// poll config
const poll = require('./routes/poll');

app.use(express.static(path.join(__dirname, 'public')));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// cors
app.use(cors());

// poll
app.use('/poll', poll);

// port
app.set('port', process.env.PORT || 3000);

// server
const server = app.listen(app.get('port'), () => console.log(`server running on ${server.address().port}`));