import React, { useState } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";
import { TiTimes } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
// import { Delete } from "../modals";
import {
  removeBagItem,
  increaseBagQty,
  decreaseBagQty,
  onCartAlert,
} from "../../Features/cart/cartSlice";
import { RxCross1 } from "react-icons/rx";

export default function Card({ x, type }) {
  const dispatch = useDispatch();

  if (type === "payment") {
    return (
      <div key={x?._id} className="flex card w-100 item-center justify-space">
        <div className="flex item-center gap-2 ">
          <div className="cartProduct">
            <div className="imageWrapper">
              <img src={x?.image} alt="images" />
            </div>
          </div>
          <div
            style={{ fontWeight: "normal" }}
            className="title w-100 flex fs-20 family3 item-center gap-1"
          >
            {x?.title} <RxCross1 fontSize={"12px"} /> {x?.quantity || 1}
          </div>
        </div>

        <div
          style={{ fontWeight: "normal" }}
          className="price fs-20 family3 text-dark"
        >
          {x?.price * x?.quantity}
        </div>
      </div>
    );
  }

  return (
    <tr key={x?._id}>
      <td>
        <div className="flex items-center gap-4">
          <div className="imageWrapper">
            <img src={x?.image} alt="images" />
          </div>
          {x?.title}
        </div>
      </td>
      {/* <td className="text-lg">{x?.price}</td> */}
      <td>{x?.price}</td>
      <td>
        <div className="btnWrapper">
          <button
            className="cartBtn"
            disabled={x?.quantity === x?.countInStock}
            onClick={() => dispatch(increaseBagQty(x))}
          >
            <BiPlus />
          </button>
          <h3>{x?.quantity}</h3>
          <button
            className="cartBtn"
            disabled={x?.quantity === 1}
            onClick={() => dispatch(decreaseBagQty(x))}
          >
            <BiMinus />
          </button>
        </div>
      </td>
      <td className="text-xl">{x?.price * x?.quantity}</td>
      <td className="svg">
        <div className="w-12 h-12 rounded-full hover:bg-[#eee] flex items-center justify-center cursor-pointer" onClick={() => dispatch(onCartAlert(x))}>
          <RxCross1 />
        </div>
      </td>
    </tr>
  );
}
