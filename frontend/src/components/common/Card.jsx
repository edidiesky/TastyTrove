import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

export default function Card({ index, x }) {
  return (
    <CardContent
      data-aos="fade"
      data-aos-duration="1400"
      data-aos-delay={index * 300}
      key={index}
    >
      <div className="w-100 imageContent">
        <Image
          alt=""
          width={0}
          sizes="100vw"
          height={0}
          loading="lazy"
          src={x.image}
          className="w-100 h-100 image"
        />
        <div className="gradient3"></div>
        <div className="NewsRightCenter w-100 h-100 flex item-center justify-center gap-1">
          <div className="fs-16 a text-light text-white family2 w-100 text-end">
            Add to Cart{" "}
          </div>
          <div className="fs-16 text-white">/</div>
          <Link
            href={"/takeout/2303404"}
            className="fs-16 a text-light text-white family2 w-100"
          >
            Details
          </Link>
        </div>
      </div>
      <div className="w-100">
        <div className="w-90 auto flex column h-100 bottom item-center justify-center">
          <h3
            style={{ fontStyle: "italic" }}
            className="family3 fs-30 uppercase text-light text-dark text-center"
          >
            {x.title}
          </h3>
          <h4 className="family2 text-light fs-24">${x.price}</h4>
        </div>
      </div>
    </CardContent>
  );
}

const CardContent = styled.div`
  width: 100%;
  height: 50rem;
  border: 1px solid rgba(0, 0, 0, 0.08);
  .a {
    &:hover {
      opacity: 0.5;
    }
  }
  .bottom {
    height: 10rem;
  }
  .imageContent {
    height: 40rem;
    position: relative;
    display: grid;
    place-items: center;
    .gradient3 {
      background: linear-gradient(
        180deg,
        #161616 22%,
        hsla(0, 0%, 0%, calc(100% - 45%)) 100%
      );
      height: 100%;
      width: 100%;
      z-index: 200;
      position: absolute;
      opacity: 0;
      transition: all 0.7s;
      visibility: hidden;
    }
    .NewsRightCenter {
      opacity: 0;
      transition: all 0.7s;
      visibility: hidden;
      height: 100%;
      width: 100%;
      z-index: 200;
      position: absolute;
      justify-content: center;
    }
    .NewsRightCenter {
      /* opacity: 0;
      transition: all 0.7s;
      visibility: hidden;
      z-index: 3000;
      height: 100%;
      width: 100%;
      justify-content: center; */
    }
    &:hover {
      .gradient3,
      .NewsRightCenter {
        opacity: 1;
        visibility: visible;
      }
    }
    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
    }
  }
`;
