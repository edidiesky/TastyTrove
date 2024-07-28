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

const chatCardVariants = {
  initial: {
    opacity: 0,
    width: "6rem",
    height: "6rem",
  },
  enter: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    width: "400px",
    height: "550px",
  },
  closed: {
    opacity: 0,
    transition: { duration: 0.2, ease: [0.76, 0, 0.24, 1] },
    width: "6rem",
    height: "6rem",
  },
};

const ChatCard = ({ active, setActive }) => {
  // socketIo = socketIo.connect('https://terratextrading-api.vercel.app');
  socketIo = socketIo.connect("http://localhost:4000");
  const dispatch = useDispatch();
  const [conversationId, setConversationId] = useState < string > "";
  const { users, currentUser, userDetails, token } = useSelector(
    (store) => store.auth
  );

  const [message, setMessage] = React.useState < any > [];
  const [body, setBody] = React.useState < string > "";

  const { conversationDetails } = useSelector((store) => store.conversation);

  useEffect(() => {
    setMessage([]);
    dispatch(clearconversation("any"));
  }, []);

  useEffect(() => {
    if (currentUser?.id !== "" && !conversationDetails) {
      dispatch(
        Createconversation({
          conversationData: { receiverId: "660a143f3d7cbbbe5871bb3f" },
        })
      );
    }
  }, [conversationDetails, currentUser?.id]);

  // get the conversation
  useEffect(() => {
    if (currentUser?.id !== "") {
      dispatch(
        GetUsersMessageConversation({ receiverId: "660a143f3d7cbbbe5871bb3f" })
      );
    }
  }, [currentUser?.id]);

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
      className="mt-[20%] h-[550px] border z-[10000] rounded-3xl overflow-hidden bg-white w-[320px] md:w-[400px] shadow-xl"
    >
      <div className="w-100 flex h-[230px] bg-[var(--blue-1)]">
        <div className="w-100 h-full flex items-center justify-center flex-col gap-1">
          <h4 className="text-4xl font-medium family1 text-white">
            Terrafxtrading
          </h4>
          <div className="w-100 flex items-center justify-center">
            <img
              src="https://static.intercomassets.com/avatars/6970891/square_128/32596-1709562813.png"
              alt=""
              className="w-28 h-28 border-2 object-cover border-[var(--blue-1)] rounded-full"
            />
            <img
              src="https://static.intercomassets.com/avatars/6522705/square_128/Mila-1684751194.png"
              alt=""
              className="-ml-4 w-28 h-28 border-2 object-cover border-[var(--blue-1)] rounded-full"
            />
            <img
              src="https://static.intercomassets.com/avatars/6894781/square_128/5-1700735532.jpg"
              alt=""
              className="-ml-4 w-28 h-28 border-2 object-cover border-[var(--blue-1)] rounded-full"
            />
          </div>
          <h5 className="family1 text-2xl w-[90%] mx-auto text-center text-white">
            We typically reply in a few minutes
            <span className="block text-xl text-[#A5A0FC] family1 pt-2">
              Do you need help? We are just a message away! The Terrafxtrading
              support team is available 24/7 to serve you.
            </span>
          </h5>
        </div>
      </div>
      <div className="w-100 max-h-[250px] h-[250px] overflow-y-auto p-2 flex flex-col gap-1">
        {
          // {/* first conversation */ }
          message?.map((message, index) => {
            const senderMessage = currentUser?.id === message?.sender?.id;
            const createdAt = moment(message?.createdAt).format(
              "MMMM Do YYYY, h:mm a"
            );
            // console.log(senderMessage)
            return (
              <div key={index} className="w-100 flex px-2 flex-col">
                {/* first sender Message */}
                {senderMessage ? (
                  <div className="w-100 flex items-center justify-end">
                    <div className="flex w-100 justify-end items-end gap-1">
                      <div className="flex-1 flex items-end flex-col justify-end gap-1">
                        <span className="max-w-[200px] md:max-w-[400px] rounded-[40px] family1 text-[12px] md:text-[12px] leading-[1.6] text-white flex items-center bg-[var(--blue-1)] justify-center p-4 px-8">
                          {message?.body}
                        </span>
                        <span className="text-sm text-dark">{createdAt}</span>
                      </div>
                      <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl text-white bg-[#000]">
                        {message?.sender?.username &&
                          message?.sender?.username[0]}
                      </div>
                      {/* <img src={message?.sender?.username} className='w-14 h-14 mb-8 rounded-full' alt="" /> */}
                    </div>
                  </div>
                ) : (
                  <div className="w-100 flex items-center justify-start">
                    <div className="flex w-100 justify-start items-end gap-1">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl text-white bg-[#000]">
                        {message?.sender?.username &&
                          message?.sender?.username[0]}
                      </div>
                      <div className="flex-1 flex items-start flex-col justify-start gap-1">
                        <span className="max-w-[200px] md:max-w-[400px] rounded-[30px] family1 text-[12px] md:text-[12px] leading-[1.6] text-dark flex items-center bg-[#e9e9e9] justify-center p-4 px-8">
                          {message?.body}
                        </span>
                        <span className="text-lg text-dark">{createdAt}</span>
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
      <div className="h-28 border-t w-100 border-[rgba(0,0,0,.1)] flex items-center justify-center">
        <div className="w-[95%] mx-auto flex items-center">
          <form
            onSubmit={(e) => handleCreateMessage(e)}
            className="flex w-100 items-center gap-1"
          >
            {/* <img src="/user_2.png" className='w-16 h-16 rounded-full' alt="" /> */}
            <label
              htmlFor="search"
              className="text-xl w-full rounded-[40px] justify-between input flex items-center gap-1"
            >
              <input
                value={body}
                name="body"
                onChange={(e) => setBody(e.target.value)}
                id="search"
                type="text"
                placeholder="Start a new Message"
                className="w-90 text-xl"
              ></input>
              <IoMdSend fontSize={"20px"} />
            </label>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatCard;
