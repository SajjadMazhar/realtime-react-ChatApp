import React, { useContext } from 'react'
import {Link} from "react-router-dom"
import chatContext from '../context/ChatContext'
import './Join.css'

const Join = () => {
  const {login, setLogin} = useContext(chatContext)

  return (
    <div>
      <input placeholder='Name' type="text" value={login.name} onChange={(e)=> setLogin(prev=> ({...prev, name:e.target.value}))}/>
      <input placeholder='Room' type="text" value={login.room} onChange={(e)=> setLogin(prev=> ({...prev, room:e.target.value}))}/>
      <Link to="/chat"><button>Start</button></Link>
    </div>
  )
}

export default Join
