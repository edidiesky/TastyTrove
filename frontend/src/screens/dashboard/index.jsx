import React, { lazy } from "react";

const Customers = lazy(() => import("./pages/customers"));
const Reservation = lazy(() => import("./pages/reservation"));
const Orders = lazy(() => import("./pages/orders"));
const Rooms = lazy(() => import("./pages/rooms"));
const Statistics = lazy(() => import("./pages/statistics"));
const CreateRoom = lazy(() => import("./pages/create-room"));
const Settings = lazy(() => import("./pages/settings"));
// Settings

export {
  Rooms,
  Statistics,
  Customers,
  Reservation,
  CreateRoom,
  Orders,
  Settings,
};
