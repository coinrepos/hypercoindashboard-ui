import React, { useContext } from 'react';
import { HyperBotContext } from '../../contexts/HyperBotContext';

export default function HyperBotAdminPanel() {
  const { state, dispatch } = useContext(HyperBotContext);

  return (
    <div className="hyperbot-admin">
      <h3>Active Tasks: {state.tasks.length}</h3>
      <button onClick={() => dispatch({ type: 'TRIGGER_RECALL' })}>
        🚨 Emergency Recall
      </button>
    </div>
  );
}