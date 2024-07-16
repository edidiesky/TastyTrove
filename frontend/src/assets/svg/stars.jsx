import React from "react";

const Stars = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={{
          display: "block",
          height: "20px",
          width: "20px",
          stroke: "currentcolor",
          strokeWidth: "1",
          overflow: "visible",
        }}
      >
        <path d="M6 23v3h3v2H6v3H4v-3H1v-2h3v-3h2zm9.04-19.29c.28-.9 1.52-.95 1.88-.12l.04.12 2.61 8.72 8.72 2.61c.86.26.94 1.4.22 1.82l-.1.06-.12.04-8.72 2.61-2.61 8.72c-.26.86-1.4.94-1.82.22l-.06-.1-.04-.12-2.61-8.72-8.72-2.61c-.87-.26-.94-1.4-.22-1.82l.1-.06.12-.04 8.72-2.61 2.61-8.72zM16 7.48l-1.81 6.04a1 1 0 0 1-.55.63l-.12.04L7.48 16l6.04 1.81a1 1 0 0 1 .57.45l.06.1.04.12L16 24.52l1.81-6.04a1 1 0 0 1 .45-.57l.1-.06.12-.04L24.52 16l-6.04-1.81a1 1 0 0 1-.57-.44l-.06-.12-.04-.11L16 7.48zM28 1v3h3v2h-3v3h-2V6h-3V4h3V1h2z"></path>
      </svg>
    </div>
  );
};

export default Stars;
