import React, { useEffect, useState } from "react";
import { listImages, deleteImage } from "./api";

import UploadBox from "./components/UploadBox";
import ImageGrid from "./components/ImageGrid";
import DeleteModal from "./components/DeleteModal";
import Toast from "./components/Toast";

import useUpload from "./hooks/useUpload";

export default function App() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const [toast, setToast] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selected, setSelected] = useState([]);

  const load = async () => {
    const list = await listImages();
    setImages(list);
  };

  useEffect(() => {
    load();
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const { progress, isUploading, onUpload } = useUpload(load, showToast);

  function validateFile(f) {
    if (!f) return;

    if (!["image/png", "image/jpeg"].includes(f.type)) {
      showToast("❌ Only PNG or JPG allowed");
      return;
    }
    if (f.size > 3 * 1024 * 1024) {
      showToast("❌ Max file size 3MB");
      return;
    }

    setFile(f);
    setFilePreview(URL.createObjectURL(f));
  }

  function onFileChange(e) {
    validateFile(e.target.files[0]);
  }

  function onDragOver(e) {
    e.preventDefault();
    setDragActive(true);
  }
  function onDragLeave() {
    setDragActive(false);
  }
  function onDrop(e) {
    e.preventDefault();
    setDragActive(false);
    validateFile(e.dataTransfer.files[0]);
  }

  function removeSelectedFile(e) {
  if (e) e.stopPropagation();

  setFile(null);
  setFilePreview(null);

  const input = document.getElementById("file-input");
  if (input) input.value = "";
}


  function toggleSelect(id) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  async function openDeleteModal(id) {
    setDeleteId(id);
    setDeleteModalOpen(true);
  }

  async function confirmDelete() {
    await deleteImage(deleteId);
    await load();
    showToast("🗑️ Image deleted");
    setDeleteModalOpen(false);
  }

  function cancelDelete() {
    setDeleteModalOpen(false);
  }

  async function deleteAllHandler() {
    if (selected.length === 0) {
      for (let img of images) await deleteImage(img.id);
      showToast("🗑️ All images deleted");
    } else {
      for (let id of selected) await deleteImage(id);
      showToast("🗑️ Selected images deleted");
    }

    setSelected([]);
    await load();
  }

  return (
    <div style={{ maxWidth: 1000, margin: "30px auto", padding: 20, fontFamily: "Inter, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>🖼️ Image Gallery</h1>

      {images.length > 0 && (
        <button
          onClick={deleteAllHandler}
          style={{
            background: "#ff4d4d",
            padding: "10px 20px",
            borderRadius: 10,
            border: "none",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
            marginBottom: 20,
          }}
        >
          {selected.length > 0
            ? `Delete Selected (${selected.length})`
            : "Delete All Images"}
        </button>
      )}

      <UploadBox
        file={file}
        filePreview={filePreview}
        dragActive={dragActive}
        progress={progress}
        onFileChange={onFileChange}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onUpload={() => onUpload(file, removeSelectedFile)}
        removeSelectedFile={removeSelectedFile}
      />

      {!isUploading && (
        <ImageGrid
          images={images}
          selected={selected}
          toggleSelect={toggleSelect}
          openDeleteModal={openDeleteModal}
        />
      )}

      {deleteModalOpen && (
        <DeleteModal onConfirm={confirmDelete} onCancel={cancelDelete} />
      )}

      {toast && <Toast message={toast} />}
    </div>
  );
}
