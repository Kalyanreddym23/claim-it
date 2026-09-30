# Claim-It — College Lost & Found Portal

A full-stack web application that helps college students report, discover, and claim lost and found items through a centralized campus portal.

## 🌐 Live Demo

**Frontend:**  
https://claim-it-collage-find-lost-portal.netlify.app/

**Backend API:**  
https://claim-it.onrender.com/

**API Health Check:**  
https://claim-it.onrender.com/api/health

**GitHub Repository:**  
https://github.com/Kalyanreddym23/claim-it

---

## 📌 About the Project

**Claim-It** is a MERN-stack lost and found portal designed for college campuses.

Students can report lost or found belongings, browse available listings, view item details, submit claims, and manage their own listings and claim requests.

The application follows a client-server architecture with a React frontend, Express REST API, and MongoDB Atlas database.

---

## ✨ Features

### 🔐 Authentication
- User registration and login
- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes
- Persistent authentication session

### 🔎 Lost & Found
- Create lost and found listings
- Browse available listings
- Search and filter items
- Item categories
- Location and date information
- Optional item image URLs
- Item status tracking
- Edit and delete personal listings

### 🤝 Claim Management
- Submit claims for active listings
- View submitted claims
- View received claims
- Approve or reject claims
- Automatically mark an item as claimed after approval

### 🎨 User Interface
- Responsive React interface
- Tesla-inspired minimal design
- Light and dark theme toggle
- Mobile-friendly navigation
- Reusable React components
- Loading, error, success, and empty states
- Client-side form validation

---

## 🛠️ Tech Stack

### Frontend

- React 18
- React Router
- Vite
- JavaScript
- HTML5
- CSS3

### Backend

- Node.js
- Express.js
- Mongoose
- REST API
- JWT
- bcryptjs
- CORS

### Database

- MongoDB
- MongoDB Atlas

### Tools & Deployment

- Git
- GitHub
- Visual Studio Code
- Netlify
- Render

---

## 🏗️ Architecture

```text
                         ┌───────────────────┐
                         │       User        │
                         │  Web Browser      │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │      Netlify      │
                         │   React + Vite    │
                         │    Frontend       │
                         └─────────┬─────────┘
                                   │
                              REST API
                                   │
                                   ▼
                         ┌───────────────────┐
                         │      Render       │
                         │ Node + Express.js │
                         │     Backend       │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │   MongoDB Atlas   │
                         │     Database      │
                         └───────────────────┘
```

---

## 🔄 Application Workflow

```text
Register / Login
       │
       ▼
Browse Lost & Found Items
       │
       ├───────────────┐
       ▼               ▼
Report Item       View Details
                       │
                       ▼
                  Submit Claim
                       │
                       ▼
                Listing Owner
                       │
                 ┌─────┴─────┐
                 ▼           ▼
              Approve      Reject
                 │
                 ▼
          Item marked claimed
```

---

## 📂 Project Structure

```text
claim-it/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ItemCard.jsx
│   │   │   ├── ItemForm.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PageState.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── EditItemPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── ItemDetailsPage.jsx
│   │   │   ├── ItemsPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   └── ReportItemPage.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── constants.js
│   │   ├── main.jsx
│   │   └── styles.css
│   │
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── claimController.js
│   │   └── itemController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   │
│   ├── models/
│   │   ├── Claim.js
│   │   ├── Item.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── claimRoutes.js
│   │   └── itemRoutes.js
│   │
│   ├── utils/
│   │   ├── asyncHandler.js
│   │   └── generateToken.js
│   │
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── .env.example
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

---

## 🔑 Authentication Flow

```text
User
 │
 ▼
Login / Register
 │
 ▼
Express Authentication API
 │
 ▼
Validate Credentials
 │
 ▼
bcrypt Password Verification
 │
 ▼
JWT Token Generated
 │
 ▼
Token Stored in Client
 │
 ▼
Protected API Requests
```

Protected requests use:

```text
Authorization: Bearer <token>
```

---

## 📡 API Overview

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Create a new account |
| POST | `/api/auth/login` | No | Authenticate a user |

### Items

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/items` | No | Browse active listings |
| GET | `/api/items/:id` | No | View one listing |
| GET | `/api/items/mine` | Yes | View current user's listings |
| POST | `/api/items` | Yes | Create a listing |
| PUT | `/api/items/:id` | Yes | Update own listing |
| DELETE | `/api/items/:id` | Yes | Delete own listing |

### Claims

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/claims` | Yes | Submit a claim |
| GET | `/api/claims/mine` | Yes | View submitted claims |
| GET | `/api/claims/received` | Yes | View received claims |
| PATCH | `/api/claims/:id` | Yes | Approve or reject a claim |

### Health

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/health` | No | Check API availability |

---

## 🚀 Local Setup

### Prerequisites

- Node.js 18+
- npm
- MongoDB or MongoDB Atlas
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Kalyanreddym23/claim-it.git
cd claim-it
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the backend

Create:

```text
server/.env
```

from:

```text
server/.env.example
```

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
PORT=5000
```

### 4. Configure the frontend

Create:

```text
client/.env
```

from:

```text
client/.env.example
```

Example:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 5. Start the application

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

---

## ☁️ Deployment

### Frontend — Netlify

The React/Vite application is deployed on Netlify.

```text
https://claim-it-collage-find-lost-portal.netlify.app/
```

Production environment variable:

```env
VITE_API_BASE_URL=https://claim-it.onrender.com/api
```

### Backend — Render

The Express API is deployed on Render.

```text
https://claim-it.onrender.com/
```

### Database — MongoDB Atlas

The production backend connects to MongoDB Atlas.

---

## 🔐 Environment Variables

The project keeps sensitive configuration outside the Git repository.

Tracked example files:

```text
.env.example
client/.env.example
server/.env.example
```

Local/private files:

```text
.env
client/.env
server/.env
```

Never commit real:

- MongoDB credentials
- JWT secrets
- API secrets
- passwords

The production frontend only needs the public API URL.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Run frontend and backend together |
| `npm run client` | Run frontend only |
| `npm run server` | Run backend in development mode |
| `npm run build` | Build the production frontend |
| `npm start` | Start the production API |

---

## 📊 Project Status

| Component | Status |
|---|---|
| React Frontend | ✅ Live |
| Express Backend | ✅ Live |
|
