import React, { useEffect, useState } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";
import { TiTimes } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import DeleteModal from "../modals/DeleteModal";
import { AnimatePresence } from "framer-motion";

export default function Card({ x, type }) {
  const dispatch = useDispatch();

  const [cartcount, setCartCount] = useState(0);
  const [deletecartmodal, setUserDeleteCartModal] = useState(false);
  useEffect(() => {
    setCartCount(x?.totalCount);
  }, [x, setCartCount]);

  if (type === "payment") {
    return (
      <>
        <AnimatePresence>
          {deletecartmodal && (
            <DeleteModal
              deletecartmodal={deletecartmodal}
              setModal={setUserDeleteCartModal}
              type={"menu"}
              menu={x}
              id={x?.id}
            />
          )}
        </AnimatePresence>

        <tr key={x?.id}>
          <td>
            <div className="flex items-center gap-4">
              <div className="imageWrapper">
                <img src={x?.menu?.image} className='w-[70px]' alt="images" />
              </div>
              {x?.menu?.title}
            </div>
          </td>
          {/* <td className="text-lg">{x?.price}</td> */}
          <td>${x?.menu?.price}</td>
          <td>
            <span className="">
              {cartcount}
            </span>
          </td>
          <td className="text-xl">${x?.menu?.price * cartcount}</td>
        </tr>
      </>
    );
  }

  return (
    <>
      <AnimatePresence>
        {deletecartmodal && (
          <DeleteModal
            deletecartmodal={deletecartmodal}
            setModal={setUserDeleteCartModal}
            type={"menu"}
            menu={x}
            id={x?.id}
          />
        )}
      </AnimatePresence>

      <tr key={x?.id}>
        <td>
          <div className="flex items-center gap-4">
            <div className="imageWrapper">
              <img src={x?.menu?.image} className="w-[100px]" alt="images" />
            </div>
            {x?.menu?.title}
          </div>
        </td>
        {/* <td className="text-lg">{x?.price}</td> */}
        <td>${x?.menu?.price}</td>
        <td>
          <div className="btnWrapper">
            <button
              className="cartBtn border-r"
              disabled={cartcount >= x?.menu?.availabilityCount}
              onClick={() => setCartCount(cartcount + 1)}
            >
              <BiPlus fontSize={"14px"} />
            </button>
            <span className="border-l family4 font-bold border-r">
              {cartcount}
            </span>
            <button
              className="cartBtn border-l"
              disabled={cartcount === 1}
              onClick={() => setCartCount(cartcount - 1)}
            >
              <BiMinus fontSize={"14px"} />
            </button>
          </div>
        </td>
        <td className="text-xl">${x?.menu?.price * cartcount}</td>
        <td className="svg">
          <div
            className="w-12 h-12 rounded-full hover:bg-[#eee] flex items-center justify-center cursor-pointer"
            onClick={() => setUserDeleteCartModal(true)}
          >
            <RxCross1 />
          </div>
        </td>
      </tr>
    </>
  );
}
