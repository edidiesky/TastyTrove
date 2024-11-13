import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import io from "socket.io-client";
import moment from "moment";
import { clearconversation } from "@/features/conversation/conversationSlice";
import {
  Createconversation,
  GetUsersMessageConversation,
  UserConversationChat,
} from "@/features/conversation/conversationReducer";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { BsImage } from "react-icons/bs";
import Loader from "../loader";
import { chatCardVariants } from "@/socket/utils/framer";
import { SocketContext } from "@/context/SocketContext";
import ChatDetails from "../common/ChatDetails";

const ChatCard = ({ active, setActive, setChat, chat }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((store) => store.auth);
  const { socket } = useContext(SocketContext);
  const { conversationDetails, getUsersInConversationisLoading } = useSelector(
    (store) => store.conversation
  );
  const { menu } = useSelector((store) => store.menu);
  const [body, setBody] = React.useState("");
  const [messagesFetched, setMessagesFetched] = useState(false);
  useEffect(() => {
    // console.log("conversationDetails", conversationDetails);

    // Check if `conversationDetails` is defined and messages haven't been fetched yet
    if (
      conversationDetails !== undefined &&
      conversationDetails?.id &&
      !messagesFetched
    ) {
      console.log("Fetching conversation messages...");
      dispatch(GetUsersMessageConversation(conversationDetails?.id));
      setMessagesFetched(true);
    }
  }, [conversationDetails, messagesFetched, dispatch]);
  // get the messages of the chat
  useEffect(() => {
    if (socket) {
      socket?.on("getMessage", (message) => {
        setChat((prev) => ({
          ...prev,
          messages: [
            ...prev.messages,
            {
              text: message.text,
              receiverid: message?.receiverid,
              sender: {
                name: message?.sender?.name,
                username: message?.sender?.username,
                image: message?.sender?.image,
                id: message?.sender?.id,
              },
            },
          ],
        }));
        console.log(message);
      });
    }
  }, [socket]);
  // console.log("chat", chat);
  useEffect(() => {
    if (conversationDetails) {
      setChat({ ...chat, messages: conversationDetails?.messages });
    }
  }, [conversationDetails, setChat]);

  const handleCreateMessage = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URLS}/message/${
          conversationDetails?.id
        }`,
        {
          text: body,
          receiverid: menu?.user?.id,
        },
        { withCredentials: true }
      );
      console.log("Data from server after posting message:", data);
      setChat((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            ...data,
            sender: {
              name: currentUser?.name,
              id: currentUser?.id,
              image: currentUser?.image,
              username: currentUser?.username,
            },
          },
        ],
      }));

      socket?.emit("sendMessage", {
        ...data,
        sender: {
          name: currentUser?.name,
          id: currentUser?.id,
          image: currentUser?.image,
          username: currentUser?.username,
        },
      });

      setBody("");
    } catch (err) {
      console.log(err);
    }

    setBody("");
  };

  // console.log("conversationDetails", conversationDetails);
  // console.log("chat", chat);
  return (
    <motion.div
      variants={chatCardVariants}
      initial="initial"
      exit="closed"
      animate={active ? "enter" : "exit"}
      className="fixed z-[3000000000] bottom-10 left-5 h-screen md:h-[550px] border rounded-2xl
       overflow-hidden bg-white w-screen lg:w-[450px] shadow-2xl"
    >
      <div className="w-full flex h-[80px] items-center border-b">
        <div className="w-full items-center px-4 flex gap-2">
          {menu?.user?.image ? (
            <img
              src={menu?.user?.image}
              alt=""
              className="w-14 h-14 object-cover  rounded-full"
            />
          ) : (
            <div
              className="w-12 h-12 rounded-full family1 flex items-center 
             justify-center text-lg text-white bg-[#000]"
            >
              {menu?.user?.username && menu?.user?.username[0]}
            </div>
          )}
          <h4 className="text-base font-bold family1">
            {menu?.user?.name}
            <span className="font-normal block text-sm">
              {menu?.user?.email}
            </span>
          </h4>
        </div>
        <div
          onClick={() => setActive(false)}
          className="w-12 hover:bg-[#eee] h-12 cursor-pointer flex items-center justify-center rounded-full absolute right-5 top-4 text-lg"
        >
          <RxCross1 />
        </div>
      </div>
      <div className="w-full max-h-[390px] h-[390px] overflow-y-auto p-2 flex flex-col gap-3">
        {getUsersInConversationisLoading ? (
          <div className="w-full h-full flex items-start justify-center">
            <Loader type={"dots"} color={"#000"} />
          </div>
        ) : (
          <>
            {
              // {/* first conversation */ }
              chat?.messages?.map((message, index) => {
                const isSender = currentUser?.id === message?.senderid;
                return (
                  <ChatDetails
                    isSender={isSender}
                    key={index}
                    message={message}
                  />
                );
              })
            }
          </>
        )}
      </div>

      {/* message form */}
      <div className="h-[70px] border-t w-full border-[rgba(0,0,0,.1)] flex items-center justify-center">
        <form
          onSubmit={(e) => handleCreateMessage(e)}
          className="flex w-full h-full py-4 px-3 justify-between items-start gap-2"
        >
          <input
            value={body}
            name="body"
            onChange={(e) => setBody(e.target.value)}
            id="search"
            placeholder="Start a new Message"
            className="text-sm py-4 family1 border-none outline-none px-4 flex-1"
          />

          <div
            // onClick={() => setActive(false)}
            className="w-12 hover:bg-[#eee] h-12 cursor-pointer flex items-center justify-center rounded-full  text-lg"
          >
            <IoMdSend fontSize={"20px"} />
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ChatCard;
