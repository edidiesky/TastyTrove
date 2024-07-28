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
