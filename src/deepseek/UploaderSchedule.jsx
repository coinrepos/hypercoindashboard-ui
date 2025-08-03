import React, { useState } from 'react';
import { useContract } from '../hooks/useContract';
import SCHEDULER_ABI from '../contracts/UploadScheduler.json';

export default function UploadScheduler({ schedulerAddress }) {
  const [fileCID, setFileCID] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const { contract } = useContract(schedulerAddress, SCHEDULER_ABI);

  const scheduleUpload = async () => {
    await contract.scheduleUpload(fileCID, Math.floor(new Date(scheduleTime).getTime() / 1000);
    alert(`Upload scheduled for ${scheduleTime}`);
  };

  return (
    <div className="upload-scheduler">
      <h3>⏰ Schedule IPFS Upload</h3>
      <input
        type="text"
        value={fileCID}
        onChange={(e) => setFileCID(e.target.value)}
        placeholder="IPFS CID"
      />
      <input
        type="datetime-local"
        value={scheduleTime}
        onChange={(e) => setScheduleTime(e.target.value)}
      />
      <button onClick={scheduleUpload}>Schedule</button>
    </div>
  );
}