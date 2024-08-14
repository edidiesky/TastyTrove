const DashboardSidebar = () => {
  return (
    <div className={`w-full flex column sticky top-0 h-screen gap-2`}>
      <div className="w-full h-full py-4 justify-between flex items-center flex-col gap-4">
        {/* top content */}
        <div className=" w-[90%] mx-auto relative flex gap-4 items-center flex-col justify-between">
          <Link
            to={"/"}
            className="w-full flex items-center gap-1 justify-start"
          >
            <img
              loading="lazy"
              src="https://www.hopper.com/assets/treasure-D-5S8iOp.svg"
              className="w-14 h-14 rounded-full object-cover"
            />
          </Link>
        </div>
        {/* center content */}
        {/* bottom content */}
      </div>
    </div>
  );
};

const DashboardLayout = () => {
  const { currentUser } = useSelector((store) => store.auth);
  const pathname = true;
  return (
    <div className="w-full">
      {/* sidebar section */}
      {/* main outlet */}
      {Navlinks.map((items, index) => {
        return <NavItems key={index} />;
      })}
    </div>
  );
};
import { Link, NavLink } from "react-router-dom";
const NavItems = ({ Items }) => {
  return (
    <div className="w-full">
      <div className="w-[100%]  family5 font-normal text-sm mx-auto">
        <NavLink
          // activeClassName="active"
          end
          className={`group tab
                      relative
                      text-base w-[90%] mx-auto`}
          to={`/dashboard${Items.path}`}
        >
          <div className="flex w-full  md:justify-center items-center">
            <span className="w-12 h-12 text-base rounded-xl flex items-center text-blue justify-center">
              {" "}
              {Items.icon}
            </span>
          </div>
          <div
            className="absolute text-sm group-hover:opacity-1
             opacity-0 top-[55%] group-hover:top-[25%] block px-4 py-2 bg-[#000]
            text-[#fff] rounded-[40px] left-[140%]"
          >
            {Items?.title}
          </div>
          ;
        </NavLink>
      </div>
    </div>
  );
};
<div
  className="absolute text-sm group-hover:opacity-1
   opacity-0 top-[55%] group-hover:top-[25%] block px-4 py-2 bg-[#000]
    text-[#fff] rounded-[40px] left-[140%]"
>
  {Items?.title}
</div>;
const Navlinks = [
  {
    title: "Dashboard",
    path: "",
    icon: <LayoutDashboard fontSize={"20px"} />,
  },
  {
    icon: <BiFoodMenu fontSize={"20px"} />,
    title: "Menu",
    path: "/menu",
  },
  {
    icon: <FaMoneyBill fontSize={"20px"} />,
    title: "Transactions",
    path: "/orders",
  },
  {
    icon: <MdRateReview fontSize={"20px"} />,
    title: "Reviews",
    path: "/review",
  },
  {
    icon: <BiMessage fontSize={"20px"} />,
    title: "Messages",
    path: "/message",
  },
  {
    icon: <FaRegUser fontSize={"18px"} />,
    title: "Clients",
    path: "/customers",
  },
];
<Routes>
  <Route
    path="/restaurant/takeout/:food"
    element={
      <Suspense fallback={<></>}>
        <SingleWrapper />
      </Suspense>
    }
  />
  <Route
    path="/restaurant/cart"
    element={
      <Suspense fallback={<></>}>
        <Cart />
      </Suspense>
    }
  />
</Routes>;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

const PaymentSuccess = () => {
  const { id } = useParams();
  const [flutterpaymentsuccess, setFlutterPaymentSuccess] = useState(false);
  const [updateflutterpaymentloading, setUpdateFlutterPaymentLoading] =
    useState(false);
  const UpdatePaymentToSuccess = async () => {
    try {
      // set the success state and loading state to false and true respectively
      setFlutterPaymentSuccess(false);
      setUpdateFlutterPaymentLoading(true);
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_BASE_URLS}/payment/history/success/${id}`,
        null
      );
      // set the loading state and success state to false and true respectively
      setUpdateFlutterPaymentLoading(false);
      setFlutterPaymentSuccess(true);
      return data;
    } catch (error) {
      setUpdateFlutterPaymentLoading(false);
      setFlutterPaymentSuccess(false);
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };
  useEffect(() => {
    UpdatePaymentToSuccess();
  }, []);
  useEffect(() => {
    if (flutterpaymentsuccess) {
      const interval = setTimeout(() => {
        setFlutterPaymentSuccess(false);
      }, 100);
      return () => clearTimeout(interval);
    }
  }, [flutterpaymentsuccess]);
  if (updateflutterpaymentloading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h2 className="text-4xl text-center font-bold">Payment Loading ....</h2>
      </div>
    );
  }
  return (
    <>
      {flutterpaymentsuccess && <Confettis />}
      <div className="w-full h-screen flex items-center justify-center">
        <h2 className="text-5xl text-center font-bold">
          Payment Succesfull
          <span className="text-lg pt-4 block text-[#777] font-normal">
            Thank you for the payment!!!!
          </span>
        </h2>
      </div>
    </>
  );
};

const Confettis = () => {
  const { width, height } = useWindowSize();
  // console.log(height);
  return <Confetti style={{ zIndex: "3000000" }} width={width} height={2000} />;
};

// https://app.flutterwave.com/dashboard/home
export default PaymentSuccess;

import { Link } from "react-router-dom";
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [menu, setMenu] = useState([]);
  const GetAllMenu = async () => {
    try {
      // set the loading state to true
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URLS}/menu`
      );
      setLoading(false);
      setMenu(data);
    } catch (error) {
      setLoading(false);
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };
  useEffect(() => {
    GetAllMenu();
  }, []);
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h2 className="text-4xl text-center font-bold">
          Getting all Menu ....
        </h2>
      </div>
    );
  }
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <h2 className="text-5xl text-center font-bold">Menu</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
          {menu?.map((data) => {
            return (
              <Link
                to={`/restaurant/takeout/${data?.id}`}
                className="flex w-full group flex-col gap-8"
              >
                <div className="w-full h-52">
                  <img
                    src={data?.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex w-full flex-col gap-4">
                  <div className="flex items-center justify-between w-full">
                    <h4 className="text-4xl group-hover:text-[var(--primary)] family3">
                      {data?.title}
                    </h4>
                    <h4 className="text-xl font-normal family4">
                      ${data?.price}
                    </h4>
                  </div>
                  <p className="text-lg leading-[1.5] family4">
                    {data?.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiMinus, BiPlus } from "react-icons/bi";
import axios from "axios";
import toast from "react-hot-toast";
const Single = () => {
  const [loading, setLoading] = useState(false);
  const [cartsuccess, setCartSuccess] = useState(false);
  const [cartloading, setCartLoading] = useState(false);
  const [menu, setMenu] = useState(null);
  const { id } = useParams();
  const [count, setCount] = useState(1);
  // get a single menu
  const GetSingleMenu = async () => {
    try {
      // set the loading state to true
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URLS}/menu/${id}`
      );
      setLoading(false);
      setMenu(data);
    } catch (error) {
      setLoading(false);
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };
  useEffect(() => {
    // get a single menu and clear the cart success state to false if true
    GetSingleMenu();
    setCartSuccess(false);
  }, []);
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h2 className="text-4xl text-center font-bold">
          Getting the Menu ....
        </h2>
      </div>
    );
  }
  // initialize the naviaget router
  const navigate = useNavigate();
  // get the total price
  const totalPrice = menu?.price * count;
  const menudata = {
    totalCount: count,
    totalPrice: totalPrice,
  };

  const handleReservationBooking = async () => {
    try {
      // set the cart creation loading state to false
      setCartLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URLS}/cart/${menu?.id}`,
        menudata
      );
      // set the cart creation loading state to false
      setCartLoading(false);
      // set cart success to true so it will navigate after 3s
      setCartSuccess(true);
      setMenu(data);
    } catch (error) {
      setCartLoading(false);
      setCartSuccess(false);
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  useEffect(() => {
    // dispatch(clearCartAlert());
    if (cartsuccess) {
      const interval = setTimeout(() => {
        navigate(`/restaurant/cart`);
      }, 4000);
      return () => clearTimeout(interval);
    }
  }, [cartsuccess]);
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-[90%] mx-auto">
          <div className="w-full items-start grid md:grid-cols-2">
            <div className="w-full h-full">
              <img
                loading="lazy"
                src={menu?.image}
                className="w-full z-10 h-full object-cover"
              />
              <div className="absolute z-20 bottom-10 w-full flex items-center px-12">
                <p className="text-3xl text-white family4">${menu?.price}</p>
              </div>
            </div>
            <div className="py-24 bg-[#000]">
              <div className="flex w-[80%] md:w-[65%] mx-auto flex-col gap-8 auto">
                <div className="family3 text-5xl md:text-6xl text-white">
                  {menu?.title}
                </div>
                <h4 className="text-xl leading-[1.4] family2 text-white">
                  {menu?.description}
                </h4>
                <p className="text-2xl text-white family4">${menu?.price}</p>
                <div className="w-full gap-8 grid md:grid-cols-2 lg:grid-cols-2 text-start">
                  <button
                    onClick={handleReservationBooking}
                    className="h-[55px] w-[200px] text-sm"
                  >
                    ADD TO CART
                  </button>

                  <span className="grid h-[50px] md:h-full  grid-cols-3 border border-[rgba(255,255,255,.6)] items-center justify-between">
                    <button
                      onClick={() => setCount(count - 1)}
                      disabled={count <= 1}
                      className=" h-full w-full flex items-center justify-center border-r
                   border-[rgba(255,255,255,.6)] text-base text-white cursor-pointer"
                    >
                      <BiMinus />
                    </button>
                    <span
                      className=" h-full family1 w-full flex items-center justify-center 
                border-r border-[rgba(255,255,255,.6)] text-base lg:text-xl text-white cursor-pointer"
                    >
                      {count}
                    </span>
                    <button
                      onClick={() => setCount(count + 1)}
                      disabled={count === menu?.availabilityCount}
                      className=" h-full w-full text-base text-white cursor-pointer flex items-center justify-center "
                    >
                      <BiPlus />
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// import HomeComponents from "../components/home";
// const Home = () => {
//   return (
//     <div className={`w-full`}>
//       <HomeComponents />
//     </div>
//   );
// };

// import CartComponents from "../components/home";
const Cart = () => {
  const [cartloading, setCartLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const GetAllCartItem = async () => {
    try {
      // set the loading state to true
      setCartLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URLS}/cart`
      );
      setCartLoading(false);
      setCart(data);
    } catch (error) {
      setCartLoading(false);
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };
  useEffect(() => {
    GetAllCartItem();
  }, []);

  if (cartloading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h2 className="text-4xl text-center font-bold">
          Getting your Cart Items ....
        </h2>
      </div>
    );
  }
  return (
    <div className={`w-full`}>
      {cart?.length === 0 ? (
        // ""
        // <Message alertText="No items in your cart" alertType={"danger"} />
        <div className="w-full flex  items-center justify-center flex-col gap-2">
          <h2 className="text-4xl md:text-5xl text-dark family3">
            Cart is empty
          </h2>
          <Link to={""} className="p-3 border text-lg">
            Browse Our Menu
          </Link>
        </div>
      ) : (
        <>
          <table className="border-collapse table-fixed">
            <thead>
              <tr className="p-4">
                <th className="p-4 text-base text-start font-normal">
                  Product
                </th>
                <th className="p-4 text-base text-start font-normal">Price</th>
                <th className="p-4 text-base text-start font-normal">
                  Quantity
                </th>
                <th className="p-4 text-base text-start font-normal">
                  Subtotal
                </th>
                <th className="p-4 text-base text-start font-normal"></th>
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
    </div>
  );
};

const Card = ({ cart }) => {
  const [cartcount, setCartCount] = useState(0);
  useEffect(() => {
    setCartCount(cart?.totalCount);
  }, [cart, setCartCount]);
  return (
    <tr key={cart?.id}>
      <td className="py-3 px-4 text-base border-b">
        <div className="flex items-center gap-4">
          <div className="">
            <img
              src={cart?.menu?.image}
              className="w-[100px] obejct-cover"
              alt="images"
            />
          </div>
          {cart?.menu?.title}
        </div>
      </td>
      {/* <td className="text-lg">{cart?.price}</td> */}
      <td className="py-3 px-4 text-base border-b">${cart?.menu?.price}</td>
      <td className="py-3 px-4 text-base border-b">
        <div className="w-[120px] h-[45px] flex items-center justify-center border">
          <button
            className="h-full flex items-center justify-center border-r"
            disabled={cartcount >= cart?.menu?.availabilityCount}
            onClick={() => setCartCount(cartcount + 1)}
          >
            <BiPlus fontSize={"14px"} />
          </button>
          <span className="border-l text-lg h-full font-bold border-r">
            {cartcount}
          </span>
          <button
            className="h-full flex items-center justify-center border-l"
            disabled={cartcount === 1}
            onClick={() => setCartCount(cartcount - 1)}
          >
            <BiMinus fontSize={"14px"} />
          </button>
        </div>
      </td>
      <td className="py-3 px-4 text-base border-b">
        ${cart?.menu?.price * cartcount}
      </td>
      <td className="py-3 px-4 text-base border-b">
        <div className="w-12 h-12 rounded-full hover:bg-[#eee] flex items-center justify-center cursor-pointer">
          <RxCross1 />
        </div>
      </td>
    </tr>
  );
};
import Image from "./Image";
import { menudata } from "../data";
const HomeIndex = () => {
  return (
    <div className=" w-full flex flex-col">
      <Banner
        image={
          "https://avada.website/restaurant/wp-content/uploads/sites/112/2019/12/page22x.jpg"
        }
        subtext={"Best Table in Town"}
        text={"Our Takeout Menu"}
      />
      <Menulist />
    </div>
  );
};
const Menulist = () => {
  const maincourse = menudata?.filter(
    (data) => data.category === "Main Course"
  );
  const houres = menudata?.filter((data) => data.category === "Hors d’oeuvres");
  // get desserts collections
  const desserts = menudata?.filter((data) => data.category === "desserts");
  const DRINK = menudata?.filter(
    (data) => data.category === "DRINK & COCKTAIL"
  );
  const menuList = [
    {
      title: " Main Course",
      menudata: maincourse,
    },
    {
      title: "Hors d’oeuvres",
      menudata: houres,
    },
    {
      title: "desserts",
      menudata: desserts,
    },
    {
      title: "DRINK & COCKTAIL",
      menudata: DRINK,
    },
  ];
  return (
    <div className="w-full py-24">
      <div className="w-[90%] max-w-[1100px] mx-auto flex flex-col gap-20">
        {menuList?.map((menu, index) => {
          return (
            <div className="w-full flex flex-col gap-16">
              {index !== 0 && (
                <div className="w-full min-h-[35rem] relative">
                  <div className="absolute w-full h-full">
                    <Image
                      src={menu?.menudata[0]?.image}
                      alt=""
                      className="absolute z-10 w-full h-full top-0 left-0 object-cover"
                    />
                  </div>
                  <div
                    style={{
                      background: "rgba(0,0,0,.5)",
                    }}
                    className="w-full absolute h-full top-0 z-20"
                  ></div>
                  <div className="absolute flex items-center z-40 justify-center w-full bottom-10">
                    <h4 className="text-center text-xl md:text-2xl family4 text-white">
                      {menu?.menudata[0]?.title} – ₦{menu?.menudata[2]?.price}
                    </h4>
                  </div>
                </div>
              )}
              <div className="w-[90%] max-w-[1100px] flex flex-col gap-20 mx-auto">
                <h3 className="text-3xl md:text-5xl family4 italic font-normal">
                  {menu?.title}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
                  {menu?.menudata?.map((data) => {
                    return (
                      <Link
                        to={`/restaurant/takeout/${data?.id}?category=${data?.category}`}
                        className="flex w-full group flex-col gap-8"
                      >
                        <div className="w-full h-52">
                          <Image
                            src={data?.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex w-full flex-col gap-4">
                          <div className="flex items-center justify-between w-full">
                            <h4 className="text-4xl group-hover:text-[var(--primary)] family3">
                              {data?.title}
                            </h4>
                            <h4 className="text-xl font-normal family4">
                              ₦{data?.price}
                            </h4>
                          </div>
                          <p className="text-lg leading-[1.5] family4">
                            {data?.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
const Banner = () => {
  return (
    <div className="w-full h-[30rem] relative">
      <Image
        alt=""
        loading="lazy"
        src={
          "	https://avada.website/restaurant/wp-content/uploads/sites/112/2020/04/slider72x-scaled.jpg"
        }
        className="imagewrapper"
      />
      <div className="w- mx-auto flex items-center justify-center">
        <h4
          className="text-lg text-light uppercase text-white family1"
          style={{ letterSpacing: "1.5px", fontWeight: "normal" }}
        >
          Best Table in Town
        </h4>
        <h1 className="family3 text-7xl text-light uppercase text-white">
          Our Takeout Menu
        </h1>
      </div>
      <div className="absolute gradient z-[20] h-full w-full"></div>
    </div>
  );
};

// export default HomeIndex
