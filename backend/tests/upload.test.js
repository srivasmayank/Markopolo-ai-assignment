const request = require('supertest');
 const app = require('../server');
 const store = require('../memoryStore');
 
beforeEach(() => store.clearAll());
 describe('upload flow', () => {
 test('rejects no file', async () => {
 const res = await request(app).post('/upload');
 expect(res.statusCode).toBe(400);
 expect(res.body.error).toBeDefined();
 });
 test('accepts jpeg file under limit', async () => {
 const res = await request(app)
 .post('/upload')
 .attach('image', Buffer.from([0xff,0xd8,0xff]), 'fake.jpg');
 // multer will accept but file content isn't a valid jpeg — we only check mimetype header set by mocha
 expect([200,201]).toContain(res.statusCode);
 expect(res.body.id).toBeDefined();
 });
 })