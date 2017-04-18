'use strict'

const app = require('./config/express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.set('io', io);

const server = http.listen(process.env.PORT || 3000, 'localhost', () => {
	console.log('listening at http://%s:%s', server.address().address, server.address().port);
});
