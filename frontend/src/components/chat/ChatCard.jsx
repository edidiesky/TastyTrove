import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import io from "socket.io-client";
let socketIo = io;
import moment from "moment";
import { clearconversation } from "@/features/conversation/conversationSlice";
import {
  Createconversation,
  GetUsersMessageConversation,
} from "@/features/conversation/conversationReducer";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { messages } from "@/data/message";
import { BsImage } from "react-icons/bs";

const chatCardVariants = {
  initial: {
    opacity: 0,
    width: "6rem",
    height: "6rem",
  },
  enter: {
    opacity: 1,
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    width: "auto",
    height: "auto",
  },
  closed: {
    opacity: 0,
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
    width: "6rem",
    height: "6rem",
  },
};

const ChatCard = ({ active, setActive }) => {
  // socketIo = socketIo.connect('https://terratextrading-api.vercel.app');
  socketIo = socketIo.connect("http://localhost:4000");
  const dispatch = useDispatch();
  const [conversationId, setConversationId] = useState("");
  const { users, currentUser, userDetails, token } = useSelector(
    (store) => store.auth
  );
  const { menu } = useSelector((store) => store.menu);

  const [message, setMessage] = React.useState([]);
  // const [message, setMessage] = React.useState([...messages]);
  const [body, setBody] = React.useState("");

  const { conversationDetails } = useSelector((store) => store.conversation);
  // const conversationDetails = {
  //   id:""
  // }
  useEffect(() => {
    setMessage([]);
    dispatch(clearconversation());
  }, []);

  useEffect(() => {
    if (menu?.user?.id !== "" && !conversationDetails) {
      dispatch(Createconversation(menu?.user?.id));
    }
  }, [conversationDetails, menu?.user?.id]);

  // get the conversation
  useEffect(() => {
    if (menu?.user?.id !== "") {
      dispatch(GetUsersMessageConversation(menu?.user?.id));
    }
  }, [menu?.user?.id]);

  // get the messages of the chat
  const handleSingleMessageDetails = async () => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URLS}/message/${
          conversationDetails?.id
        }`,
        config
      );
      setMessage(response.data.message);
      // setMessage(response.data.messages)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (conversationDetails) {
      handleSingleMessageDetails();
    } else {
      setMessage([]);
    }
  }, [setMessage, conversationDetails]);
  const handleCreateMessage = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      // const { data } = await axios.post(
      //     `${import.meta.env.VITE_API_BASE_URLS}/message/${conversationDetails?.id}`,
      //     {
      //         body,
      //         userId: currentUser?.id,
      //     },
      //     config
      // )

      // handleSingleMessageDetails()
      // setMessage((prev?) => [...prev, { body: data.body, userId: currentUser?.id, }])

      socketIo?.emit("sendMessage", {
        receiverId: "660a143f3d7cbbbe5871bb3f",
        senderId: currentUser?.id,
        text: body,
      });
      setBody("");
    } catch (err) {
      console.log(err);
    }

    setBody("");
  };

  React.useEffect(() => {
    socketIo?.emit("addUserId", currentUser?.id);
    socketIo?.on("getAllConnectedUser", (users) => {
      // console.log(users)
    });
    socketIo?.on("getMessage", (message) => {
      setMessage((prev) => [
        ...prev,
        { body: message.text, userId: currentUser?.id },
      ]);
      console.log(message);
    });
  }, [socketIo, setMessage]);

  return (
    <motion.div
      variants={chatCardVariants}
      initial="initial"
      exit="closed"
      animate={active ? "enter" : "exit"}
      className="fixed z-[3000000000] bottom-10 left-5 h-screen md:h-[550px] border rounded-2xl
       overflow-hidden bg-white w-screen lg:w-[400px] shadow-2xl"
    >
      <div className="w-full flex h-[90px] items-center border-b">
        <div className="w-full items-center px-8 flex gap-4">
          {menu?.user?.image ? (
            <img
              src={menu?.user?.image}
              alt=""
              className="w-16 h-16 object-cover  rounded-full"
            />
          ) : (
            <div
              className="w-12 h-12 rounded-full family1 flex items-center 
             justify-center text-lg text-white bg-[#000]"
            >
              {menu?.user?.username && menu?.user?.username[0]}
            </div>
          )}
          <h4 className="text-lg font-bold family1">
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
      <div className="w-full max-h-[380px] h-[380px] overflow-y-auto p-2 flex flex-col gap-1">
        {
          // {/* first conversation */ }
          message?.map((message, index) => {
            const senderMessage = currentUser?.id === message?.sender?.id;
            const createdAt = moment(message?.createdAt).format(
              "MMMM Do YYYY, h:mm a"
            );
            // console.log(senderMessage)
            return (
              <div key={index} className="w-full flex px-2 flex-col">
                {/* first sender Message */}
                {senderMessage ? (
                  <div className="w-full flex items-center justify-end">
                    <div className="flex w-full justify-end items-end gap-1">
                      <div className="flex-1 flex items-end flex-col justify-end gap-1">
                        <span className="max-w-[200px] md:max-w-[400px] rounded-[40px] family1 text-[12px] md:text-[12px] leading-[1.6] text-white flex items-center bg-[#000] justify-center p-4 px-8">
                          {message?.body}
                        </span>
                        <span className="text-sm family1 text-dark">
                          {createdAt}
                        </span>
                      </div>
                      <div className="w-12 h-12 rounded-full family1 flex items-center justify-center text-lg text-white bg-[#000]">
                        {message?.sender?.username &&
                          message?.sender?.username[0]}
                      </div>
                      {/* <img src={message?.sender?.username} className='w-14 h-14 mb-8 rounded-full' alt="" /> */}
                    </div>
                  </div>
                ) : (
                  <div className="w-full flex items-center justify-start">
                    <div className="flex w-full justify-start items-end gap-1">
                      <div className="w-12 h-12 rounded-full family1 flex items-center justify-center text-lg text-white bg-[#000]">
                        {message?.sender?.username &&
                          message?.sender?.username[0]}
                      </div>
                      <div className="flex-1 flex items-start flex-col justify-start gap-1">
                        <span className="max-w-[200px] md:max-w-[400px] rounded-[30px] family1 text-[12px] md:text-[12px] leading-[1.6] text-dark flex items-center bg-[#e9e9e9] justify-center p-4 px-8">
                          {message?.body}
                        </span>
                        <span className="text-sm family1 text-dark">
                          {createdAt}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* first receiver Message */}
              </div>
            );
          })
        }
      </div>

      {/* message form */}
      <div className="h-[80px] border-t w-full border-[rgba(0,0,0,.1)] flex items-center justify-center">
        <form
          onSubmit={(e) => handleCreateMessage(e)}
          className="flex w-full px-4 h-full justify-center items-center gap-1"
        >
          <label
            htmlFor="search"
            className="text-base family1 w-full rounded-[40px] justify-center h-full flex items-center"
          >
            <div
              // onClick={() => setActive(false)}
              className="w-12 hover:bg-[#eee] h-12 cursor-pointer flex
               items-center justify-center rounded-full  text-lg"
            >
              <BsImage fontSize={"20px"} />
            </div>
            <input
              value={body}
              name="body"
              onChange={(e) => setBody(e.target.value)}
              id="search"
              type="text"
              placeholder="Start a new Message"
              className="text-sm bg-transparent flex-1"
            ></input>

            <div
              // onClick={() => setActive(false)}
              className="w-12 hover:bg-[#eee] h-12 cursor-pointer flex items-center justify-center rounded-full  text-lg"
            >
              <IoMdSend fontSize={"20px"} />
            </div>
          </label>
        </form>
      </div>
    </motion.div>
  );
};

export default ChatCard;
