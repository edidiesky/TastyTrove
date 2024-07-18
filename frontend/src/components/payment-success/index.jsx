import React, { useEffect, useMemo } from "react";
import Banner from "../common/Banner";
import { useSearchParams } from "react-router-dom";
// import MainContent from "./main/maincontent";
import Footer from "../common/Footer";
import { FaRegCircleCheck } from "react-icons/fa6";
import Confettis from "@/components/common/Confetti";
import { useDispatch, useSelector } from "react-redux";
import { GetUserReservations } from "@/features/reservation/reservationReducer";
import { useParams, useNavigate } from "react-router-dom";
import { handleClearPayment } from "@/features/payment/paymentSlice";
import { UpdatePaymentToSuccess } from "@/features/payment/paymentReducer";
import Loader from "../home/loader";
const HomeIndex = () => {
  const dispatch = useDispatch();
  // let [searchParams, setSearchParams] = useSearchParams();
  // const { payment, updatepaymentisLoading } = useSelector(
  //   (store) => store.payment
  // );
  // const navigate = useNavigate();
  // const { id } = useParams();
  // const reservationid = searchParams.get("reservationid");
  // // console.log(reservationid);
  // // UpdatePaymentToSuccess
  // // GetSinglePaymentHistory
  // useMemo(() => {
  //   // dispatch(GetUserReservations());
  //   dispatch(handleClearPayment());
  //   // verify the payment route
  //   if (id) {
  //     dispatch(UpdatePaymentToSuccess({ id, reservationid }));
  //   }
  // }, []);

  // if (updatepaymentisLoading) {
  //   return <Loader />;
  // }
  return (
    <div className="w-full flex flex-col">
      <Banner
        text={"Thank You!!"}
        subtext={"Your payment is successful!"}
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
  const differenceInDays = 4
  const updatedReservation = {
    id: 3,
    rooms: {
      images: [
        "https://avada.website/restaurant/wp-content/uploads/sites/112/2020/01/menu262x-600x687.jpg",
      ],
      title: "Greek Salad",
      price: 25.5,
    },
  };

   const payment = {
    id:"",
    amount:"4000"
   };
  return (
    <div className="w-full py-24">
      <div className="w-85 auto flex flex-col gap-8">
        <div className="w-full pb-12 md:pb-24 flex flex-col gap-8 border-b">
          <h3 className="text-4xl md:text-5xl family4 italic">Order Details</h3>
          <div className="w-full grid lg:grid-cols-custom_1 md:items-center gap-12 md:gap-20">
            <div className="w-full">
              <div className="grid sm:grid-cols-custom_2 items-center gap-4 md:gap-12">
                <img
                  src={updatedReservation?.rooms?.images[0]}
                  alt=""
                  className="w-[300px] object-cover h-[240px] md:h-[300px]"
                />
                <div className="w-full flex flex-col gap-4">
                  <h3 className="text-5xl family3">
                    {updatedReservation?.rooms?.title}
                  </h3>
                  <ul className="flex flex-col gap-2">
                    <li className="text-base lg:text-lg flex items-center gap-3 font-booking_font">
                      <span className="font-bold font-booking_font_bold">
                        Check In:
                      </span>
                      {/* {startDate} */}
                    </li>
                    <li className="text-base lg:text-lg flex items-center gap-3 font-booking_font">
                      <span className="font-bold font-booking_font_bold">
                        Check Out:
                      </span>
                      {/* {endDate} */}
                    </li>
                    <li className="text-base lg:text-lg flex items-center gap-3 font-booking_font">
                      <span className="font-bold font-booking_font_bold">
                        Guests:
                      </span>
                      4
                    </li>
                    <li className="text-base lg:text-lg flex items-center gap-3 font-booking_font">
                      <span className="font-bold font-booking_font_bold">
                        Total Days:
                      </span>
                      {differenceInDays} days
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-[400px]">
              <div className="w-full flex flex-col gap-4">
                <h3 className="text-5xl family3">
                  Reservation Details
                </h3>
                <ul className="flex flex-col gap-2">
                  <li className="text-base flex items-center gap-3 font-booking_font">
                    <span className="font-bold font-booking_font_bold">
                      Order No:
                    </span>
                    {payment?.id}
                  </li>
                  <li className="text-base flex items-center gap-3 font-booking_font">
                    <span className="font-bold font-booking_font_bold">
                      Order Date:
                    </span>
                    {/* {paymentDate} */}
                  </li>
                  <li className="text-base flex items-center gap-3 font-booking_font">
                    <span className="font-bold font-booking_font_bold">
                      Transaction Id:
                    </span>{" "}
                    {updatedReservation?.id}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-end">
          <h3 className="text-3xl lg:text-5xl family4 italic">
            <span className="text-4xl family4 italic">Amount Paid:</span>{" "}
            <span>${payment?.amount}</span>
          </h3>
        </div>
      </div>
    </div>
  );
};
export default HomeIndex;
