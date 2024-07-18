import React, { useRef } from "react";
import TextGradient from "./TextGradient";
import HorizontalScroll from "./HorizontalScroll";
import ParallaxContainer from "./ParallaxContainer";
import AnimatedFooter from "./AnimatedFooter";
import ParallaxContent from "./ParallaxContent";
import NavigationMenu from "./NavigationMenu";
// import ReactThreeContent from "./ReactThreeContent";
const Animation = () => {
  return (
    <div className="w-full flex flex-col">
      <NavigationMenu/>
      {/* <TextGradient/> */}
      {/* <HorizontalScroll /> */}
      {/* <Content/>
      <AnimatedFooter /> */}
      {/* <Content/>
      <AnimatedFooter /> */}
      {/* <ReactThreeContent /> */}
      {/* <ParallaxContainer/> */}
    </div>
  );
};

// const Content = () => {
//   return (
//     <div className="h-screen bg-[var(--grey-1)] w-full flex items-center justify-center">
//       <h1 className="font-booking_font4 text-4xl text-[#000]">
//         A Nice sticky Footer
//       </h1>
//     </div>
//   );
// };
export default Animation;
