import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FiMessageSquare } from "react-icons/fi";
import { BiChevronDown } from "react-icons/bi";
import styled from "styled-components";
import ChatCard from "./ChatCard";
const ChatIndex = () => {
  const [active, setActive] = useState(false);
  return (
    <div className="fixed z-[10000] cursor-pointer right-[3%] bottom-[15%]">
      <AnimatePresence>
        {active && <ChatCard active={active} setActive={setActive} />}
      </AnimatePresence>
      <div
        onClick={() => setActive(!active)}
        style={{ transition: "all .6s" }}
        className="absolute shadow-lg right-0 -bottom-[100px] 
        w-24 hover:shadow-2xl hover:scale-[1.08] h-24 bg-[var(--blue-1)] text-5xl text-white rounded-full flex items-center justify-center"
      >
        {active ? <BiChevronDown /> : <FiMessageSquare />}
      </div>
    </div>
  );
};

export default ChatIndex;
