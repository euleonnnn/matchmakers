const express = require("express");
const { reset } = require("nodemon");
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
var path = require('path');

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('MongoDB Connected...')
    } catch(err) {
        console.error(err.messgae);
        process.exit(1);
    }
}

const app = express();

connectDB();

app.use(express.json({extended: false}));

//Routers
app.use('/api/users', require("./routes/api/users"));
app.use('/api/auth', require("./routes/api/auth"));
app.use('/api/profile', require("./routes/api/profile"));
app.use('/api/games', require("./routes/api/games"));
app.use('/api/chat', require("./routes/api/chat"));
app.use('/api/gamechat', require("./routes/api/gamechat"));
app.use('/api/message', require("./routes/api/message"));



if (process.env.NODE_ENV == 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => 
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const io = require("socket.io")(8900, {
    cors: {
        origin:"http://localhost:3000"
    },
})

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};
  

io.on("connection", (socket) => {
    console.log("a user connected.");
  
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });
  
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
      if (user) {
        io.to(user.socketId).emit("getMessage", {
          senderId,
          text,
        });
      }
    });
  
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });