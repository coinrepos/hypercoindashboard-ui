import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "./abi.json";
import {
  HYPERCOIN_CONTRACT,
  APP_NAME,
  TOKEN_SYMBOL,
  TAX_TOKEN,
  BASE_RATE,
  IPFS_ENABLED,
  IS_ADMIN
} from "./config.js"; // use .js for config file

// 🧩 Components (with explicit .jsx extensions)
import HyperBurn from "./HyperBurn.jsx";
import InTaxSwap from "./InTaxSwap.jsx";
import TreasuryControls from "./TreasuryControls.jsx";
import DAOVoting from "./DAOVoting.jsx";
import GlobalToggle from "./GlobalToggle.jsx";
import LiveFeedPanel from "./LiveFeedPanel.jsx";
import NoWalletAlert from "./NoWalletAlert.jsx";
import StockCoinMintForm from "./StockCoinMintForm.jsx";
import HyperSwap from "./HyperSwap.jsx";
import BridgeUI from "./BridgeUI.jsx";

