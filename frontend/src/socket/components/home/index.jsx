import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
let socketIo = io;
import moment from "moment";
import { messages } from "@/data/message";
import { BsImage } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import ChatList from "./ChatList";
const HomeIndex = () => {
  // states
  const [message, setMessage] = React.useState([...messages]);
  const [conversation, setConversation] = React.useState([]);
  const [messageloading, setMessageLoading] = React.useState(false);
  const [conversationloading, setConversationLoading] = React.useState(false);
  const [body, setBody] = React.useState("");
  const [image, setImage] = React.useState("");

  const handleCreateMessage = (e) => {};

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="bg-white overflow-hidden shadow-xl lg:w-[450px] h-screen md:h-[550px] w-screen border rounded-2xl">
        {/* top of the chat card */}
        <div className="w-full flex h-[90px] items-center border-b">
          <div className="w-full items-center px-8 flex gap-4">
            <img
              src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
              alt=""
              className="w-10 lg:w-12 h-10 lg:h-12 rounded-full"
            />
            <h4 className="text-lg font-bold family1">
              Dampson Jamiu
              <span className="font-normal block text-sm">Adewale</span>
            </h4>
          </div>
        </div>
        {/* center of the chat card */}
        <div className="w-full max-h-[380px] h-[380px] overflow-y-auto p-2 flex flex-col gap-3">
          {message?.map((message, index) => {
            const senderMessage =
              "669938c72dc6dd45026faf28" === message?.sender?.id;
            const createdAt = moment(message?.createdAt).format(
              "MMMM Do YYYY, h:mm a"
            );
            // console.log(senderMessage)
            return (
              <ChatList
                key={message?.id}
                senderMessage={senderMessage}
                message={message}
                createdAt={createdAt}
              />
            );
          })}
        </div>

        {/* bottom of the chat card */}
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
      </div>
    </div>
  );
};

export default HomeIndex;
