import React, { useEffect } from "react";
import HomeIndex from "../components/home";
import Meta from "@/components/common/Meta";
import gsap from "gsap";

const Home = () => {
  useEffect(() => {
    // const text1 = new SplitType(".titleRef");
    // const text2 = new SplitType(".hero_text2");
    // hero_text2
    gsap.to("body", 0, { css: { visibility: "visible" } });
    // gsap.timeline({ defaults: { ease: "SlowMo.easeOut" } });
    gsap.fromTo(
      ".hero_main_text",
      {
        y: 100,
        opacity: 0,
        skew: 7,
      },
      {
        y: 0,
        skew: 0,
        opacity: 1,
        stagger: { amount: 0.3 },
        duration: 1.6,
        ease: "power4.out",
      },
      4
    );
    // .fromTo(
    //   text1?.words,
    //   {
    //     y: 300,
    //     opacity: 0,
    //   },
    //   {
    //     y: 0,
    //     opacity: 1,
    //     stagger: 0.08,
    //     duration: 1.6,
    //     ease: "power3",
    //   },
    //   5
    // )
  }, []);

  return (
    <div>
      <Meta />
      <HomeIndex />
    </div>
  );
};

export default Home;
