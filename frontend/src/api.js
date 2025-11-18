 const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';
 export async function listImages() {
 const res = await fetch(`${API_BASE}/images`);
 return res.json();
 }
 export function uploadImage(file, onProgress) {
 return new Promise((resolve, reject) => {
 const xhr = new XMLHttpRequest();
 const form = new FormData();
 form.append('image', file);
 xhr.open('POST', `${API_BASE}/upload`);
 xhr.upload.onprogress = (e) => {
 if (e.lengthComputable && onProgress) {
 onProgress(Math.round((e.loaded / e.total) * 100));
 }
 };
 xhr.onload = () => {
 if (xhr.status >= 200 && xhr.status < 300) {
 resolve(JSON.parse(xhr.responseText));
 } else {
 try {
 reject(JSON.parse(xhr.responseText));
 } catch (err) {
 reject({ error: 'Upload failed' });
 }
 }
 };
 xhr.onerror = () => reject({ error: 'Network error' });
 xhr.send(form);
 });
 }
 
export async function deleteImage(id) {
 const res = await fetch(`${API_BASE}/images/${id}`, { method: 'DELETE' });
 if (!res.ok) throw new Error('Delete failed');
 }