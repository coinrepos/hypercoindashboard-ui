import React, { useState } from 'react';
import { useContract } from '../../hooks/useContract';
import ONBOARDING_ABI from '../../contracts/Onboarding.json';

export default function OnboardingPortal({ onboardingAddress }) {
  const [username, setUsername] = useState('');
  const { contract } = useContract(onboardingAddress, ONBOARDING_ABI);

  const registerUser = async () => {
    const tx = await contract.register(username);
    await tx.wait();
    alert('Registration complete!');
  };

  return (
    <div className="onboarding">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Choose a username"
      />
      <button onClick={registerUser}>Join Network</button>
    </div>
  );
}