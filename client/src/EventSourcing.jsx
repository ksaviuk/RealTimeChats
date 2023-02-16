import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

// add to server/package.json "start": "nodemon eventsource.js",
// in App Component remove component to current

const EventSourcing = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')

    
    useEffect(() => {
        subscribe()
    }, [])

   const subscribe = async () => {
        const eventSource = new EventSource(`http://localhost:5000/connect`)
        eventSource.onmessage = function (event) {
            const message = JSON.parse(event.data);
            setMessages(prev => [message, ...prev]);
        }
    }

    const sendMessage = async () => {
        await axios.post('http://localhost:5000/new-message', {
            message: value,
            id: Date.now()
        })
    }

    return (
        <div className='center'>
           <div>
           <h1 style={{textAlign: 'center'}}>Chat with <i>Event Sourcing</i> method</h1>
            <div className='form'>
                <input value={value} onChange={(e) => setValue(e.currentTarget.value)} type='text' placeholder='Enter your message' />
                <button onClick={sendMessage}>Send</button>
            </div>
            <div >
                    {messages.map(m => 
                        <div className='message' key={m.id}>
                            {m.message}
                        </div>
                        )}
                </div>
           </div>
        </div>
    )
}

export default EventSourcing