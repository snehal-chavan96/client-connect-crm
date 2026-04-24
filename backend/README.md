# 🚀 Client Connect CRM - Backend

Minimal backend boilerplate for Client Connect CRM system.

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js              ← MongoDB connection
├── controllers/           ← Request handlers (placeholders)
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── lead.controller.js
│   ├── ticket.controller.js
│   └── project.controller.js
├── models/                ← Mongoose schemas
│   ├── User.js
│   ├── Lead.js
│   ├── Ticket.js
│   └── Project.js
├── routes/                ← Route definitions (placeholders)
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── lead.routes.js
│   ├── ticket.routes.js
│   └── project.routes.js
├── middleware/            ← Express middleware (placeholders)
│   └── auth.middleware.js
├── utils/                 ← Utility functions
├── server.js              ← Express server setup
├── .env                   ← Environment variables
├── package.json           ← Dependencies
└── .gitignore
```

## 🛠️ Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Update .env
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/client-connect-crm
NODE_ENV=development
```

### 3. Start Server
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

## ✅ Available Routes (Test)

- `GET /api/health` - Server health check
- `GET /api/auth/test` - Auth routes test
- `GET /api/users/test` - User routes test
- `GET /api/leads/test` - Lead routes test
- `GET /api/tickets/test` - Ticket routes test
- `GET /api/projects/test` - Project routes test

## 📋 Next Steps

This is a minimal boilerplate. To implement features:

1. **Implement Controllers** - Add logic to controller files
2. **Setup Routes** - Connect routes to controllers
3. **Add Middleware** - Implement authentication middleware
4. **Add Validation** - Validate incoming data
5. **Error Handling** - Implement comprehensive error handling
6. **Testing** - Add unit and integration tests

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **nodemon** - Development server restart

## 🔐 Security Notes

- Add input validation before implementation
- Implement proper error handling
- Use environment variables for sensitive data
- Add authentication middleware
- Implement rate limiting
- Add request/response logging
- Use HTTPS in production

## 📝 Data Models

### User
```
- name (String, required)
- email (String, required, unique)
- password (String, required)
- role (String: admin/client, default: client)
```

### Lead
```
- name (String, required)
- company (String, required)
- email (String, required)
- phone (String, required)
- service (String, required)
- status (String: new/contacted/converted/closed, default: new)
```

### Ticket
```
- subject (String, required)
- description (String, required)
- status (String: open/in-progress/resolved, default: open)
- priority (String: Low/Medium/High, default: Medium)
- clientId (ObjectId, ref: User)
```

### Project
```
- name (String, required)
- status (String: planning/in-progress/completed, default: planning)
- progress (Number: 0-100, default: 0)
- clientId (ObjectId, ref: User)
```

---

**Status:** Boilerplate Ready for Implementation  
**Version:** 1.0.0
