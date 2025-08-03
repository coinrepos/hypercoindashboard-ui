import { ethers } from 'ethers';
import KREDS_ABI from './KREDS.json'; // Import your ABI

function App() {
  const [balance, setBalance] = useState("0");

  const fetchBalance = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        "0xe91aB7B3B810B7c40C0197DF87CcC6d2d02F73f8", // Replace
        KREDS_ABI,
        provider
      );
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const userBalance = await contract.balanceOf(accounts[0]);
      setBalance(ethers.utils.formatUnits(userBalance, 18));
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div>
      <h1>Your KREDS Balance: {balance}</h1>
    </div>
  );
}