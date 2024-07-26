import React, { useEffect } from "react";
import Footer from "../common/Footer";
import { useDispatch } from "react-redux";
import { GetUserReservations } from "@/features/reservation/reservationReducer";
import Banner from "../common/Banner";
import { BiHome, BiPhone } from "react-icons/bi";
const HomeIndex = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(GetUserReservations());
  // }, []);
  return (
    <div className=" w-full flex flex-col">
      <Banner
        text={"Team"}
        subtext={"BEST TABLE IN TOWN"}
        image={
          "https://avada.website/restaurant/wp-content/uploads/sites/112/2019/12/page42x.jpg"
        }
      />
      <Main />
      <Footer />
    </div>
  );
};

const Main = () => {
  const teamData = [
    {
      image:
        "https://avada.website/restaurant/wp-content/uploads/sites/112/2019/12/info92x-800x1085.jpg",
      name: "Dominic Scott",
      position: "CEO / OWNER",
      accolades: [
        "World’s 50 best chefs list 2019",
        "2 Stars On The Michelin Guide 2017",
      ],
    },
    {
      image:
        "https://avada.website/restaurant/wp-content/uploads/sites/112/2019/12/info62x-600x814.jpg",
      name: "Nathan Walsh",
      position: "OWNER / CHEF",
      accolades: [
        "World’s 50 best chefs list 2019",
        "2 Stars On The Michelin Guide 2017",
      ],
    },
    {
      image:
        "https://avada.website/restaurant/wp-content/uploads/sites/112/2019/12/info52x-600x814.jpg",
      name: "Kylie Knox",
      position: "SOUS-CHEF",
      accolades: [
        "World’s 50 best chefs list 2019",
        "2 Stars On The Michelin Guide 2017",
      ],
    },
  ];
  return (
    <div className="w-full py-24">
      <div className="w-85 auto flex flex-col gap-24">
        {teamData?.map((team, index) => {
          return (
            <div
              key={index}
              className="w-85 auto grid items-center gap-24 grid-cols-custom_1"
            >
              <div className="w-full">
                <img src={team?.image} alt="" className="w-full object-cover" />
              </div>
              <div className="w-[450px] flex flex-col gap-12">
                <div className="flex family1 flex-col gap-8">
                  <span className="text-lg md:text-xl font-normal">
                    {team.position}
                  </span>
                  <h3
                    className="text-6xl
                  relative after:w-[100px] after:left-0 after:-bottom-6 after:h-[2px] after:bg-[#eee] 
          after:rounded-lg after:absolute mb-8
                  md:text-7xl family3 font-normal"
                  >
                    {team.name}
                  </h3>
                  <p className="text-lg leading-[1.6] md:text-xl family4">
                    Tristique tempus condimentum diam donec. Condimentum
                    ullamcorper sit elementum hendrerit mi nulla in consequat,
                    ut. Metus, nullam scelerisque netus viverra dui pretium
                    pulvinar. Commodo morbi amet.
                  </p>
                  <p className="text-lg leading-[1.6] md:text-xl family4">
                    Tristique tempus condimentum diam donec. Condimentum
                    ullamcorper sit elementum hendrerit mi nulla in consequat,
                    ut. Metus, nullam scelerisque netus viverra dui pretium
                    pulvinar. Commodo morbi amet.
                  </p>
                </div>
                <div className="flex family1 flex-col gap-8">
                  <h3
                    className="text-2xl md:text-3xl italic
                  relative after:w-[100px] after:left-0 after:-bottom-6 mb-8 after:h-[2px] after:bg-[#eee] 
                      after:rounded-lg after:absolute
                  family4 font-normal"
                  >
                    {team.name}'s Accolades
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-85 auto grid items-start gap-12 grid-cols-custom_2"></div>
    </div>
  );
};

export default HomeIndex;
