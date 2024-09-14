import React from "react";

export default function Copyright() {
  return (
    <div
      className="w-full  text-sm family1 flex items-center justify-center"
      style={{ padding: "1.5rem 0", background: "#000" }}
    >
      <h5
        className="family2"
        style={{ color: "rgba(255, 255, 255, 0.44)" }}
      >
        © Copyright 2024 |{" "}
        <span className="text-white">Edidiong Essien</span> | All Rights
        Reserved
      </h5>
    </div>
  );
}
