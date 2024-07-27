import React, { useState, useEffect, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import Loader from "./components/home/loader";
import Layout from "./screens/Layout";
import DashboardLayout from "./screens/DashboardLayout";
import {
  Statistics,
  Rooms,
  Customers,
  CreateMenu,
  Orders,
  Settings,
  Messages,
} from "./screens/dashboard";
import { ProtectRoute } from "./lib/ProtectRoute";
import Animation from "./animations/Animation";
const HomeWrapper = lazy(() => import("./screens/Home"));
const SearchWrapper = lazy(() => import("./screens/Search"));
const SingleWrapper = lazy(() => import("./screens/Single"));
const Cart = lazy(() => import("./screens/Cart"));
const TripsWrapper = lazy(() => import("./screens/Trips"));
const TeamWrapper = lazy(() => import("./screens/Team"));
// const PaymentWrapper = lazy(() => import("./screens/Payment"));
const PaymentSuccess = lazy(() => import("./screens/Payment-Success"));
// // PaymentSuccess
export default function App() {
  const [height, setHeight] = useState(0);

  return (
    <div className="based" style={{ height }}>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback={<Loader />}>
                <HomeWrapper />
              </Suspense>
            }
          />
          <Route
            path="/restaurant/takeout/:food"
            element={
              <Suspense fallback={<></>}>
                <SingleWrapper />
              </Suspense>
            }
          />
          <Route
            path="/restaurant/cart"
            element={
              <Suspense fallback={<></>}>
                <Cart />
              </Suspense>
            }
          />
          <Route
            path="/restaurant/menu"
            element={
              <Suspense fallback={<></>}>
                <SearchWrapper />
              </Suspense>
            }
          />
          <Route
            path="/restaurant/reservations"
            element={
              <Suspense fallback={<></>}>
                <TripsWrapper />
              </Suspense>
            }
          />
          <Route
            path="/restaurant/team"
            element={
              <Suspense fallback={<></>}>
                <TeamWrapper />
              </Suspense>
            }
          />
          {/* TeamWrapper */}
          <Route
            path="/payment-success/:id"
            element={
              <Suspense fallback={<></>}>
                <PaymentSuccess />
              </Suspense>
            }
          />
        </Route>

        <Route
          path={"/dashboard"}
          element={
            <ProtectRoute>
              <DashboardLayout />
            </ProtectRoute>
          }
        >
          <Route
            exact
            index
            element={
              <Suspense fallback={<></>}>
                <Statistics />
              </Suspense>
            }
          />
          <Route
            exact
            path="menu"
            element={
              <Suspense fallback={<Loader />}>
                <Rooms />
              </Suspense>
            }
          />
          <Route
            exact
            path="menu/:id"
            element={
              <Suspense fallback={<Loader />}>
                <CreateMenu />
              </Suspense>
            }
          />
          <Route
            exact
            path="customers"
            element={
              <Suspense fallback={<Loader />}>
                <Customers />
              </Suspense>
            }
          />
          <Route
            exact
            path="profile/:id"
            element={
              <Suspense fallback={<Loader />}>
                <Settings />
              </Suspense>
            }
          />
          <Route
            exact
            path="message"
            element={
              <Suspense fallback={<Loader />}>
                <Messages />
              </Suspense>
            }
          />
          {/* Messages */}
          <Route
            exact
            path="orders"
            element={
              <Suspense fallback={<Loader />}>
                <Orders />
              </Suspense>
            }
          />
          {/* Reservation */}

          <Route
            exact
            path="menu/create-menu"
            element={
              <Suspense fallback={<Loader />}>
                <CreateMenu />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
    // <Animation/>
  );
}
