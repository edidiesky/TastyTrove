import LoginModal from "@/components/modals/Login";
import { Outlet } from "react-router-dom";
import RegisterModal from "@/components/modals/Register";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
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

      <div className="w-full">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
