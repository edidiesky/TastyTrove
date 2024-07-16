import { menudata } from "@/data/menu";
import { Link } from "react-router-dom";

const Menulist = () => {
  // get houres collections
  // get drinks collections
  // get maincourse collections
  const maincourse = menudata.filter((data) => data.category === "Main Course");
  const houres = menudata.filter((data) => data.category === "Hors d’oeuvres");
  // get desserts collections
  const desserts = menudata.filter((data) => data.category === "desserts");
  const DRINK = menudata.filter((data) => data.category === "DRINK & COCKTAIL");
  // "DRINK & COCKTAIL"
  return (
    <div className="py-24 w-full flex flex-col gap-32">
      <div className="w-85 auto flex flex-col gap-20">
        <h3 className="text-3xl md:text-5xl family4 italic font-normal">
          Main Course
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
          {maincourse?.map((data) => {
            return (
              <Link
                to={`/restaurant/takeout/${data?.title}`}
                className="flex w-full flex-col gap-8"
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
                    <h4 className="text-4xl family3">{data?.title}</h4>
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

      {/* banner */}

      <div className="w-85 auto flex flex-col gap-20">
        <h3 className="text-3xl md:text-5xl family4 italic font-normal">
          Hors doeuvres
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
          {houres?.map((data) => {
            return (
              <Link
                to={`/restaurant/takeout/${data?.title}`}
                className="flex w-full flex-col gap-8"
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
                    <h4 className="text-4xl family3">{data?.title}</h4>
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

      {/* desssert */}
      <div className="w-85 auto flex flex-col gap-20">
        <h3 className="text-3xl md:text-5xl family4 italic font-normal">
          Dessert & Coffee
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
          {desserts?.map((data) => {
            return (
              <Link
                to={`/restaurant/takeout/${data?.title}`}
                className="flex w-full flex-col gap-8"
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
                    <h4 className="text-4xl family3">{data?.title}</h4>
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

      {/* DRINK & COCKTAIL */}
      <div className="w-85 auto flex flex-col gap-20">
        <h3 className="text-3xl md:text-5xl family4 italic font-normal">
          DRINK & COCKTAIL
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
          {DRINK?.map((data) => {
            return (
              <Link
                to={`/restaurant/takeout/${data?.title}`}
                className="flex w-full flex-col gap-8"
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
                    <h4 className="text-4xl family3">{data?.title}</h4>
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
    </div>
  );
};

export default Menulist;
