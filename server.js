const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3001;

const proposalsPath = path.join(__dirname, "proposals.json");

app.use(express.json());

app.get("/api/dao/proposals", (req, res) => {
  if (!fs.existsSync(proposalsPath)) {
    return res.json([]);
  }
  const data = fs.readFileSync(proposalsPath);
  res.json(JSON.parse(data));
});

app.post("/api/dao/proposals", (req, res) => {
  const proposal = req.body;
  let proposals = [];
  if (fs.existsSync(proposalsPath)) {
    proposals = JSON.parse(fs.readFileSync(proposalsPath));
  }
  proposals.push(proposal);
  fs.writeFileSync(proposalsPath, JSON.stringify(proposals, null, 2));
  res.status(200).json({ success: true });
});

app.listen(PORT, () => {
  console.log(`🧠 DAO server listening on http://localhost:${PORT}`);
});
