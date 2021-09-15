const app = require('express')()
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
io.on("connection", socket => { 
  socket.on('message',({name, message}) =>{
    console.log(message)
    io.emit('message',{name,message})
  })
});

const PORT = process.env.PORT || 3001 
httpServer.listen(PORT,() => console.log(`server started on ${PORT}`));