import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

export default function GlobalToggle() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      {darkMode ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}