var express = require('express');
var app = express();
var port = process.env.PORT || '8900';
app.set('port', port);
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: "*"
});
var cors = require('cors');

app.use(cors());

let users = [];

const addUser = (payload) => {
  !users.some((user) => user.userId === payload.userId) &&
    users.push(payload);
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
  console.log(users)
};

const getUser = (userid) => {
  return users.find((user) => user.userId === userid);
};

io.on("connection", (socket) => {
  console.log('users connected')
  socket.on("addUser", ({ id }) => {
    addUser({ userId: id, socketId: socket.id })
    console.log(users)
  });

  //send and get message
  socket.on('sendmsg', (msg) => {
    const user = getUser(!msg.patient ? msg.p_id : msg.d_id)
    if (user) {
      io.to(user.socketId).emit('newmsg', msg)
    }
  })
  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
  });
});

httpServer.listen(port, () => {
  console.log('Server Running at 8900')
});
