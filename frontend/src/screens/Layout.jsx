import LoginModal from "@/components/modals/Login";
import { Outlet } from "react-router-dom";
import RegisterModal from "@/components/modals/Register";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import Copyright from "@/components/common/Copyright";
import Navbar from "@/components/common/navbar";

import BecomeASellerModal from "@/components/modals/BecomeASeller";
const Layout = () => {
  const { loginmodal, registermodal, sellermodal } = useSelector(
    (store) => store.modal
  );
  return (
    <>
      <AnimatePresence mode="wait">
        {loginmodal && (
          <LoginModal registermodal={registermodal} modal={loginmodal} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {sellermodal && <BecomeASellerModal modal={sellermodal} />}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {registermodal && <RegisterModal modal={registermodal} />}
      </AnimatePresence>
      <div className="w-full">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
