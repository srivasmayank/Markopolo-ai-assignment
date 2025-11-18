import React from "react";

export default function DeleteModal({ onConfirm, onCancel }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: 12,
          padding: 24,
          width: 300,
          textAlign: "center",
        }}
      >
        <h3>Delete Image?</h3>
        <p style={{ fontSize: 14 }}>Are you sure?</p>

        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              padding: "10px 0",
              background: "#ff4d4d",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Delete
          </button>

          <button
            onClick={onCancel}
            style={{
              flex: 1,
              padding: "10px 0",
              background: "#ccc",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
