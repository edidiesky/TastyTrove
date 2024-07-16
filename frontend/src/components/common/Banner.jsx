import Image from "next/image";
import React from "react";
import styled from "styled-components";

export default function Banner({ type, text, subtext }) {
  if (type === "type") {
    return (
      <BannerContent className="image1">
        <div className="w-85 bannerHeader auto flex item-center justify-center column gap-2">
          <h4
            className="fs-24 text-light uppercase text-white family3"
            style={{ letterSpacing: "1.5px", fontWeight: "normal" }}
          >
            {subtext}
          </h4>
          <h1 className="family3 text-light uppercase text-white">{text}</h1>
        </div>
        <div className="gradient2"></div>
        <Image
          alt=""
          width={0}
          sizes="100vw"
          height={0}
          loading="lazy"
          src="https://avada.website/restaurant/wp-content/uploads/sites/112/2020/01/menu272x.jpg  "
          className="imagewrapper"
        />
      </BannerContent>
    );
  }
  return (
    <BannerContent >
      <div className="w-85 bannerHeader auto flex column gap-2">
        <h4 className="fs-30 text-light uppercase text-white family3">
          BEST TABLE IN TOWN
        </h4>
        <h1 className="family3 text-light uppercase text-white">
          Our Takeout Menu
        </h1>
      </div>
      <div className="gradient2"></div>
      <Image
        alt=""
        width={0}
        sizes="100vw"
        height={0}
        loading="lazy"
        src="	https://avada.website/restaurant/wp-content/uploads/sites/112/2020/04/slider72x-scaled.jpg"
        className="imagewrapper image1"
      />
    </BannerContent>
  );
}

const BannerContent = styled.div`
  position: relative;
  min-height: 40rem;
  display: flex;
  align-items: center;
  &.image1 {
    min-height: 30rem;
  }
  .bannerHeader {
    z-index: 3000;
  }
  .imagewrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    &.image1 {
    }
  }
`;
