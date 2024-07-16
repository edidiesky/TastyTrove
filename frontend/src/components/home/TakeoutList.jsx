import React from "react";
import styled from "styled-components";
import { planData } from "../../data/Plan";
import { Link } from "react-router-dom";
export default function Plans() {
  return (
    <PlansContent>
      <div className="w-85 px-16 auto container">
        <div className="w-full grid grid-cols-3">
          {planData.map((x, index) => {
            return (
              <div
                className={
                  index === 1
                    ? "Card w-full flex-col gap-3 items-center flex bg-[#fff] active"
                    : "Card w-full flex-col gap-3 items-center flex bg-[#fff]"
                }
                key={index}
              >
                <div className="w-[70%] mx-auto flex flex-col gap-12 justify-center items-start">
                  <h2
                    className={`${
                      index === 1 ? "text-[#fff]" : "text-[#000"
                    } family3 text-5xl uppercase text-start`}
                  >
                    {x.title}
                  </h2>

                  <ul className="w-full flex flex-col gap-6 py-3">
                    {x.list.map((x) => {
                      return (
                        // eslint-disable-next-line react/jsx-key
                        <Link to={`/restaurant/menu/${x?.title}`} className="w-full" key={index}>
                          <li className="w-full auto flex flex-col gap-2 text-base center border-bottom py-1 auto">
                            <div className="flex w-full items-center gap-2 justify-space">
                              <div className="flex w-full justify-between gap-4 items-center">
                                <h3
                                  className={`${
                                    index === 1 ? "text-[#fff]" : "text-[#000"
                                  } family3 text-4xl text-dark`}
                                >
                                  {x.title}
                                </h3>
                                <span className={`${
                                index === 1 ? "text-[var(--grey-1)]" : "text-[#000"
                              } text-xl text-dark`}>
                                  ${x.price}
                                </span>
                              </div>
                            </div>
                            <h4
                              className={`${
                                index === 1 ? "text-[var(--grey-1)]" : "text-[#000"
                              } text-dark family2 text-xl`}
                              // className="family2 text-xl"
                            >
                              {x.desc}
                            </h4>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PlansContent>
  );
}

const PlansContent = styled.div`
  width: 100%;
  .btn2 {
    border: none;
    outline: none;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--green);
    background-color: transparent;
    padding: 1.4rem 2rem;
    margin-bottom: 2rem;
    &:hover {
      color: #fff;
    }
  }
  .top {
    color: #fff;
    &.active {
      background-color: var(--blue-2);
    }
  }
  .Card {
    background-color: #e8e8e8;
    width: 100%;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
    padding: 6rem 0;
    gap: 5rem;
    &.active {
      transform: translateY(-50px);
      background-color: #000;
    }
  }
  .grid2 {
    display: grid;
    width: 100%;
    padding: 8rem 0;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    grid-gap: 0.09rem;
    grid-row-gap: 10rem;
    place-items: start;
  }
  .container {
    padding: 8rem 0;
  }
`;
