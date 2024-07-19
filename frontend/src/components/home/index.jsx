import React, { useEffect } from "react";
import Navbar from "@/components/common/navbar";
import About from "./About";
import Critics from "./Critics";
import Experience from "./Experience";
import News from "./News";
import SingleTakout from "./SingleTakout";
import TakeoutList from "./TakeoutList";
import TakeoutMenu from "./TakeoutMenu";
import Hero from "./Hero";
import Footer from "../common/Footer";
import { useDispatch } from "react-redux";
import { getAllMenu } from "@/features/menu/menuReducer";

export default function HomeIndex() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMenu());
  }, []);
  return (
    <div>
      <Navbar/>
      <Hero />
      <About />
      <SingleTakout />
      <TakeoutList />
      <Experience />
      <Critics />
      <News />
      <TakeoutMenu />

      <Footer />
      
    </div>
  );
}
