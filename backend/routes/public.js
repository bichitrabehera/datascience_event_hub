const express = require("express");
const pool = require("../database");
const router = express.Router();

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

router.get("/events/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM events WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/events/:id/form", async (req, res) => {
  try {
    const { id } = req.params;

    const eventResult = await pool.query("SELECT * FROM events WHERE id = $1", [
      id,
    ]);
    if (eventResult.rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    const formResult = await pool.query(
      "SELECT form_data FROM event_forms WHERE event_id = $1",
      [id]
    );

    if (formResult.rows.length === 0) {
      return res.json({ form_data: [] });
    }

    res.json({ form_data: formResult.rows[0].form_data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

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

    // Check if event exists
    const eventResult = await pool.query("SELECT * FROM events WHERE id = $1", [
      id,
    ]);
    if (eventResult.rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Check if this event requires additional form data
    const formResult = await pool.query(
      "SELECT form_data FROM event_forms WHERE event_id = $1",
      [id]
    );
    if (formResult.rows.length > 0) {
      if (!form_data || typeof form_data !== "object") {
        return res
          .status(400)
          .json({ error: "Form data is required for this event" });
      }
    }

    // Insert into registrations table
    const regResult = await pool.query(
      `INSERT INTO registrations
        (name, email, year, department, usn, phone_number, event_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [name, email, year, department, usn, phone_number, id]
    );
    console.log("Registration inserted:", regResult.rows[0]);

    // Insert into form_submissions if required
    if (formResult.rows.length > 0) {
      const formSubmissionResult = await pool.query(
        `INSERT INTO form_submissions
          (event_id, user_name, user_email, form_data)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [id, name, email, JSON.stringify(form_data)]
      );
      console.log("Form submission inserted:", formSubmissionResult.rows[0]);
    }

    res.json({ message: "Registration successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
