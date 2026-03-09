# House Rent System – Complete Setup Guide

This guide walks you through setting up the project from scratch, including **Conda** and **MongoDB**.

---

## Step 1: Install Prerequisites

### Option A: Using Conda (Recommended for MCA Project)

1. **Install Miniconda** (lightweight) or Anaconda:
   - Linux: `wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh && bash Miniconda3-latest-Linux-x86_64.sh`
   - Follow prompts; restart terminal if needed.

2. **Create project environment with Node.js:**
   ```bash
   conda create -n house_rent nodejs=20 -c conda-forge -y
   conda activate house_rent
   ```

3. **Verify:**
   ```bash
   node -v   # Should show v20.x.x
   npm -v
   ```

### Option B: Without Conda

1. Install **Node.js 18+** from https://nodejs.org (LTS).
2. Verify: `node -v` and `npm -v`.

---

## Step 2: MongoDB Setup

### Local MongoDB

- **Ubuntu/Debian:** `sudo apt update && sudo apt install -y mongodb`
- **Start:** `sudo systemctl start mongod`
- **Connection string:** `mongodb://localhost:27017`

### MongoDB Atlas (Cloud, free tier)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create account → Create free cluster
3. Database Access → Add user (username + password)
4. Network Access → Add IP (or 0.0.0.0/0 for development)
5. Connect → Get connection string, e.g. `mongodb+srv://user:pass@cluster.mongodb.net/house_rent`

---

## Step 3: Project Setup

```bash
# Navigate to project
cd /home/user/Documents/house_rent

# If using Conda:
conda activate house_rent
```

### Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env`:

- `MONGODB_URI`: your MongoDB connection string
- `JWT_SECRET`: any long random string (e.g. `openssl rand -hex 32`)

Start backend:

```bash
npm run dev
```

You should see: `Server running on port 5000`, `MongoDB Connected`.

### Frontend (new terminal)

```bash
cd /home/user/Documents/house_rent/frontend
npm install
npm run dev
```

Open **http://localhost:5173** in the browser.

---

## Step 4: First Run Checklist

- [ ] Conda env activated (if using Conda)
- [ ] MongoDB running (local or Atlas)
- [ ] `backend/.env` created and filled
- [ ] Backend: `npm run dev` → port 5000
- [ ] Frontend: `npm run dev` → port 5173
- [ ] Register a user and create a property from the UI

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `MongoServerSelectionError` | Check MongoDB is running or Atlas URI is correct |
| Port 5000 in use | Change `PORT` in `backend/.env` |
| CORS errors | Ensure backend runs on 5000 and frontend uses `VITE_API_URL=http://localhost:5000/api` |
| Conda node not found | Run `conda activate house_rent` in the same terminal where you run npm |

---

## Quick Reference

| Task | Command |
|------|--------|
| Activate Conda env | `conda activate house_rent` |
| Start backend | `cd backend && npm run dev` |
| Start frontend | `cd frontend && npm run dev` |
| Deactivate Conda | `conda deactivate` |
