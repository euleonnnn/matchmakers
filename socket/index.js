const io = require("socket.io")(5000, {
    cors: {
        origin:"http://localhost:3000"
    },
})

io.on("connection", (socket) => {
    console.log("Connected a user")
    io.emit("welcome","hello this is socket server")
})

