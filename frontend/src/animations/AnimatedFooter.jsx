import React from "react";
const AnimatedFooter = ({ children }) => {
  return (
    <div
      className="relative h-[800px]  bg-[var(--green-1)]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative h-[calc(100vh+800px)] -top-[100vh]">
        <div className="h-[800px] sticky top-[calc(100vh-800px)]">
          <Footer />
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="w-full h-full px-12 py-40  mx-auto flex items-center flex-col gap-40">
      <div className="flex items-center gap-24">
        <div className="flex flex-col gap-4">
          <h4 className="text-xl font-booking_font_bold">ABOUT</h4>
          <ul className="flex flex-col text-lg font-booking_font_normal text-white gap-4">
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-xl font-booking_font_bold">EDUCATION</h4>
          <ul className="flex flex-col text-lg font-booking_font_normal text-white gap-4">
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
          </ul>
        </div>
      </div>
      <h1 className="font-booking_font4 text-8xl text-white">
        A sticky Footer
      </h1>
    </div>
  );
};

export default AnimatedFooter;
