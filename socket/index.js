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

const axios = require('axios');
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
  socket.on('sendmsg', (data, token) => {
    const user = getUser(!data.patient ? data.p_id : data.d_id)
    console.log(data, token)
    console.log(user)
    axios.post('http://localhost:5000/request/newmessage', { data }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.data.success) {
          if (user) {
            io.to(user.socketId).emit('newmsg', res.data.msg)
          }
        }
      })
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
