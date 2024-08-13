
import React from "react";
import styled from "styled-components";
import Button from "../common/Button";
import Image from "../common/Image";
export default function TakeoutMenu() {
  return (
    <TakeoutMenuContent className="flex w-full flex-col gap-4">
      <div className="w-full exWrapper grid md:grid-cols-custom_1">
        <div className="flex-1 imageContent h-full">
          <Image
            loading="lazy"
            src="https://avada.website/restaurant/wp-content/uploads/sites/112/2020/01/menu252x-1200x1375.jpg"
            className="w-full h-full imagewrapper"
          />
        </div>
        <div className="TakeoutMenuRight w-full md:w-[40vw] flex items-center justify-center">
          <div className="flex TakeoutMenuRightC flex-col gap-8 auto">
            <h4 className="text-lg family1 uppercase text-light text-white">
              ENJOY YOUR MEAL AT HOME
            </h4>
            <h1 className="family3 leading-[1.6] text-6xl md:text-7xl text-white">
              TAKEOUT NOW AVAILABLE
            </h1>
            <h4 className="text-xl md:text-2xl family2 text-light text-white">
              Pellentesque vitae viverra risus, sagittis. Venenatis ridiculus
              scelerisque nisi in urna nulla.
            </h4>
            <div className="w-full text-start">
              <button className="h-[70px] w-[230px] text-lg uppercase">
                <Button bgColor={"#fff"} text={"View takeout Menu"} />
              </button>

              {/* <button className="btn text-dark btn-2 family1 uppercase text-white text-light text-base py-2"></button> */}
            </div>
          </div>
        </div>
      </div>
    </TakeoutMenuContent>
  );
}

const TakeoutMenuContent = styled.div`
  .exWrapper {
    /* .imageContent {
      flex: 1;
      img {
        height: 100%;
      }
      @media (max-width: 980px) {
        height: 30rem;
      }
    } */
    .TakeoutMenuRight {
      padding: 10rem 0;
      @media (max-width: 780px) {
        padding: 9rem 0;
      }
      background-color: #000;
      .TakeoutMenuRightC {
        width: 60%;
        @media (max-width: 780px) {
          width: 80%;
        }
      }
    }
    @media (max-width: 980px) {
      flex-direction: column;
    }
  }

  .TakeoutMenuBottom {
    display: grid;
    padding-top: 10rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 5rem;
  }
`;
