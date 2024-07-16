import React from "react";
import styled from "styled-components";
import CartContent from "./CartContent";
import CartHolder from "./CartHolder";
export default function Cartindex() {
  return (
    <CartContainer className="w-full py-20 flex gap-2 column">
      <div className="grid w-90 auto gap-20 lg:grid-cols-custom_1">
        <div className="w-full">
          <CartContent />
        </div>
        <div className="flex flex-col w-[400px] items-start gap-2">
          <CartHolder />
          {/* <CartHolder type={"code"} /> */}
        </div>
      </div>
    </CartContainer>
  );
}

const CartContainer = styled.div`
  width: 100%;
`;
