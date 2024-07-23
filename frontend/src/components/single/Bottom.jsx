import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Bottom() {
  let [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const { menus, menu, getallMenuisLoading } = useSelector(
    (store) => store.menu
  );

  const maincourse = menus.filter((data) => data.category === category);

  return (
    <div>
      <div className="w-full flex items-start gap-4 justify-between topWrapper">
        <div className="flex flex-col gap-8 flex-1">
          <h3 className="family3 relative after:w-[100px] after:left-0 after:-bottom-2 after:h-[2px] after:bg-[#eee] after:rounded-lg after:absolute text-5xl uppercase text-light text-dark">
            Additional informations
          </h3>
          <h4 className="family2 lg:pl-20 md:pr-8 leading-[1.5] text-xl text-light text-dark">
            Quisque velit nisi, pretium ut lacinia in, elementum id enim. Donec
            sollicitudin molestie malesuada. Proin eget tortor risus. Nulla
            porttitor accumsan tincidunt. Curabitur arcu erat, accumsan id
            imperdiet et, porttitor at sem. Donec sollicitudin molestie
            malesuada.
          </h4>
        </div>
        <div style={{ gap: ".1rem" }} className="flex flex-col flex-1">
          <div className="details flex" style={{ gap: ".1rem" }}>
            <div className="detailsInfoL text-2xl text-start family3">
              Calories
            </div>
            <div className="detailsInfoR text-xl family2">860</div>
          </div>
          <div className="details flex" style={{ gap: ".1rem" }}>
            <div className="detailsInfoL text-2xl text-start family3">
              Lactose free
            </div>
            <div className="detailsInfoR text-xl family2">860</div>
          </div>
          <div className="details flex" style={{ gap: ".1rem" }}>
            <div className="detailsInfoL text-2xl text-start family3">
              Gluten free
            </div>
            <div className="detailsInfoR text-xl family2">860</div>
          </div>
        </div>
      </div>
      <div className="flex py-16 w-full flex-col gap-12">
        <h3 className="family3 relative after:w-[100px] after:left-0 after:-bottom-2 after:h-[2px] after:bg-[#eee] after:rounded-lg after:absolute text-5xl uppercase text-light text-dark">
          About Seller/Chef
        </h3>
        <div className="flex md:flex-row flex-col md:items-center gap-4 md:gap-8">
          <img
            src={menu?.user?.image}
            alt=""
            className="w-40 h-40 object-cover rounded-full"
          />
          <div className="flex flex-col gap-2">
            <span className=" text-base pb-4 font-normal family1 uppercase">
              SELLER
            </span>
            <h3 className="text-4xl family3">{menu?.user?.name}</h3>
            <span className="text-sm lg:w-[350px] family4 font-normal">
              A Top Class Chef, renowned for his amazing cook I believe in 100%
              satisfaction, nothing less! Please free to get in touch, let's
              work
            </span>
            <div className="w-full flex items-center gap-4">
              <button className="btn btn-4 family1 mt-3 text-sm py-2 px-4">
                Check his reviews
              </button>
              <button className="btn-1 btn family1 mt-3 text-sm py-2 px-4">
                Message {menu?.user?.name}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex py-24 w-full flex-col gap-12">
        <div className="family3 text-5xl uppercase text-light text-dark">
          Related products
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
          {maincourse?.slice(0, 3).map((data) => {
            return (
              <Link
                to={`/restaurant/takeout/${data?.title}`}
                className="flex group w-full flex-col gap-8"
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
                    <h4 className="text-xl font-normal group-hover:text-[var(--primary)] family4">
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
}
