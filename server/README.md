# WebManager - Backend Server

The backend service for **WebManager**, built with **Node.js**, **Express**, and **Mongoose** (MongoDB). It provides a secure REST API for managing users, projects, multi-tier components, deployments, and cloud providers.

---

## 🚀 Features

- **Authentication & Authorization**:
  - User registration, login, and profile updates.
  - JWT (JSON Web Tokens) with 7-day expiration.
  - Password hashing with `bcrypt` (10 salt rounds).
- **Project & Component Architecture**:
  - Create and manage projects with custom tags, frameworks, and metadata.
  - Subdocument management for components (`frontend`, `backend`, `database`, `worker`, `mobile`, `other`).
  - Deployment tracking per component (`production`, `staging`, `development`, `preview`, `other`) with live URLs and provider details.
- **Provider Registry**:
  - Global cloud/infrastructure provider tracking per user.
- **Database Seeding & Reset Utilities**:
  - Built-in seed scripts for quick bootstrap.

---

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express 4
- **Database**: MongoDB (via Mongoose ODM)
- **Security**: `bcrypt`, `jsonwebtoken`
- **Utilities**: `dotenv`, `cookie-parser`, `cors`, `morgan`

---

## 📂 Project Structure

```
server/
├── app.js               # Express application configuration and middleware
├── bin/
│   └── www              # HTTP server entrypoint & MongoDB connection lifecycle
├── middleware/
│   └── auth.js          # JWT authentication middleware
├── models/
│   ├── Project.js       # Project, Component, and Deployment Mongoose schemas
│   ├── Provider.js      # Infrastructure Provider schema
│   └── User.js          # User schema with pre-save password hashing
├── routes/
│   ├── index.js         # Root routes
│   ├── projects.js      # Project & sub-resource CRUD operations
│   ├── providers.js     # Cloud provider CRUD operations
│   └── users.js         # Auth routes (register, login, profile)
├── seed.js              # Initial database seed (creates admin user)
├── wipe.js              # Database reset utility
├── .env.example         # Environment template
└── package.json
```

---

## ⚙️ Environment Variables

Create a `.env` file in the `server` directory (copied from `.env.example`):

```bash
cp .env.example .env
```

| Variable | Description | Example |
| :--- | :--- | :--- |
| `PORT` | Port the Express server listens on | `5000` |
| `MONGODB_URI` | MongoDB connection string (Local or MongoDB Atlas) | `mongodb+srv://<user>:<password>@cluster0.xxx.mongodb.net/project-manager` |
| `JWT_SECRET` | Secret key used to sign and verify JSON Web Tokens | `your_strong_secret_key_here` |

> [!CAUTION]
> Never commit `.env` or any production database credentials to version control. Keep `.env` listed in `.gitignore`.

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Seed the Database (Optional)
Creates a default administrator account (`admin@admin.com` / `admin`):
```bash
node seed.js
```

### 3. Run the Server
```bash
npm start
```

The server will start on `http://localhost:5000` (or your configured `PORT`).

---

## 📡 REST API Reference

### Health Check
- `GET /api/health` - Check server health status (`{ "ok": true }`)

### Authentication (`/api/users`)
- `POST /api/users/register` - Register a new user (`name`, `email`, `password`)
- `POST /api/users/login` - Authenticate user and receive JWT token (`email`, `password`)
- `GET /api/users/me` - Get current authenticated user details *(Requires Auth)*
- `PUT /api/users/me` - Update current user profile or change password *(Requires Auth)*

### Projects (`/api/projects`) *(All require Auth)*
- `GET /api/projects` - Get all projects owned by the authenticated user
- `POST /api/projects` - Create a new project
- `GET /api/projects/:projectId` - Get a single project by ID
- `PUT /api/projects/:projectId` - Update project details
- `DELETE /api/projects/:projectId` - Delete project
- `POST /api/projects/:projectId/components` - Add component to project
- `PUT /api/projects/:projectId/components/:componentId` - Update component
- `POST /api/projects/:projectId/components/:componentId/deployments` - Add deployment
- `PUT /api/projects/:projectId/components/:componentId/deployments/:deploymentId` - Update deployment

### Providers (`/api/providers`) *(All require Auth)*
- `GET /api/providers` - Get all saved infrastructure providers
- `POST /api/providers` - Add a new provider
- `PUT /api/providers/:id` - Update provider
- `DELETE /api/providers/:id` - Delete provider

---

## 🔒 Security Best Practices

1. **Authentication Header**: Send your token as `Authorization: Bearer <token>` in all authenticated requests.
2. **Credential Rotation**: If database credentials or JWT secrets are ever accidentally exposed, rotate them immediately in MongoDB Atlas and update your environment variables.
