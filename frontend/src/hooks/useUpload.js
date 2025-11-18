import { useState } from "react";
import { uploadImage } from "../api";

export default function useUpload(load, showToast) {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  async function onUpload(file, resetFilePreview) {
    if (!file) {
      showToast("❌ Select a file first");
      return;
    }

    setIsUploading(true);
    setProgress(1);

    try {
      await uploadImage(file, (p) => {
        setProgress((prev) => {
          if (p < prev) return prev;
          return prev + (p - prev) * 0.45;
        });
      });

      // smooth finish
      let fake = progress;
      const interval = setInterval(() => {
        fake += 5;
        setProgress(fake);

        if (fake >= 100) {
          clearInterval(interval);

          setTimeout(async () => {
            await load();

            setProgress(0);
            setIsUploading(false);
            resetFilePreview();

            showToast("✅ Uploaded successfully!");
          }, 450);
        }
      }, 30);
    } catch {
      setIsUploading(false);
      setProgress(0);
      showToast("❌ Upload failed");
    }
  }

  return { progress, isUploading, onUpload };
}
