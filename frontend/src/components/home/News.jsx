
import React from "react";
import styled from "styled-components";

export default function News() {
  return (
    <NewsContent className="flex w-full column gap-4">
      <h2
        data-aos="fade"
        data-aos-duration="1200"
        className="text-7xl w-full text-center family2 text-dark"
      >
        Latest news & promotions
      </h2>
      <div
        data-aos="fade-right"
        data-aos-duration="1600"
        className="w-85 auto gap-2 newswp"
      >
        <div className="NewsRight1 w-full flex items-center justify-center">
          <div className="gradient2"></div>
          <img
            height={0}
            loading="lazy"
            src="https://avada.website/restaurant/wp-content/uploads/sites/112/2019/12/info52x.jpg"
            className="imagewrapper w-full"
          />
          <div className="NewsRightCenter w-full h-100 flex column gap-1">
            <h3 className="text-4xl w-full text-light text-center family3 text-white">
              THE BEST COFFEE IN TOWN
            </h3>
            <h4 className="text-base text-light text-white family2 w-full text-center">
              News
            </h4>
          </div>
          <div className="NewsRightBottom flex column items-center justify-center gap-1 w-full">
            <h3 className="text-4xl w-full text-light text-center family3 text-dark">
              THE BEST COFFEE IN TOWN
            </h3>
            <h4 className="text-base text-light text-dark family2 w-full text-center">
              by admin | January 12th 2023 | Categories: News
            </h4>
          </div>
        </div>
        <div className="NewsRight1 w-full flex items-center justify-center">
          <div className="gradient2"></div>
          <img
            alt=""
            width={0}
            sizes="100vw"
            height={0}
            loading="lazy"
            src="https://avada.website/restaurant/wp-content/uploads/sites/112/2019/12/info52x.jpg"
            className="imagewrapper"
          />
          <div className="NewsRightCenter w-full h-100 flex column gap-1">
            <h3 className="text-4xl w-full text-light text-center family3 text-white">
              DISCOVER OUR MENU
            </h3>
            <h4 className="text-base text-light text-white family2 w-full text-center">
              News
            </h4>
          </div>
          <div className="NewsRightBottom flex column gap-1 w-full">
            <h3 className="text-4xl w-full text-light text-center family3 text-dark">
              DISCOVER OUR MENU
            </h3>
            <h4 className="text-base text-light text-dark family2 w-full text-center">
              by admin | January 12th 2023 | Categories: News
            </h4>
          </div>
        </div>
        <div className="NewsRight1 w-full flex items-center justify-center">
          <div className="gradient2"></div>
          <div className="NewsRightCenter w-full h-100 flex column gap-1">
            <h3 className="text-4xl w-full text-light text-center family3 text-white">
              WE NOW ACCEPT SUARE
            </h3>
            <h4 className="text-base text-light text-white family2 w-full text-center">
              News
            </h4>
          </div>
          <img
            loading="lazy"
            src="https://avada.website/restaurant/wp-content/uploads/sites/112/2019/12/info52x.jpg"
            className="imagewrapper"
          />
          <div className="NewsRightBottom flex column gap-1 w-full">
            <h3 className="text-4xl w-full text-light text-center family3 text-dark">
              WE NOW ACCEPT SUARE
            </h3>
            <h4 className="text-base text-light text-dark family2 w-full text-center">
              by admin | January 12th 2023 | Categories: News
            </h4>
          </div>
        </div>
      </div>
    </NewsContent>
  );
}
// https://avada.website/restaurant/wp-content/uploads/sites/112/2021/04/hero-mobile.jpg
const NewsContent = styled.div`
  padding: 4rem 0;
  gap: 7rem;
  h2 {
    font-weight: 400;
  }
  .NewsRight1 {
    height: 65rem;
    transition: all 0.7s;
    position: relative;
    overflow: hidden;
    @media (max-width: 980px) {
      height: 80rem;
    }
    .gradient2,
    .NewsRightCenter {
      opacity: 0;
      transition: all 0.7s;
      visibility: hidden;
      z-index: 3000;
      height: 100%;
      position: absolute;
      justify-content: center;
    }
    &:hover {
      .gradient2,
      .NewsRightCenter {
        opacity: 1;
        visibility: visible;
        transition: all 0.7s;
        height: 100%;
      }
      .NewsRightBottom {
        bottom: -100%;
      }
    }

    .NewsRightC {
      width: 70%;
      z-index: 300;
    }
  }
  .NewsRightBottom {
    position: absolute;
    width: 100%;
    padding: 2rem 0;
    min-height: 5rem;
    background-color: #fff;
    bottom: 0;
    z-index: 3000;
    transition: all 0.7s;
  }
  .imagewrapper {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .newswp {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    .imageContent {
      flex: 1;
    }
    .NewsRight {
      flex: 1;
      padding: 15rem 0;
      background-color: #000;
      transition: all 0.7s;
      &:hover {
        transform: scale(1.02);
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
      }
      .NewsRightC {
        width: 70%;
      }
    }
    @media (max-width: 980px) {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
  }

  .CriticsBottom {
    display: grid;
    padding-top: 10rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 5rem;
  }
`;
