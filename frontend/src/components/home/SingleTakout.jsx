import React from 'react'

export default function SingleTakout() {
  return (
    <div className="w-full min-h-[100vh] flex items-center justify-center py-40 relative">
      <img
        loading="lazy"
        src="https://avada.website/restaurant/wp-content/uploads/sites/112/2020/01/menu372x.jpg"
        className="w-full h-full z-20 top-0 absolute object-cover"
      />
      <div className="flex md:flex-row flex-col w-85 z-40 auto">
        <div className="flex-1 md:flex-[0.5] bg-[#000] flex-col flex gap-12 px-12 md:px-20 py-24">
          <h1 className="family3 flex items-start leading-[1.6] text-6xl md:text-7xl text-white">
            <span className="leading-[1.3]">BRAISED ABALONE</span>
            <span className="family1 pt-8 text-xl">$30</span>
          </h1>
          <h4 className="text-xl md:text-2xl  family2 text-light text-[var(--grey-1)]">
            Pretium accumsan porttitor viverra leo gravida mollis imperdiet.
            Fringilla nibh pharetra sociis leo amet.
          </h4>
          <div className="w-full text-start">
            <button className="btn text-dark btn-2 family1 uppercase text-white text-light text-base py-2">
              View takeout Menu
            </button>
          </div>
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
}
