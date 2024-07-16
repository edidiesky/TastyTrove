import React from "react";
import styled from "styled-components";
import CartContent from "./CartContent";
import CartHolder from "./CartHolder";
import SmallCartCard from "./SmallCartCard";
export default function Cartindex() {
  return (
    <CartContainer className="flex gap-2 column">
      <div className="cartHolderWrapper">
        <CartContent />
        <SmallCartCard />
        <div className="flex w-100 item-start justify-space gap-2">
          <CartHolder />
          <CartHolder type={"code"} />
        </div>
      </div>
    </CartContainer>
  );
}

const CartContainer = styled.div`
  width: 100%;

  .cartHolderWrapper {
    width: 90%;
    margin: 0 auto;
    max-width: 1600px;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    gap: 2rem;
    justify-content: flex-end;
    padding-top: 4rem;
  }
`;
