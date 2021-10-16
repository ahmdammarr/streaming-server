const express = require('express')
const app = express()
const server = require('http').Server(app)
const cors = require('cors')
const io = require('socket.io')(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
})
const {v4: uuidV4} = require('uuid')

app.use(cors());
// app.get('/:room', (req, res) => {
//     res.render('room', {roomId: req.params.room})
// })

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)
        socket.broadcast.emit('user-connected', userId)

        socket.on('disconnect', () => {
            socket.broadcast.emit('user-disconnected', userId)
        })
    })
})

server.listen(4000)