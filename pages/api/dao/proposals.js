// /src/pages/api/dao/proposals.js

let proposals = [];

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      return res.status(200).json(proposals);

    case "POST":
      const newProposal = req.body;
      if (!newProposal.title || !newProposal.target || !newProposal.action) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      proposals.push({ ...newProposal, votes: 0, status: "pending" });
      return res.status(201).json({ message: "Proposal added" });

    case "PUT":
      const { index, vote } = req.body;
      if (typeof index !== "number" || !["up", "down"].includes(vote)) {
        return res.status(400).json({ error: "Invalid vote update" });
      }
      if (!proposals[index]) return res.status(404).json({ error: "Proposal not found" });
      proposals[index].votes += vote === "up" ? 1 : -1;
      return res.status(200).json({ message: "Vote recorded" });

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
