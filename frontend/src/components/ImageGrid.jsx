import React from "react";

export default function ImageGrid({
  images,
  selected,
  toggleSelect,
  openDeleteModal
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: 16,
      }}
    >
      {images.map((img) => (
        <div
          key={img.id}
          style={{
            border: "1px solid #ddd",
            padding: 10,
            borderRadius: 12,
            background: "#FFECDB",
          }}
        >
          <input
            type="checkbox"
            checked={selected.includes(img.id)}
            onChange={() => toggleSelect(img.id)}
            style={{ marginBottom: 6, transform: "scale(1.2)" }}
          />

          <div
            style={{
              position: "relative",
              paddingBottom: "75%",
              overflow: "hidden",
              borderRadius: 10,
            }}
          >
            <img
              src={`http://localhost:4000/images/${img.id}/raw`}
              alt=""
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <small
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: 120,
              }}
            >
              {img.filename}
            </small>

            <button
              onClick={() => openDeleteModal(img.id)}
              style={{
                background: "#FF9149",
                color: "white",
                border: "none",
                padding: "6px 10px",
                borderRadius: 6,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
