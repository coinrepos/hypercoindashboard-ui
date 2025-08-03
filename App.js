import { useState } from "react";
import { ethers } from "ethers";
import KREDS_ABI from "./abi.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Dashboard";
import ErrorBoundary from "./ErrorBoundary";

const KREDS_TOKEN_ADDRESS = "0xe91aB7B3B810B7c40C0197DF87CcC6d2d02F73f8";
const TREASURY_WALLET = "0xb83b08bd688739dcf499091B7596931c2DD8835F";

function App() {
  const [globalBalance, setGlobalBalance] = useState("0");
  
  // This function can be passed to child components
  const fetchTreasuryBalance = async () => {
    try {
      if (!window.ethereum) throw new Error("MetaMask not installed");
      
      const provider = new ethers.BrowserProvider(window.ethereum);
      const kredsContract = new ethers.Contract(
        KREDS_TOKEN_ADDRESS,
        KREDS_ABI,
        provider
      );
      
      const rawBalance = await kredsContract.balanceOf(TREASURY_WALLET);
      const decimals = await kredsContract.decimals();
      setGlobalBalance(ethers.formatUnits(rawBalance, decimals));
      
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

  return (
    <ErrorBoundary>
      <div className="App">
        <ToastContainer 
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        
        <Dashboard 
          globalBalance={globalBalance} 
          onRefreshBalance={fetchTreasuryBalance} 
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;