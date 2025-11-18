const images = new Map();
 module.exports = {
 save(image) {
 // image = { id, filename, mimetype, buffer }
 images.set(image.id, image);
 },
 get(id) {
 return images.get(id);
 },
 list() {
 // return metadata only
 
return Array.from(images.values()).map(({ id, filename, mimetype }) => ({
 id, filename, mimetype }));
 },
 delete(id) {
 return images.delete(id);
 },
 clearAll() {
 images.clear();
 }
 };