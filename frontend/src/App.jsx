import React, { useState, useEffect, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import Lenis from "@studio-freight/lenis";
import Loader from "./components/home/loader";
import Layout from "./screens/Layout";
import DashboardLayout from "./screens/DashboardLayout";
import {
  Statistics,
  Rooms,
  Customers,
  CreateRoom,
  Reservation,
  Orders,
  Settings,
} from "./screens/dashboard";
import { ProtectRoute } from "./lib/ProtectRoute";
import Animation from "./animations/Animation";
const HomeWrapper = lazy(() => import("./screens/Home"));
const SearchWrapper = lazy(() => import("./screens/Search"));
const SingleWrapper = lazy(() => import("./screens/Single"));
const Cart = lazy(() => import("./screens/Cart"));
const TripsWrapper = lazy(() => import("./screens/Trips"));
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
            path="rooms"
            element={
              <Suspense fallback={<Loader />}>
                <Rooms />
              </Suspense>
            }
          />
          <Route
            exact
            path="rooms/:id"
            element={
              <Suspense fallback={<Loader />}>
                <CreateRoom />
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
          {/* Settings */}
          <Route
            exact
            path="reservation"
            element={
              <Suspense fallback={<Loader />}>
                <Reservation />
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
            path="rooms/create-room"
            element={
              <Suspense fallback={<Loader />}>
                <CreateRoom />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}
