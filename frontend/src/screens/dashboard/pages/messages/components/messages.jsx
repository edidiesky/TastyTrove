import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import axios from "axios";
import { IoMdSend } from "react-icons/io";
import {
  getAllSellerConversationUsers,
  GetUsersMessageConversation,
} from "@/features/conversation/conversationReducer";
import { clearconversation } from "@/features/conversation/conversationSlice";
import Loader from "@/components/loader";
import { SocketContext } from "@/context/SocketContext";
import ChatDetails from "@/components/common/ChatDetails";

const Nessage = () => {
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((store) => store.auth);

  const [chat, setChat] = useState({ messages: [] });
  const [chatDetail, setChatDetail] = useState(null);

  const [conversationId, setConversationId] = useState(null);
  const [createmessageloading, setCreateMessageLoading] = useState(false);
  const [body, setBody] = useState("");
  const {
    conversationDetails,
    getUsersInConversationisLoading,
    conversationisLoading,
    conversation,
  } = useSelector((store) => store.conversation);
  useEffect(() => {
    setChat({ messages: [] });
    setChatDetail()
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
      socket?.off("getMessage"); // Clear previous listener
      socket?.on("getMessage", (message) => {
        setChat((prev) => ({
          ...prev,
          messages: [
            ...prev?.messages,
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
      socket?.off("getMessage");
    };
  }, [socket]);
  useEffect(() => {
    if (conversationDetails) {
      setChat({ ...chat, messages: conversationDetails?.messages });
    }
  }, [conversationDetails, setChat]);
  const handleCreateMessage = async ({ e, receiverid }) => {
    e.preventDefault();
    setCreateMessageLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URLS}/message/${
          conversationDetails?.id
        }`,
        {
          text: body,
          receiverid: receiverid,
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
      setCreateMessageLoading(false);

      setBody("");
    } catch (err) {
      console.log(err);
      setCreateMessageLoading(false);
    }
    // console.log(receiverid);
    setBody("");
  };
  // console.log("chatDetail", chatDetail);

  return (
    <div className="w-full bg-white h-[70vh] max-h-[70vh] z-20 sticky top-0 py-4 px-4 lg:px-6">
      <div className="w-full max-w-custom h-full mx-auto grid grid-cols-custom_2 gap-8">
        <div className="w-[320px] h-[500px] overflow-auto flex flex-col gap-6 px-4 border-r">
          <div className="flex items-center gap-4 justify-between w-full">
            <h4 className="text-2xl lg:text-3xl family6">Messages</h4>
          </div>
          {getUsersInConversationisLoading ? (
            <div className="w-full pt-6 flex justify-center">
              <Loader type={"dots"} color={"#000"} />
            </div>
          ) : (
            <div className="w-full flex flex-col">
              {conversation?.length === 0 ? (
                <h4 className="text-base text-center px-4">
                  Your conversation list is empty
                </h4>
              ) : (
                <>
                  {conversation?.map((data, index) => {
                    return (
                      <div
                        onClick={() => {
                          setConversationId(data?.id);
                          setChatDetail(data);
                        }}
                        key={index}
                        className={`${
                          data?.id === conversationId ? "bg-[#f7f7f7]" : ""
                        } hover:bg-[#fafafa] w-full cursor-pointer flex flex-col py-4 px-4`}
                      >
                        <div className="flex-1 flex items-center gap-4">
                          {data?.receiver?.image ? (
                            <img
                              src={data?.receiver?.image}
                              alt=""
                              className="w-10 h-10 rounded-full"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full family1 flex items-center justify-center text-base text-white bg-[#2f3336]">
                              {data?.receiver?.name && data?.receiver?.name[0]}
                            </div>
                          )}

                          <div className="flex-1 flex flex-col gap-1">
                            <div className="w-full flex items-start justify-between">
                              <h5 className="family6">
                                {data?.receiver?.name}
                              </h5>
                              <span className="block font-normal family1 text-xs text-grey">
                                {moment(data?.createdAt).format("DD MMM YYYY")}
                              </span>
                            </div>
                            <h6 className="text-xs md:text-sm font-normal family1">
                              {data?.lastMessage}
                            </h6>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          )}
        </div>

        <div className="w-full h-full max-h-[500px] border rounded-lg flex flex-col relative">
          <div className="h-[65px] flex items-center justify-between gap-4 w-full border-b px-4">
            <div className="flex relative items-center gap-3 px-3 py-1 hover:bg-[#fafafa] rounded-md cursor-pointer">
              {chatDetail?.receiver && (
                <div className="w-full flex items-center gap-4">
                  {chatDetail?.receiver?.image ? (
                    <img
                      src={chatDetail?.receiver?.image}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <img
                      src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                  )}

                  <h5 className="text-base family6">
                    {chatDetail?.receiver?.name}
                    <span className="block font-normal text-xs text-grey">
                      {moment(chatDetail?.receiver?.createdAt).format(
                        "DD MMM YYYY"
                      )}
                    </span>
                  </h5>
                </div>
              )}
            </div>
          </div>
          <div className="w-full px-6 h-[400px] overflow-auto flex-col gap-2">
            {conversationisLoading ? (
              <div className="w-full h-full flex items-start justify-center">
                <Loader type={"dots"} color={"#000"} />
              </div>
            ) : (
              <div className="flex flex-col py-4 gap-4">
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
              </div>
            )}
          </div>
          <div className="w-full border-t h-[65px] px-8 flex items-center justify-center">
            <form
              onSubmit={(e) =>
                handleCreateMessage({
                  e,
                  receiverid: chatDetail?.receiver?.id,
                })
              }
              className="flex w-full h-full py-4 px-3 justify-between items-center gap-2"
            >
              <input
                value={body}
                name="body"
                onChange={(e) => setBody(e.target.value)}
                id="search"
                disabled={createmessageloading}
                placeholder="Start a new Message"
                className="text-sm border-none outline-none family1 px-4 flex-1"
              />

              <div className="w-10 hover:bg-[#eee] h-10 cursor-pointer flex items-center justify-center rounded-full  text-lg">
                <IoMdSend fontSize={"16px"} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nessage;
