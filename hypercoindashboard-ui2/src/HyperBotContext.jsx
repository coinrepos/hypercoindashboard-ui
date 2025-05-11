// src/HyperBotContext.jsx

import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const HyperBotContext = createContext();

export const useHyperBot = () => useContext(HyperBotContext);

export const HyperBotProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
  const [commandQueue, setCommandQueue] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      setIsOnline(true);
      setMessages((prev) => [...prev, "🤖 Connected to HyperBot socket"]);
    });

    socket.on("governance_update", (data) => {
      setMessages((prev) => [...prev, `🗳 Proposal update: ${data.data}`]);

      dispatch({
        type: "EXECUTE_TASK",
        payload: {
          name: "NOTIFY_DAO_PROPOSAL",
          data: data.data,
          timestamp: Date.now(),
        },
      });
    });

    socket.on("disconnect", () => {
      setIsOnline(false);
      setMessages((prev) => [...prev, "🔌 Disconnected from socket"]);
    });

    return () => socket.disconnect();
  }, []);

  const dispatch = ({ type, payload }) => {
    if (type === "CLEAR_MESSAGES") setMessages([]);
    if (type === "EXECUTE_TASK") {
      setCommandQueue((prev) => [...prev, payload]);
    }
  };

  // 🎯 HyperTask Runner Loop
  useEffect(() => {
    if (commandQueue.length > 0) {
      const task = commandQueue[0];
      console.log("🚦 Executing task:", task.name);

      switch (task.name) {
        case "NOTIFY_DAO_PROPOSAL":
          alert(`🗳 New DAO Proposal: ${task.data}`);
          break;

        case "UNLOCK_BURN_ZONE":
          alert("🔐 Admin: Burn zone unlocked.");
          break;

        case "DEPLOY_CONTRACT":
          alert("🚀 Deploy script initiated.");
          break;

        case "RUN_SECURE_SCRIPT":
          runSecureScript(task.script);
          break;

        case "TRIGGER_ESCROW_TRANSFER":
          alert(`💼 Escrow transfer requested for: ${task.escrow}`);
          break;

        default:
          console.warn("⚠️ Unknown task:", task.name);
      }

      setCommandQueue((q) => q.slice(1));
    }
  }, [commandQueue]);

  // 🔐 Secure Script Trigger
  const runSecureScript = async (scriptName) => {
    try {
      const response = await fetch("/api/secure-run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: process.env.REACT_APP_SCRIPT_RUNNER_TOKEN,
          file: scriptName,
        }),
      });
      const data = await response.json();
      alert(`✅ SecureRun: ${data.message}`);
    } catch (err) {
      console.error("❌ SecureRun failed", err);
      alert("❌ SecureRun failed");
    }
  };

  // 🛠️ Admin Controls
  const AdminControls = () => (
    <div style={{ padding: "1rem", background: "#111", color: "#0f0", borderRadius: "8px", margin: "1rem 0" }}>
      <h4>🛠️ Admin Bot Controls</h4>
      <button onClick={() => dispatch({ type: "EXECUTE_TASK", payload: { name: "UNLOCK_BURN_ZONE" } })}>
        🔓 Unlock Burn
      </button>
      <button
        onClick={() =>
          dispatch({ type: "EXECUTE_TASK", payload: { name: "RUN_SECURE_SCRIPT", script: "mintKitCoin.js" } })
        }
        style={{ marginLeft: "1rem" }}
      >
        🍀 Mint KitCoin
      </button>
      <button
        onClick={() =>
          dispatch({ type: "EXECUTE_TASK", payload: { name: "RUN_SECURE_SCRIPT", script: "mintLuckyCoin.js" } })
        }
        style={{ marginLeft: "1rem" }}
      >
        🎲 Mint LuckyCoin
      </button>
      <button
        onClick={() =>
          dispatch({ type: "EXECUTE_TASK", payload: { name: "RUN_SECURE_SCRIPT", script: "deployDAO.js" } })
        }
        style={{ marginLeft: "1rem" }}
      >
        🧠 Deploy DAO
      </button>
      <button onClick={() => dispatch({ type: "CLEAR_MESSAGES" })} style={{ marginLeft: "1rem" }}>
        🧼 Clear Log
      </button>
    </div>
  );

  return (
    <HyperBotContext.Provider value={{ messages, isOnline, dispatch }}>
      <AdminControls />
      {children}
    </HyperBotContext.Provider>
  );
};
