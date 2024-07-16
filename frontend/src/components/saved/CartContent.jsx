import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Card from "./Card";
import Message from "../common/Message";
export default function CartContent() {
  // get the cart content
  const { cart } = useSelector((store) => store.cart);

  return (
    <CartContentContainer>
      {cart?.length === 0 ? (
        <Message alertText="No items in your cart" alertType={"danger"} />
      ) : (
        <>
          <h3 className="family3">You have {cart?.length} items in your cart</h3>
          <table>
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart?.map((x) => {
                return <Card key={x.id} x={x} />;
              })}
            </tbody>
          </table>
        </>
      )}
    </CartContentContainer>
  );
}

const CartContentContainer = styled.div`
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 780px) {
    display: none;
  }

  h3 {
    font-size: 3.5rem;
    font-weight: normal;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 2rem 0;
    text-transform: uppercase;
  }

  table {
    width: 100%;
    padding: 2rem 0;
    border-collapse: collapse;
    table-layout: fixed;
    thead {
      width: 100%;
      tr {
        width: 100%;
        padding: 2rem 0;
        th {
          width: 100%;
          font-size: 2.6rem;
          padding: 2rem 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          font-weight: normal;
          color: var(--dark-1);
          font-family: "Bebas Neue", sans-serif;
        }
      }
    }
    tbody {
      width: 100%;
      tr {
        width: 100%;
        td {
          text-align: center;
          padding: 2rem 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          font-size: 1.7rem;
          font-weight: normal;
          font-family: "Lora", sans-serif;
          color: var(--grey);
          .iconsWrapper {
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            margin: 0 auto;
            display: flex;
            align-items: center;
            gap: 2rem;
            justify-content: center;
            cursor: pointer;
            background: rgb(0 0 0 / 8%);
            &:hover {
              background: rgba(0, 0, 0, 0.1);
            }

            svg {
              font-size: 2rem;
            }
          }

          &.title {
            font-size: 1.7rem;
            font-weight: normal;
            color: var(--blue-1);
          }
          .cartProduct {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 2rem;
            justify-content: center;

            .imageWrapper {
              img {
                width: 15rem;
                position: relative;
                object-fit: cover;
              }
            }
          }
          &:nth-child(2),
          &:nth-child(3),
          &:nth-child(4),
          &:nth-child(5) {
            width: auto;
          }
          .btnWrapper {
            width: 150px;
            display: flex;
            align-items: center;
            height: 5rem;
            justify-content: center;
            margin: 0 auto;
            h3 {
              font-size: 1.4rem;
              font-weight: 600;
              color: #333;
              flex: 1;
              font-family: "Bebas Neue", sans-serif;
              border-bottom: 1px solid rgba(0, 0, 0, 0.2);
              border-top: 1px solid rgba(0, 0, 0, 0.2);
              height: 100%;
              display: grid;
              place-items: center;
            }
            .cartBtn {
              border: none;
              outline: none;
              flex: 1;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              border: 1px solid rgba(0, 0, 0, 0.2);
              border-top: 1px solid rgba(0, 0, 0, 0.2);
              &:hover {
                background: rgb(0 0 0 / 13%);
                svg {
                  color: var(--dark-1);
                }
              }
              svg {
                width: 1.4rem;
                height: 1.4rem;
                color: #333;
              }
            }
          }
        }
      }
    }
  }
`;
