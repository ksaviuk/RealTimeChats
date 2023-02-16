const express = require('express')     // import express 
const cors = require('cors')     // import cors
const events = require('events')     // для керування подіями в Node JS

const PORT = 5000     // set port

const emitter = new events.EventEmitter()     // інструмент для взаємодіїї із подіями

const app = express()     // create app

app.use(cors())     // додаємо MW
app.use(express.json())

app.get('/get-message', ((req, res) => {
   emitter.once('newMessage', (message) => {
    res.json(message)
   })
}))     // get запит

app.post('/new-message', ((req, res) => {
    const message = req.body;
    emitter.emit('newMessage', message)
    res.status(200);
}))      // post запит


app.listen(PORT, () => console.log(`server start on port ${PORT}`))     // прослуховування порта
