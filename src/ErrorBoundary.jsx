import React from "react";
import { toast } from "react-toastify";

export default class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Component Error:", error, info);
    toast.error(`Component crashed: ${error.message}`);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-900/80 text-white p-8 rounded-lg max-w-2xl mx-auto my-12 text-center">
          <h2 className="text-2xl font-bold mb-4">⚠️ Component Error</h2>
          <p className="mb-4">This section failed to load. Please refresh the page.</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            ↻ Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}