import React, { lazy } from "react";

const Customers = lazy(() => import("./pages/customers"));
const Reservation = lazy(() => import("./pages/reservation"));
const Orders = lazy(() => import("./pages/orders"));
const Rooms = lazy(() => import("./pages/menu"));
const Statistics = lazy(() => import("./pages/statistics"));
const CreateMenu = lazy(() => import("./pages/manage-menu"));
const Settings = lazy(() => import("./pages/settings"));
// Settings

export {
  Rooms,
  Statistics,
  Customers,
  Reservation,
  CreateMenu,
  Orders,
  Settings,
};
