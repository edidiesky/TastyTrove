import React from "react";
import styled from "styled-components";
import { planData } from "../../data/Plan";
export default function Plans() {
  return (
    <PlansContent>
      <div className="w-85 auto container">
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
                <h2
                  className={
                    index === 1
                      ? "top w-85 auto text-start py-3 px-3 text-xl family3 uppercase active"
                      : "top w-85 auto text-start py-3 px-3 text-xl family3 uppercase"
                  }
                >
                  {x.title}
                </h2>

                <ul className="w-full flex flex-col gap-1 py-3">
                  {x.list.map((x, index) => {
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <div className="w-full hidden" key={index}>
                        <li className="w-85 auto flex flex-col gap-2 text-base text-light center border-bottom py-1 auto">
                          <div className="flex w-full items-center gap-2 justify-space">
                            <h3 className="family3 text-light text-5xl text-dark">
                              {x.title}
                            </h3>
                            <h3 className="family3 text-light text-xl text-dark">
                              ${x.price}
                            </h3>
                          </div>
                          <h4 className="family2 text-lg text-light">{x.desc}</h4>
                        </li>
                      </div>
                    );
                  })}
                </ul>
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
    padding: 10rem 0;
    gap: 5rem;
    &.active {
      box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.3);
      transform: translateY(-10px) scale(1.1);
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
