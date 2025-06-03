import React, { useState } from "react";

export default function BridgeUI() {
  const [btcAddress, setBtcAddress] = useState("");
  return (
    <div>
      🌉 Bridge to BTC Network
      <input
        value={btcAddress}
        onChange={(e) => setBtcAddress(e.target.value)}
        placeholder="BTC Address"
      />
    </div>
  );
}
