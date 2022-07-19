import React, { useContext } from 'react'
import {Link} from "react-router-dom"
import chatContext from '../context/ChatContext'
import './Join.css'

const Join = () => {
  const {login, setLogin} = useContext(chatContext)

  return (
    <div className='outerInputContainer'>
      <div className='inputContainer'>
      <h1 style={{paddingBottom:4, fontFamily:"sans-serif"}}>Join a Room</h1>
        <input id='name' placeholder='Name' type="text" value={login.name} onChange={(e)=> setLogin(prev=> ({...prev, name:e.target.value}))}/>
        <input id='room' placeholder='Room' type="text" value={login.room} onChange={(e)=> setLogin(prev=> ({...prev, room:e.target.value}))}/>
        <Link to="/chat"><button className='join-btn'>Join</button></Link>
      </div>
    </div>
  )
}

export default Join
