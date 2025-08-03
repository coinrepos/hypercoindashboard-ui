import React, { useContext } from 'react';
import { HyperBotContext } from '../../contexts/HyperBotContext';

export default function FailedTaskLog() {
  const { state } = useContext(HyperBotContext);

  return (
    <div className="failed-tasks">
      <h3>⚠️ Failed Tasks</h3>
      <ul>
        {state.errors.map((error, i) => (
          <li key={i}>{error.message}</li>
        ))}
      </ul>
    </div>
  );
}