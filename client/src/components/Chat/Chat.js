import React, { useContext, useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import chatContext from '../context/ChatContext';
import './Chat.css'

let socket;
const ENDPOINT = 'http://localhost:5000'

const Chat = () => {
  const {login, chats, chat, setChat, setChats, users, setUsers} = useContext(chatContext)
  const [isTyping, setIsTyping] = useState(false)
  const [typist, setTypist] = useState("")
  socket = io(ENDPOINT)
  const {name, room} = login
  const effect1 = useRef(false)
  const effect2 = useRef(false)

  useEffect(()=>{
    if(effect1.current === false){
      console.log(name, room)
      socket.emit('join', {name, room})
      socket.on("user-join", (newUsers)=>{
        // console.log(newUser)
        setUsers(newUsers)
      })
      return ()=>{
        effect1.current = true
      }
    }

  },[ name, room, setUsers])

  useEffect(()=>{
    
    if(effect2.current === false){
      socket.on("received", ({text, name})=>{
        setChats(prev => [...prev, {text, name}])
      })

      socket.on("is-typing", ({name, typed})=>{
        console.log(name)
        setIsTyping(typed)
        setTypist(name)
        setIsTyping(true)

        setTimeout(() => {
          setIsTyping(false)
        }, 2000);

      })
    
      socket.on("left", ({users})=>{
        console.log("client left")
        setUsers(users)
        console.log(users)
        socket.off()
      })
      return ()=>{
        effect2.current = true
      }
    }
  })

  const handleOnTyping = (e)=>{
    socket.emit("typing", {name, room})
  }

  const sendChat = ()=>{
    if(chat){
      socket.emit("msg", {text:chat, name:login.name, room:login.room}, ()=> setChat("")) 
    }
    console.log(chats)
  }
  
  return (
    <div className='chatContainer'>
      <h2 className='roomhead'>{room}</h2>
      <div className='chatScreen'>
        {
          chats[0]&&chats.map((chat, i)=>{
            return <div key={chat.text+i} style={{textAlign:chat.name===name?"end":"start", margin:"3rem"}}>
                    <div>{chat.name===name?"You":chat.name}</div>
                    <div className={`${chat.name===name? "msg-contnet-self bg-green":"msg-contnet-user bg-purple"}`} style={{textAlign:"center"}}><span className='msg-span'>{chat.text}</span></div>
                  </div>
          })
        }

      </div>
      <div className='chatInputDiv'>
        <input 
          id='chatInput'
          onChange={(e)=>setChat(e.target.value)} type="text"
          onKeyPress={(e)=> e.key === "Enter"?sendChat():handleOnTyping()}
          value={chat}
        />
        <button id='send-btn' onClick={sendChat}>Send</button>
      </div>
      <p>{isTyping && typist!==name? typist+" is typing":""}</p>
      <div>
        {
          users.map(user=> <li key={user.id}>{user.name}</li>)
        }
      </div>
    </div>
  )
}

export default Chat
