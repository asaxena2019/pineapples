const http = require('http')
const express = require('express')

const app = express()
app.use(express.static('public'))

const PORT = process.env.PORT || 3000
const INDEX = '/public/index.html'

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = require('socket.io')(server)

io.sockets.on('connection', (socket) => {
	console.log('Client connected: ' + socket.id)

	socket.on('mouse', (data) => socket.broadcast.emit('mouse', data))

	socket.on('disconnect', () => console.log('Client has disconnected'))
})

/*const PORT = process.env.PORT || 3000;
const http = require('http')
const express = require('express')
const app = express()

app.use(express.static('public'))

app.set('port', PORT)

const server = http.createServer(app)

server.on('listening', () => {
 console.log('Listening on ports')
})

// Web sockets
const io = require('socket.io')(server)

io.sockets.on('connection', (socket) => {
	console.log('Client connected: ' + socket.id)

	socket.on('mouse', (data) => socket.broadcast.emit('mouse', data))

	socket.on('disconnect', () => console.log('Client has disconnected'))
})

server.listen(PORT)

//server.listen(process.env.PORT || '3000', 
	//() => console.log("Server is running..."));*/