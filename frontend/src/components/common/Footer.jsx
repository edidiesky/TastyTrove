import Image from "next/image";
import React from "react";
import styled from "styled-components";
import {ImFacebook} from 'react-icons/im'
import {FaTwitter} from 'react-icons/fa'
import {AiOutlineInstagram, AiOutlineYoutube} from 'react-icons/ai'
export default function Footer() {
  return (
    <FooterContainer className="flex item-center">
      <div className="w-100 family2 flex column gap-3 item-center">
        <div className="flex item-center gap-2">
          <img
            src="https://avada.website/restaurant/wp-content/uploads/sites/112/2021/04/logo-svg.svg"
            alt=""
          />
        </div>
        <h4 className="fs-20 text-light w-50 text-center auto text-white">
          Quam eu proin sit massa condimentum. Volutpat non pulvinar aliquet
          nunc. Quam eu proin sit massa condimentum.
        </h4>
        <div className="w-100 flex item-center justify-center gap-1">
          <div className="icon flex item-center justify-center">
            <ImFacebook fontSize={'20px'}/>
          </div>
          <div className="icon flex item-center justify-center">
            <FaTwitter fontSize={'20px'}/>
          </div>
          <div className="icon flex item-center justify-center">
            <AiOutlineInstagram fontSize={'20px'}/>
          </div>
          <div className="icon flex item-center justify-center">
            <AiOutlineYoutube fontSize={'20px'}/>
          </div>
        </div>
      </div>
    </FooterContainer>
  );
}

const FooterContainer = styled.div`
  width: 100%;
  min-height: 80vh;
  padding: 4rem 0;
  background-image: linear-gradient(
      180deg,
      #000000 40%,
      hsla(0, 0%, 0%, calc(100% - 40%)) 100%
    ),
    url(https://avada.website/restaurant/wp-content/uploads/sites/112/2020/01/slider52x-1200x1107.jpg);

  .icon {
    background:#fff;
    border-radius:50%;
    width:5rem;
    height:5rem;
  }
`;
