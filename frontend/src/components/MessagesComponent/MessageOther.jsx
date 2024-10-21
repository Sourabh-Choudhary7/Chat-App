import React from 'react'

const MessageOther = ({message}) => {
    console.log("Reciever",message)
  return (
    <div className='message-other-container'>
         <div className="messageBox-other">
                <p className="other">
                    {message.message}
                </p>
            </div>
                <span>{message.timestamp}</span>
    </div>
  )
}

export default MessageOther