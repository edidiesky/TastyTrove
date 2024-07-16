import React from "react";

export default function Copyright() {
  return (
    <div
      className="w-full flex items-center justify-center"
      style={{ padding: "2rem 0", background: "#000" }}
    >
      <p
        className="fs-12 family2"
        style={{ color: "rgba(255, 255, 255, 0.44)" }}
      >
        © Copyright 2024 |{" "}
        <span className="text-white">Edidiong Essien</span> | All Rights
        Reserved
      </p>
    </div>
  );
}
