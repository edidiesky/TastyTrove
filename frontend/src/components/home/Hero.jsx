
import React from "react";
import styled from "styled-components";

export default function Hero() {
  return (
    <HeroContent className="flex w-full flex-col gap-4">
      <div className="w-full exWrapper flex">
        <div className="HeroRight flex items-center justify-center">
          <div className="flex HeroRightC flex-col gap-12 auto">
            <h4 className="text-lg family1 text-light uppercase text-white">
              THE BEST RESTAURANTS IN TOWN
            </h4>
            <div className="family3 text-6xl lg:text-8xl text-white">
              FINE DINING EXPERIENCE
            </div>
            <h4 className="text-lg md:text-2xl family2 text-light text-white">
              Pellentesque vitae viverra risus, sagittis. Venenatis ridiculus
              scelerisque nisi in urna nulla. Sit tempor a et nisl, ac felis.
            </h4>
            <div className="w-full text-start">
              <button className="btn text-dark btn-2 family1 uppercase text-white text-light fs-16 py-2">
                Explore the Menu
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 imageContent">
          <img
            height={0}
            loading="lazy"
            src="https://avada.website/restaurant/wp-content/uploads/sites/112/2021/04/hero-mobile.jpg"
            className="w-full h-100 imagewrapper"
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
      background-color: #000;
      .HeroRightC {
        width: 50%;
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

  .HeroBottom {
    display: grid;
    padding-top: 10rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 5rem;
  }
`;
