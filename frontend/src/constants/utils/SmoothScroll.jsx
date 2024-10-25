import React, { useEffect, useRef } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";
const SmoothScroll = ({ children }) => {

  return (
    <ReactLenis
      options={{
        duration: 3,
        easing: (t) => Math.min(1, 1.001 - Math.pow(3, -10 * t)),
      smoothWheel: true,
        smoothTouch: true,
        wheelMultiplier: 1,
        touchMultiplier: 1, // Adjusts touch scroll sensitivity (higher for more responsiveness)
        infinite: false, // Disable infinite scrolling
        direction: "vertical", // Vertical scrolling direction
      }}
      root
    >
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
