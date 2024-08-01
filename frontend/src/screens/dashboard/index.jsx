import React, { lazy } from "react";

const Customers = lazy(() => import("./pages/customers"));
const Orders = lazy(() => import("./pages/orders"));
const Rooms = lazy(() => import("./pages/menu"));
const Statistics = lazy(() => import("./pages/statistics"));
const CreateMenu = lazy(() => import("./pages/manage-menu"));
const Settings = lazy(() => import("./pages/settings"));
const Reviews = lazy(() => import("./pages/reviews"));
const Messages = lazy(() => import("./pages/messages"));
// Reviews
// Settings

export {
  Rooms,
  Statistics,
  Customers,
  CreateMenu,
  Orders,
  Settings,
  Messages,
  Reviews,
};
