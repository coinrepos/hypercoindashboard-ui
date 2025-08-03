useEffect(() => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(KREDS_ADDRESS, KREDS_ABI, provider);

  const fetchBalance = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const balance = await contract.balanceOf(accounts[0]);
    setBalance(ethers.utils.formatUnits(balance, 18)); // Updates state
  };

  fetchBalance();

  const updateBalance = () => fetchBalance();

  // Add event listeners
  window.ethereum.on('accountsChanged', updateBalance);
  window.ethereum.on('chainChanged', updateBalance);

  // ✅ Cleanup function (prevents memory leaks)
  return () => {
    window.ethereum.removeListener('accountsChanged', updateBalance);
    window.ethereum.removeListener('chainChanged', updateBalance);
  };
}, []); // ✅ Empty array = runs once on mount