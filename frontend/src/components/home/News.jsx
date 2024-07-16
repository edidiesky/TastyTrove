
import React from "react";
import styled from "styled-components";

const newsData = [
  {
    title: " THE BEST COFFEE IN TOWN",
    subtitle: "News",
    image:
      "https://avada.website/restaurant/wp-content/uploads/sites/112/2019/12/info52x.jpg",
    description: "by admin | January 12th 2023 | Categories: News",
  },
  {
    title: "DISCOVER OUR MENU",
    subtitle: "News",
    image:
      "https://avada.website/restaurant/wp-content/uploads/sites/112/2019/12/info52x.jpg",
    description: "by admin | January 12th 2023 | Categories: News",
  },
  {
    title: "WE NOW ACCEPT SUARE",
    subtitle: "News",
    image:
      "https://avada.website/restaurant/wp-content/uploads/sites/112/2019/12/info52x.jpg",
    description: "by admin | January 12th 2023 | Categories: News",
  },
];

export default function News() {
  return (
    <NewsContent className="flex w-full flex-col gap-20">
      <h2
        data-aos="fade"
        data-aos-duration="1200"
        className="  md:text-4xl text-5xl w-full text-center family2 text-dark"
      >
        Latest news & promotions
      </h2>
      <div className="w-85 auto gap-2 newswp">
        {newsData?.map((data,index)=> {
          return (
            <div
              key={index}
              className="NewsRight1 w-full flex items-center justify-center"
            >
              <div className="gradient2"></div>
              {/* <div className="NewsRightCenter w-full h-100 flex flex-col gap-1">
                <h3 className="text-4xl w-full text-light text-center family3 text-white">
                  {data?.title}
                </h3>
                <h4 className="text-base text-light text-white family2 w-full text-center">
                  {data?.subtitle}
                </h4>
              </div> */}
              <img
                loading="lazy"
                src="https://avada.website/restaurant/wp-content/uploads/sites/112/2019/12/info52x.jpg"
                className="imagewrapper"
              />
              <div className="NewsRightBottom flex flex-col gap-1 w-full">
                <h3 className="text-4xl w-full text-light text-center family3 text-dark">
                  WE NOW ACCEPT SUARE
                </h3>
                <h4 className="text-sm text-light text-dark family2 w-full text-center">
                  by admin | January 12th 2023 | Categories: News
                </h4>
              </div>
            </div>
          );
        })}
       
      </div>
    </NewsContent>
  );
}
// https://avada.website/restaurant/wp-content/uploads/sites/112/2021/04/hero-mobile.jpg
const NewsContent = styled.div`
  padding: 4rem 0;
  h2 {
    font-weight: 400;
  }
  .NewsRight1 {
    height: 40rem;
    transition: all 0.7s;
    position: relative;
    overflow: hidden;
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
