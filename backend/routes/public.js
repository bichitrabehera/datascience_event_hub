const express = require("express");
const pool = require("../database");
const router = express.Router();

// Get all events
router.get("/events", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM events ORDER BY starts_at ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get event details
router.get("/events/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM events WHERE id = $1", [id]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Event not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get event form fields
router.get("/events/:id/form", async (req, res) => {
  try {
    const { id } = req.params;
    const formResult = await pool.query(
      "SELECT form_data FROM event_forms WHERE event_id = $1",
      [id]
    );
    if (formResult.rows.length === 0) return res.json({ form_data: [] });
    res.json({ form_data: formResult.rows[0].form_data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Register for an event
router.post("/events/:id/register", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, year, department, usn, phone_number, form_data } =
      req.body;

    // Basic validation
    if (!name || !email || !year || !department || !usn || !phone_number) {
      return res.status(400).json({
        error:
          "Name, email, year, department, USN, and phone number are required",
      });
    }

    // Check event exists
    const eventResult = await pool.query("SELECT * FROM events WHERE id = $1", [
      id,
    ]);
    if (eventResult.rows.length === 0)
      return res.status(404).json({ error: "Event not found" });

    // Check if event has a custom form
    const formResult = await pool.query(
      "SELECT form_data FROM event_forms WHERE event_id = $1",
      [id]
    );

    if (
      formResult.rows.length > 0 &&
      (!form_data || typeof form_data !== "object")
    ) {
      return res
        .status(400)
        .json({ error: "Form data is required for this event" });
    }

    // Insert into registrations table
    const regResult = await pool.query(
      `INSERT INTO registrations
        (event_id, name, email, year, department, usn, phone_number)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING *`,
      [id, name, email, year, department, usn, phone_number]
    );
    console.log("Registration inserted:", regResult.rows[0]);

    // Insert into form_submissions if custom form exists
    if (formResult.rows.length > 0) {
      await pool.query(
        `INSERT INTO form_submissions
          (event_id, user_name, user_email, form_data)
         VALUES ($1,$2,$3,$4)`,
        [id, name, email, JSON.stringify(form_data || {})]
      );
      console.log("Form submission inserted for event:", id);
    }

    res.json({ message: "Registration successful" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
