import React from "react";

export default function UploadBox({
  file,
  filePreview,
  dragActive,
  progress,
  onFileChange,
  onDrop,
  onDragOver,
  onDragLeave,
  onUpload,
  removeSelectedFile
}) {
  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={() => !file && document.getElementById("file-input").click()}
      style={{
        border: "3px dashed #60B5FF",
        background: dragActive ? "#AFDDFFAA" : "#AFDDFF55",
        borderRadius: 16,
        padding: "40px 20px",
        textAlign: "center",
        marginBottom: 30,
        cursor: file ? "default" : "pointer",
        transition: "0.25s ease",
        transform: dragActive ? "scale(1.02)" : "scale(1)",
      }}
    >
      <input
        id="file-input"
        type="file"
        accept="image/png,image/jpeg"
        onChange={onFileChange}
        style={{ display: "none" }}
      />

      {/* PREVIEW */}
      {filePreview ? (
        <div style={{ position: "relative", display: "inline-block" }}>
          <img
            src={filePreview}
            style={{
              width: 180,
              height: 180,
              objectFit: "cover",
              borderRadius: 12,
            }}
          />

          <div
            onClick={removeSelectedFile}
            style={{
              position: "absolute",
              top: -8,
              right: -8,
              width: 26,
              height: 26,
              background: "#FF9149",
              color: "white",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            ✖
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpload();
            }}
            style={{
              marginTop: 16,
              width: "100%",
              padding: "12px 20px",
              borderRadius: 10,
              background: "#FF9149",
              color: "white",
              border: "none",
              fontSize: 17,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Upload Now
          </button>
        </div>
      ) : (
        <>
          <div style={{ fontSize: 50, color: "#60B5FF", marginBottom: 12 }}>📤</div>
          <div style={{ fontSize: 20, fontWeight: 600 }}>Upload File</div>
          <div style={{ marginTop: 6, fontSize: 14, color: "#555" }}>
            PNG / JPG • Max 3MB
          </div>
        </>
      )}

      {progress > 0 && (
        <div
          style={{
            marginTop: 18,
            width: "100%",
            maxWidth: 260,
            marginInline: "auto",
          }}
        >
          <div
            style={{
              height: 10,
              width: "100%",
              background: "#dbeaff",
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "#60B5FF",
                transition: "width 0.25s ease",
              }}
            ></div>
          </div>

          <div
            style={{
              marginTop: 6,
              textAlign: "center",
              fontWeight: 600,
              color: "#60B5FF",
              fontSize: 14,
            }}
          >
            Uploading… {progress}%
          </div>
        </div>
      )}
    </div>
  );
}
