import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

let socket;
const ENDPOINT = 'http://localhost:5000'

const Chat = () => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  
  useEffect(()=>{
    const {name, room} = queryString.parse(window.location.search)

    socket = io(ENDPOINT)

    setName(name)
    setRoom(room)
    socket.emit('join', {name, room})
  },[ENDPOINT, window.location.search])

  return (
    <div>
      Chat component
    </div>
  )
}

export default Chat
