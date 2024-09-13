import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Country, State, City } from "country-state-city";
import { useSelector } from "react-redux";
import Card from "./Card";
import { Link } from "react-router-dom";
import Button from "../common/Button";
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
            <Link to={"/restaurant/menu"} className="h-[55px] w-[250px] text-lg">
              <Button type='dark' bgColor={'var(--primary)'} text={'Browse Our Menu'}></Button>
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

const ShippingInfo = () => {
  // state country and city input
  const [countryinput, setCountryInput] = React.useState("");
  const [stateinput, setStateInput] = React.useState("");
  const [cityinput, setCityInput] = React.useState("");
  const [zipcode, setZipCode] = React.useState("");

  // country state and city data
  const [country, setCountry] = React.useState(null);
  const [state, setState] = React.useState(null);
  const [city, setCity] = React.useState(null);

  // statelist, counytylost and cityData
  const [newcountrylist, setNewCountryList] = React.useState([]);
  const [statelist, setStateList] = React.useState([]);
  const [citylist, setCityList] = React.useState([]);

  // country modal, statemodal and city modal
  const [countrymodal, setCountryModal] = React.useState(false);
  const [statemodal, setStateModal] = React.useState(false);
  const [citymodal, setCityModal] = React.useState(false);

  // country, state and city  imported Data
  const countryList = Country.getAllCountries();
  const stateList = State.getAllStates();
  const cityList = City.getAllCities();

  // filtering function
  const handleCountryDataFiltering = () => {
    // filter the country
    const filteredCountriedList = countryList?.filter((countries) =>
      countries?.name?.toLowerCase()?.includes(countryinput?.toLowerCase())
    );
    // filter the states
    let filteredStateList = stateList?.filter(
      (state) => state?.countryCode === country?.isoCode
    );
    // ?.filter((statedata) =>
    //   statedata?.name?.toLowerCase()?.includes(stateinput?.toLowerCase())
    // );

    const newfilteredStateList = filteredStateList?.filter((statedata) =>
      statedata?.name?.toLowerCase()?.includes(stateinput?.toLowerCase())
    );

    // filter the states
    const filteredCityList = cityList?.filter(
      (stateList) =>
        stateList?.stateCode === state?.isoCode &&
        stateList?.countryCode === state?.countryCode
    );

    // console.log(newfilteredStateList);
    setCityList(filteredCityList);
    setStateList(
      newfilteredStateList ? newfilteredStateList : filteredStateList
    );
    setNewCountryList(filteredCountriedList);
  };

  useEffect(() => {
    if (countryinput || country || state) {
      handleCountryDataFiltering();
    }
  }, [
    countryinput,
    // statelist,
    setState,
    setNewCountryList,
    setStateList,
    country,
    setCityList,
    state,
  ]);
  // console.log(citylist);
  // console.log(City.getAllCities()[0]);
  console.log(state);
  // console.log(newcountrylist);
  // console.log(State.getAllStates()[0]);
  return (
    <div
      onClick={() => setCountryModal(false)}
      className="w-full md:w-[80%] flex flex-col gap-4"
    >
      <h2 className="text-3xl md:text-4xl text-dark family3">
        Shipping information
      </h2>

      <div
        onClick={() => {
          setCityModal(false);
          setStateModal(false);
          setCountryModal(false);
        }}
        className="w-full py-4 flex flex-col gap-4"
      >
        <div onClick={() => setCountryModal(true)} className="w-full relative">
          <input
            value={countryinput}
            name="countryinput"
            onChange={(e) => {
              // handleCountryData(e);
              setCountryInput(e.target.value);
              setCountryModal(true);
            }}
            placeholder="Search for your country"
            className="input bg-[#fff] w-full text-base"
          />

          {countrymodal && (
            <div className="absolute top-[100%] z-[500] w-full overflow-hidden border flex flex-col bg-[var(--light-grey)]">
              <div className="flex max-h-[250px] bg-[var(--light-grey)] overflow-auto w-full  flex-col ">
                {newcountrylist?.map((data, index) => {
                  return (
                    <span
                      onClick={() => {
                        setCountry(data);
                        setCountryInput(data?.name);
                        setCountryModal(false);
                      }}
                      key={index}
                      className="text-base cursor-pointer font-normal py-3 hover:text-white px-4 hover:bg-[#0073aa]"
                    >
                      {data?.name}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="w-full grid sm:grid-cols-2 gap-4">
          {/* state */}
          <div
            onClick={() => setCountryModal(true)}
            className="w-full relative"
          >
            <input
              value={stateinput}
              name="stateinput"
              onChange={(e) => {
                // handleCountryData(e);
                setStateInput(e.target.value);
                setStateModal(true);
              }}
              placeholder="Search for your State"
              className="input bg-[#fff] w-full text-base"
            />

            {statemodal && (
              <div className="absolute top-[100%] z-[400] w-full overflow-hidden border flex flex-col bg-[var(--light-grey)]">
                <div className="flex max-h-[250px] bg-[var(--light-grey)] overflow-auto w-full  flex-col ">
                  {statelist?.map((data, index) => {
                    return (
                      <span
                        onClick={() => {
                          setState(data);
                          setStateInput(data?.name);
                          setStateModal(false);
                        }}
                        key={index}
                        className="text-base cursor-pointer font-normal py-3 hover:text-white px-4 hover:bg-[#0073aa]"
                      >
                        {data?.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          {/* city */}
          <div onClick={() => setCityModal(true)} className="w-full relative">
            <input
              value={cityinput}
              name="cityinput"
              onChange={(e) => {
                setCityInput(e.target.value);
                setCityModal(true);
              }}
              placeholder="Search for your City"
              className="input bg-[#fff] w-full text-base"
            />

            {citymodal && (
              <div className="absolute top-[100%] z-[400] w-full overflow-hidden border flex flex-col bg-[var(--light-grey)]">
                <div className="flex max-h-[250px] bg-[var(--light-grey)] overflow-auto w-full  flex-col ">
                  {citylist?.map((data, index) => {
                    return (
                      <span
                        onClick={() => {
                          setCity(data);
                          setCityInput(data?.name);
                          setCityModal(false);
                        }}
                        key={index}
                        className="text-base cursor-pointer font-normal py-3 hover:text-white px-4 hover:bg-[#0073aa]"
                      >
                        {data?.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full grid sm:grid-cols-2 gap-4">
          <input
            value={zipcode}
            name="zipcode"
            onChange={(e) => {
              setZipCode(e.target.value);
            }}
            placeholder="Enter your zipcode"
            className="input bg-[#fff] w-full text-base"
          />
          <div className="w-full flex items-center">
            <button
              onClick={() => {
                // dispatch(onSellerModal());
              }}
              className="h-[55px] w-[200px] flex overflow-hidden text-base"
            >
              <Button
                bgColor={"var(--primary)"}
                text={"Update"}
                type={"dark"}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

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
