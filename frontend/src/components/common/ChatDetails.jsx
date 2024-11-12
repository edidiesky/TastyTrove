import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const ChatDetails = ({ message, type }) => {
  const { currentUser } = useSelector((store) => store.auth);

  const senderMessage = currentUser?.id !== message?.senderid;
  // console.log("currentUser?.id", currentUser?.id);
  // console.log("message?.senderid", message?.senderid);
  const createdAt = moment(message?.createdAt).format("MMMM Do YYYY, h:mm a");
  if (type === "dashboard") {
    return (
      <div className="w-full flex px-2 flex-col gap-3">
        {/* first sender Message */}
        {!senderMessage ? (
          <div className="w-full flex items-center justify-end">
            <div className="flex w-full justify-end items-end gap-1">
              <div className="flex-1 flex items-end flex-col justify-end gap-1">
                <span className="max-w-[200px] md:max-w-[400px] rounded-full family1 text-sm md:text-sm leading-[1.6] text-white flex items-center bg-[#1d9bf0] justify-center p-3 px-4">
                  {message?.text}
                </span>
                <span className="text-xs family1 text-dark">{createdAt}</span>
              </div>
              {message?.receiver?.image ? (
                <img
                  src={message?.receiver?.image}
                  alt="user_image"
                  className="w-10 h-10 object-cover rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full family1 flex items-center justify-center text-lg text-white bg-[#2f3336]">
                  {message?.receiver?.username &&
                    message?.receiver?.username[0]}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full flex items-center justify-start">
            <div className="flex w-full justify-start items-end gap-1">
              {message?.sender?.image ? (
                <img
                  src={message?.sender?.image}
                  alt="user_image"
                  className="w-10 h-10 object-cover rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full family1 flex items-center justify-center text-lg text-white bg-[#2f3336]">
                  {message?.sender?.username && message?.sender?.username[0]}
                </div>
              )}

              <div className="flex-1 flex items-start flex-col justify-start gap-1">
                <span className="max-w-[200px] md:max-w-[400px] rounded-full family1 text-[12px] md:text-[12px] leading-[1.6] text-dark flex items-center bg-[#e9e9e9] justify-center p-3 px-4">
                  {message?.text}
                </span>
                <span className="text-xs family1 text-dark">{createdAt}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="w-full flex px-2 flex-col gap-3">
      {/* first sender Message */}
      {senderMessage ? (
        <div className="w-full flex items-center justify-end">
          <div className="flex w-full justify-end items-end gap-1">
            <div className="flex-1 flex items-end flex-col justify-end gap-1">
              <span className="max-w-[200px] md:max-w-[400px] rounded-full family1 text-sm md:text-sm leading-[1.6] text-white flex items-center bg-[#1d9bf0] justify-center p-3 px-4">
                {message?.text}
              </span>
              <span className="text-xs family1 text-dark">{createdAt}</span>
            </div>
            {message?.receiver?.image ? (
              <img
                src={message?.receiver?.image}
                alt="user_image"
                className="w-10 h-10 object-cover rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full family1 flex items-center justify-center text-lg text-white bg-[#2f3336]">
                {message?.receiver?.username && message?.receiver?.username[0]}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full flex items-center justify-start">
          <div className="flex w-full justify-start items-end gap-1">
            {message?.sender?.image ? (
              <img
                src={message?.sender?.image}
                alt="user_image"
                className="w-10 h-10 object-cover rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full family1 flex items-center justify-center text-lg text-white bg-[#2f3336]">
                {message?.sender?.username && message?.sender?.username[0]}
              </div>
            )}

            <div className="flex-1 flex items-start flex-col justify-start gap-1">
              <span className="max-w-[200px] md:max-w-[400px] rounded-full family1 text-[12px] md:text-[12px] leading-[1.6] text-dark flex items-center bg-[#e9e9e9] justify-center p-3 px-4">
                {message?.text}
              </span>
              <span className="text-xs family1 text-dark">{createdAt}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatDetails;
