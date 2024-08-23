import React, { useEffect, useState } from "react";
import Footer from "../common/Footer";
import { useDispatch } from "react-redux";
import { GetUserReservations } from "@/features/reservation/reservationReducer";
import Banner from "../common/Banner";
import { BiHome, BiPhone } from "react-icons/bi";
const HomeIndex = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(GetUserReservations());
  // }, []);
  return (
    <div className=" w-full flex flex-col">
      <Banner
        text={"Reservations"}
        subtext={"BEST TABLE IN TOWN"}
        image={
          "https://avada.website/restaurant/wp-content/uploads/sites/112/2020/01/hero12x.jpg"
        }
      />
      <Main />
      <Footer />
    </div>
  );
};

const Main = () => {

  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  return (
    <div className="w-full py-24">
      <div className="w-85 auto grid items-start gap-12 grid-cols-custom_2">
        <div className="flex flex-col w-[400px] gap-12">
          <img
            src="https://avada.website/restaurant/wp-content/uploads/sites/112/2020/01/page15@2x-800x248.jpg"
            alt=""
            className="w-full h-40 object-cover"
          />
          <p className="text-xl font-booking_font">
            Hac tellus, felis risus at mattis. Eget euismod semper eget tortor,
            donec amet, blandit. Tristique facilisi faucibus elementum feugiat
            in nam in feugiat.
          </p>
          <div className="flex flex-col gap-4 font-booking_font">
            <h3 className="text-3xl md:text-4xl family3">reserve by phone</h3>
            <div className="flex text-lg flex-col gap-4">
              <div className="flex items-center gap-4">
                <BiHome />
                Restaurant : (123) 456-7891
              </div>

              <div className="flex items-center gap-4">
                <BiPhone />
                Cellphone : (123) 456-7891
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-8">
          <div className="grid md:grid-cols-2 gap-x-4 gap-y-12">
            <label
              htmlFor="name"
              className="flex flex-col gap-2 text-lg family4"
            >
              First Name
              <input
                type="text"
                name="firstname"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full"
              />
            </label>

            <label
              htmlFor="name"
              className="flex flex-col gap-2 text-lg family4"
            >
              Last Name
              <input
                type="text"
                name="lastname"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full"
              />
            </label>

            <label
              htmlFor="phone number"
              className="flex flex-col gap-2 text-lg family4"
            >
              Phone number
              <input type="text" className="w-full" />
            </label>
            <label
              htmlFor="Number of guests *"
              className="flex flex-col gap-2 text-lg family4"
            >
              Number of guests *
              <input type="text" className="w-full" />
            </label>
            <label
              htmlFor="Date of reservation *"
              className="flex flex-col gap-2 text-lg family4"
            >
              Date of reservation *
              <input type="text" className="w-full" />
            </label>
          </div>
          <label
            htmlFor="Time of reservation"
            className="flex flex-col w-full gap-2 text-lg family4"
          >
            Time of reservation
            <input type="text" className="w-full" />
          </label>

          <label
            htmlFor="Time of reservation"
            className="flex flex-col w-full gap-2 text-lg family4"
          >
            Time of reservation
            <textarea type="text" className="w-full h-[200px]" />
          </label>
          <div className="flex items-start">
            <button className="btn uppercase">send you reservation</button>
          </div>
        </div>
      </div>
    </div>
  );
};



export default HomeIndex;
