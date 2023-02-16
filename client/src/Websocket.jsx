import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';

// add to server/package.json "start": "nodemon websocket.js",
// in App Component remove component to current

const Websocket = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')
    const socket = useRef()
    const [connected, setConnected] = useState(false)
    const [username, setUsername] = useState('')



    function connect() {
        socket.current = new WebSocket('ws://localhost:5000')

        socket.current.onopen = () => {
            setConnected(true)
            const message = {
                event: 'connection',
                username,
                id: Date.now()
            }
            socket.current.send(JSON.stringify(message))
        }

        socket.current.onmessage = (event) => { 
            const message = JSON.parse(event.data)
            setMessages(prev => [message, ...prev])

        }

        socket.current.onclose = () => {
            console.log('Ws close')
        }

        socket.current.onerror = () => {
            console.log('Socket error')
        }
    }

    const sendMessage = async () => {
        const message = {
            username,
            message: value,
            id: Date.now(),
            event: 'message'
        }
        socket.current.send(JSON.stringify(message));
        setValue('')
    }

    if (!connected) {
        return (
            <div className='center'>
                <div className='form'>
                    <input
                        value={username}
                        onChange={e => setUsername(e.currentTarget.value)}
                        type="text" placeholder='Enter your name' />
                    <button onClick={connect}>Enter</button>
                </div>
            </div>
        )
    }

    return (
        <div className='center'>
            <div>
                <h1 style={{ textAlign: 'center' }}>Chat with <i>Websocket</i> method</h1>
                <div className='form'>
                    <input value={value} onChange={(e) => setValue(e.currentTarget.value)} type='text' placeholder='Enter your message' />
                    <button onClick={sendMessage}>Send</button>
                </div>
                <div >
                    {messages.map(m =>
                        <div  key={m.id}>
                            {m.event === 'connection'
                            ? <div className='connection_message'>User {m.username} connected</div>
                            : <div className='message'>{m.username}: {m.message}</div>
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Websocket
