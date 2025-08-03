import React, { useContext } from 'react';
import { HyperBotContext } from '../../contexts/HyperBotContext';

export default function HyperBotTaskMap() {
  const { state } = useContext(HyperBotContext);

  return (
    <div className="task-map">
      {state.tasks.map((task, i) => (
        <div key={i}>{task.name}</div>
      ))}
    </div>
  );
}