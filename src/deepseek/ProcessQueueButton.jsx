import React, { useContext } from 'react';
import { HyperBotContext } from '../../contexts/HyperBotContext';

export default function ProcessQueueButton() {
  const { dispatch } = useContext(HyperBotContext);

  return (
    <button onClick={() => dispatch({ type: 'PROCESS_QUEUE' })}>
      ⚙️ Process Task Queue
    </button>
  );
}