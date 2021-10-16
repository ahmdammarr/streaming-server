const app = require('express')()
const http = require('http').Server(app)
const cors = require('cors')

const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})
const port = process.env.PORT || 4000

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {
  console.log('connection')
  socket.on('join-room', (roomId, userId) => {
    console.log()
      socket.join(roomId)
      socket.broadcast.emit('user-connected', userId)

      socket.on('disconnect', () => {
          socket.broadcast.emit('user-disconnected', userId)
      })
  })
})


app.use(cors())
http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`)
})
