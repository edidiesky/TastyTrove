import React from "react";
import styled from "styled-components";
import { BiPlus, BiMinus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import {
  removeBagItem,
  increaseBagQty,
  decreaseBagQty,
  onCartAlert,
} from "../../Features/cart/cartSlice";

export default function SmallCard({ x, type }) {
  const dispatch = useDispatch();
  const handleRemoveBagItem = () => {
    dispatch(removeBagItem(x));
  };
  const increaseQty = (item) => {
    dispatch(increaseBagQty({ item }));
  };
  const decreaseQty = (item) => {
    dispatch(decreaseBagQty({ item }));
  };
  return (
    <SmallSidebarCardContent key={x._id}>
      <div className="SmallSidebarCard flex column gap-2 justify-center">
        <div className="iconsWrapper">
          <RxCross2 className="icon" />
        </div>
        <div className="imageWrapper">
          <img src={x?.image} alt="images" />
        </div>

        <div className="cartSidebarCCenter">
          <h3>{x?.title}</h3>
          <div className="cartSidebarCBottom flex column gap-1">
            <p>${x?.price}</p>
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
          </div>
        </div>

        <div className="cartCardSLeft">
          <p>${x?.price * x?.quantity}</p>
        </div>
      </div>
    </SmallSidebarCardContent>
  );
}

const SmallSidebarCardContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1rem 0;
  .iconsWrapper {
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 50%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 2rem;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background: var(--grey-1);
    &:hover {
      background: var(--grey-1);
    }

    .icon {
      width: 70%;
      height: 70%;
    }
  }
  .SmallSidebarCard {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 1.4rem;
    .cartCardSLeft {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      p {
        font-size: 1.7rem;
        font-weight: normal;
        font-family: "Lora", sans-serif;
        color: var(--grey);
        font-weight: 400;
      }
    }
    .cartSidebarCCenter {
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 100%;
      text-align: center;
      h3 {
        font-size: 2.7rem;
        color: var(--dark-1);
        font-weight: normal;
        font-family: "Bebas Neue", sans-serif;
      }
      .cartSidebarCBottom {
        display: flex;
        align-items: center;
        p {
          color: var(--grey);
          font-weight: 400;
          font-size: 1.7rem;
          font-weight: normal;
          font-family: "Lora", sans-serif;
        }
        .btnWrapper {
          border: 1px solid rgba(0, 0, 0, 0.1);
          display: flex;
          width: 100px;
          align-items: center;
          height: 3rem;
          justify-content: center;
          margin: 0 auto;
          border-radius: 6px;
          h3 {
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--text-color);
            flex: 1;
            text-align: center;
          }

          .cartBtn {
            border: none;
            outline: none;
            flex: 1;
            height: 100%;
            background: rgb(0 0 0 / 8%);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            &:hover {
              background: rgb(0 0 0 / 13%);
              .icon {
                color: var(--dark-1);
              }
            }
          }
        }
      }
    }

    .imageWrapper {
      img {
        height: 200px;
        object-fit: cover;
      }
    }
  }
`;
