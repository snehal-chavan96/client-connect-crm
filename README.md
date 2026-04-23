# 🚀 Client Connect CRM System

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-MIT-blue)
![Status](https://img.shields.io/badge/Status-Active-success)

A modern full-stack CRM (Customer Relationship Management) web application built using the MERN stack to manage clients, leads, and support tickets efficiently.

---

## 📌 Overview

**Client Connect CRM** is designed to help businesses streamline customer interactions, manage leads, and track support tickets in a centralized system. It provides a clean UI, scalable backend, and efficient data management.

---

## 🛠️ Tech Stack

### 🔹 Frontend
- React.js
- HTML5, CSS3, JavaScript

### 🔹 Backend
- Node.js
- Express.js

### 🔹 Database
- MongoDB (Mongoose ODM)

---

## ✨ Features

- 🔐 Authentication & Authorization (JWT-based)
- 👥 Client Management System
- 📊 Lead Tracking
- 🎫 Support Ticket System
- 📁 Dashboard Overview
- 🔄 RESTful APIs
- 📱 Responsive Design

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
git clone https://github.com/your-username/client-connect-crm.git
cd client-connect-crm
2️⃣ Backend Setup
cd server
npm install

Create a .env file in /server:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend:

npm run dev
3️⃣ Frontend Setup
cd client
npm install
npm start

Frontend will run on:

http://localhost:3000
🌐 API Endpoints (Sample)
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
GET	/api/clients	Get all clients
POST	/api/clients	Add new client
GET	/api/tickets	Get all tickets
POST	/api/tickets	Create ticket
