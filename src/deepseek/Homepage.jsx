import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="home">
      <h1>Welcome to KREDS coin Dashboard</h1>
      <div className="cta-buttons">
        <Link to="/dashboard" className="btn-primary">
          Launch Dashboard
        </Link>
        <Link to="/docs" className="btn-secondary">
          Read Docs
        </Link>
      </div>
      <div className="features">
        <div className="feature-card">
          <h3>💸 Tax Optimization</h3>
          <p>Minimize liabilities with real-time simulations.</p>
        </div>
        <div className="feature-card">
          <h3>🏛 Governance</h3>
          <p>Vote on proposals directly from the dashboard.</p>
        </div>
      </div>
    </div>
  );
}