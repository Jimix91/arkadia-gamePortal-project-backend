# Arkadia Game Portal - Backend

## Description

**Arkadia Game Portal** is a full-stack web application that allows users to explore, review, and manage a catalog of video games. This repository contains the **Backend API** built with **Express.js** and **MongoDB**.

**IMPORTANT:** This is the **BACKEND** (Express API) repository. The frontend code is a separate React application.

The backend provides RESTful endpoints for:
- User authentication (signup, login, Google OAuth)
- Game management (CRUD operations)
- Review management (create, read, update, delete reviews)
- Admin panel functionality (user management)

> **Frontend Repository:** The frontend code (React) can be found here: [arkadia-gamePortal-project-frontend](../arkadia-gamePortal-project-frontend)

---

## Instructions to Run Locally

### 1. Clone the Repository

```bash
git clone <repository-url>
cd arkadia-gamePortal-project/arkadia-gamePortal-project-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment Variables

Create a `.env` file in the root directory of the backend folder with the following variables:

```env
# Port - The port on which the backend server will run (default: 5005)
PORT=5005

# Frontend URL (for CORS) - The URL of your frontend application
ORIGIN=http://localhost:3000

# MongoDB Connection - Local development or MongoDB Atlas cloud connection
MONGODB_URI=mongodb://127.0.0.1:27017/arkadia-gamePortal-project-backend

# JWT Secret - A secret key used to sign JWT tokens for authentication
# Generate a strong random string using: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
TOKEN_SECRET=your_super_secret_jwt_key_change_me_in_production

# Google OAuth - Your Google Client ID for authentication
# Get this from: https://console.cloud.google.com/
GOOGLE_CLIENT_ID=your_google_client_id_here
```

**Important Environment Variables Explanation:**

- **PORT**: The port on which the backend server will run (default: 5005)
- **ORIGIN**: The URL of your frontend application (for CORS configuration). Use `http://localhost:3000` for local development
- **MONGODB_URI**: Connection string to your MongoDB database
  - For **local development**: `mongodb://127.0.0.1:27017/arkadia-gamePortal-project-backend`
  - For **production**: Use MongoDB Atlas connection string: `mongodb+srv://username:password@cluster.mongodb.net/arkadia-gamePortal-project-backend`
  - To set up MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- **TOKEN_SECRET**: A secret key used to sign JWT tokens. Generate a strong random string and keep it secret
- **GOOGLE_CLIENT_ID**: Your Google OAuth 2.0 Client ID
  - To get this:
    1. Go to [Google Cloud Console](https://console.cloud.google.com/)
    2. Create a new project or select an existing one
    3. Enable the Google+ API
    4. Create OAuth 2.0 credentials (Web application)
    5. Copy your Client ID
    6. Add authorized redirect URIs: `http://localhost:5005` (local) and your production URL

### 4. Start the Development Server

```bash
npm run dev
```

For production:
```bash
npm start
```

The server will run on `http://localhost:5005`

---

## Demo

- **Frontend:** https://arkadia-game-portal-project-frontend.vercel.app/
- **Backend API:** https://arkadia-game-portal-project-backend.vercel.app/

You can test the API endpoints using Postman or Thunder Client.

---

## API Endpoints Documentation

All API responses are in JSON format. Authentication is required for protected endpoints (marked with 🔒).

### Base URL
```
http://localhost:5005/api
```

---

### **Authentication Routes**

#### 1. Sign Up
- **URL:** `/auth/signup`
- **Method:** `POST`
- **Description:** Create a new user account
- **Body:**
```json
{
  "email": "user@example.com",
  "password": "Password123",
  "name": "John Doe"
}
```
- **Response:** `201 Created`
```json
{
  "user": {
    "_id": "...",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### 2. Log In
- **URL:** `/auth/login`
- **Method:** `POST`
- **Description:** Authenticate user and receive JWT token
- **Body:**
```json
{
  "email": "user@example.com",
  "password": "Password123"
}
```
- **Response:** `200 OK`
```json
{
  "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 3. Verify Token 🔒
- **URL:** `/auth/verify`
- **Method:** `GET`
- **Description:** Verify current JWT token and get user info
- **Headers:** `Authorization: Bearer <token>`
- **Response:** `200 OK`
```json
{
  "_id": "...",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "user"
}
```

#### 4. Google OAuth Login/Signup
- **URL:** `/auth/google`
- **Method:** `POST`
- **Description:** Login/signup using Google credentials
- **Body:**
```json
{
  "credential": "google_id_token_here"
}
```
- **Response:** `200 OK`
```json
{
  "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### **Games Routes**

#### 1. Get All Games
- **URL:** `/games`
- **Method:** `GET`
- **Description:** Retrieve all games with optional platform filter
- **Query Parameters:**
  - `platform` (optional): Filter by platform (e.g., "PC", "PS5", "Xbox")
- **Response:** `200 OK`
```json
[
  {
    "_id": "...",
    "title": "The Legend of Zelda",
    "description": "Adventure game",
    "platforms": ["Nintendo Switch", "Wii U"],
    "releaseDate": "2017-03-03",
    "genre": "Adventure",
    "imageUrl": "...",
    "averageRating": 4.8,
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

#### 2. Get Game by ID
- **URL:** `/games/:gameId`
- **Method:** `GET`
- **Description:** Retrieve a specific game with full details
- **Response:** `200 OK`
```json
{
  "_id": "...",
  "title": "The Legend of Zelda",
  "description": "Adventure game",
  "platforms": ["Nintendo Switch", "Wii U"],
  "releaseDate": "2017-03-03",
  "genre": "Adventure",
  "imageUrl": "...",
  "averageRating": 4.8
}
```

#### 3. Create Game 🔒 (Admin Only)
- **URL:** `/games`
- **Method:** `POST`
- **Description:** Create a new game (admin only)
- **Headers:** `Authorization: Bearer <admin_token>`
- **Body:**
```json
{
  "title": "New Game",
  "description": "Game description",
  "platforms": ["PC", "PS5"],
  "releaseDate": "2024-01-22",
  "genre": "Action",
  "imageUrl": "https://..."
}
```
- **Response:** `201 Created`

#### 4. Update Game 🔒 (Admin Only)
- **URL:** `/games/:gameId`
- **Method:** `PUT`
- **Description:** Update an existing game (admin only)
- **Headers:** `Authorization: Bearer <admin_token>`
- **Body:** Same as Create Game
- **Response:** `200 OK`

#### 5. Delete Game 🔒 (Admin Only)
- **URL:** `/games/:gameId`
- **Method:** `DELETE`
- **Description:** Delete a game (admin only)
- **Headers:** `Authorization: Bearer <admin_token>`
- **Response:** `200 OK`

---

### **Reviews Routes**

#### 1. Get Reviews for a Game
- **URL:** `/reviews/game/:gameId`
- **Method:** `GET`
- **Description:** Get all reviews for a specific game with author information
- **Response:** `200 OK`
```json
[
  {
    "_id": "...",
    "content": "Amazing game!",
    "rating": 5,
    "author": {
      "_id": "...",
      "name": "John Doe"
    },
    "game": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

#### 2. Create Review 🔒
- **URL:** `/reviews/game/:gameId`
- **Method:** `POST`
- **Description:** Create a new review for a game
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "content": "Amazing game! Highly recommended.",
  "rating": 5
}
```
- **Response:** `201 Created`

#### 3. Update Review 🔒
- **URL:** `/reviews/:reviewId`
- **Method:** `PUT`
- **Description:** Update a review (only owner or admin)
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "content": "Updated review content",
  "rating": 4
}
```
- **Response:** `200 OK`

#### 4. Delete Review 🔒
- **URL:** `/reviews/:reviewId`
- **Method:** `DELETE`
- **Description:** Delete a review (only owner or admin)
- **Headers:** `Authorization: Bearer <token>`
- **Response:** `200 OK`

#### 5. Backfill Average Ratings
- **URL:** `/reviews/backfill-averages`
- **Method:** `POST`
- **Description:** Recalculate average ratings for all games
- **Response:** `200 OK`
```json
{
  "message": "Average ratings updated for all games"
}
```

---

### **Admin Routes** 🔒 (Admin Only)

#### 1. Get All Users
- **URL:** `/auth/admin/users`
- **Method:** `GET`
- **Description:** List all users (passwords excluded)
- **Headers:** `Authorization: Bearer <admin_token>`
- **Response:** `200 OK`

#### 2. Update User
- **URL:** `/auth/admin/users/:userId`
- **Method:** `PUT`
- **Description:** Update user information
- **Headers:** `Authorization: Bearer <admin_token>`
- **Body:**
```json
{
  "name": "New Name",
  "email": "newemail@example.com",
  "role": "admin"
}
```
- **Response:** `200 OK`

#### 3. Delete User
- **URL:** `/auth/admin/users/:userId`
- **Method:** `DELETE`
- **Description:** Delete a user account
- **Headers:** `Authorization: Bearer <admin_token>`
- **Response:** `200 OK`

---

## Technologies Used

- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT + Google OAuth
- **Security:** bcrypt (password hashing)
- **Environment:** Node.js

---

## Error Handling

All errors return appropriate HTTP status codes with JSON messages:

```json
{
  "message": "Error description",
  "error": "Detailed error info"
}
```

Common status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## Future Improvements

- [ ] Add pagination to game listings
- [ ] Implement search functionality
- [ ] Add user wishlist feature
- [ ] Email verification for signup
- [ ] Rate limiting for API requests
- [ ] Add game screenshots/gallery

---

## Author

Developed as part of Ironhack Module 3 Project

---

## License

This project is licensed under the MIT License.
