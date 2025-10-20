const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pool = require("./database.js");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

const initDB = async () => {
  try {
    const adminTableExists = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'admins'
      );
    `);

    if (!adminTableExists.rows[0].exists) {
      await pool.query(`
        CREATE TABLE admins (
          id SERIAL PRIMARY KEY,
          username VARCHAR(255) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(50) DEFAULT 'admin',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      await pool.query(`
        CREATE TABLE events (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          image_url TEXT,
          starts_at TIMESTAMP NOT NULL,
          ends_at TIMESTAMP NOT NULL,
          location VARCHAR(255) NOT NULL,
          category VARCHAR(100) DEFAULT 'general',
          amount DECIMAL(10,2) DEFAULT 0,
          created_by INTEGER REFERENCES admins(id),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      await pool.query(`
        CREATE TABLE registrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        year VARCHAR(10) NOT NULL,
        department VARCHAR(50) NOT NULL,
        usn VARCHAR(20) NOT NULL,
        phone_number VARCHAR(15) NOT NULL,
        event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
        registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT unique_registration UNIQUE (event_id, usn) -- prevent duplicate registration per event
        );
      `);

      await pool.query(`
        CREATE TABLE event_forms (
          id SERIAL PRIMARY KEY,
          event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
          form_data JSONB NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      await pool.query(`
        CREATE TABLE form_submissions (
          id SERIAL PRIMARY KEY,
          event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
          user_name VARCHAR(255) NOT NULL,
          user_email VARCHAR(255) NOT NULL,
          form_data JSONB NOT NULL,
          submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log("Database tables created");
    } else {
      const eventFormsExists = await pool.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables
          WHERE table_name = 'event_forms'
        );
      `);

      if (!eventFormsExists.rows[0].exists) {
        await pool.query(`
          CREATE TABLE event_forms (
            id SERIAL PRIMARY KEY,
            event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
            form_data JSONB NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        `);

        await pool.query(`
          CREATE TABLE form_submissions (
            id SERIAL PRIMARY KEY,
            event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
            user_name VARCHAR(255) NOT NULL,
            user_email VARCHAR(255) NOT NULL,
            form_data JSONB NOT NULL,
            submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        `);
        console.log("Missing tables created");
      } else {
        console.log("Using existing database tables");
      }
    }
  } catch (err) {
    console.error("Error initializing database:", err);
  }
};

app.get("/", (req, res) => {
  res.send("Server running");
});

const publicRoutes = require("./routes/public.js");
const adminRoutes = require("./routes/admin.js");

app.use("/api", publicRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, async () => {
  await initDB();
  console.log(`Server running on port ${PORT}`);
});
