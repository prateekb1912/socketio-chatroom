const http = require("http");
const path = require("path");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 3000;

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Run when client connects
io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  // Emit to single client
  socket.emit("message", "Welcome to ChatRoom");

  // Broadcast on user connect - to all except the client
  socket.broadcast.emit("message", "User has joined the chat");

  // Disconncection broadcast
  socket.on("disconnect", () => {
    io.emit("message", "User has left the room");
  });

  // Listen for chat-message
  socket.on('chat-message', (msg)=>{
    io.emit('message', msg);
  })
});

server.listen(PORT, () => `Server running on http://localhost:${PORT}`);
