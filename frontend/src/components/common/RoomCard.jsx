import { useState, useCallback } from "react";
import moment from "moment";
import { motion, useInView } from "framer-motion";
import { smallslideup2 } from "@/constants/utils/framer";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";
import Heart from "../../assets/svg/heart";
import { FaRegUserCircle } from "react-icons/fa";
import { FaWifi } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { DeleteReservation } from "@/features/reservation/reservationReducer";
import { onLoginModal } from "@/features/modals/modalSlice";
import { addListToWish } from "@/features/auth/authReducer";

const RoomCard = ({ type, apartment, inView, index }) => {
  const [tabindex, setTabIndex] = useState(0);
  const { currentUser } = useSelector((store) => store.auth);
  const handleImagePosition = (position) => {
    if (position === "left") {
      setTabIndex(tabindex < 0 ? apartment?.images?.length - 1 : tabindex - 1);
    }
    if (position === "right") {
      setTabIndex(tabindex >= apartment?.images?.length ? 0 : tabindex + 1);
    }
  };
  const dispatch = useDispatch();

  const handleFavouriteRooms = useCallback(() => {
    // check if the user exists
    // else perform wish lists
    if (!currentUser) {
      dispatch(onLoginModal());
    } else {
      dispatch(addListToWish(apartment?.id));
      // router.refresh();
    }
  }, [currentUser]);
  // DeleteReservation

  const customerData = JSON.parse(localStorage.getItem("customer"));
  const active = customerData?.favourites?.includes(apartment?.id);
  if (type == "trips") {
    const startDate = moment(apartment?.startDate).format("MMMM Do");

    const endDate = moment(apartment?.endDate).format("MMMM Do");
    return (
      <Link
        to={`/reservation/payment/${apartment?.id}`}
        className="w-full flex flex-col"
      >
        <div className="h-[240px] group w-full relative">
          <Link
            to={"#"}
            style={{ transition: "all .4s" }}
            onClick={() => dispatch(DeleteReservation(apartment?.id))}
            className="absolute group-hover:scale-100 scale-0 top-5 right-5 rounded-full w-12 h-12 z-[50] bg-white shadow-lg flex
           items-center justify-center text-xl"
          >
            <RxCross1 />
          </Link>
          <img
            alt="Cotion"
            placeholder="blur"
            style={{
              transition:
                "filter 0.2s cubic-bezier(0.4, 0, 0.2, 1), -webkit-filter 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            src={apartment?.rooms?.images[0]}
            className="w-full h-[240px] z-20 absolute object-cover hover:grayscale-[1] grayscale-0"
          />
        </div>
        <div className="w-full flex flex-col py-3 bg-white gap-2">
          <h4
            style={{ letterSpacing: "3px" }}
            className="text-xs text-grey uppercase font-booking_font_bold font-bold"
          >
            for settling in castle
          </h4>
          <h3 className="text-2xl font-booking_font4 font-normal text-text_dark_1 ">
            {apartment?.rooms?.title}
          </h3>

          <div
            style={{ letterSpacing: "1px" }}
            className="flex items-center justify-between gap-2 pb-2 uppercase border-b border-[rgba(0,0,0,.6)] text-xs font-bold font-booking_font_bold"
          >
            <span className="flex uppercase items-center gap-2">
              Date: <span>{startDate}</span> - <span>{endDate}</span>
            </span>

            <span className="flex text-xs text-grey font-normal font-booking_font flex-col">
              price
              <span className="block text-lg text-stone-950 font-bold font-booking_font_bold">
                ₦{Number(apartment?.rooms?.price).toLocaleString()}
              </span>
            </span>
          </div>
        </div>
      </Link>
    );
  }
  if (type === "Search") {
    return (
      <Link
        to={`/room/${apartment?.id}`}
        className="w-full flex flex-col gap-4"
      >
        <div className="w-full h-[270px] overflow-hidden relative">
          <div className="w-full h-full absolute bg-[rgba(0,0,0,.3)] z-[30]"></div>

          <Link
            to={"#"}
            onClick={() => handleFavouriteRooms()}
            className="absolute z-[50] top-[10%] left-[5%]"
          >
            <Heart active={active} />
          </Link>
          <div className="h-full z-[40] absolute left-0 w-[80px] flex items-center justify-center">
            <Link
              to={"#"}
              onClick={() => handleImagePosition("left")}
              className="w-12 h-12 text-lg bg-[#00000013] hover:bg-[#00000072] hover:scale-[1.09] cursor-pointer text-white flex items-center justify-center z-[40]"
            >
              <BiChevronLeft fontSize={"30px"} />
            </Link>
          </div>
          <div className="h-full z-[40] absolute right-0 w-[80px] flex items-center justify-center">
            <Link
              to={"#"}
              onClick={() => handleImagePosition("right")}
              className="w-12 h-12 text-lg bg-[#00000013] hover:bg-[#00000072] hover:scale-[1.09] cursor-pointer text-white flex items-center justify-center"
            >
              <BiChevronRight fontSize={"30px"} />
            </Link>
          </div>
          <div
            style={{ gridTemplateColumns: "repeat(4, 100%)" }}
            className="w-full h-[270px] absolute top-0 left-0 overflow-hidden grid"
          >
            {apartment.images.map((image, index) => {
              return (
                <div
                  style={{
                    transform: `translateX(-${tabindex * 100}%)`,
                    transition: "all .4s ease",
                  }}
                  key={index}
                  className="w-full h-[270px]"
                >
                  <img
                    key={index}
                    //   alt="Cotion"
                    //   width={0}
                    //   sizes="100vw"
                    //   height={0}
                    //   loading="lazy"
                    //   placeholder="blur"
                    style={{
                      transition:
                        "filter 0.2s cubic-bezier(0.4, 0, 0.2, 1), -webkit-filter 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                    //   blurDataURL={image}
                    src={image}
                    className="w-full z-10 h-[100%] object-cover hover:grayscale-[1] grayscale-0"
                  />
                </div>
              );
            })}
          </div>
          <div className="absolute z-[40] left-0 bottom-[5%] w-full flex items-center justify-center">
            <div className="w-full flex items-center justify-center gap-1">
              {Array(apartment?.images?.length)
                .fill("")
                .map((tab, index) => {
                  const active = tabindex === index;
                  return (
                    <span
                      key={index}
                      className={`w-[7px] ${
                        active ? "bg-[#fff]" : "bg-[#7b797972]"
                      }  h-[7px] cursor-pointer hover:scale-[1.09] rounded-full`}
                    ></span>
                  );
                })}
            </div>
          </div>
          {/* <img src= alt="" /> */}
        </div>

        <div className="w-full flex flex-col bg-white gap-2">
          <h4
            style={{ letterSpacing: "3px" }}
            con
            className="text-[10px] text-grey uppercase font-booking_font_bold font-bold"
          >
            for settling in castle
          </h4>
          <h3 className="text-3xl font-booking_font4 font-normal text-text_dark_1 ">
            {apartment?.title}
          </h3>

          <div
            style={{ letterSpacing: "1px" }}
            className="flex items-center justify-between gap-2 pb-2 uppercase border-b border-[rgba(0,0,0,.6)] text-xs font-bold font-booking_font_bold"
          >
            <span className="flex uppercase items-center gap-2">
              Explore Destinations <IoIosArrowRoundForward fontSize={"24px"} />
            </span>

            <span className="flex text-[10px] text-grey font-normal font-booking_font flex-col">
              price
              <span className="block text-lg text-[#000] font-booking_font4">
                ₦{Number(apartment?.price).toLocaleString()}
              </span>
            </span>
          </div>
        </div>
      </Link>
    );
  }
  return (
    <motion.div
      variants={smallslideup2}
      custom={index}
      initial="initial"
      key={index}
      className="w-full"
      animate={inView ? "animate" : "exit"}
    >
      <Link
        to={`/room/${apartment?.id}`}
        className="w-full flex flex-col gap-8"
      >
        <div className="w-full h-[270px] overflow-hidden relative">
          <div className="w-full h-full absolute bg-[rgba(0,0,0,.4)] z-[30]"></div>
          <div className="w-full absolute justify-end h-full flex-col gap-1 flex items-start p-6 pb-8 px-8 z-[40]">
            <h3 className="text-2xl font-normal text-white font-booking_font4">
              {apartment?.title}
            </h3>
            <span className="flex items-center gap-4">
              <span className="flex text-white gap-3 items-center text-sm font-normal uppercase">
                <FaRegUserCircle fontSize={"20px"} />
                {apartment?.guests} Guests
              </span>
              <span className="flex text-white gap-3 items-center text-sm font-normal uppercase">
                <FaWifi fontSize={"20px"} /> Free Wifi
              </span>
            </span>
          </div>
          <Link
            to={"#"}
            onClick={handleFavouriteRooms}
            className="absolute z-[59] top-[10%] left-[5%]"
          >
            <Heart active={active} />
          </Link>
          <div className="h-full z-[40] absolute left-0 w-[80px] flex items-center justify-center">
            <Link
              to={"#"}
              onClick={() => handleImagePosition("left")}
              className="w-12 h-12 text-lg bg-[#00000013] hover:bg-[#00000072] hover:scale-[1.09] cursor-pointer text-white flex items-center justify-center z-[40]"
            >
              <BiChevronLeft fontSize={"30px"} />
            </Link>
          </div>
          <div className="h-full z-[40] absolute right-0 w-[80px] flex items-center justify-center">
            <Link
              to={"#"}
              onClick={() => handleImagePosition("right")}
              className="w-12 h-12 text-lg bg-[#00000013] hover:bg-[#00000072] hover:scale-[1.09] cursor-pointer text-white flex items-center justify-center"
            >
              <BiChevronRight fontSize={"30px"} />
            </Link>
          </div>
          <div
            style={{ gridTemplateColumns: "repeat(4, 100%)" }}
            className="w-full h-full absolute top-0 left-0 overflow-hidden grid"
          >
            {apartment.images.map((image, index) => {
              return (
                <div
                  style={{
                    transform: `translateX(-${tabindex * 100}%)`,
                    transition: "all .4s ease",
                  }}
                  key={index}
                  className="w-full h-full"
                >
                  <img
                    key={index}
                    style={{
                      transition:
                        "filter 0.2s cubic-bezier(0.4, 0, 0.2, 1), -webkit-filter 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                    //   blurDataURL={image}
                    src={image}
                    className="w-full z-10 h-[100%] object-cover hover:grayscale-[1] grayscale-0"
                  />
                </div>
              );
            })}
          </div>
          <div className="absolute z-[40] left-0 bottom-[5%] w-full flex items-center justify-center">
            <div className="w-full flex items-center justify-center gap-1">
              {Array(apartment?.images?.length)
                .fill("")
                .map((tab, index) => {
                  const active = tabindex === index;
                  return (
                    <span
                      key={index}
                      className={`w-[7px] ${
                        active ? "bg-[#fff]" : "bg-[#7b797972]"
                      }  h-[7px] cursor-pointer hover:scale-[1.09] rounded-full`}
                    ></span>
                  );
                })}
            </div>
          </div>
          {/* <img src= alt="" /> */}
        </div>
      </Link>
    </motion.div>
  );
};

export default RoomCard;
