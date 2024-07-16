import React from "react";
import styled from "styled-components";
import CartContent from "./CartContent";
import CartHolder from "./CartHolder";
import SmallCartCard from "./SmallCartCard";
export default function Cartindex() {
  return (
    <CartContainer className="w-full py-20 flex gap-2 column">
      <div className="grid w-90 auto gap-20 md:grid-cols-custom_1">
        <div className="w-full">
          <CartContent />
          <SmallCartCard />
        </div>
        <div className="flex flex-col w-[300px] items-start gap-2">
          {/* <CartHolder /> */}
          {/* <CartHolder type={"code"} /> */}
        </div>
      </div>
    </CartContainer>
  );
}

const CartContainer = styled.div`
  width: 100%;
`;
