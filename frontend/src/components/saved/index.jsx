import React, { useEffect } from "react";
import Footer from "../common/Footer";
import { useDispatch, useSelector } from "react-redux";
import Cartindex from "./Cart";
import { GetUserCart } from "@/features/cart/cartReducer";
import Loader from "../loader";
const HomeIndex = () => {
  const dispatch = useDispatch();
  const {getsingleCartisLoading} = useSelector(store=> store.cart)
  useEffect(()=> {
    dispatch(GetUserCart());
  },[])

  if (getsingleCartisLoading) {
    return <Loader/>
  }
    return (
      <div className=" w-full flex flex-col">
        <Cartindex />
        <Footer />
      </div>
    );
};

export default HomeIndex;
