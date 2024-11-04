import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import axios from "axios";
import { IoMdSend } from "react-icons/io";
import { BsImage } from "react-icons/bs";
import {
  getAllSellerConversationUsers,
  GetUsersMessageConversation,
} from "@/features/conversation/conversationReducer";
import { clearconversation } from "@/features/conversation/conversationSlice";
import Loader from "@/components/loader";
import { SocketContext } from "@/context/SocketContext";

const Nessage = () => {
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch();
  const { users, currentUser } = useSelector((store) => store.auth);

  const [chat, setChat] = useState({ messages: [] });

  const [conversationId, setConversationId] = useState(null);
  const [messageloading, setMessageLoading] = useState(false);
  const [body, setBody] = useState("");
  const { conversationDetails, getUsersInConversationisLoading, conversation } =
    useSelector((store) => store.conversation);
  useEffect(() => {
    setChat([]);
    dispatch(clearconversation());
    dispatch(getAllSellerConversationUsers());
  }, []);

  // get the conversation
  useEffect(() => {
    if (conversationId) {
      dispatch(GetUsersMessageConversation(conversationId));
    }
  }, [conversationId]);
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
    return () => {
      socket.off("getMessage");
    };
  }, [socket]);
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
          receiverid: "",
        },
        { withCredentials: true }
      );
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

  // console.log(conversationDetails);
  // find specific user
  const mainuser = users?.find((user) => user?.id === conversationId);
  // console.log(mainuser);
  console.log("chat", chat);

  return (
    <div className="w-full h-[520px] border rounded-[20px] grid md:grid-cols-custom_2 ">
      <div className="w-[340px] h-full border-r flex gap-4 flex-col">
        <div className="w-full px-6 border-b h-[70px] flex items-center gap-3">
          <h4 className="text-xl lg:text-2xl font-semibold family1">
            Messages
          </h4>
          {/* <label
            htmlFor=""
            className="text-dark w-full
             items-center py-2 border rounded-full px-4"
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

        {getUsersInConversationisLoading ? (
          <div className="w-full pt-6 flex justify-center">
            <Loader type={"dots"} color={"#000"} />
          </div>
        ) : (
          <div className="w-full flex flex-col">
            {conversation?.map((data, index) => {
              return (
                <div
                  onClick={() => setConversationId(data?.id)}
                  key={index}
                  className={`${
                    data?.id === conversationId ? "bg-[#f1f1f1]" : ""
                  } hover:bg-[#fafafa] w-full cursor-pointer flex items-center justify-between py-4 px-4`}
                >
                  <div className="flex-1 flex items-center gap-4">
                    {data?.receiver?.image ? (
                      <img
                        src={data?.receiver?.image}
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
                      {data?.receiver?.name}
                      <span className="block font-normal text-xs text-grey">
                        {data?.lastMessage}
                      </span>
                    </h5>
                  </div>
                  <h6 className="text-xs font-normal family1">
                    {moment(data?.createdAt).format("DD MMM YYYY")}
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
          {mainuser && (
            <div className="w-full flex items-center gap-4">
              {mainuser?.image ? (
                <img
                  src={mainuser?.image}
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
                {mainuser?.name}
                <span className="block font-normal text-xs text-grey">
                  {moment(mainuser?.createdAt).format("DD MMM YYYY")}
                </span>
              </h5>
            </div>
          )}
        </div>
        {/* MESSAGE LIST */}

        <div
          className="w-full bg-[#fafafa] max-h-[380px] h-[380px] 
        py-4 overflow-y-auto p-2 flex flex-col gap-4"
        >
          {messageloading ? (
            <div className="w-full h-full flex items-start justify-center">
              <Loader type={"dots"} color={"#000"} />
            </div>
          ) : (
            <>
              {
                // {/* first conversation */ }
                chat?.messages?.map((message, index) => {
                  const senderMessage = currentUser?.id === message?.sender?.id;
                  const createdAt = moment(message?.createdAt).format(
                    "MMMM Do YYYY, h:mm a"
                  );
                  // console.log(senderMessage)
                  return (
                    <div key={index} className="w-full flex px-2 flex-col">
                      {/* first sender Message */}
                      {!senderMessage ? (
                        <div className="w-full flex items-center justify-start">
                          <div className="flex w-full justify-end items-end gap-1">
                            <div className="flex-1 flex items-end flex-col justify-end gap-1">
                              <span
                                className="max-w-[200px] md:max-w-[400px] rounded-full family1 text-sm md:text-sm leading-[1.6]
                             text-white flex items-center bg-[#1d9bf0] justify-center p-3 px-4"
                              >
                                {message?.text}
                              </span>
                              <span className="text-xs family1 text-dark">
                                {createdAt}
                              </span>
                            </div>
                            <div className="w-10 h-10 rounded-full family1 flex items-center uppercase justify-center text-lg text-white bg-[#000]">
                              {message?.sender?.username &&
                                message?.sender?.username[0]}
                            </div>
                            {/* <img src={message?.user?.username} className='w-14 h-14 mb-8 rounded-full' alt="" /> */}
                          </div>
                        </div>
                      ) : (
                        <div className="w-full flex items-center justify-end">
                          <div className="flex w-full justify-start items-end gap-1">
                            <div className="w-10 h-10 rounded-full family1 flex items-center justify-center text-lg text-white bg-[#2f3336]">
                              {message?.receiver?.username &&
                                message?.receiver?.username[0]}
                            </div>
                            <div className="flex-1 flex items-start flex-col justify-start gap-1">
                              <span className="max-w-[200px] md:max-w-[400px] rounded-full family1 text-[12px] md:text-[12px] leading-[1.6] text-dark flex items-center bg-[#e9e9e9] justify-center p-3 px-4">
                                {message?.text}
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
            onSubmit={(e) =>
              handleCreateMessage({
                e,
                receiverid: chat?.messages[0]?.seller?.id,
              })
            }
            action=""
            className="w-full"
          >
            <label
              htmlFor="search"
              className="flex text-base items-center gap-2"
            >
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
