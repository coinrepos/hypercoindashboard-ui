import React, { createContext, useReducer } from 'react';

const initialState = {
  tasks: [],
  isActive: true
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'TRIGGER_RECALL':
      return { ...state, isActive: false };
    default:
      return state;
  }
};

export const HyperBotContext = createContext();

export function HyperBotProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <HyperBotContext.Provider value={{ state, dispatch }}>
      {children}
    </HyperBotContext.Provider>
  );
}