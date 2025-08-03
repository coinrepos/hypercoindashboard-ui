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

