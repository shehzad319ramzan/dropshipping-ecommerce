# Dropshipping Ecommerce (MERN + Next.js)

This project has two apps:
- `backend` (Express + MongoDB API)
- `frontend` (Next.js storefront)

## Prerequisites
- Node.js 18+ (recommended: 18 or 20)
- npm
- MongoDB running locally (`mongodb://localhost:27017`)

## 1) Clone and install

```bash
git clone <your-repo-url>
cd dropshipping-ecommerce
```

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd ../frontend
npm install
```

## 2) Environment setup

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/myshopdb
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:3000
```

Optional: Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

If `NEXT_PUBLIC_API_URL` is not set, frontend already defaults to `http://localhost:5000/api`.

## 3) Seed sample data

From `backend` folder:

```bash
npm run seed
```

This creates:
- Admin: `admin@gmail.com` / `admin123`
- User: `user@gmail.com` / `user123`

## 4) Run the project

Terminal 1 (backend):

```bash
cd backend
npm run dev
```

Terminal 2 (frontend):

```bash
cd frontend
npm run dev
```

Open:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000/api`

## Useful scripts

### Backend
- `npm run dev` - Run backend with nodemon
- `npm start` - Run backend in normal mode
- `npm run seed` - Reset and seed roles/users/permissions
- `npm run make-admin` - Promote a user to admin (edit email in `backend/seeders/makeAdmin.js`)

### Frontend
- `npm run dev` - Run Next.js dev server
- `npm run build` - Production build
- `npm start` - Run production server
- `npm run lint` - Lint project

## Common issues

1. Login/CORS issues from frontend:
- Make sure backend `CLIENT_URL` matches frontend URL (usually `http://localhost:3000`).

2. MongoDB connection errors:
- Verify MongoDB is running.
- Verify `MONGO_URI` in `backend/.env`.

3. Invalid login:
- Run `npm run seed` again in `backend`.

