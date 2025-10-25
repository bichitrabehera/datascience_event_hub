const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../database.js");
const upload = require("../middleware/multer.middleware.js");
const cloudinary = require("../utils/cloudinary.js");
const streamifier = require("streamifier");

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

const router = express.Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  let token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    token = req.query.token; // Check query param if header not present
  }
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.admin = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

// ---------------- AUTH ROUTES ----------------
router.post("/auth/register", async (req, res) => {
  try {
    const { username, email, password, role = "admin" } = req.body;
    if (!username || !email || !password)
      return res
        .status(400)
        .json({ error: "Username, email, and password are required" });

    const adminCountResult = await pool.query("SELECT COUNT(*) FROM admins");
    const adminCount = parseInt(adminCountResult.rows[0].count);

    if (adminCount === 0) {
      // First admin is superadmin
      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.query(
        "INSERT INTO admins (username, email, password, role) VALUES ($1, $2, $3, $4)",
        [username, email, hashedPassword, "superadmin"]
      );
      return res.json({ message: "Superadmin registered successfully" });
    }

    // Only superadmin can create new admins
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token)
      return res.status(401).json({ error: "Authorization required" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified.role !== "superadmin")
      return res
        .status(403)
        .json({ error: "Only superadmin can register new admins" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO admins (username, email, password, role) VALUES ($1, $2, $3, $4)",
      [username, email, hashedPassword, role]
    );

    res.json({ message: "Admin registered successfully" });
  } catch (err) {
    console.error(err);
    if (err.code === "23505")
      res.status(400).json({ error: "Username or email already exists" });
    else res.status(500).json({ error: "Server error" });
  }
});

router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password are required" });

    const result = await pool.query("SELECT * FROM admins WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0)
      return res.status(400).json({ error: "Invalid credentials" });

    const admin = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword)
      return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: admin.id, role: admin.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------- EVENT ROUTES ----------------

// Create event
router.post(
  "/events",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const {
        title,
        description,
        starts_at,
        ends_at,
        location,
        category = "general",
        amount = 0,
        forms_link,
      } = req.body;
      if (!title || !description || !starts_at || !ends_at || !location)
        return res.status(400).json({ error: "All fields are required" });

      let imageUrl = null;

      if (req.file) {
        // Upload image to Cloudinary
        imageUrl = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "events" },
            (err, result) => {
              if (err) reject(err);
              else resolve(result.secure_url);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
        });
      }

      const dbResult = await pool.query(
        `INSERT INTO events
       (title, description, starts_at, ends_at, location, category, amount, image_url, forms_link, created_by)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       RETURNING *`,
        [
          title,
          description,
          starts_at,
          ends_at,
          location,
          category,
          amount,
          imageUrl,
          forms_link,
          req.admin.id,
        ]
      );

      res.json(dbResult.rows[0]);
    } catch (err) {
      console.error("Error creating event:", err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Update event (supports image)
router.put("/events/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      starts_at,
      ends_at,
      location,
      category = "general",
      amount = 0,
      forms_link,
    } = req.body;

    if (!title || !description || !starts_at || !ends_at || !location) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Get existing event
    const existing = await pool.query("SELECT * FROM events WHERE id=$1", [id]);
    if (existing.rows.length === 0)
      return res.status(404).json({ error: "Event not found" });

    let imageUrl = existing.rows[0].image_url;

    // Upload new image if provided
    if (req.file) {
      imageUrl = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "events" },
          (err, result) => {
            if (err) reject(err);
            else resolve(result.secure_url);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });
    }

    // Update event
    const result = await pool.query(
      `UPDATE events
       SET title=$1, description=$2, starts_at=$3, ends_at=$4, location=$5, category=$6, amount=$7, image_url=$8, forms_link=$9
       WHERE id=$10
       RETURNING *`,
      [
        title,
        description,
        starts_at,
        ends_at,
        location,
        category,
        amount,
        imageUrl,
        forms_link,
        id,
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating event:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete event
router.delete("/events/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Delete registrations first
    await pool.query("DELETE FROM registrations WHERE event_id = $1", [id]);

    // Delete form submissions
    await pool.query("DELETE FROM form_submissions WHERE event_id = $1", [id]);

    // Delete rsvps
    await pool.query("DELETE FROM rsvps WHERE event_id = $1", [id]);

    // Then delete the event itself
    const result = await pool.query(
      "DELETE FROM events WHERE id=$1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Event not found" });

    res.json({ message: "Event and related data deleted successfully" });
  } catch (err) {
    console.error("Error deleting event:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// View registrations
router.get("/events/:id/registrations", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM registrations WHERE event_id=$1",
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Export registrations as XLSX
router.get("/events/:id/export", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM registrations WHERE event_id=$1",
      [id]
    );

    const XLSX = require("xlsx");
    const ws = XLSX.utils.json_to_sheet(result.rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Registrations");
    const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=registrations.xlsx"
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Event form routes
router.post("/events/:id/form", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { form_data } = req.body;

    if (!form_data || !Array.isArray(form_data))
      return res
        .status(400)
        .json({ error: "Form data must be an array of fields" });

    const existingForm = await pool.query(
      "SELECT id FROM event_forms WHERE event_id=$1",
      [id]
    );

    if (existingForm.rows.length > 0) {
      await pool.query(
        "UPDATE event_forms SET form_data=$1, updated_at=CURRENT_TIMESTAMP WHERE event_id=$2",
        [JSON.stringify(form_data), id]
      );
    } else {
      await pool.query(
        "INSERT INTO event_forms (event_id, form_data) VALUES ($1,$2)",
        [id, JSON.stringify(form_data)]
      );
    }

    res.json({ message: "Event form saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/events/:id/form", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT form_data FROM event_forms WHERE event_id=$1",
      [id]
    );
    if (result.rows.length === 0) return res.json({ form_data: [] });
    res.json({ form_data: result.rows[0].form_data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/events/:id/submissions", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM form_submissions WHERE event_id=$1 ORDER BY submitted_at DESC",
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
