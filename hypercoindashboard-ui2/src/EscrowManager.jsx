// src/components/EscrowManager.jsx

import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/Button";
import { Label } from "./ui/label";
import { useHyperBot } from "../HyperBotContext";

export default function EscrowManager() {
  const { dispatch } = useHyperBot();
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");

  const handleEscrowCommand = (type) => {
    dispatch({
      type: "EXECUTE_TASK",
      payload: {
        name: "HANDLE_ESCROW_ACTION",
        data: {
          receiver,
          amount,
          type
        }
      }
    });
  };

  return (
    <Card className="mt-6 shadow-md bg-zinc-900 text-white">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-green-400">Escrow Manager</h2>

        <div>
          <Label htmlFor="receiver">Recipient Address</Label>
          <Input
            id="receiver"
            placeholder="0xRecipient..."
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            className="mb-2"
          />
        </div>

        <div>
          <Label htmlFor="amount">Amount (HYPE)</Label>
          <Input
            id="amount"
            placeholder="Amount in HYPE"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mb-4"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={() => handleEscrowCommand("RECEIVE")}>
            ⬇️ Escrow Received
          </Button>
          <Button onClick={() => handleEscrowCommand("RELEASE")} variant="outline">
            ⬆️ Release Escrow
          </Button>
          <Button onClick={() => handleEscrowCommand("TRANSITION")} variant="destructive">
            🔁 Move to Transitional Escrow
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

