import React from "react";

export default function Toast({ message }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 25,
        right: 25,
        background: "#333",
        color: "white",
        padding: "12px 18px",
        borderRadius: 8,
        fontSize: 15,
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        animation: "fadeIn 0.3s",
      }}
    >
      {message}
    </div>
  );
}
