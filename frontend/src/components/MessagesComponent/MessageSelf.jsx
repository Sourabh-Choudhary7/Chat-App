import React from 'react'

const MessageSelf = ({ message }) => {
    console.log(message)
    return (
        <div className='message-self-container'>
            <div className="messageBox-self">
                <p className="self">
                    {message.message}
                </p>
            </div>
                <span>{message.timestamp}</span>
        </div>
    )
}

export default MessageSelf