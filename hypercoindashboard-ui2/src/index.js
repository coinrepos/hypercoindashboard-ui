import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Components imported via redirects
import {
  BridgePanel,
  DAOVoting,
  StockCoinMintForm,
  HyperSwap,
  // add any additional components you use at root level
} from "./redirects";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
