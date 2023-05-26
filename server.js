const http = require("http");
const path = require("path");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app)
const io = socketio(server);

const PORT = process.env.PORT || 3000;

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Run when client connects
io.on('connection', socket=>{
    console.log('New WebSocket connection')
})

server.listen(PORT, () => `Server running on http://localhost:${PORT}`);
