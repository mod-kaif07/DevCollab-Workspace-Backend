# DevCollab Backend API

A robust backend for DevCollab, a collaborative development platform. This backend is built with Node.js, Express, and MongoDB, providing RESTful APIs for user authentication, project management, messaging, and AI-powered features.

---

## Table of Contents
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [User Routes](#user-routes)
  - [Project Routes](#project-routes)
  - [Message Routes](#message-routes)
  - [AI Routes](#ai-routes)
- [Middleware](#middleware)
- [Database](#database)
- [Socket Integration](#socket-integration)
- [License](#license)

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Configure environment:**
   - Copy `.env.example` to `.env` and set your variables.
3. **Run the server:**
   ```bash
   npm start
   ```

---

## Environment Variables

- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT authentication
- `PORT` - Port to run the server (default: 5000)

---

## API Endpoints

### User Routes (`/users`)

| Method | Endpoint         | Description                       | Auth Required |
|--------|------------------|-----------------------------------|--------------|
| POST   | `/register`      | Register a new user               | No           |
| POST   | `/login`         | Login and receive JWT             | No           |
| GET    | `/profile`       | Get current user profile          | Yes          |
| GET    | `/logout`        | Logout current user               | Yes          |
| GET    | `/all`           | Get all users (admin/for testing) | Yes          |

### Project Routes (`/projects`)

| Method | Endpoint              | Description                                 | Auth Required |
|--------|-----------------------|---------------------------------------------|--------------|
| POST   | `/create`             | Create a new project                        | Yes          |
| GET    | `/all`                | Get all projects for the user               | Yes          |
| PUT    | `/add-user`           | Add users to a project                      | Yes          |
| GET    | `/get-project/:id`    | Get project details by ID                   | Yes          |
| PUT    | `/update-file-tree`   | Update the file tree for a project          | Yes          |

### Message Routes (`/messages`)

| Method | Endpoint                   | Description                        | Auth Required |
|--------|----------------------------|------------------------------------|--------------|
| POST   | `/create`                  | Create a message in a project      | Yes          |
| GET    | `/project/:projectId`      | Get all messages for a project     | Yes          |

### AI Routes (`/ai`)

| Method | Endpoint        | Description                  | Auth Required |
|--------|-----------------|------------------------------|--------------|
| GET    | `/get-result`   | Get AI-generated result      | No           |

---

## Middleware
- **auth.middleware.js**: Protects routes using JWT authentication.
- **Validation**: Uses `express-validator` for request validation.

## Database
- **MongoDB**: All data is stored in MongoDB. Connection handled in `db/db.js`.

## Socket Integration
- Real-time features are handled in `socket/socket.js` (e.g., for live collaboration).

## Folder Structure
- `controllers/` - Route logic
- `models/` - Mongoose schemas
- `routes/` - API route definitions
- `services/` - Business logic
- `middleware/` - Authentication and validation
- `db/` - Database connection
- `socket/` - Real-time communication

## License

This project is licensed under the MIT License.
