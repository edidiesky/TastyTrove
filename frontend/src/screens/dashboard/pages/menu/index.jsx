// import Head from "next/head";
import DashboardIndex from "./components";
import Meta from "@/components/common/Meta";
export default function Rooms() {
  return (
    <div className="py-12">
      <Meta title={"Room Summary of the dashboard"} />
      <DashboardIndex />
    </div>
  );
}
