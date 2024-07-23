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
import Card from "../saved/Card";
import { CartContentContainer } from "../saved/CartContent";
import moment from "moment";
const HomeIndex = () => {
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  const { payment, updatepaymentisLoading } = useSelector(
    (store) => store.payment
  );
  const navigate = useNavigate();
  const { id } = useParams();
  useMemo(() => {
    // dispatch(GetUserReservations());
    dispatch(handleClearPayment());
    // verify the payment route
    if (id) {
      dispatch(UpdatePaymentToSuccess(id));
    }
  }, []);

  if (updatepaymentisLoading) {
    return <Loader />;
  }
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
  const differenceInDays = 4;
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
  const { payment, updatepaymentisLoading } = useSelector(
    (store) => store.payment
  );
  return (
    <div className="w-full py-24">
      <div className="w-85 auto grid grid-cols-1">
        <div className="w-full pb-12 flex flex-col gap-12 ">
          <h3
            className="text-6xl md:text-7xl
            relative
          after:w-[100px] after:left-0 after:-bottom-2 after:h-[2px]
           after:bg-[#eee] after:rounded-lg after:absolute
          family3 "
          >
            Order Details
          </h3>
        </div>
        <div className="w-full grid grid-cols-1 md:items-start flex-col gap-8">
          <Cart />
          <div className="md:justify-end md:items-end flex flex-col gap-8 ">
            <div className="w-[400px]">
              <div className="w-full flex flex-col gap-8">
                <h3 className="text-4xl  family3">Reservation Details</h3>
                <ul className="flex flex-col gap-2">
                  <li className="text-xl flex items-center gap-3 font-booking_font">
                    <span className="font-normal family3">Order No:</span>
                    {payment?.id}
                  </li>
                  <li className="text-xl flex items-center gap-3 font-booking_font">
                    <span className="font-normal family3">Order Date:</span>
                    {moment(payment?.updatedAt).format("DD MMM YYYY")}
                    {/* {paymentDate} */}
                  </li>
                  <li className="text-xl flex items-center gap-3 font-booking_font">
                    <span className="font-normal family3">Amount Paid:</span>

                    <span>${payment?.amount}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const { payment, updatepaymentisLoading } = useSelector(
    (store) => store.payment
  );
  return (
    <CartContentContainer>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {payment?.cartItems?.map((x) => {
            return <Card type={"payment"} key={x.id} x={x} />;
          })}
        </tbody>
      </table>
    </CartContentContainer>
  );
};
export default HomeIndex;
