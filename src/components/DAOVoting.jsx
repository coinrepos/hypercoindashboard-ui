import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatDistanceToNow } from "date-fns";

export default function DAOVoting() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProposals = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/dao/proposals");
      const data = await res.json();
      setProposals(data.reverse()); // newest first
    } catch (err) {
      toast.error("Failed to load proposals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
    const interval = setInterval(fetchProposals, 15000); // Auto-refresh every 15s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <ToastContainer position="top-right" autoClose={4000} />
      <h1 className="text-3xl font-bold mb-6 text-cyan-400">🗳 Live DAO Proposals</h1>

      {loading && <p className="text-sm mb-4 text-gray-300">Loading proposals...</p>}

      {proposals.length === 0 && !loading && (
        <p className="text-gray-500">No proposals submitted yet.</p>
      )}

      <div className="space-y-4">
        {proposals.map((p, i) => (
          <Card
            key={i}
            className="bg-slate-800 text-white border border-slate-700 shadow-lg transition-all hover:scale-[1.01]"
          >
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{p.title}</h2>
                <Badge className="bg-cyan-700 text-white">
                  {formatDistanceToNow(new Date(p.createdAt))} ago
                </Badge>
              </div>

              <p className="text-sm text-slate-300 italic">{p.description}</p>
              <div className="text-xs mt-2">
                <strong>Target:</strong> <code>{p.target}</code>
              </div>
              <div className="text-xs break-all">
                <strong>Action Data:</strong> <code>{p.action}</code>
              </div>

              <Button
                size="sm"
                variant="outline"
                className="mt-3 border-cyan-500 text-cyan-300 hover:bg-cyan-800"
                onClick={() => navigator.clipboard.writeText(p.action)}
              >
                📋 Copy Action
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}