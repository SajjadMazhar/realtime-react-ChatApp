import React, { useState } from 'react'
import chatContext from './ChatContext'

const ChatState = ({children}) => {
    const [login, setLogin] = useState({name:"", room:""})
    const [chats, setChats] = useState([])
    const [chat, setChat] = useState("")
    const [users, setUsers] = useState([])


    const values = {
        login,
        setLogin,
        chats,
        chat,
        setChat,
        setChats,
        users,
        setUsers
    }
  return (
    <chatContext.Provider value={values}>
        {children}
    </chatContext.Provider>
  )
}

export default ChatState
