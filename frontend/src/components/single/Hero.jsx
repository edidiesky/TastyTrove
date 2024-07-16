"use client"
import { useDispatch, useSelector } from "react-redux";
const Hero = () => {
    const { room } = useSelector((store) => store.room);
  return (
    <div
      className="w-full min-h-[50vh] py-32 relative flex items-center justify-center
   gap-8"
    >
      <div className="w-full h-full z-30 bg-[rgba(0,0,0,.6)] absolute top-0 left-0"></div>
      <img
        src="https://www.nicdarkthemes.com/themes/hotel-booking/wp/demo/hotel/wp-content/uploads/sites/2/revslider/parallax-9.jpg"
        alt=""
        className="absolute z-10 object-cover top-0 left-0 h-full w-full"
      />
      <div
        className="w-[90%] mx-auto z-40 flex items-center justify-center flex-col
       gap-4"
      >
        <div className="w-full absolute bottom-0 left-0 z-[35] flex  gap-8 items-center justify-center py-6">
          <div className="flex items-center w-[90%]  max-w-custom_1 lg:flex-row flex-col gap-8 mx-auto justify-between">
            <div className="flex  md:flex-row flex-col md:justify-start items-center gap-6 md:gap-8 h-full">
              <span
                style={{ letterSpacing: "4px" }}
                className="text-[9px] md:text-xs font-normal uppercase flex items-center gap-4 font-booking_font"
              >
                <span className="text-white">Description</span>
              </span>
              <span
                style={{ letterSpacing: "4px" }}
                className="text-[9px] md:text-xs font-normal uppercase flex items-center gap-4 font-booking_font"
              >
                <span className="text-white">Around the Room</span>
              </span>
              <span
                style={{ letterSpacing: "4px" }}
                className="text-[9px] md:text-xs font-normal uppercase flex items-center gap-4 font-booking_font"
              >
                <span className="text-white">ROOM SERVICES</span>
              </span>
              <span
                style={{ letterSpacing: "4px" }}
                className="text-[9px] md:text-xs font-normal uppercase flex items-center gap-4 font-booking_font"
              >
                <span className="text-white">SIMILAR ROOMS</span>
              </span>
            </div>
            <div className="flex flex-1 items-center justify-end">
              <h3 className="text-5xl font-booking_font4 justify-end gap-2 flex text-white">
                {Number(room?.price).toLocaleString()}{" "}
                <div className="flex font-booking_font_bold flex-col">
                  <span className="text-sm uppercase">₦</span>
                  <span className="text-sm uppercase">/ per night</span>
                </div>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Hero