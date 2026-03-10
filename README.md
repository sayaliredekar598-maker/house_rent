<<<<<<< HEAD
# House Rent System

A full-stack **House Rent System** built with **Node.js**, **React**, and **MongoDB** for MCA Final Year Project.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Guide](#setup-guide)
- **[Full project guide (start, dependencies, env)](docs/PROJECT_GUIDE.md)** — single document with all details
- [Conda Environment Setup](#conda-environment-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)

---

## ✨ Features

- **User Management**: Registration, login, JWT authentication
- **Property Listings**: Create, view, update, delete rental properties
- **Search & Filter**: Filter by location, price, bedrooms, type
- **Dashboard**: Owner dashboard for managing properties
- **Responsive UI**: Modern React frontend with responsive design
- **RESTful API**: Clean backend API with Express.js

---

## 🛠 Tech Stack

| Layer      | Technology        |
|-----------|-------------------|
| Frontend  | React 18, React Router, Axios |
| Backend   | Node.js, Express.js          |
| Database  | MongoDB, Mongoose             |
| Auth      | JWT (JSON Web Tokens)         |

---

## 📁 Project Structure

```
house_rent/
├── backend/                 # Node.js API
│   ├── src/
│   │   ├── config/          # DB & app config
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/      # Auth, validation, error handling
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Helpers
│   │   └── app.js           # Express app
│   ├── package.json
│   └── .env.example
├── frontend/                # React app
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── docs/                    # Additional documentation
├── README.md
└── SETUP.md                 # Step-by-step setup & Conda guide
```

---

## 📌 Prerequisites

- **Node.js** 18+ (LTS recommended)
- **MongoDB** 6+ (local or MongoDB Atlas)
- **npm** or **yarn**
- **Conda** (optional, for isolated environment)

---

## 🚀 Setup Guide

### 1. Clone or navigate to the project

```bash
cd /home/user/Documents/house_rent
```

### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

### 3. Frontend setup

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

### 4. MongoDB

- **Local**: Install MongoDB and ensure it is running on `mongodb://localhost:27017`
- **Atlas**: Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), get connection string, and set `MONGODB_URI` in `backend/.env`  
- **Full steps:** See [How to Connect with MongoDB](docs/PROJECT_GUIDE.md#how-to-connect-with-mongodb) in the project guide for local and Atlas setup.

---

## 🐍 Conda Environment Setup

Conda helps you create an isolated environment with a specific Node.js version.

### Install Miniconda/Anaconda (if not installed)

- Download: https://docs.conda.io/en/latest/miniconda.html
- Or: `wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh && bash Miniconda3-latest-Linux-x86_64.sh`

### Create and use Conda environment

```bash
# Create environment with Node.js (from conda-forge)
conda create -n house_rent nodejs=20 -c conda-forge -y

# Activate environment
conda activate house_rent

# Verify
node -v   # v20.x.x
npm -v

# Navigate to project and install dependencies
cd /home/user/Documents/house_rent/backend
npm install

cd ../frontend
npm install
```

### Run project inside Conda environment

```bash
conda activate house_rent

# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

### Deactivate when done

```bash
conda deactivate
```

---

## ▶️ Running the Application

| Service   | Command           | URL                    |
|----------|-------------------|------------------------|
| Backend  | `cd backend && npm run dev`  | http://localhost:5000 |
| Frontend | `cd frontend && npm run dev` | http://localhost:5173 |

Open **http://localhost:5173** in your browser after both are running.

---

## 📡 API Documentation

Base URL: `http://localhost:5000/api`

### Auth

| Method | Endpoint           | Description     |
|--------|--------------------|-----------------|
| POST   | `/auth/register`   | Register user   |
| POST   | `/auth/login`      | Login, get JWT  |

### Users

| Method | Endpoint     | Description     | Auth |
|--------|--------------|-----------------|------|
| GET    | `/users/me`  | Current user    | Yes  |

### Properties

| Method | Endpoint       | Description        | Auth |
|--------|----------------|--------------------|------|
| GET    | `/properties`  | List (with filters)| No   |
| GET    | `/properties/:id` | Get one        | No   |
| POST   | `/properties`  | Create property    | Yes  |
| PUT    | `/properties/:id` | Update         | Yes  |
| DELETE | `/properties/:id` | Delete         | Yes  |

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/house_rent
JWT_SECRET=your-super-secret-key-change-in-production
NODE_ENV=development
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📄 License

For educational use (MCA Final Year Project).
=======
# house_rent_project
>>>>>>> a5d9827b319821c41aa6ec896d5da3f75bfda099
