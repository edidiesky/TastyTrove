import React, { useEffect, useRef } from "react";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { useLocation } from "react-router-dom";
import Lenis from "@studio-freight/lenis";

const SmoothScroll = ({ children }) => {

  return <ReactLenis root>{children}</ReactLenis>;
};

export default SmoothScroll;

// const SmoothScroll = ({ children }) => {
//   const location = useLocation();
//   const lenisRef = useRef(null);

//   useEffect(() => {
//     // Initialize Lenis
//     const lenis = new Lenis({
//       duration: 1.7,
//       easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // https://easings.net
//       direction: "vertical",
//       smooth: true,
//       smoothTouch: true,
//       touchMultiplier: 2,
//     });
//     lenisRef.current = lenis;

//     function raf(time) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     // Cleanup function
//     return () => {
//       lenis.destroy(); // Ensure Lenis is cleaned up on unmount
//     };
//   }, [location.pathname]); // Re-initialize on path change

//   return children;
// };

// export default SmoothScroll;
