const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST'],
  } }); 
const routes = require('./routes');

io.listen(server);
app.use(express.json());

require('./sockets/status')(io);

app.use('/images', express.static(path.join(__dirname, '..', '..', 'public'))); 

app.use('/', routes.login);
app.use('/', routes.register);
app.use('/', routes.products);
app.use('/', routes.user);
app.use('/', routes.sales);
app.use('/', routes.admin);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = server;
