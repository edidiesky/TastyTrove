import React from "react";
import styled from "styled-components";
import CartContent from "./CartContent";
import CartHolder from "./CartHolder";
import { useSelector } from "react-redux";
export default function Cartindex() {
  const { cart } = useSelector((store) => store.cart);

  return (
    <CartContainer className="w-full py-20 relative flex gap-2 column">
      <div className="grid w-90 relative auto gap-20 lg:grid-cols-custom_1">
        <div className="w-full">
          <CartContent />
        </div>
        {cart?.length !== 0 && (
          <div className="flex sticky top-0 flex-col w-[400px] items-start gap-2">
            {/* {cart?.length !== 0 && <CartHolder />} */}
            <CartHolder />
            {/* <CartHolder type={"code"} /> */}
          </div>
        )}
      </div>
    </CartContainer>
  );
}

const CartContainer = styled.div`
  width: 100%;
`;
