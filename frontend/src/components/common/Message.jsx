import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { CgDanger } from "react-icons/cg";
export default function Message({
  showAlert,
  alertText,
  alertType,
  handleClearAlert,
}) {
  // dispatch
  const dispatch = useDispatch();

  return (
    <MessageContent
      className={
        showAlert
          ? "family1 gap-1 flex item-center justify-space active"
          : alertType === "danger"
          ? "family1 gap-1 flex item-center danger justify-space"
          : "family1 gap-1 flex item-center justify-space"
      }
    >
      {alertType === "danger" && <CgDanger className="fs-24" />}
      <div className="flex flex1">{alertText}</div>
      <div className="icon" onClick={() => dispatch(handleClearAlert())}>
        <RxCross1 />
      </div>
    </MessageContent>
  );
}

const MessageContent = styled.div`
  min-width: 650px;
  padding: 1.6rem 2rem;
  min-height: 7rem;
  background-color: #222;
  position: fixed;
  z-index: 10000;
  left: 50%;
  border-radius: 5px;
  transform: translateX(-50%);
  top: 20px;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  transition: all 0.6s;
  /* transform: translate3d(0, -100px, 0); */
  top: -100px;
  &.active {
    top: 20px;
  }
  &.danger {
    background-color: var(--red);
    color: #fff;
    top: 20px;
  }
  @media (max-width: 780px) {
    min-width: 300px;
    justify-content: flex-start;
  }
  .flex1 {
    flex: 1;
  }
  .icon {
    svg {
      font-size: 20px;
      color: var(--grey-2);
    }
  }
`;
