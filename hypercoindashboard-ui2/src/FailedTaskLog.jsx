// src/components/FailedTaskLog.jsx
import React, { useEffect, useState } from 'react';

const FailedTaskLog = () => {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('/api/failedTasks')
      .then(res => res.json())
      .then(data => setTasks(data.tasks || []))
      .catch(err => setStatus('❌ Error loading tasks'));
  }, []);

  const retryTask = async (index) => {
    try {
      const res = await fetch('/api/retryTask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index })
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('✅ Retry successful');
        setTasks(prev => prev.filter((_, i) => i !== index));
      } else {
        setStatus(`❌ Retry failed: ${data.error}`);
      }
    } catch (err) {
      setStatus('❌ Retry request error');
    }
  };

  return (
    <div style={{ padding: "1rem", background: "#1e293b", color: "#fff", borderRadius: "8px" }}>
      <h3>📋 Failed Tasks Log</h3>
      <p>{status}</p>
      <ul>
        {tasks.length === 0 && <li>No failed tasks.</li>}
        {tasks.map((task, index) => (
          <li key={index}>
            {task.description || `Task #${index}`}
            <button
              onClick={() => retryTask(index)}
              style={{
                marginLeft: "1rem",
                backgroundColor: "#f87171",
                color: "#fff",
                border: "none",
                padding: "4px 8px",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Retry
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FailedTaskLog;
