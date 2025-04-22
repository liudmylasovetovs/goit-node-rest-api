# GOIT Node.js REST API

## 🔧 Project Overview
This is a RESTful API built with **Node.js**, **Express**, **Sequelize**, and **JWT authentication**. It supports:
- User registration and login
- Secure authentication with JWT
- Contact management (CRUD)
- Joi validation and proper error handling

---

## 📁 Folder Structure
```
.
├── app.js                  # Main entry point
├── routes                  # Route definitions
│   ├── authRouter.js
│   └── contactsRouter.js
├── controllers             # Route handlers
│   ├── authControllers.js
│   └── contactsControllers.js
├── services                # Business logic
│   ├── authServices.js
│   └── contactsServices.js
├── db                      # Sequelize config & models
│   ├── Sequelize.js
│   └── models
│       ├── user.js
│       └── contact.js
├── schemas                 # Joi schemas
│   ├── authSchemas.js
│   └── contactsSchemas.js
├── middlewares             # Custom middlewares
│   └── authenticate.js
├── helpers                 # Utility functions
│   ├── HttpError.js
│   ├── jwt.js
│   └── validateBody.js
└── .env                    # Environment variables
```

---

## 🚀 Getting Started

1. **Clone the repository:**
```bash
git clone https://github.com/liudmylasovetovs/goit-node-rest-api.git
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
Create a `.env` file based on `.env.example`:
```
PORT=3000
DB_URL=<your_database_url>
JWT_SECRET=<your_jwt_secret>
```

4. **Run the server:**
```bash
npm run dev
```

---

## 🔐 Authentication Routes

### `POST /api/auth/register`
Register a new user.
```json
{
  "email": "example@example.com",
  "password": "examplepassword"
}
```
Response: `201 Created`

### `POST /api/auth/login`
Log in a registered user.
```json
{
  "email": "example@example.com",
  "password": "examplepassword"
}
```
Response: `200 OK` + JWT token

### `POST /api/auth/logout`
Log out a user. Requires JWT in header.

### `GET /api/auth/current`
Get current logged-in user info. Requires JWT.

---

## 📇 Contact Routes (require JWT)

### `GET /api/contacts`
List all contacts of the logged-in user.

### `GET /api/contacts/:id`
Get contact by ID.

### `POST /api/contacts`
Create a new contact.
```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "phone": "1234567890"
}
```

### `PUT /api/contacts/:id`
Update contact data.

### `PATCH /api/contacts/:id/favorite`
Update `favorite` field.
```json
{
  "favorite": true
}
```

### `DELETE /api/contacts/:id`
Delete a contact.

---

## ✅ Validation
All incoming data is validated using **Joi** schemas. If the body is invalid, the API returns:
```json
{
  "message": "Помилка від Joi або іншої бібліотеки валідації"
}
```

---

## ⚠️ Error Handling
Custom errors handled via `HttpError.js`:

| Status | Description                |
|--------|----------------------------|
| 400    | Joi validation error       |
| 401    | Unauthorized               |
| 404    | Resource not found         |
| 409    | Email already registered   |

---

