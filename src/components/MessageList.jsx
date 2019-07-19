import React from 'react'
import Message from './Message.jsx'

export default function MessageList({ messagesList, selectedHandler, readHandler, starHandler}){
  return (
    <div className="container">
      {messagesList.map(message => {
        return (
          <Message
            message={message}
            selectedHandler={selectedHandler}
            readHandler={readHandler}
            starHandler={starHandler}

          />
        )
      })}
  </div>
  )
}
