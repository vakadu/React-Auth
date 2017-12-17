const express = require('express');
const http = require('http');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

//DB setup
mongoose.connect("mongodb://vakadu10:sachin10@ds159856.mlab.com:59856/react-auth");

//App Setup
app.use(morgan('combined'));
app.use(bodyparser.json({ type: '*/*' }));
router(app);

//Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Listening on port " + port);
