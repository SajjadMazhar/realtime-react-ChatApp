const express = require("express")
const socketio = require("socket.io")
const http = require("http")
const {
    addUser, removeUser, getUser, getUsersInRoom
}= require("./users")

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

    socket.on('join', ({name, room})=>{
        // const {error, user} = addUser({id:socket.id, name, room})
        socket.join(room)
        const users = addUser({id:socket.id, name, room})
        io.to(room).emit("user-join", users)
    })
    
    socket.on("msg", ({text, name, room}, callback)=>{
        // console.log({text, name, room})
        socket.broadcast.to(room).emit("received", {text, name})
        callback()
    })

   socket.on("disconnect", ()=>{
        // console.log("socket disconnect", {id:socket.id})
        const user = removeUser(socket.id)
        if(user){
            io.to(user.room).emit("left", {users:getUsersInRoom(user.room)})
        }
   })
})


server.listen(PORT, ()=>{
    console.log("server has started on port:", PORT)
})