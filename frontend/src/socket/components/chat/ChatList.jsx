import React from 'react';
const ChatList = ({ message, senderMessage, createdAt }) => {
  return (
    <div className="w-full flex px-2 flex-col">
      {/* first sender Message */}
      {senderMessage ? (
        <div className="w-full flex items-center justify-end">
          <div className="flex w-full justify-end items-end gap-1">
            <div className="flex-1 flex items-end flex-col justify-end gap-1">
              <span className="max-w-[200px] md:max-w-[400px] rounded-[40px] family1 text-[12px] md:text-[12px] leading-[1.6] text-white flex items-center bg-[#000] justify-center p-4 px-8">
                {message?.body}
              </span>
              <span className="text-xs family1 text-dark">{createdAt}</span>
            </div>
            <div className="w-12 h-12 rounded-full family1 flex items-center justify-center text-lg text-white bg-[#000]">
              {message?.sender?.username && message?.sender?.username[0]}
            </div>
            {/* <img src={message?.sender?.username} className='w-14 h-14 mb-8 rounded-full' alt="" /> */}
          </div>
        </div>
      ) : (
        <div className="w-full flex items-center justify-start">
          <div className="flex w-full justify-start items-end gap-1">
            <div className="w-12 h-12 rounded-full family1 flex items-center justify-center text-lg text-white bg-[#000]">
              {message?.sender?.username && message?.sender?.username[0]}
            </div>
            <div className="flex-1 flex items-start flex-col justify-start gap-1">
              <span className="max-w-[200px] md:max-w-[400px] rounded-[30px] family1 text-[12px] md:text-[12px] leading-[1.6] text-dark flex items-center bg-[#e9e9e9] justify-center p-4 px-8">
                {message?.body}
              </span>
              <span className="text-xs family1 text-dark">{createdAt}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatList;