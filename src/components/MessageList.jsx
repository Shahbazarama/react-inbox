import React from 'react'
import Message from './Message.jsx'

export default function MessageList({ messagesList }){
  return (
    <div className="container">
      {messagesList.map(message => {
        return (
          <Message message={message}/>
        )
      })}
  </div>
  )
}
