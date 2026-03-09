# House Rent System — Project Guide

Complete guide to run the project: prerequisites, dependencies, and step-by-step instructions.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Required Dependencies](#required-dependencies)
3. [Environment Setup](#environment-setup)
4. [How to Connect with MongoDB](#how-to-connect-with-mongodb)
5. [How to Start](#how-to-start)
6. [Environment Variables](#environment-variables)
7. [Optional: Conda Setup](#optional-conda-setup)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before running the project, ensure you have:

| Requirement | Version / Notes |
|-------------|-----------------|
| **Node.js** | 18.x or 20.x (LTS recommended) |
| **npm**     | Comes with Node.js (v9+)        |
| **MongoDB** | 6.x or later (local or MongoDB Atlas) |
| **Git**     | Optional (for cloning)         |

**Check versions:**
```bash
node -v   # e.g. v20.10.0
npm -v    # e.g. 10.2.0
```

---

## Required Dependencies

All dependencies are installed via `npm install` in each folder. You do **not** need to install them globally.

### Backend (`backend/`)

| Package | Version | Purpose |
|---------|---------|---------|
| **express** | ^4.18.2 | Web framework |
| **mongoose** | ^8.0.3 | MongoDB ODM |
| **cors** | ^2.8.5 | Cross-origin requests |
| **dotenv** | ^16.3.1 | Load `.env` variables |
| **bcryptjs** | ^2.4.3 | Password hashing |
| **jsonwebtoken** | ^9.0.2 | JWT authentication |
| **express-validator** | ^7.0.1 | Request validation |

**Total:** 7 production dependencies. No devDependencies.

### Frontend (`frontend/`)

| Package | Version | Purpose |
|---------|---------|---------|
| **react** | ^18.2.0 | UI library |
| **react-dom** | ^18.2.0 | React DOM renderer |
| **react-router-dom** | ^6.21.1 | Routing |
| **axios** | ^1.6.2 | HTTP client (optional; API uses fetch) |
| **vite** | ^5.0.8 | Build tool & dev server (dev) |
| **@vitejs/plugin-react** | ^4.2.1 | React support for Vite (dev) |

**Total:** 4 dependencies, 2 devDependencies.

---

## Environment Setup

### 1. MongoDB

**Option A — Local MongoDB**

- Install: [MongoDB Community Server](https://www.mongodb.com/try/download/community) or via package manager (e.g. `sudo apt install mongodb`).
- Start the service:
  - Linux: `sudo systemctl start mongod`
  - Mac: `brew services start mongodb-community`
- Default URI: `mongodb://localhost:27017`

**Option B — MongoDB Atlas (cloud)**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a free account and a free cluster.
3. Create a database user (username + password).
4. Network Access → Add IP (or `0.0.0.0/0` for development).
5. Connect → Get connection string, e.g.  
   `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/house_rent`

### 2. Project folders

```bash
cd /path/to/house_rent
```

Ensure you have both folders: `backend/` and `frontend/`.

---

## How to Connect with MongoDB

The backend connects to MongoDB using **Mongoose**. The connection string is read from the `MONGODB_URI` variable in `backend/.env`. When you run `npm run dev`, the app connects automatically on startup.

### Option 1: Local MongoDB (on your computer)

**1. Install MongoDB**

- **Ubuntu/Debian:**  
  `sudo apt update && sudo apt install -y mongodb`
- **Other Linux:** See [MongoDB Install Docs](https://www.mongodb.com/docs/manual/installation/).
- **Windows:** Download from [MongoDB Community Download](https://www.mongodb.com/try/download/community).
- **Mac:**  
  `brew tap mongodb/brew && brew install mongodb-community`

**2. Start MongoDB**

- **Linux (systemd):**  
  `sudo systemctl start mongod`  
  (Optional: `sudo systemctl enable mongod` to start on boot.)
- **Mac:**  
  `brew services start mongodb-community`
- **Windows:** Start the "MongoDB Server" service from Services, or run `mongod.exe` from the install directory.

**3. Connection string for local**

Use this in `backend/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/house_rent
```

- `localhost:27017` — default host and port.  
- `house_rent` — database name (created automatically when the app first writes data).

**4. Verify**

- In terminal: `mongosh` (or `mongo`) and run `show dbs`. You should see `house_rent` after the app has run and saved data.

---

### Option 2: MongoDB Atlas (cloud, free tier)

**1. Create account and cluster**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Sign up or log in.
3. Click **Build a Database** → choose **M0 FREE** → select a region near you → **Create**.

**2. Create database user**

1. Under **Security → Database Access** → **Add New Database User**.
2. Choose **Password** authentication.
3. Set a username and a strong password (save them; you will use them in the connection string).
4. Set role: **Atlas Admin** or **Read and write to any database**.
5. Click **Add User**.

**3. Allow network access**

1. Under **Security → Network Access** → **Add IP Address**.
2. For development you can add **Allow Access from Anywhere** (`0.0.0.0/0`).  
   For production, add only your server’s IP.
3. Click **Confirm**.

**4. Get connection string**

1. Go to **Database** → click **Connect** on your cluster.
2. Choose **Drivers** (or "Connect your application").
3. Copy the connection string. It looks like:
   ```text
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<username>` with your database username and `<password>` with your database password.
5. Add the database name. Before the `?` add `/house_rent`:
   ```text
   mongodb+srv://myuser:mypass123@cluster0.xxxxx.mongodb.net/house_rent?retryWrites=true&w=majority
   ```
   If the password contains special characters (e.g. `@`, `#`), [URL-encode](https://www.w3schools.com/tags/ref_urlencode.asp) them (e.g. `@` → `%40`).

**5. Put it in `backend/.env`**

```env
MONGODB_URI=mongodb+srv://myuser:mypass123@cluster0.xxxxx.mongodb.net/house_rent?retryWrites=true&w=majority
```

Use your actual username, password, and cluster hostname.

**6. Verify**

Start the backend (`cd backend && npm run dev`). You should see in the console:

```text
MongoDB Connected: cluster0.xxxxx.mongodb.net
Server running on http://127.0.0.1:5000
```

---

### Where the connection happens in code

- **File:** `backend/src/config/db.js`  
- **Loaded in:** `backend/src/app.js` (before starting the server).  
- **Usage:** `connectDB()` reads `process.env.MONGODB_URI` (from `backend/.env`) and connects with Mongoose. If the connection fails, the process exits so you see the error in the terminal.

**Summary**

| Setup        | `MONGODB_URI` example |
|-------------|-------------------------|
| Local       | `mongodb://localhost:27017/house_rent` |
| Atlas       | `mongodb+srv://user:pass@cluster0.xxx.mongodb.net/house_rent?retryWrites=true&w=majority` |

After setting `MONGODB_URI` in `backend/.env`, run the backend; it will connect to MongoDB automatically on start.

---

## How to Start

### Step 1: Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env` and set at least:

- `MONGODB_URI` — your MongoDB connection string  
- `JWT_SECRET` — any long random string (e.g. run `openssl rand -hex 32`)

Then start the server:

```bash
npm run dev
```

**Expected output:**

- `MongoDB Connected: ...`
- `Server running on http://127.0.0.1:5000`

Leave this terminal open. The API will be at **http://localhost:5000**.

---

### Step 2: Frontend

Open a **new terminal**:

```bash
cd frontend
npm install
npm run dev
```

**Expected output:**

- `Vite dev server running at http://localhost:5173/`

Open **http://localhost:5173** in your browser. The app will proxy `/api` requests to the backend (port 5000).

---

### Step 3: Use the app

1. Open **http://localhost:5173**.
2. **Register** a new account (Sign Up).
3. **Login**.
4. Go to **Dashboard** → **Add Property** to create a listing.
5. Go to **Properties** to browse and filter listings.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| **PORT** | No | Server port (default: 5000) | `5000` |
| **HOST** | No | Bind address (default: 127.0.0.1) | `127.0.0.1` |
| **MONGODB_URI** | Yes | MongoDB connection string | `mongodb://localhost:27017/house_rent` |
| **JWT_SECRET** | Yes | Secret for signing JWTs | Long random string |
| **NODE_ENV** | No | `development` or `production` | `development` |

**Example `backend/.env`:**
```env
PORT=5000
HOST=127.0.0.1
MONGODB_URI=mongodb://localhost:27017/house_rent
JWT_SECRET=your-super-secret-key-change-in-production
NODE_ENV=development
```

### Frontend (`frontend/.env`)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| **VITE_API_URL** | No | Backend API base URL | `http://localhost:5000/api` |

- If **not set**: Vite proxy is used (`/api` → backend). Use this when backend runs on the same machine.
- If **set**: Frontend calls this URL directly. Use when backend is on another host or port.

**Example `frontend/.env`:**
```env
VITE_API_URL=http://localhost:5000/api
```

Copy from `frontend/.env.example` if you need to override the API URL.

---

## Optional: Conda Setup

Use Conda to get an isolated Node.js environment.

### Create environment

```bash
conda create -n house_rent nodejs=20 -c conda-forge -y
conda activate house_rent
```

### Verify

```bash
node -v   # v20.x.x
npm -v
```

### Use for the project

```bash
conda activate house_rent
cd backend
npm install
npm run dev
```

In another terminal:

```bash
conda activate house_rent
cd frontend
npm install
npm run dev
```

### Deactivate

```bash
conda deactivate
```

---

## Troubleshooting

| Issue | What to do |
|-------|------------|
| **ECONNREFUSED 127.0.0.1:5000** | Backend is not running. Start it with `cd backend && npm run dev`. |
| **MongoDB connection error** | Check MongoDB is running and `MONGODB_URI` in `backend/.env` is correct. |
| **Port 5000 already in use** | Set `PORT=5001` in `backend/.env`. Update `frontend/vite.config.js` proxy target to `http://127.0.0.1:5001` (or set `VITE_API_URL=http://localhost:5001/api` in `frontend/.env`). |
| **Port 5173 already in use** | Vite will prompt for another port, or set in `frontend/vite.config.js`: `server: { port: 3000 }`. |
| **CORS errors** | Ensure backend is running and frontend uses the proxy (`/api`) or the correct `VITE_API_URL`. Backend has `cors()` enabled. |
| **npm install fails** | Use Node 18+ and run `npm install` inside `backend/` and `frontend/` separately. Clear cache: `npm cache clean --force` and retry. |

---

## Quick Reference

| Task | Command |
|------|--------|
| Install backend deps | `cd backend && npm install` |
| Install frontend deps | `cd frontend && npm install` |
| Start backend | `cd backend && npm run dev` |
| Start frontend | `cd frontend && npm run dev` |
| Backend URL | http://localhost:5000 |
| Frontend URL | http://localhost:5173 |
| API base | http://localhost:5000/api |

---

**House Rent System** — MCA Final Year Project | Node.js, React, MongoDB
