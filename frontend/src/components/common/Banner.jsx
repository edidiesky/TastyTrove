import React from "react";
import styled from "styled-components";
import Image from "./Image";

export default function Banner({ type, text, subtext, image }) {
  if (type === "type") {
    return (
      <BannerContent className="image1">
        <div className="w-85 bannerHeader auto flex items-center justify-center flex-col gap-4">
          <h4
            className="text-lg text-light uppercase text-white family1"
            style={{ letterSpacing: "1.5px", fontWeight: "normal" }}
          >
            {subtext}
          </h4>
          <h1 className="family3 text-7xl text-light uppercase text-white">
            {text}
          </h1>
        </div>
        <div className="gradient2"></div>
        <Image
          alt=""
          loading="lazy"
          src={
            image
              ? image
              : "	https://avada.website/restaurant/wp-content/uploads/sites/112/2020/04/slider72x-scaled.jpg"
          }
          className="imagewrapper"
        />
      </BannerContent>
    );
  }
  return (
    <BannerContent className="image1">
      <div className="w-85 bannerHeader auto flex items-center justify-center flex-col gap-4">
        <h4
          className="text-lg text-light uppercase text-white family1"
          style={{ letterSpacing: "1.5px", fontWeight: "normal" }}
        >
          {subtext}
        </h4>
        <h1 className="family3 text-7xl text-light uppercase text-white">
          {text}
        </h1>
      </div>
      <div className="gradient2"></div>
      <Image
        alt=""
        loading="lazy"
        src={
          image
            ? image
            : "	https://avada.website/restaurant/wp-content/uploads/sites/112/2020/04/slider72x-scaled.jpg"
        }
        className="imagewrapper"
      />
    </BannerContent>
  );
}

const BannerContent = styled.div`
  position: relative;
  min-height: 30rem;
  display: flex;
  align-items: center;
  &.image1 {
    min-height: 17rem;
  }
  .bannerHeader {
    z-index: 3000;
  }
  .imagewrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
