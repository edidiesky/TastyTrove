import LoginModal from "@/components/modals/Login";
import { Outlet } from "react-router-dom";
import RegisterModal from "@/components/modals/Register";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import Copyright from "@/components/common/Copyright";
import Navbar from "@/components/common/navbar";
import SmoothScroll from "@/constants/utils/SmoothScroll";
const Layout = () => {
  const { loginmodal, registermodal } = useSelector((store) => store.modal);
  return (
    <>
      <AnimatePresence mode="wait">
        {loginmodal && (
          <LoginModal registermodal={registermodal} modal={loginmodal} />
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {registermodal && <RegisterModal modal={registermodal} />}
      </AnimatePresence>
      <SmoothScroll>
        <div className="w-full">
          <Outlet />
        </div>
      </SmoothScroll>
    </>
  );
};

export default Layout;
