const express = require('express')
const { Server } = require("socket.io")
const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.use(express.static(__dirname + '/public'))
const PORT = process.env.PORT || 8000

let server = app.listen(PORT, () => {
    console.log(PORT);
})

let io = new Server(server)

io.on("connection", socket => {
    socket.on("new-user", (name)=>{
    socket.broadcast.emit("new-user-joined", name)
    })
    socket.on("send-message", ({name, text})=>{
    socket.broadcast.emit("send-user-message",  {name, text})
    })

    socket.on("typing", (name)=>{
        socket.broadcast.emit("user-typing",  name)
        })
})

    