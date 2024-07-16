import Meta from "@/components/common/Meta";
import { useDispatch, useSelector } from "react-redux";
import DashboardIndex from "./components";
import { useEffect } from "react";
import { GetPaymentHistory } from "@/features/payment/paymentReducer";
import Loader from "@/components/home/loader";

export default function Orders() {
  const dispatch = useDispatch();
  const { getpaymentisLoading } = useSelector((store) => store.payment);
  useEffect(() => {
    dispatch(GetPaymentHistory());
  }, []);

  if (getpaymentisLoading) {
    return <Loader />;
  }
  return (
    <div>
      <Meta title={"My Orders Summary"} />
      <DashboardIndex />
    </div>
  );
}
