import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import axios from "axios";
import { IoMdSend } from "react-icons/io";
import { BsImage } from "react-icons/bs";
import { messages } from "@/data/message";
import { user } from "@/data/user";
import io from "socket.io-client";
import {
  Createconversation,
  GetUsersMessageConversation,
} from "@/features/conversation/conversationReducer";
import { clearconversation } from "@/features/conversation/conversationSlice";
import Loader from "@/components/loader";
let socketIo = io;

const Nessage = () => {
  //   const [roommodal, setRoomModal] = useState(false);
  socketIo = socketIo.connect("http://localhost:4000");
  const dispatch = useDispatch();
  const [conversationId, setConversationId] = useState("");
  const { users, currentUser, getallUserisLoading, userDetails, token } =
    useSelector((store) => store.auth);
  const { menu } = useSelector((store) => store.menu);

  const [message, setMessage] = React.useState([]);
  const [tabid, setTabId] = React.useState(null);
  const [messageloading, setMessageLoading] = React.useState(false);
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
    if (tabid !== null && !conversationDetails) {
      dispatch(Createconversation(tabid));
    }
  }, []);

  // get the conversation
  useEffect(() => {
    if (tabid !== null) {
      dispatch(GetUsersMessageConversation(tabid));
    }
  }, [tabid]);

  // get the messages of the chat
  const handleSingleMessageDetails = async () => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      setMessageLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URLS}/message/${
          conversationDetails?.id
        }`,
        config
      );
      setMessage(response.data.messages);
      setMessageLoading(false);
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
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URLS}/message/${
          conversationDetails?.id
        }`,
        {
          body,
          userId: currentUser?.id,
        },
        config
      );

      // handleSingleMessageDetails();
      setMessage((prev) => [
        ...message,
        { body: data.body, userId: currentUser?.id },
      ]);

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
        ...message,
        { body: message.text, userId: currentUser?.id },
      ]);
      console.log(message);
    });
  }, [socketIo, setMessage]);

  console.log(message);
  return (
    <div className="w-full h-[520px] border rounded-[20px] grid lg:grid-cols-custom_2 ">
      <div className="w-[340px] h-full border-r flex flex-col">
        <div className="w-full px-6 border-b h-[70px] flex items-center gap-3">
          <h4 className="text-xl lg:text-2xl font-semibold family1">
            Messages
          </h4>
          {/* <label
            htmlFor=""
            className="text-dark w-full
             items-center py-2 border rounded-[40px] px-4"
          >
            <div className="text-grey rounded-full text-dark flex items-center justify-center">
              <BiSearch />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent family1 text-base border-none outline-none text-dark"
            />
          </label> */}
        </div>

        {getallUserisLoading ? (
          <div className="w-full pt-6 flex justify-center">
            <Loader type={"dots"} />
          </div>
        ) : (
          <div className="w-full flex flex-col">
            {users?.map((user, index) => {
              return (
                <div
                  onClick={() => setTabId(user?.id)}
                  key={index}
                  className={`${
                    user?.id === tabid ? "bg-[#f1f1f1]" : ""
                  } hover:bg-[#fafafa] w-full cursor-pointer flex items-center justify-between py-3 px-4`}
                >
                  <div className="w-full flex items-center gap-4">
                    {user?.image ? (
                      <img
                        src={user?.image}
                        alt=""
                        className="w-12 h-12 rounded-full"
                      />
                    ) : (
                      <img
                        src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
                        alt=""
                        className="w-12 h-12 rounded-full"
                      />
                    )}

                    <h5 className="text-sm font-semibold family1">
                      {user?.name}
                      <span className="block font-normal text-xs text-grey">
                        Last Message
                      </span>
                    </h5>
                  </div>
                  <h6 className="text-xs font-normal family1">
                    4:45pm
                    <span className="block font-normal text-xs text-grey">
                      {/* Last Message */}
                    </span>
                  </h6>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="w-full flex flex-col">
        {/* TOP BAR */}
        <div className="w-full px-6 border-b h-[70px] flex items-center gap-3">
          <div className="w-full flex items-center gap-4">
            {user[0]?.image ? (
              <img
                src={user[0]?.image}
                alt=""
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <img
                src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
                alt=""
                className="w-12 h-12 rounded-full"
              />
            )}

            <h5 className="text-base font-semibold family1">
              {user[0]?.name}
              <span className="block font-normal text-xs text-grey">
                {moment(user[0]?.createdAt).format("DD MMM YYYY")}
              </span>
            </h5>
          </div>
        </div>
        {/* MESSAGE LIST */}

        <div
          className="w-full bg-[#fafafa] max-h-[380px] h-[380px] 
        py-4 overflow-y-auto p-2 flex flex-col gap-4"
        >
          {messageloading ? (
            <div className="w-full h-full flex items-start justify-center">
              <Loader type={"dots"} />
            </div>
          ) : (
            <>
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
                              <span className="text-xs family1 text-dark">
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
                              <span className="text-xs family1 text-dark">
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
            </>
          )}
        </div>

        {/* input form */}
        <div className="w-full border-t h-[70px] px-8 flex items-center justify-center">
          <form
            onSubmit={(e) => handleCreateMessage(e)}
            action=""
            className="w-full"
          >
            <label htmlFor="search" className="flex text-base items-center gap-2">
              <div
                className="w-12 cursor-pointer text-dark text-xl h-12 hover:bg-[#F1F1F1] rounded-full
               text-dark flex items-center justify-center"
              >
                <BsImage />
              </div>

              <input
                value={body}
                name="body"
                onChange={(e) => setBody(e.target.value)}
                id="search"
                type="text"
                placeholder="Start a new Message"
                className="flex-1 bg-transparent text-sm"
              ></input>
              <div
                className="w-12 cursor-pointer text-dark text-xl h-12 hover:bg-[#F1F1F1] rounded-full
               text-dark flex items-center justify-center"
              >
                <IoMdSend />
              </div>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Nessage;
