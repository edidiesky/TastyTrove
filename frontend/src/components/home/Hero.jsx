import Magnetic from "@/animations/Magnetic";
import React, { useEffect } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import SplitType from "split-type";
import gsap from "gsap";
import { Link } from "react-router-dom";
import Image from "../common/Image";

export default function Hero() {
  useEffect(() => {
    const text1 = new SplitType(".hero_main_text");
    const text2 = new SplitType(".hero_submain_text");
    const text3 = new SplitType(".hero_about_text");
    gsap
      .timeline()
      .to("body", { css: { visibility: "visible" } })
      .to(
        ".overlay_1",
        {
          height: 0,
          top: "-100%",
          ease: "power3.inOut",
          duration: 2,
        },
        .8
      )
      .fromTo(
        text2?.chars,
        {
          y: "100%",
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: { amount: 0.6 },
          duration: 1,
          ease: "power4.out",
        },
        1.2
      )
      .fromTo(
        text1?.words,
        {
          y: "100%",
          opacity: 0,
          skew: 7,
        },
        {
          y: 0,
          skew: 0,
          opacity: 1,
          stagger: { amount: 0.6 },
          duration: 1.6,
          ease: "power4.out",
        },
        1.6
      )
      // hero_btn
      .fromTo(
        text3?.lines,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: { amount: 0.3 },
          duration: 0.8,
          ease: "power4.out",
        },
        1.8
      )
      .fromTo(
        ".hero_btn",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power4.out",
        }
      );
  }, []);

  return (
    <HeroContent className="flex w-full flex-col gap-4">
      <div className="w-full exWrapper flex">
        <div className="HeroRight flex items-center justify-center">
          <div className="flex HeroRightC flex-col gap-12 auto">
            <div className="w-full hide">
              <h4 className="text-lg hero_submain_text family1 text-light uppercase text-white">
                THE BEST RESTAURANTS IN TOWN
              </h4>
            </div>
            <div className="w-full hide">
              <h1 className="hero_main_text hide family3 text-8xl text-white">
                <span className="">FINE</span>
                <br /> <span className="">DINING</span> <br />{" "}
                <span className="">EXPERIENCE</span>
              </h1>
            </div>
            <div className="w-full overflow-hidden">
              <h4 className="text-xl w-full hero_about_text md:text-2xl family2 text-light text-white">
                Pellentesque vitae viverra risus, sagittis. Venenatis ridiculus
                scelerisque nisi in urna nulla. Sit tempor a et nisl, ac felis.
              </h4>
            </div>
            <div className="w-full hide text-start">
              <Link className="hero_btn" to={"/restaurant/menu"}>
                <button style={{
                  transition:"all .6s"
                }} className="h-[70px] overflow-hidden w-[230px] text-white text-lg border hover:text-[#000] uppercase">
                  <Button
                    bgColor={"var(--primary)"}
                    text={"Explore the Menu"}
                    type={'dark'}
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-1 min-h-40 imageContent">
          <Image
            height={0}
            alt="lazy"
            src="https://avada.website/restaurant/wp-content/uploads/sites/112/2021/04/hero-mobile.jpg"
            className="w-full min-h-40 imagewrapper"
          />
        </div>
      </div>
    </HeroContent>
  );
}

const HeroContent = styled.div`
  .h1 {
    font-size: 100px;
    line-height: 120px;
    @media (max-width: 980px) {
      font-size: 70px;
      line-height: 65px;
    }
    @media (max-width: 480px) {
      font-size: 41px;
      line-height: 45px;
    }
  }
  .exWrapper {
    .imageContent {
      flex: 1;
      position: relative;
      @media (max-width: 980px) {
        width: 100%;
        height: 48rem;
      }
      img {
        height: 100%;
        @media (max-width: 980px) {
          position: absolute;
        }
      }
    }
    .HeroRight {
      flex: 1;
      padding: 8rem 0;
      @media (max-width: 780px) {
        padding: 6rem 0;
      }
      background-color: #000;
      .HeroRightC {
        width: 60%;
        @media (max-width: 980px) {
          width: 70%;
        }
        @media (max-width: 480px) {
          width: 90%;
        }
      }
    }
    @media (max-width: 980px) {
      flex-direction: column;
    }
  }
`;
