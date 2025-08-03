import React from 'react';
import { Link } from 'react-router-dom';

export default function SidebarNav() {
  return (
    <nav className="sidebar">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/dao">DAO</Link>
      <Link to="/swap">Swap</Link>
    </nav>
  );
}