import express from "express";
import path from "path";

import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.WEB_ORIGIN,
  },
});

import { errorHandler, NotFound } from "./middleware/error-handler.js";

app.use(
  cors({
    origin: process.env.WEB_ORIGIN,
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

import Auth from "./routes/authRoute.js";
import userAuth from "./routes/userRoute.js";
import roomRoute from "./routes/roomRoutes.js";
import reservationRoute from "./routes/reservationsRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
import orderRoute from "./routes/orderRoutes.js";
import StatRoute from "./routes/statRoute.js";
import FavouritesRoute from "./routes/favouriteRoute.js";

app.use("/api/v1/auth", Auth);
app.use("/api/v1/user", userAuth);
app.use("/api/v1/room", roomRoute);
app.use("/api/v1/reservation", reservationRoute);
app.use("/api/v1/upload", uploadRoute);
app.use("/api/v1/payment", orderRoute);
app.use("/api/v1/stat", StatRoute);
app.use("/api/v1/favourites", FavouritesRoute);

// // Middlewares
app.use(NotFound);
app.use(errorHandler);

// function that check sif the userId is included in the users array else it add the user id and scoket Id

let users = [];
const addUserId = (userId, socketId) => {
  // check if the object: {yserId, socketId} is being found in the usres array
  // if not found add it to the users array
  const userExits = users.find((user) => user.userId === userId);
  if (!userExits) {
    users.push({ userId, socketId });
  }
};

const RemoveUser = (socketId) => {
  // check if the object: {yserId, socketId} is being found in the usres array
  // if not found add it to the users array
  users = users?.filter((user) => user?.socketId !== socketId);
};

const getASpecificUser = (userId) => {
  // console.log(users)

  // return users?.filter((obj) => obj.userId === userId)
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("a user connected");

  // io.emit('message','Connected form the backend and testing sending of the data form the socket server')
  socket.on("addUserId", (id) => {
    addUserId(id, socket?.id);
    io.emit("getAllConnectedUser", users);
  });
  // socket.on('addUserId', (id) => console.log(id))

  // // get the userId connected from the client and send the users back to the client

  // // send message to a speco=ific user
  socket.on("sendMessage", ({ receiverId, senderId, text }) => {
    // get the specific usre u intend to send the message to
    const user = getASpecificUser(receiverId);
    // console.log(user, users)
    // console.log(user?.socketId)
    // console.log({ receiverId, senderId, text })
    io.to(user?.socketId).emit("getMessage", {
      receiverId: receiverId,
      text: text,
    });
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    RemoveUser(socket?.id);
    io.emit("getAllConnectedUser", users);
  });
});

// addUserId(id, socket?.id)
server.listen(4000, () => {
  console.log("server is listening on port 4000");
});
