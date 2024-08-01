import Meta from "@/components/common/Meta";
import { useDispatch, useSelector } from "react-redux";
import DashboardIndex from "./components";
import { useEffect } from "react";
import { GetPaymentHistory } from "@/features/payment/paymentReducer";
import Loader from "@/components/home/loader";

export default function Reviews() {
  const dispatch = useDispatch();
  const { getpaymentisLoading } = useSelector((store) => store.payment);
  // useEffect(() => {
  //   dispatch(GetPaymentHistory());
  // }, []);

  // if (getpaymentisLoading) {
  //   return <Loader />;
  // }
  return (
    <div className="py-12">
      <Meta title={"My Reviews Summary || Dashboard - TastTrove Restauarant"} />
      <DashboardIndex />
    </div>
  );
}
