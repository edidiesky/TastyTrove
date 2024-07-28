import React from "react";
import styled from "styled-components";
import Button from "../common/Button";

export default function Experience() {
  return (
    <ExperienceContent className="flex w-full flex-col gap-4">
      <div className="w-full experienceWrapper flex">
        <div className="flex-1 imageContent">
          <img
            alt=""
            loading="lazy"
            src="https://avada.website/restaurant/wp-content/uploads/sites/112/2020/01/menu252x-1200x1375.jpg"
            className="w-full h-full imagewrapper"
          />
        </div>
        <div className="experienceRight flex items-center justify-center">
          <div className="flex experienceRightC flex-col gap-8 auto">
            <h4 className="text-xl md:text-xl family1 text-light uppercase text-white">
              FINE DINING EXPERIENCE
            </h4>
            <h1 className="family3 text-6xl leading-[1.5] md:text-7xl text-white">
              THE BEST TABLE IN TOWN
            </h1>
            <h4 className="text-xl md:text-2xl family2 text-light text-white">
              Pellentesque vitae viverra risus, sagittis. Venenatis ridiculus
              scelerisque nisi in urna nulla.
            </h4>
            <div className="w-full text-start">
              <button className="h-[70px] w-[230px] text-lg uppercase">
                <Button bgColor={"#fff"} text={"Explore the Menu"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </ExperienceContent>
  );
}

const ExperienceContent = styled.div`
  padding: 4rem 0;
  .experienceWrapper {
    .imageContent {
      flex: 1;
    }
    .experienceRight {
      flex: 0.7;
      padding: 15rem 0;
      background-color: #000;
      @media (max-width: 780px) {
        padding: 5rem 0;
      }
      .experienceRightC {
        width: 50%;
        @media (max-width: 780px) {
          width: 80%;
        }
      }
    }
    @media (max-width: 980px) {
      flex-direction: column;
    }
  }
  .imagewrapper {
    min-height: 10rem;
  }

  .ExperienceBottom {
    display: grid;
    padding-top: 10rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 5rem;
  }
`;
