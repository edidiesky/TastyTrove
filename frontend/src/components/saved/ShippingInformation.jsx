import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import Button from "../common/Button";

const ShippingInfo = () => {
  // country, state and city  imported Data
  const countryList = Country.getAllCountries();
  const stateList = State.getAllStates();
  const cityList = City.getAllCities();

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
  const [newcountrylist, setNewCountryList] = React.useState([...countryList]);
  const [statelist, setStateList] = React.useState([]);
  const [citylist, setCityList] = React.useState([]);

  // country modal, statemodal and city modal
  const [countrymodal, setCountryModal] = React.useState(false);
  const [statemodal, setStateModal] = React.useState(false);
  const [citymodal, setCityModal] = React.useState(false);

  // filtering function
  const handleCountryDataFiltering = () => {
    // filter the country
    const filteredCountriedList = newcountrylist?.filter((countries) =>
      countries?.name?.toLowerCase()?.includes(countryinput?.toLowerCase())
    );
    // filter the states
    let filteredStateList = stateList?.filter(
      (state) => state?.countryCode === country?.isoCode
    );

    // console.log(filteredStateList);

    const newfilteredStateList = filteredStateList?.filter((statedata) =>
      statedata?.name?.toLowerCase()?.includes(stateinput?.toLowerCase())
    );

    // filter the city of the state selected
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
  //   console.log(countrymodal);

  useEffect(() => {
    if (countryinput || country || state || stateinput) {
      handleCountryDataFiltering();
    }
    if (countryinput === "") {
      setNewCountryList([...countryList]);
    }
  }, [
    countryinput,
    stateinput,
    // statelist,
    setState,
    setNewCountryList,
    setStateList,
    country,
    setCityList,
    state,
    // statelist,
  ]);
  // console.log(citylist);
  // console.log(City.getAllCities()[0]);
    console.log(state);
  // console.log(newcountrylist);
  // console.log(State.getAllStates()[0]);
  return (
    <div
      //   onClick={() => setCountryModal(false)}
      className="w-full md:w-[80%] flex flex-col gap-4"
    >
      <h2 className="text-3xl md:text-4xl text-dark family3">
        Shipping information
      </h2>

      <div
        // onClick={() => {
        //   setCityModal(false);
        //   setStateModal(false);
        //   setCountryModal(false);
        // }}
        className="w-full py-4 flex flex-col gap-4"
      >
        <div className="w-full relative">
          <div
            onClick={() => setCountryModal(!countrymodal)}
            className="input z-20 py-2 flex items-center cursor-pointer w-full text-base"
          >
            {countryinput ? country?.name : "Select your country first"}
          </div>
          {countrymodal && (
            <div className="absolute py-2 gap-4 top-[100%] z-[500] w-full overflow-hidden border flex flex-col bg-[var(--light-grey)]">
              <input
                value={countryinput}
                name="countryinput"
                onChange={(e) => {
                  // handleCountryData(e);
                  setCountryInput(e.target.value);
                }}
                placeholder="Search for your country"
                className="h-[50px] bg-[#fff] w-[90%] mx-auto text-base"
              />
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
          <div className="w-full relative">
            <div
              onClick={() => setStateModal(!statemodal)}
              className="input flex cursor-pointer items-center py-2 w-full"
            >
              {stateinput ? state?.name : "Select your City"}
            </div>
            {statemodal && (
              <div className="absolute top-[100%] py-2 gap-4 z-[400] w-full overflow-hidden border flex flex-col bg-[var(--light-grey)]">
                <input
                  value={stateinput}
                  name="stateinput"
                  onChange={(e) => {
                    // handleCountryData(e);
                    setStateInput(e.target.value);
                    setStateModal(true);
                  }}
                  placeholder="Search for your State"
                  className="h-[50px] bg-[#fff] w-[90%] mx-auto text-base"
                />
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
          <div className="w-full relative">
            <div
              onClick={() => setCityModal(!citymodal)}
              className="input flex cursor-pointer items-center py-2 w-full"
            >
              {stateinput ? state?.name : "Select your state"}
            </div>
            {citymodal && (
              <div className="absolute top-[100%] py-2 gap-4 z-[400] w-full overflow-hidden border flex flex-col bg-[var(--light-grey)]">
                <input
                  value={cityinput}
                  name="cityinput"
                  onChange={(e) => {
                    setCityInput(e.target.value);
                    setCityModal(true);
                  }}
                  placeholder="Search for your City"
                  className="h-[50px] bg-[#fff] w-[90%] mx-auto text-base"
                />

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

export default ShippingInfo;