import React, { useState, createContext, useEffect } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
export const SocketContext = createContext();
const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { currentUser } = useSelector((store) => store.auth);

  useEffect(() => {
    // Initialize Socket.IO client
    const socketInstance = io(import.meta.env.VITE_API_BASE_URL, {
      transports: ["websocket"], // Ensure both transports are supported
      withCredentials: true, // Allow credentials for cross-origin
    });

    // Set socket instance
    setSocket(socketInstance);

    // Cleanup socket connection on unmount
    return () => {
      socketInstance.disconnect();
      console.log("Socket disconnected");
    };
  }, []);
  useEffect(() => {
    if (socket && currentUser) {
      // Emit user ID to the server
      socket.emit("addUserId", currentUser?.id);

      // Register the event listener for connected users
      const handleConnectedUsers = (users) => {
        console.log("Connected users:", users);
      };
      socket.on("getAllConnectedUser", handleConnectedUsers);

      // Cleanup listeners on dependency change
      return () => {
        socket.off("getAllConnectedUser", handleConnectedUsers);
      };
    }
  }, [socket, currentUser]);
  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
