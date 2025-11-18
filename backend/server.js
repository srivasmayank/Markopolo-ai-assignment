const express = require('express');
 const multer = require('multer');
 const cors = require('cors');
 const { v4: uuidv4 } = require('uuid');
 const store = require('./memoryStore');
 const app = express();
 app.use(cors());
 app.use(express.json());
 const upload = multer({
 storage: multer.memoryStorage(),
 limits: { fileSize: 3 * 1024 * 1024 } // 3 MB
 });
 // POST /upload — one file only
 app.post('/upload', upload.single('image'), (req, res) => {
 const file = req.file;
 if (!file) return res.status(400).json({ error: 'No file uploaded' });
 // Validate mimetype
 if (!['image/jpeg', 'image/png'].includes(file.mimetype)) {
 return res.status(400).json({ error: 'Unsupported file type. Use JPEG or PNG.' });
 }
 if (file.size > 3 * 1024 * 1024) {
 return res.status(400).json({ error: 'File too large (max 3 MB).' });
 }
 const id = uuidv4();
 const image = {
 id,
 
filename: file.originalname,
 mimetype: file.mimetype,
 buffer: file.buffer
 };
 store.save(image);
 res.json({ id: image.id, filename: image.filename, mimetype:
 image.mimetype });
 });
 // GET /images — list
 app.get('/images', (req, res) => {
 res.json(store.list());
 });
 // GET /images/:id/raw — serve raw binary
 app.get('/images/:id/raw', (req, res) => {
 const id = req.params.id;
 const image = store.get(id);
 if (!image) return res.status(404).json({ error: 'Image not found' });
 res.setHeader('Content-Type', image.mimetype);
 res.setHeader('Content-Length', image.buffer.length);
 res.send(image.buffer);
 });
 // DELETE /images/:id
 app.delete('/images/:id', (req, res) => {
 const id = req.params.id;
 const existed = store.delete(id);
 if (!existed) return res.status(404).json({ error: 'Image not found' });
 res.status(204).send();
 });
 const PORT = process.env.PORT || 4000;
 app.listen(PORT, () => console.log(`Backend listening on http://localhost:$
 {PORT}`));
 module.exports = app;