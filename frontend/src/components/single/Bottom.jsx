import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Bottom() {
  let [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const { menus, getallMenuisLoading } = useSelector((store) => store.menu);

  const maincourse = menus.filter((data) => data.category === category);

  return (
    <div>
      <div className="w-full flex items-start gap-16 justify-between topWrapper">
        <div className="flex flex-col gap-8 flex-1">
          <div className="family3 text-4xl uppercase text-light text-dark">
            Additional informations
          </div>
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
      <div className="flex py-24 w-full flex-col gap-12">
        <div className="family3 text-5xl uppercase text-light text-dark">
          Related products
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
          {maincourse?.slice(0,3).map((data) => {
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
