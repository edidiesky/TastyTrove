import React from "react";
import { RiFacebookFill } from "react-icons/ri";
import { IoLogoTwitter } from "react-icons/io";
import { AiOutlineMail } from "react-icons/ai";
import Top from "./Top";
import Bottom from "./Bottom";
import styled from "styled-components";
import Related from "./Likes";

export default function Details() {
  return (
    <DetailsContent>
      <div className="w-85 flex auto flex-col gap-4" style={{ gap: "3rem" }}>
        <div className="w-100 detop flex items-center justify-between gap-3">
          <h5 className="text-xl family2 text-dark text-light">
            Categories: HORS D'OEUVRES
          </h5>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 text-lg text-light family2">
              <RiFacebookFill fontSize={"20px"} color="var(--blue-1)" /> Share
              this
            </div>
            <div className="flex items-center gap-3 text-lg text-light family2">
              <IoLogoTwitter /> Tweet this
            </div>
            <div className="flex items-center gap-3 text-lg text-light family2">
              <AiOutlineMail fontSize={"22px"} /> Email this
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3" style={{ gap: "8rem" }}>
          <Top />
          <Bottom />
          <Related />
        </div>
      </div>
    </DetailsContent>
  );
}
const DetailsContent = styled.div`
  width: 100%;
  padding: 3rem 0;
  .detop {
    @media (max-width: 680px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 2rem;
    }
  }
  .flex-1 {
    @media (max-width: 680px) {
      width: 100%;
    }
  }
  .details {
    @media (max-width: 350px) {
      width: 100%;
    }
    .detailsInfoL {
      flex: 0.6;
      padding: 2rem 1rem;
      padding-left: 2rem;
      background-color: #f7f7f7;
      @media (max-width: 350px) {
        flex: 1;
      }
    }
    .detailsInfoR {
      flex: 1;
      padding: 2rem 1rem;
      background-color: #f7f7f7;
      @media (max-width: 350px) {
        flex: 1;
      }
    }
  }
  .wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 3rem;
    @media (max-width: 350px) {
      grid-template-columns: 1fr;
    }
  }
  .btn {
    background-color: #fff;
    color: #000;
  }
  .h1 {
    font-size: 60px;
    line-height: 60px;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      width: 8rem;
      height: 2px;
      background-color: rgba(250, 250, 250, 0.4);
      bottom: -10%;
      left: 0;
    }
    @media (max-width: 980px) {
      font-size: 70px;
      line-height: 65px;
    }
    @media (max-width: 480px) {
      font-size: 41px;
      line-height: 45px;
    }
  }
  .topWrapper {
    @media (max-width: 780px) {
      flex-direction: column;
    }
    .topleft {
      min-height: 30rem;
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
    .topright {
      flex: 1;
      padding: 10rem 0;
      background-color: #000;
      @media (max-width: 780px) {
        width: 100%;
        padding: 2rem 0;
      }
      .HeroRightC {
        width: 60%;
        @media (max-width: 780px) {
          width: 90%;
          padding: 5rem 0;
        }
      }
    }
  }
`;