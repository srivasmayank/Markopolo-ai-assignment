A simple full-stack application where users can upload images (one at a time), preview them instantly in a modern grid UI, and delete any image.
All images are stored in backend memory only, as required.

This project focuses on clarity, clean code, and a modern UI.

🚀 Tech Stack
Frontend

React (Vite or CRA)

Axios

Modern, responsive UI with custom CSS

Backend

Node.js + Express

Multer (file upload)

In-memory image storage

✨ Features
✅ Core Requirements

Upload exactly one image at a time

Supported formats: JPEG, PNG

Max file size: 3 MB

Show upload progress

Display image instantly in a gallery grid

Backend stores:

id

filename

mime-type

raw binary buffer

Responsive frontend layout

Backend unit tests (Jest + Supertest)

How to Run the Project
1️⃣ Clone the Repository
git clone https://github.com/srivasmayank/Markopolo-ai-assignment.git mini-image-gallery
cd mini-image-gallery

🔧 Backend Setup (Node.js + Express)
1. Go to backend folder
cd backend

2. Install dependencies
npm install

3. Start backend server
node server.js


The server will run at:

👉 http://localhost:4000

Frontend Setup (React)
1. Go to frontend folder
cd frontend

2. Install dependencies
npm install

3. Start React app
npm run dev


Frontend will run at:

👉 http://localhost:5173

Design Decisions
1. In-memory Image Storage

Chosen because:

Matches assignment requirement

Simplifies CRUD operations

Fast access without DB

Each image is stored as:

{
  id,
  filename,
  mimeType,
  buffer
}

2. Clean, Minimal UI

UI colors used (as requested):

#EFECE3 — background

#8FABD4 — soft blue

#4A70A9 — primary button color

#000000 — text

Design principles:

Responsive CSS grid

Rounded cards

Soft shadows

Simple typography

Accessible contrast

3. No Database

Images are lost on server restart — intentional for this assignment.
