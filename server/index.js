const express = require('express');
const http = require('http');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');

//App Setup
app.use(morgan('combined'));
app.use(bodyparser.json({ type: '*/*' }));
router(app);

//Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Listening on port " + port);
