// import Head from "next/head";
import DashboardIndex from "./components";
import Meta from "@/components/common/Meta";
export default function Home() {
  return (
    <div className="py-12">
      <Meta title={"Dashboard Summary"} />
      <DashboardIndex />
    </div>
  );
}
