import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const ProtectRoute = ({ children, type }) => {
  // const navigate = useNavigate()
  const { currentUser } = useSelector((store) => store.auth);
  if (!currentUser) {
    return <Navigate to="/" />;
  }
  if (type === "dashboard") {
    if (currentUser?.role === 'SELLER') {
      return <Navigate to="/" />;
    }
  }

  return children;
};
