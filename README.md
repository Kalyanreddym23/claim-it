# Claim-It

Claim-It is a college lost-and-found portal. Students can publish lost or found listings, browse the campus board, and submit and manage claim requests.

## Features

- Account registration and sign-in with JSON Web Token (JWT) authentication.
- Create, browse, search, filter, edit, and delete lost/found listings.
- Item categories, descriptions, locations, dates, optional image URLs, and statuses.
- Protected dashboard for a user's listings, outgoing claims, and incoming claim requests.
- Claim approval and rejection; approving a claim marks the item as claimed.
- Responsive React interface and an Express/MongoDB API.

## Stack

- Client: React 18, React Router, Vite
- Server: Node.js, Express, Mongoose
- Database: MongoDB
- Authentication: JWT and bcryptjs

## Project structure

```text
claim-it/
|- client/                 # React/Vite application
|  |- src/
|  `- .env.example
|- server/                 # Express API
|  |- controllers/
|  |- middleware/
|  |- models/
|  |- routes/
|  `- .env.example
|- .env.example            # Server configuration reference
`- package.json
```

## Requirements

- Node.js 18 or later
- npm
- A MongoDB instance (local MongoDB or MongoDB Atlas)

## Local setup

1. Clone the repository and install dependencies:

   ```bash
   npm install
   ```

2. Create the server environment file from the template:

   ```bash
   copy server\.env.example server\.env
   ```

   On macOS/Linux, use `cp server/.env.example server/.env`.

3. Update `server/.env` with your MongoDB connection string and a secure JWT secret.

4. Optionally create `client/.env` from `client/.env.example` when the API is not at `http://localhost:5000/api`.

5. Start both applications:

   ```bash
   npm run dev
   ```

   The client runs at `http://localhost:5173` and the API runs at `http://localhost:5000` by default.

## Environment variables

### Server (`server/.env`)

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGO_URI` | Yes | MongoDB connection string. |
| `JWT_SECRET` | Yes | Secret used to sign authentication tokens. Use a long random value. |
| `JWT_EXPIRES_IN` | No | JWT lifetime; defaults to `7d`. |
| `CLIENT_URL` | No | Comma-separated browser origins allowed by CORS; defaults to `http://localhost:5173`. |
| `PORT` | No | API port; defaults to `5000`. |

### Client (`client/.env`)

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_API_BASE_URL` | No | API base URL; defaults to `http://localhost:5000/api`. |

`VITE_` variables are public values compiled into the browser application. Do not put secrets in the client environment file.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Run the client and server together. |
| `npm run client` | Run only the Vite client. |
| `npm run server` | Run only the API in watch mode. |
| `npm run build` | Build the production client bundle. |
| `npm start` | Start the production API server. |

## API overview

| Method | Endpoint | Authentication | Description |
| --- | --- | --- | --- |
| `GET` | `/api/health` | No | API health check. |
| `POST` | `/api/auth/register` | No | Create an account. |
| `POST` | `/api/auth/login` | No | Sign in and receive a JWT. |
| `GET` | `/api/items` | No | List active listings; supports `type`, `category`, `location`, `search`, `status`, `page`, and `limit`. |
| `GET` | `/api/items/:id` | No | Fetch one listing. |
| `GET` | `/api/items/mine` | Yes | Fetch the current user's listings. |
| `POST` | `/api/items` | Yes | Create a listing. |
| `PUT` | `/api/items/:id` | Yes, owner | Update a listing. |
| `DELETE` | `/api/items/:id` | Yes, owner | Delete a listing. |
| `POST` | `/api/claims` | Yes | Submit a claim for an active listing. |
| `GET` | `/api/claims/mine` | Yes | Fetch claims submitted by the current user. |
| `GET` | `/api/claims/received` | Yes | Fetch claims received for the current user's listings. |
| `PATCH` | `/api/claims/:id` | Yes, listing owner | Approve or reject a pending claim. |

Protected endpoints require `Authorization: Bearer <token>`.

## Production notes

- Set `CLIENT_URL` to the deployed frontend URL (or a comma-separated list of allowed URLs).
- Set `VITE_API_BASE_URL` to the deployed API URL, including `/api`, before building the client.
- Use a managed MongoDB connection string and a unique, strong `JWT_SECRET`.
- Keep `.env` files private. The included `.gitignore` excludes them while keeping `.env.example` files tracked.

## License

Add a license before publishing if you want others to reuse this project.
