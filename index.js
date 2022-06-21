const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const socketio = require("socket.io");
const http = require("http");

const socketController = require("./src/socket");
const { APP_PORT } = require("./src/helpers/env");

const app = express();

app.use(express.json());
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  })
);
app.use(xss());
app.use(cors());
app.use(express.static("public"));

app.use(bodyParser.json());
app.get("/ping", (req, res) => {
  res.json({
    message: "PING",
  });
});

app.use(require('./src/routes/auth.routes'));
app.use(require('./src/routes/user.routes'));

const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  // sebelum di pecah
    // console.log("new user connected");
  //   socket.on("ping", (data) => {
  //     socket.emit("ping-response", data);
  //   });
  socketController(io, socket);
});

server.listen(APP_PORT, () => {
  console.log(`server running on port ${APP_PORT}`);
});
