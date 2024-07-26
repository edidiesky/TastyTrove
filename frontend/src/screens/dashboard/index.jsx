import React, { lazy } from "react";

const Customers = lazy(() => import("./pages/customers"));
const Orders = lazy(() => import("./pages/orders"));
const Rooms = lazy(() => import("./pages/menu"));
const Statistics = lazy(() => import("./pages/statistics"));
const CreateMenu = lazy(() => import("./pages/manage-menu"));
const Settings = lazy(() => import("./pages/settings"));
const Messages = lazy(() => import("./pages/messages"));
// Settings

export {
  Rooms,
  Statistics,
  Customers,
  CreateMenu,
  Orders,
  Settings,
  Messages,
};
