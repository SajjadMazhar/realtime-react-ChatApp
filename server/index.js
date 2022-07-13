const express = require("express")
const socketio = require("socket.io")
const http = require("http")

const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = socketio(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET", "POST"]
    }
})

app.use(require('cors')())
app.use(require("./routes/router"))

io.on('connection', (socket)=>{
    console.log("connection has been made")

    socket.on('join', ({name, room})=>{
        console.log(name, room)
    })

    socket.on("disconnect", ()=>{
        console.log("user just left the chat")
    })
})


server.listen(PORT, ()=>{
    console.log("server has started on port:", PORT)
})