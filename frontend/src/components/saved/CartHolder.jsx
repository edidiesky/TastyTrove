import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { calculateBagItem } from "../../Features/cart/cartSlice";
import { Link } from "react-router-dom";
export default function CartHolder({ type }) {
  const dispatch = useDispatch();
  // const { productDetails } = useSelector((store) => store.product);
  const {
    cart,
    totalPrice,
    totalQuantity,
    shippingPrice,
    estimatedTax,
    TotalShoppingPrice,
  } = useSelector((store) => store.cart);

  useEffect(() => {
    dispatch(calculateBagItem());
  }, [ cart]);
  if (type === "code") {
    return (
      <CartHolderContainer>
        <h3 className="family3 uppercase">Have A Promotional Code?</h3>
        <div className="w-full flex gap-2">
          <input type="text" className="input flex-1" />
          <div className="uppercase flex-1">
            <div className="family1 uppercase btn text-dark text-xl">
              Apply Coupon
            </div>
          </div>
        </div>
      </CartHolderContainer>
    );
  }
  return (
    <CartHolderContainer className="relative">
      <img
        src="https://avada.website/restaurant/wp-content/uploads/sites/112/2020/04/slider72x-scaled.jpg"
        alt=""
        className="w-full h-full z-10 absolute left-0 top-0 object-cover"
      />
      <div className="gradient2 absolute top-0 left-0 h-full w-full z-20"></div>
      <div className="w-full z-[400] flex flex-col gap-12">
        <div className="w-full z-[400] text-[#fff] flex flex-col gap-4">
          <h3 className="family3 text-3xl md:text-4xl text-[#fff] z-30 uppercase">
            Cart totals
          </h3>
          <div className="w-full flex flex-col gap-6">
            <h4 className="family3 text-2xl uppercase subtotal">
              Subtotal{" "}
              <span className="family3 uppercase subspan">${totalPrice}</span>
            </h4>
            <h4 className="family3 text-2xl uppercase total">
              Shipping{" "}
              <span className="family3 uppercase subspan span1">
                Shipping to <span className="text-bold">Nigeria</span>
              </span>
            </h4>
            <h4 className="family3 text-2xl uppercase total">
              Total{" "}
              <span className="family3 uppercase subspan span1">
                ${TotalShoppingPrice}
              </span>
            </h4>
          </div>
        </div>
        <div className="uppercase btnWrapper">
          <Link
            to={"/billing"}
            className="family1 py-4 hover:opacity-[.7] bg-[#fff] text-center w-full cursor-pointer text-dark text-base uppercase"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </CartHolderContainer>
  );
}

const CartHolderContainer = styled.div`
  padding: 4rem 2rem;
  border: 1px solid rgba(0, 0, 0, 0.09);
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
  position: relative;
  width: 100%;
  @media (max-width: 980px) {
    width: 100%;
  }


  .btnWrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .editBtn {
      border: none;
      outline: none;
      padding: 1.5rem 4rem;
      background: var(--red);
      color: #fff;
      font-size: 1.6rem;
      text-align: center;
      cursor: pointer;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 1px;
      &:hover {
        background: var(--blue-1);
      }
      @media (max-width: 980px) {
        padding: 1.6rem 4rem;
      }
    }
  }

  h4 {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: normal;
    &.subtotal {
      padding: 2.4rem 0;
    }

    .subspan {
      color: var(--grey);
      font-family: "Lora", sans-serif;
      font-size: 16px;
      text-transform: capitalize;
      &.span1 {
        color: var(--blue-2);
      }
    }
  }
`;