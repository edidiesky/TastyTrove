import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import moment from "moment";
import { BiMinus, BiPlus, BiCheck } from "react-icons/bi";
import styled from "styled-components";
import { RxCross2 } from "react-icons/rx";
import Loader from "../home/loader";
import { useDispatch, useSelector } from "react-redux";
import AnimateText from "@/animations/AnimateText";
import {
  DeleteReservation,
  UpdateReservation,
} from "@/features/reservation/reservationReducer";
export default function BookingReservationModal({ setModal, room }) {
  const { deleteRoomisLoading, deleteRoomisSuccess } = useSelector(
    (store) => store.room
  );
  const { updateReservationisLoading, deleteReservationisLoading } =
    useSelector((store) => store.reservation);
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState(0);
  const [statustab, setStatusTab] = useState(null);
  const dispatch = useDispatch();
  const handleClearAlert = () => {
    setStatus("");
    setStatusTab(null);
    setModal({
      modal: false,
    });
  };

  const HandleStatus = ({ stat, tab }) => {
    // console.log({ stat, tab });
    setStatus(stat);
    setStatusTab(tab);
  };
  const handleDeleteRoom = useCallback(() => {}, []);
  useEffect(() => {
    // dispatch(handleClearRoomAl());
    setStatus(room?.status);
  }, [setStatus]);

  const diffrenceInDays = moment(room?.endDate).diff(
    moment(room.startDate),
    "days"
  );
  // console.log(room);

  return (
    <ReservationModalStyles
      as={motion.div}
      initial={{ opacity: 0 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
      }}
      animate={{
        opacity: 1,
        transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      <motion.div
        initial={{
          y: "100vh",
        }}
        animate={{
          y: "0",
          transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
        }}
        exit={{
          y: "100vh",
          transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
        }}
        className={"deleteCard gap-2"}
      >
        <div className="cross" onClick={handleClearAlert}>
          <RxCross2 />
        </div>
        <div className="deleteCardTop w-full sticky top-0 left-0 border-b p-8 pb-0 px-4 flex flex-col gap-4">
          <h3 className="text-2xl md:text-3xl font-booking_font4">
            {room?.title}
            <span className="block font-booking_font font-normal text-base">
              %#{room?.id}
            </span>
          </h3>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="p-2 px-4 font-booking_font rounded-[4px] text-center bg-[#f5f5f5] text-xs font-bold">
                {room?.title}
              </span>
              <span className="p-2 px-4 capitalize font-booking_font rounded-[4px] text-center bg-[#B7FF0A] text-[#000] text-xs font-bold">
                {room?.status === "PENDING" ? "Pending" : "Paid"}
              </span>
            </div>

            <button
              disabled={updateReservationisLoading}
              onClick={() =>
                dispatch(
                  UpdateReservation({
                    reservationId: room?.id,
                    reservation: { status: status },
                  })
                )
              }
              className="btn px-4 text-white py-2 rounded-[10px] family1 font-booking_font font-bold flex items-center justify-center text-sm"
              // onClick={() => dispatch(AdminDeleteUserProfile({ Detailsdata: id }))}
            >
              {updateReservationisLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader type="dots" />
                  Update in progress
                </span>
              ) : (
                <AnimateText children={`Save `} />
              )}
            </button>
          </div>
          <div className="grid w-full gap-4 md:grid-cols-4">
            <div className="w-full border-b-2 border-[#B7FF0A] text-[#000] pb-3 text-lg font-booking_font_bold font-bold">
              Booking Details
            </div>
          </div>
        </div>

        <div className="p-4 h-[300px] md:h-[300px] overflow-auto  px-4 md:px-8 grid w-full gap-8 md:grid-cols-2">
          <div className="w-full flex flex-col gap-4">
            <h3 className="text-base w-full pb-2 border-b font-booking_font4 family1">
              Room Terms
            </h3>
            <div className="w-full flex flex-col gap-4">
              <div className="w-full grid grid-cols-2 gap-4">
                {/* dates */}
                <label
                  htmlFor="titlprice"
                  className="text-sm flex flex-col gap-2 font-booking_font"
                >
                  From:
                  <span className="block text-base font-booking_font_bold">
                    {moment(room?.startDate).format("DD MMM YYYY")}
                  </span>
                  {/* <input
                    name="price"
                    value={price}
                    id="price"
                    type="number"
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    className="text-base w-full input"
                  /> */}
                </label>
                <label
                  htmlFor="titlprice"
                  className="text-sm flex flex-col gap-2 font-booking_font"
                >
                  To:
                  <span className="block text-base font-booking_font_bold">
                    {moment(room?.endDate).format("DD MMM YYYY")}
                  </span>
                </label>
              </div>
              <div className="w-full flex flex-col gap-2">
                <h5 className="text-sm font-booking_font">Number of Nights:</h5>
                <span className="block font-bold text-base">
                  {diffrenceInDays} Nights
                </span>
                {/* <div
                  className="flex items-center justify-between border p-3 max-w-[200px] rounded-[5px]"
                  style={{ gap: "1rem" }}
                >
                  <button
                    onClick={() => setNight(night - 1)}
                    disabled={night === 0}
                    className="w-10 h-10 rounded-full flex bg-[#eee] items-center justify-center"
                  >
                    <BiMinus fontSize={"18px"} />
                  </button>{" "}
                  <h4 className="text-lg flex-1 text-center text-dark font-bold">
                    {night}
                  </h4>
                  <button
                    // disabled={limit >= 6}
                    onClick={() => setNight(night + 1)}
                    className="w-10 h-10 rounded-full flex bg-[#eee] items-center justify-center"
                  >
                    <BiPlus fontSize={"18px"} />
                  </button>
                </div> */}
              </div>

              <div className="w-full flex flex-col gap-4 pt-2">
                <h3 className="text-base w-full pb-2 border-b font-booking_font4 family1">
                  Booking Status
                </h3>
                <div className="w-full grid grid-cols-1">
                  <div
                    onClick={() => HandleStatus({ stat: "CONFIRMED", tab: 0 })}
                    className={`text-sm py-2 px-4 ${
                      status === "CONFIRMED" ? "bg-[#f5f5f5]" : ""
                    } flex items-center gap-4 font-booking_font`}
                  >
                    <div className="w-8 h-8 flex items-center justify-center rounded-full text-dark bg-[#B7FF0A] text-[#000] text-end text-sm font-booking_font">
                      {status === "CONFIRMED" && <BiCheck />}
                    </div>
                    Fully Paid
                  </div>
                  <div
                    onClick={() => HandleStatus({ stat: "PENDING", tab: 1 })}
                    className={`text-sm py-2 px-4 ${
                      status === "PENDING" ? "bg-[#f5f5f5]" : ""
                    } flex items-center gap-4 font-booking_font`}
                  >
                    <div className="w-8 h-8 flex items-center justify-center rounded-full text-dark bg-[#e4c590] text-[#000] text-end text-sm font-booking_font">
                      {status === "PENDING" && <BiCheck />}
                    </div>
                    Lack of Payment
                  </div>
                  <div
                    onClick={() => HandleStatus({ stat: "CANCELLED", tab: 2 })}
                    className={`text-sm py-2 px-4 ${
                      status === "CANCELLED" ? "bg-[#f5f5f5]" : ""
                    } flex items-center gap-4 font-booking_font`}
                  >
                    <div className="w-8 h-8 flex items-center justify-center rounded-full text-dark bg-[#f9d955] text-[#000] text-end text-base font-booking_font">
                      {status === "CANCELLED" && <BiCheck />}
                    </div>
                    Payment Cancelled
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* room price */}
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-col gap-4">
              <h3 className="text-base w-full pb-2 border-b font-booking_font4 family1">
                Room Price
              </h3>
              <div className="w-full flex flex-col gap-4">
                <label
                  htmlFor="titlprice"
                  className="text-sm flex flex-col gap-2 font-booking_font"
                >
                  Final Price:
                  <span className="block text-lg font-booking_font_bold">
                    {" "}
                    ₦{Number(room?.totalPrice).toLocaleString()}
                  </span>
                </label>

                <div className="text-sm flex flex-col gap-2 font-booking_font">
                  Payment on Place:
                  <div className="p-2 text-dark rounded-[5px] bg-[#f5f5f5] text-end text-lg font-bold">
                    ₦{Number(room?.totalPrice).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2 pt-2">
              <h3 className="text-base w-full pb-2 border-b font-booking_font4 family1">
                Number of Guests
              </h3>
              <span className="block font-bold text-base">5 Guests</span>
            </div>
            <div className="w-full flex flex-col gap-4 pt-3">
              <h3 className="text-base font-booking_font4 w-full pb-4 border-b family1">
                Client profile
              </h3>
              <div className="w-full pt-2 flex flex-col gap-3">
                <div className="w-full flex items-center gap-4">
                  <span className="text-sm  font-normal">Name:</span>
                  <span className="text-sm  font-bold">{room?.user?.name}</span>
                </div>
                <div className="w-full flex items-center gap-4">
                  <span className="text-sm  font-normal">Email:</span>
                  <span className="text-sm  font-bold">
                    {room?.user?.email}
                  </span>
                </div>
                <div className="w-full flex items-center gap-4">
                  <span className="text-sm  font-normal">Username:</span>
                  <span className="text-sm  font-bold">
                    {room?.user?.username}
                  </span>
                </div>
                <div className="w-full flex items-center gap-4">
                  <span className="text-sm  font-normal">App Id:</span>
                  <span className="text-sm  font-bold">{room?.user?.id}</span>
                </div>
              </div>
            </div>
          </div>
          {/* client profile */}
        </div>

        <div className="deleteCardBottom py-2 w-full flex flex-row gap-2 items-center md:justify-end px-4">
          <button
            className="family1 font-booking_font font-bold flex items-center justify-center text-sm"
            onClick={handleClearAlert}
          >
            Cancel
          </button>
          <button
            disabled={deleteReservationisLoading}
            onClick={() => dispatch(DeleteReservation(room?.id))}
            className="deleteBtn family1 font-booking_font font-bold flex items-center justify-center text-sm"
            // onClick={() => dispatch(AdminDeleteUserProfile({ Detailsdata: id }))}
          >
            {deleteReservationisLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader type="dots" />
                Deleting in progress
              </span>
            ) : (
              <AnimateText children={`Delete `} />
            )}
          </button>
        </div>
      </motion.div>
    </ReservationModalStyles>
  );
}

const ReservationModalStyles = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  display: flex;
  z-index: 4900;
  align-items: center;
  justify-content: center;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  padding: 2rem 0;
  .deleteCard {
    max-width: 950px;
    min-width: 850px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2rem 3rem rgba(0, 0, 0, 0.4);
    position: relative;
    @media (max-width: 980px) {
      max-width: 90%;
      min-width: 90%;
    }
    .cross {
      position: absolute;
      right: 15px;
      top: 2%;
      width: 2.4rem;
      height: 2.4rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 40000;
      &:hover {
        background: #eee;
      }
      svg {
        font-size: 20px;
      }
    }
    .deleteCardBottom {
      display: flex;
      gap: 1.5rem;
      button {
        padding: 0.5rem 2rem;
        min-height: 46px;
        border: none;
        font-weight: 600;
        background: #eee;
        color: #000;
        outline: none;
        border-radius: 10px;
        cursor: pointer;
        &:hover {
          background: #c4c4c4;
        }
        &.deleteBtn {
          background: var(--red);
          color: #fff;
          &:hover {
            opacity: 0.8;
            color: #fff;
          }
        }
      }
    }
    .deleteCardCenter {
      padding: 2rem 0;
      width: 100%;
      background: var(--grey-3);
      border-left: 5px solid var(--red);
      display: flex;
      align-items: center;
      svg {
        font-size: 2rem;
        color: var(--red);
      }
    }

    .deleteCardTop {
      display: flex;
      flex-direction: column;
    }
  }
`;
