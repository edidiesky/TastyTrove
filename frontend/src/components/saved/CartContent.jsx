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
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th></th>
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
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 780px) {
    display: none;
  }

  h3 {
    /* font-size: 1.8rem; */
    font-weight: normal;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 2rem 0;
    text-transform: uppercase;
  }

  table {
    border-collapse: collapse;
    overflow-x: auto;
    border-collapse: collapse;
    table-layout: fixed;
    /* @media (max-width: 1080px) {
        max-width: 900px;
        min-width: 900px;
      } */
    @media (max-width: 780px) {
      max-width: 600px;
      min-width: 600px;
    }

    @media (max-width: 580px) {
      max-width: 600px;
      min-width: 600px;
    }

    thead {
      tr {
        text-align: start;
        z-index: 200;
        text-align: start;
        transition: all 0.4s;
        border-radius: 40px;
        padding: 1rem;
        /* text-transform: uppercase; */
        font-weight: normal !important;
        th {
          font-size: 0.8rem;
          text-align: start;
          font-size: 30px !important;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          padding: 1.7rem 1rem;
          font-family: "Bebas Neue";
          font-weight: normal !important;
        }
      }
    }
    .btnWrapper {
      width: 150px;
      display: flex;
      align-items: center;
      height: 4rem;
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
    .imageWrapper {
      img {
        width: 6rem;
        position: relative;
        object-fit: cover;
      }
    }
    tbody {
      tr {
        transition: all 0.5s;
        z-index: 200;
        td {
          text-align: start;
          padding: 1.6rem 1rem !important;
          font-size: 20px !important;
          color: #000;
          font-family: "Forum";

          span {
            &.danger {
              color: #840a0a;
              padding: 0.56rem 1rem;
              border-radius: 4px;
              background: #f3efe5;
            }
            &.success {
              color: #28a745;
              padding: 0.56rem 1rem;
              border-radius: 4px;
              background: #dcf6d9;
            }
          }
        }

        .icons {
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          svg {
            font-size: 1.7rem;
            cursor: pointer;
          }
          &:hover {
            background: #ddd;
          }
        }
      }
    }
  }
`;
