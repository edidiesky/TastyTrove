
import React from "react";
import styled from "styled-components";
import Button from "../common/Button";

const data = [
  {
    id: 1,
    subText:"Check out Menu",
    title: "The best table in town",
    desc: "Incididunt labore dolore magna aliqua enim veniam quis nostrud ad miniys exercitation ullamco laboris nisiut aliquip.",
  },
  {
    id: 2,
    subText:"View out Menu",
    title: "Perfect For Groups",
    desc: "Incididunt labore dolore magna aliqua enim veniam quis nostrud ad miniys exercitation ullamco laboris nisiut aliquip.",
  },
  {
    id: 3,
    subText:"Check out Menu",
    title: "Fresh produce everyday",
    desc: "Incididunt labore dolore magna aliqua enim veniam quis nostrud ad miniys exercitation ullamco laboris nisiut aliquip.",
  },
];

export default function About() {
  return (
    <AboutContent className="flex w-full flex-col gap-4">
      <div className="w-full flex flex-col gap-24">
        <div className="w-85 auto wrapper flex gap-20">
          <div className="flex-1 flex flex-col gap-12">
            <h4 className="text-lg md:text-xl family2">
              HAC TELLUS, FELIS RISUS AT mattis mattis. Eget euismod semper eget
              tortor, donec amet, blandit. Tristique facilisi faucibus elementum
              feugiat in nam in feugiat. Ipsum odio etiam duis facilisis amet
              vulputate.
            </h4>
            <h1 className="family3 text-6xl md:text-7xl leading-[1.5]">
              food is our common ground, a universal experience.
            </h1>
            <h4 className="text-lg md:text-xl  family2 font-normal">
              HAC TELLUS, FELIS RISUS AT mattis mattis. Eget euismod semper eget
              tortor, donec amet, blandit. Tristique facilisi faucibus elementum
              feugiat in nam in feugiat. Ipsum odio etiam duis facilisis amet
              vulputate.
            </h4>

            <div className="w-full py-2">
              {/* eslint-disable-next-line @next/next/no-img-element,
          @next/next/no-img-element */}
              <img
                alt=""
                width={0}
                sizes="100vw"
                height={0}
                loading="lazy"
                src="https://avada.website/restaurant/wp-content/uploads/sites/112/2019/12/signature.jpg"
                style={{ width: "200px" }}
              />
            </div>
          </div>
          <span className="flex-1 md:flex hidden aboutImageWrapper">
            {/* eslint-disable-next-line @next/next/no-img-element,
          @next/next/no-img-element */}
            <img
              src="https://avada.website/restaurant/wp-content/uploads/sites/112/2019/12/info22x.jpg"
              alt=""
              className="w-full h-full imageWrapper"
            />{" "}
          </span>
        </div>
        <div className="w-90 auto">
          <div className="w-85 auto aboutBottom grid gap-2">
            {data.map((x, index) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <div className="w-full " key={index}>
                  <header
                    key={x.id}
                    data-aos="fade"
                    data-aos-duration="1200"
                    data-aos-delay={index * 300}
                    className="flex flex-col gap-4 w-full"
                  >
                    <h3 className="family3 text-center pb-3 text-3xl md:text-4xl font-normal">
                      {x.title}
                    </h3>
                    <h4 className="family2 text-center text-lg md:text-xl font-normal">
                      {x.desc}
                    </h4>
                    <div className="w-full text-center">
                      <Button
                        bgColor={"#000"}
                        text={x?.subText}
                        type={"dark"}
                      />
                      {/* <button className="btn text-dark family1 font-normal text-lg py-1"></button> */}
                    </div>
                  </header>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AboutContent>
  );
}

const AboutContent = styled.div`
  padding: 8rem 0;
  .wrapper {
    @media (max-width: 980px) {
      flex-direction:column;
    }
  }
  .aboutImageWrapper {
    position: relative;
    min-height: 30rem;
    @media (max-width: 980px) {
      min-height: 85rem;
    }
    .imageWrapper {
      position: absolute;
    }
  }
  .aboutBottom {
    display: grid;
    padding-top: 5rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 5rem;
  }
`;
