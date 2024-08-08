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
import CartHolder from "../saved/CartHolder";
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
  return (
    <div className="w-full py-24">
      <div className="w-85 auto grid grid-cols-1">
        <div className="w-full grid md:grid-cols-custom_1 md:items-start flex-col gap-8">
          <Cart />
          <div className="md:justify-end w-[400px] md:items-end flex flex-col gap-8 ">
           <CartHolder type={'payment'}/>
          </div>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const { payment, payments, updatepaymentisLoading } = useSelector(
    (store) => store.payment
  );
  // console.log(payments);
  return (
    <CartContentContainer>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {payments?.map((x) => {
            return x?.cartItems.map((cart, index) => {
              return <Card type={"payment"} key={index} x={cart} />;
            });
          })}
        </tbody>
      </table>
    </CartContentContainer>
  );
};
export default HomeIndex;
