// backend/queue.js
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;
app.use(cors());

const upload = multer({ dest: "uploads/" });

app.post("/upload-schedule", upload.single("file"), (req, res) => {
  const { file } = req;
  const { date } = req.body;

  if (!file || !date) {
    return res.status(400).json({ error: "Missing file or date" });
  }

  const mirrorId = `${file.filename}-${Date.now()}`;
  const scheduledPath = path.join("scheduled", mirrorId);

  fs.mkdirSync("scheduled", { recursive: true });
  fs.renameSync(file.path, scheduledPath);

  console.log(`📦 Scheduled ${file.originalname} for ${date} under mirrorId ${mirrorId}`);

  res.json({ success: true, date, mirrorId });
});

app.listen(PORT, () => console.log(`⚙️ Upload scheduler backend running at http://localhost:${PORT}`));
