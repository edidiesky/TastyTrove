import React, { useRef } from "react";
import TextGradient from "./TextGradient";
import HorizontalScroll from "./HorizontalScroll";
import ParallaxContainer from "./ParallaxContainer";
import AnimatedFooter from "./AnimatedFooter";
import ParallaxContent from "./ParallaxContent";
const Animation = () => {
  return (
    <div className="w-full flex flex-col">
      {/* <TextGradient/> */}
      {/* <HorizontalScroll /> */}
      {/* <Content/>
      <AnimatedFooter /> */}
      <ParallaxContent />
      {/* <ParallaxContainer/> */}
    </div>
  );
};

// const Content = () => {
//   return (
//     <div className="h-screen bg-[#000] w-full flex items-center justify-center">
//       <h1 className="font-booking_font4 text-4xl text-white">
//         A Nice sticky Footer
//       </h1>
//     </div>
//   );
// };
export default Animation;
