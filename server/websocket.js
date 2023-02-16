const ws = require('ws')        // import websocket 

const wss = new ws.Server({
    port: 5000,
}, () => console.log(`server start on port 5000`))      // створення серверу ws + задання порту

wss.on('connection', function connection(ws) {
    ws.on('message', function (message) {
        message = JSON.parse(message)
        switch (message.event) {
            case 'message':
                broadcastMessage(message)
                break;
            case 'connection':
                broadcastMessage(message)
                break;
        }
    })
})      // організація подій, підєднання до чату і написання повідомлення

function broadcastMessage(message) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}       // розсилка усім користувачам чату повідомлення
