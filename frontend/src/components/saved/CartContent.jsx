import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Country, State, City } from "country-state-city";
import { useSelector } from "react-redux";
import Card from "./Card";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import ShippingInfo from "./ShippingInformation";
export default function CartContent() {
  // get the cart content
  const { cart } = useSelector((store) => store.cart);

  return (
    <div className="w-full space-y-12">
      <CartContentContainer>
        {cart?.length === 0 ? (
          // ""
          // <Message alertText="No items in your cart" alertType={"danger"} />
          <div className="w-full flex  items-center justify-center flex-col gap-2">
            <h2 className="text-6xl md:text-7xl text-dark family3">
              Cart is empty
            </h2>
            <Link
              to={"/restaurant/menu"}
              className="h-[55px] w-[250px] text-lg"
            >
              <Button
                type="dark"
                bgColor={"var(--primary)"}
                text={"Browse Our Menu"}
              ></Button>
            </Link>
          </div>
        ) : (
          <div className="tableWrapper overflow-auto">
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
          </div>
        )}
      </CartContentContainer>
      {cart?.length !== 0 && <ShippingInfo />}
    </div>
  );
}

export const CartContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  .tableWrapper {
    max-width: 700px;
    @media (max-width: 680px) {
      max-width: 560px;
    }

    @media (max-width: 580px) {
      max-width: 450px;
    }
    @media (max-width: 480px) {
      max-width: 400px;
    }

    @media (max-width: 400px) {
      max-width: 330px;
    }
  }
  h3 {
    /* font-size: 1.8rem; */
    font-weight: normal;
    /* border-bottom: 1px solid rgba(0, 0, 0, 0.1); */
  }

  table {
    border-collapse: collapse;
    overflow-x: auto;
    border-collapse: collapse;
    table-layout: fixed;
    @media (max-width: 1080px) {
      max-width: 900px;
      min-width: 900px;
    }
    @media (max-width: 980px) {
      max-width: 900px;
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
        padding: 1rem 0;
        /* text-transform: uppercase; */
        font-weight: normal !important;
        th {
          font-size: 0.8rem;
          text-align: start;
          font-size: 30px !important;
          /* border-bottom: 1px solid rgba(0, 0, 0, 0.1); */
          padding: 1rem 1rem;
          font-family: "Bebas Neue";
          font-weight: normal !important;
        }
      }
    }
    .btnWrapper {
      width: 120px;
      display: flex;
      align-items: center;
      height: 3rem;
      justify-content: center;
      margin: 0 auto;
      border: 1px solid rgba(0, 0, 0, 0.2);
      @media (max-width: 480px) {
        height: 2.5rem;
        span {
          font-size: 1rem;
        }
      }
      span {
        font-size: 1.2rem;
        font-weight: 600;
        color: #333;
        flex: 1;
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
        /* border-right: 1px solid rgba(0, 0, 0, 0.2);
        border-left: 1px solid rgba(0, 0, 0, 0.2); */
        /* border-top: 1px solid rgba(0, 0, 0, 0.2); */
        &:hover {
          background: rgb(0 0 0 / 13%);
          svg {
            color: var(--dark-1);
          }
        }
        svg {
          color: #333;
        }
      }
    }
    /* .imageWrapper {
      img {
        width: 90px;
        position: relative;
        object-fit: cover;
      }
    } */
    tbody {
      tr {
        transition: all 0.5s;
        z-index: 200;
        td {
          text-align: start;
          padding: 0.8rem 1rem !important;
          font-size: 16px !important;
          color: #000;
          font-family: "Lora";

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
