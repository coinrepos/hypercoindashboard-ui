import React, { useEffect, useState } from "react";
import { executeTask } from "../Kredsdao";
import { FaVoteYea, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";

export default function ProposalList({ account }) {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProposals = async () => {
    setLoading(true);
    try {
      const result = await executeTask({ name: "GET_PROPOSAL_LIST" }, account);
      setProposals(result || []);
    } catch (err) {
      toast.error("Failed to fetch proposals.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  const vote = async (id, support) => {
    await executeTask({ name: "PROPOSAL_VOTE", payload: { proposalId: id, support } }, account);
    fetchProposals();
  };

  const execute = async (id) => {
    await executeTask({ name: "EXECUTE_PROPOSAL", payload: { proposalId: id } }, account);
    fetchProposals();
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">📋 Live Proposals</h2>
      {loading ? (
        <p className="text-gray-400">Loading proposals...</p>
      ) : proposals.length === 0 ? (
        <p className="text-gray-500">No proposals found.</p>
      ) : (
        <div className="space-y-4">
          {proposals.map((p, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <div className="mb-2 text-lg font-semibold">{p.description}</div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Status:{" "}
                {p.executed ? (
                  <span className="text-green-400 font-bold">✅ Executed</span>
                ) : (
                  <span className="text-yellow-400">🕒 Pending</span>
                )}
              </p>
              <div className="mt-2 flex gap-3">
                {!p.executed && (
                  <>
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                      onClick={() => vote(p.id, true)}
                    >
                      👍 Yes
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                      onClick={() => vote(p.id, false)}
                    >
                      👎 No
                    </button>
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                      onClick={() => execute(p.id)}
                    >
                      🏁 Execute
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
