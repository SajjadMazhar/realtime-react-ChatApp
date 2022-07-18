import React, { useContext, useEffect, useRef } from 'react'
import io from 'socket.io-client'
import chatContext from '../context/ChatContext';

let socket;
const ENDPOINT = 'http://localhost:5000'

const Chat = () => {
  const {login, chats, chat, setChat, setChats, users, setUsers} = useContext(chatContext)
  socket = io(ENDPOINT)
  const {name, room} = login
  const effect1 = useRef(false)
  const effect2 = useRef(false)

  useEffect(()=>{
    if(effect1.current === false){
      console.log(name, room)
      socket.emit('join', {name, room})
      socket.on("user-join", (newUser)=>{
        console.log(newUser)
        setUsers(prev=> [...prev, newUser])
      })
      return ()=>{
        effect1.current = true
      }
    }

  },[ENDPOINT, login.name, login.room])

  useEffect(()=>{
    if(effect2.current === false){
      socket.on("received", ({text, name})=>{
        setChats(prev => [...prev, {text, name}])
      })
      // socket.on("disconnect", (info)=>{
      //   console.log(info)
      // })
      socket.on("left", (updatedUsers)=>{
        console.log("client left")
        setUsers(updatedUsers)
        console.log(updatedUsers)
        socket.off()
      })
      return ()=>{
        effect2.current = true
      }
    }
  },[])

  const sendChat = ()=>{
    if(chat){
      socket.emit("msg", {text:chat, name:login.name, room:login.room}, ()=> setChat("")) 
    }
    console.log(chats)
  }
  
  return (
    <div>
      <input 
      onChange={(e)=>setChat(e.target.value)} type="text"
      onKeyPress={(e)=> e.key === "Enter"?sendChat():null}
      value={chat}
      />

      <div>
        {
          chats[0]&&chats.map((chat, i)=>{
            return <li key={chat.text+i}>{`${chat.name === name? "You":chat.name}: ${chat.text}`}</li>
          })
        }
      </div>
    </div>
  )
}

export default Chat
