import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence } from "framer-motion";
import Button from "../common/Button";
import ChatCard from "../chat/ChatCard";
import Reviews from "./Reviews";
import { onLoginModal } from "@/features/modals/modalSlice";
import {
  Createconversation,
  GetUsersMessageConversation,
} from "@/features/conversation/conversationReducer";
import { clearconversation } from "@/features/conversation/conversationSlice";

export default function Bottom() {
  let [searchParams, setSearchParams] = useSearchParams();
const [chat, setChat] = React.useState({ messages: [] });
  const { currentUser } = useSelector((store) => store.auth);

  const category = searchParams.get("category");
  const { menus, menu, getallMenuisLoading } = useSelector(
    (store) => store.menu
  );
  const dispatch = useDispatch();

  const maincourse = menus.filter(
    (data) =>
      data.category === (category === "DRINK " ? "DRINK & COCKTAIL" : category)
  );
  // console.log(maincourse, category);
  const [active, setActive] = useState(false);
  const hanldeChatWithSeller = () => {
    if (currentUser) {
      setActive(true);
    } else {
      dispatch(onLoginModal());
    }
  };
  const { conversationDetails } = useSelector((store) => store.conversation);
  useEffect(() => {
    // console.log("active:", active);
    // console.log("conversationDetails:", conversationDetails);
    if (conversationDetails === null) {
      setChat([]);
      dispatch(clearconversation());
    }
    if (active && !conversationDetails) {
      // console.log("useEffect triggered");
      dispatch(Createconversation(menu?.user?.id));
    }
  }, [active, conversationDetails, dispatch, menu?.user?.id]);

  return (
    <>
      <AnimatePresence>
        {active && (
          <ChatCard
            chat={chat}
            setChat={setChat}
            active={active}
            setActive={setActive}
          />
        )}
      </AnimatePresence>
      <div className="flex flex-col gap-20 pb-20">
        <div className="w-full flex items-start gap-4 justify-between topWrapper">
          <div className="flex flex-col gap-8 flex-1">
            <h3
              className="family3 relative after:w-[100px] after:left-0 after:-bottom-2 after:h-[2px] after:bg-[#eee] 
          after:rounded-lg after:absolute text-5xl uppercase text-light text-dark"
            >
              Additional informations
            </h3>
            <h4 className="family2 lg:pl-20 md:pr-8 leading-[1.5] text-xl text-light text-dark">
              Quisque velit nisi, pretium ut lacinia in, elementum id enim.
              Donec sollicitudin molestie malesuada. Proin eget tortor risus.
              Nulla porttitor accumsan tincidunt. Curabitur arcu erat, accumsan
              id imperdiet et, porttitor at sem. Donec sollicitudin molestie
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
        <div className="flex w-full flex-col gap-12">
          <h3 className="family3 relative after:w-[100px] after:left-0 after:-bottom-2 after:h-[2px] after:bg-[#eee] after:rounded-lg after:absolute text-5xl uppercase text-light text-dark">
            About Seller/Chef
          </h3>
          <div className="flex sm:flex-row flex-col md:items-center gap-4 md:gap-8">
            {menu?.user?.image ? (
              <img
                src={menu?.user?.image}
                alt=""
                className="w-32 h-32 object-cover rounded-full"
              />
            ) : (
              <div className="w-28 md:w-32 h-28 md:h-32 flex items-center rounded-full bg-[#000] justify-center text-white text-4xl font-bold family1">
                {menu?.user?.name?.split("")[0]}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <span className=" text-base md:pb-4 font-normal family1 uppercase">
                SELLER
              </span>
              <h3 className="text-4xl family3">{menu?.user?.name}</h3>
              <span className="text-sm max-w-[300px] family4 font-normal">
                A Top Class Chef, renowned for his amazing cook I believe in
                100% satisfaction, nothing less! Please free to get in touch,
                let's work
              </span>
              <div className="w-full mt-3 flex items-center gap-4">
                <button
                  onClick={hanldeChatWithSeller}
                  className="h-[55px] w-[170px] text-sm"
                >
                  <Button
                    text={`Chat with seller`}
                    bgColor={"#000"}
                    type={"dark"}
                  ></Button>
                </button>
              </div>
            </div>
          </div>
        </div>
        <Reviews />
        <div className="flex w-full flex-col gap-12">
          <div className="family3 text-5xl uppercase text-light text-dark">
            Related products
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
            {maincourse?.slice(0, 3).map((data) => {
              return (
                <Link
                  to={`/restaurant/takeout/${data?.id}?category=${data?.category}`}
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
                    <div className="flex gap-8 items-center justify-between w-full">
                      <h4 className="text-4xl group-hover:text-[var(--primary)] family3">
                        {data?.title}
                      </h4>
                      <h4 className="text-xl font-normal group-hover:text-[var(--primary)] family4">
                        ${data?.price}
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
    </>
  );
}
