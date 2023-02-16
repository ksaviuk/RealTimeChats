import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

// add to server/package.json "start": "nodemon longpolling.js",
// in App Component remove component to current

const LongPolling = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')

    
    useEffect(() => {
        subscribe()
    }, [])

    const subscribe = async () => {
        try{
            const {data} = await axios.get('http://localhost:5000/get-message')
            setMessages(prev => [data, ...prev])
            await subscribe()
        } catch (e) {
            setTimeout( () => {
                subscribe()
            }, 5000)
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
           <h1 style={{textAlign: 'center'}}>Chat with <i>Long Polling</i> method</h1>
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

export default LongPolling