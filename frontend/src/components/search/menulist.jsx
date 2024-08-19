// import { menudata } from "@/data/menu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Image from "../common/Image";

const Menulist = () => {
  // get houres collections
  // get drinks collections
  // get maincourse collections
  const { menus } = useSelector((store) => store.menu);
  const maincourse = menus?.filter((data) => data.category === "Main Course");
  const houres = menus?.filter((data) => data.category === "Hors d’oeuvres");
  // get desserts collections
  const desserts = menus?.filter((data) => data.category === "desserts");
  const DRINK = menus?.filter((data) => data.category === "DRINK & COCKTAIL");
  // console.log(maincourse)
  // "DRINK & COCKTAIL"

  const menuList = [
    {
      title: "Main Course",
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
  // console.log(menuList);
  return (
 
    <div className="w-full py-24">
      <div className="w-full flex flex-col gap-20">
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
                          <div className="flex items-center gap-8 justify-between w-full">
                            <h4 className="text-4xl group-hover:text-[var(--primary)] family3">
                              {data?.title}
                            </h4>
                            <h4 className="text-xl font-normal family4">
                              ₦{data?.price}
                            </h4>
                          </div>
                          <p className="text-lg leading-[1.5] family4">
                            {data?.description?.replace(/<\/?[^>]+(>|$)/g, "")}
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

export default Menulist;
