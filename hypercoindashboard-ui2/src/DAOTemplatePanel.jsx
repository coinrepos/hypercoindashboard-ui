import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/Button";
import { Label } from "./ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import EscrowManager from "./EscrowManager";

export default function DAOTemplatePanel() {
  const [proposalTitle, setProposalTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetAddress, setTargetAddress] = useState("");
  const [actionData, setActionData] = useState("");

  const handleSubmit = async () => {
    const payload = {
      title: proposalTitle,
      description,
      target: targetAddress,
      action: actionData,
      createdAt: Date.now()
    };

    try {
      const res = await fetch("/api/dao/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Failed to submit proposal");

      alert("✅ DAO Proposal Submitted");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to submit proposal");
    }
  };

  return (
    <Tabs defaultValue="dao">
      <TabsList className="grid grid-cols-2 mb-4">
        <TabsTrigger value="dao">DAO Proposal</TabsTrigger>
        <TabsTrigger value="escrow">Escrow Manager</TabsTrigger>
      </TabsList>

      <TabsContent value="dao">
        <Card className="shadow-lg bg-black text-white">
          <CardContent className="space-y-4 p-6">
            <h2 className="text-xl font-bold text-cyan-400">🗳 DAO Proposal Creator</h2>

            <div>
              <Label>Proposal Title</Label>
              <Input
                placeholder="Upgrade Validator Logic"
                value={proposalTitle}
                onChange={(e) => setProposalTitle(e.target.value)}
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                placeholder="Explain your proposal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <Label>Target Contract Address</Label>
              <Input
                placeholder="0x..."
                value={targetAddress}
                onChange={(e) => setTargetAddress(e.target.value)}
              />
            </div>

            <div>
              <Label>Encoded Action Data</Label>
              <Input
                placeholder="0xFunctionSig..."
                value={actionData}
                onChange={(e) => setActionData(e.target.value)}
              />
            </div>

            <Button className="mt-4" onClick={handleSubmit}>
              🚀 Submit Proposal
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="escrow">
        <EscrowManager />
      </TabsContent>
    </Tabs>
  );
}

