const { render } = require("ejs");
const express = require("express");
const app = express();

const http = require("http");
const path = require("path");

const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server); // Make sure io is defined here, after creating the server

//setup view engine
app.set(express.static(path.join(__dirname, 'views')));
app.set("view engine", "ejs");


app.use(express.static(path.join(__dirname, 'public')));

io.on("connection", function (socket) {
    socket.on("send-location", function (data) {
        io.emit("receive-location", { id: socket.id, ...data });
    });
    socket.on("disconnect", function (){
        console.log("Client disconnected");
    });
    console.log("a new client connected");
});



app.get('/', (req, res) => {
    res.render("index");

});

server.listen(3000, () => {
    console.log('server is running on port 3000');
}).on('error', (error) => {
    console.error('Error starting server:', error);
});
