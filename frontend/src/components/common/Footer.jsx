
import React from "react";
import styled from "styled-components";
import { ImFacebook } from "react-icons/im";
import { FaTwitter } from "react-icons/fa";
import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import Copyright from "./Copyright";
export default function Footer() {
  return (
    <>
      <FooterContainer className="flex py-24 items-center">
        <div className="w-full family2 flex flex-col gap-8 items-center">
          <div className="flex items-center gap-2">
            <h3 className="text-4xl md:text-5xl text-white family3">
              TastyTrove Restaurant
            </h3>
          </div>
          <h4 className="text-lg md:text-xl text-light w-full px-4 md:w-[400px] text-center auto text-white">
            Quam eu proin sit massa condimentum. Volutpat non pulvinar aliquet
            nunc. Quam eu proin sit massa condimentum.
          </h4>
          <div className="w-full flex items-center justify-center gap-4">
            <div className="icon flex items-center justify-center">
              <ImFacebook fontSize={"18px"} />
            </div>
            <div className="icon flex items-center justify-center">
              <FaTwitter fontSize={"18px"} />
            </div>
            <div className="icon flex items-center justify-center">
              <AiOutlineInstagram fontSize={"18px"} />
            </div>
            <div className="icon flex items-center justify-center">
              <AiOutlineYoutube fontSize={"18px"} />
            </div>
          </div>
        </div>
      </FooterContainer>
      <Copyright />
    </>
  );
}

const FooterContainer = styled.div`
  width: 100%;
  background-image: linear-gradient(
      180deg,
      #000000 40%,
      hsla(0, 0%, 0%, calc(100% - 40%)) 100%
    ),
    url(https://avada.website/restaurant/wp-content/uploads/sites/112/2020/01/slider52x-1200x1107.jpg);

  .icon {
    background: #fff;
    border-radius: 50%;
    width: 60px;
    height: 60px;
  }
`;
