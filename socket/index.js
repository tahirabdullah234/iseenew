const io = require("socket.io")(8900, {
  cors: {
    origin: "*",
  },
});
const axios = require('axios');

let users = [];

// {
//   userid,
//     socketid
// }

const addUser = (payload) => {
  !users.some((user) => user.userId === payload.userId) &&
    users.push(payload);
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
  console.log(users)
};

const getUser = (socketId) => {
  return users.find((user) => user.socketId === socketId);
};

io.on("connection", onConnect);
function onConnect(socket) {
  socket.on("addUser", ({ p_id }) => {
    addUser({ p_id, socketId: socket.id })
    console.log(users)
    axios.get('/users/getMsgs/')
      .then(res => {
        if (res.data.success) {
          io.to(socket.id).emit('newUser', res.data.data)
        }
      })
  });

  //send and get message
  socket.on('newMsg', ({ p_id, d_id, msg }) => {
    const user = getUser(socket.id)
    const data = {
      p_id,
      d_id,
      msg,
    }
    // io.to(socket.id).emit('newUser', "res.data.data")
    console.log(data)

  })
  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
  });

}
