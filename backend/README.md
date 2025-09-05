# EventHub

A professional event management system with user and admin sides, built with Node.js/Express backend and HTML/CSS frontend.

## Features

### User Side
- View all events
- View event details
- Register for events

### Admin Side
- Admin authentication with JWT
- Create, edit, delete events
- View event registrations
- Export registrations to Excel

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env`:
   ```
   DATABASE_URL=your_neon_db_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=3000
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Access the application:
   - User side: http://localhost:3000/user/index.html
   - Admin login: http://localhost:3000/admin/login.html

## Database

The application uses PostgreSQL (Neon DB) with the following tables:
- `events`: Event information
- `registrations`: User registrations for events
- `admins`: Admin users

Tables are created automatically on server start.

## Testing

Run the test script to verify all backend endpoints:
```bash
node test.js
```

Note: Make sure the server is running before running tests.

## Project Structure

```
eventhub/
├── server.js          # Main server file
├── database.js        # Database connection
├── routes/
│   ├── public.js      # Public API routes
│   └── admin.js       # Admin API routes
├── public/
│   ├── user/
│   │   ├── index.html     # User event listing
│   │   └── event.html     # User event details
│   ├── admin/
│   │   ├── login.html     # Admin login
│   │   └── dashboard.html # Admin dashboard
│   └── styles.css         # CSS styles
├── test.js            # API test script
├── package.json
├── .env
└── README.md
```

## API Endpoints

### Public
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event details
- `POST /api/events/:id/register` - Register for event

### Admin
- `POST /api/admin/auth/register` - Register admin
- `POST /api/admin/auth/login` - Login admin
- `POST /api/admin/events` - Create event
- `PUT /api/admin/events/:id` - Update event
- `DELETE /api/admin/events/:id` - Delete event
- `GET /api/admin/events/:id/registrations` - View registrations
- `GET /api/admin/events/:id/export` - Export registrations
