const express = require('express');
const pool = require('../database');
const router = express.Router();

router.get('/events', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY starts_at ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/events/:id/form', async (req, res) => {
  try {
    const { id } = req.params;

    const eventResult = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
    if (eventResult.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const formResult = await pool.query('SELECT form_data FROM event_forms WHERE event_id = $1', [id]);

    if (formResult.rows.length === 0) {
      return res.json({ form_data: [] });
    }

    res.json({ form_data: formResult.rows[0].form_data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/events/:id/register', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, form_data } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const eventResult = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
    if (eventResult.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const formResult = await pool.query('SELECT form_data FROM event_forms WHERE event_id = $1', [id]);
    if (formResult.rows.length > 0) {
      if (!form_data || typeof form_data !== 'object') {
        return res.status(400).json({ error: 'Form data is required for this event' });
      }
    }

    const regResult = await pool.query('INSERT INTO registrations (name, email, event_id) VALUES ($1, $2, $3) RETURNING *', [name, email, id]);
    console.log('Registration inserted:', regResult.rows[0]);

    if (formResult.rows.length > 0) {
      const formSubmissionResult = await pool.query('INSERT INTO form_submissions (event_id, user_name, user_email, form_data) VALUES ($1, $2, $3, $4) RETURNING *', [id, name, email, JSON.stringify(form_data)]);
      console.log('Form submission inserted:', formSubmissionResult.rows[0]);
    }

    res.json({ message: 'Registration successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
