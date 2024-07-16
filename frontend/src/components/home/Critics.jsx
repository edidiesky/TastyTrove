// import Image from "next/image";
import React from "react";
import styled from "styled-components";

export default function Critics() {
  return (
    <CriticsContent className="flex w-full flex-col gap-2">
      <h2
        data-aos="fade"
        data-aos-duration="1200"
        // style={{fontStyle:"italic"}}
        className="text-6xl w-full text-center family2 text-dark"
      >
        What critics are saying about us
      </h2>
      <div
        data-aos="fade"
        data-aos-duration="1400"
        className="w-85 auto exWrapper flex"
      >
        <div className="flex-1 imageContent">
          <img
            src="https://avada.website/restaurant/wp-content/uploads/sites/112/2020/01/menu252x-1200x1375.jpg"
            className="w-full h-full imagewrapper1"
            alt=""
          />
        </div>
        <div className="CriticsRight flex item-center justify-center">
          <div className="flex CriticsRightC flex-col gap-8 auto">
            <h4 className="text-xl family1 uppercase text-white">
              MEGGY STEWART
            </h4>
            <h2 className="family3 text-6xl text-white">NEW YORK TIMES</h2>
            <h4 className="text-lg md:text-2xl family2 text-light text-white">
              Pellentesque vitae viverra risus, sagittis. Venenatis ridiculus
              scelerisque nisi in urna nulla.
            </h4>
            <h4 className="text-lg md:text-2xl family2 text-light text-white">
              Pellentesque vitae viverra risus, sagittis. Venenatis ridiculus
              scelerisque nisi in urna nulla.
            </h4>
            <div className="w-full text-start">
              <button className="btn text-dark btn-2 family1 uppercase text-white text-light fs-16 py-2">
                read full article
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <div
        className="w-85 auto gap-4 flex"
      >
        <div className="CriticsRight1 flex relative py-20 item-center justify-center">
          <div className="gradient2"></div>
          <img
            src="https://avada.website/restaurant/wp-content/uploads/sites/112/2019/12/info52x.jpg"
            alt=""
            className="imagewrapper"
          />
          <div className="flex CriticsRightC flex-col gap-4 auto">
            <h4 className="text-2xl family1 uppercase text-white">
              MEGGY STEWART
            </h4>
            <h2 className="family3 text-4xl text-white">THE GUARDIAN</h2>
            <h4 className="text-2xl family2 text-light text-white">
              Pellentesque vitae viverra risus, sagittis. Venenatis ridiculus
              scelerisque nisi in urna nulla.
            </h4>
            <h4 className="text-2xl family2 text-light text-white">
              Pellentesque vitae viverra risus, sagittis. Venenatis ridiculus
              scelerisque nisi in urna nulla.
            </h4>
            <div className="w-full text-start">
              <button className="btn text-dark btn-2 family1 uppercase text-white text-light fs-16 py-2">
                read full article
              </button>
            </div>
          </div>
        </div>{" "}
        <div className="CriticsRight1 flex relative py-20 item-center justify-center">
          <div className="gradient2"></div>
          <img
            loading="lazy"
            src="https://avada.website/restaurant/wp-content/uploads/sites/112/2019/12/info32x.jpg"
            className="imagewrapper"
          />
          <div className="flex CriticsRightC flex-col gap-4 auto">
            <h4 className="text-2xl family1 uppercase text-white">
              PATRICK MONROE
            </h4>
            <h2 className="family3 text-4xl text-white">GLOBE AND MAIL</h2>
            <h4 className="text-2xl family2 text-light text-white">
              Vivamus magna justo, lacinia eget consectetur sed, convallis at
              tellus. Nulla porttitor accumsan tincidunt.
            </h4>
            <h4 className="text-2xl family2 text-light text-white">
              Pellentesque vitae viverra risus, sagittis. Venenatis ridiculus
              scelerisque nisi in urna nulla.
            </h4>
            <div className="w-full text-start">
              <button className="btn text-dark btn-2 family1 uppercase text-white text-light fs-16 py-2">
                read full article
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </CriticsContent>
  );
}

const CriticsContent = styled.div`
  padding: 2rem 0;
  gap: 4rem;
  h2 {
    font-weight: 400;
  }
  .CriticsRight1 {
    flex: 1;
    /* padding: 10rem 0; */
    transition: all 0.7s;
    position: relative;

    .CriticsRightC {
      width: 70%;
      z-index: 300;
    }
  }
  .imagewrapper {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .exWrapper {
    .imageContent {
      flex: 1;
    }
    .CriticsRight {
      flex: 1;
      padding: 15rem 0;
      background-color: #000;
      transition: all 0.7s;
      &:hover {
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
      }
      .CriticsRightC {
        width: 70%;
      }
    }
    @media (max-width: 780px) {
      flex-direction: column;
    }
  }


`;
