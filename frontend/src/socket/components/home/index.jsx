import { user } from "@/data/user";
import React from "react";
import { Link } from "react-router-dom";
const HomeIndex = () => {
  return (
    <div className="w-full py-20 pb-40 flex items-center justify-center">
      <div className=" px-4 md:w-[80%] max-w-[1110px] flex flex-col items-center justify-center gap-20 mx-auto">
        <h2 className="font-bold text-center family1 text-6xl">
          Explore Instant <br /> Chat Messaging
          <span className="block max-w-[700px] pt-2 font-normal text-lg">
           Select the user you intend to use and chat,  Let us explore the power of instant messaging with socketio
          </span>
        </h2>
        <div className="md:w-[80%] md:px-8 grid md:grid-cols-2 md:justify-center items-center gap-8">
          {user?.map((user, index) => {
            return (
              <Link
                to={`/chat/${user?.id}`}
                key={index}
                className="w-full cursor-pointer h-[400px] group overflow-hidden relative"
              >
                <div className="absolute rounded-[40px] left-5 family1 bg-[#eee] top-5 px-4 py-3 text-center z-30 text-[#000] text-sm">
                  {user?.name}
                </div>
                <div className="absolute z-[20] h-full w-full bg-[rgba(0,0,0,.4)]"></div>
                <img
                  style={{ transition: "all .4s" }}
                  src={user.image}
                  alt=""
                  className="w-full h-full absolute object-cover group-hover:scale-[1.2]"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeIndex;
