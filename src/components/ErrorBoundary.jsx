'use client';

/**
 * ErrorBoundary – catches render errors in child trees and shows a friendly fallback.
 * Uses the React class-component API (required for error boundaries).
 */

import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Log to console in development; swap for a monitoring service in production.
    if (process.env.NODE_ENV !== 'production') {
      console.error('[ErrorBoundary]', error, info);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen bg-uae-dark flex flex-col items-center justify-center px-4">
        <div className="max-w-sm w-full text-center">
          <div className="text-6xl mb-4">🦅</div>
          <h1 className="text-2xl font-bold text-uae-gold mb-2">Oops! Something went wrong.</h1>
          <p className="text-white/50 text-sm mb-6">
            Don&apos;t worry — even the best explorers hit a bump sometimes!
          </p>
          <button
            onClick={this.handleReset}
            className="px-6 py-3 rounded-xl font-bold text-white text-sm"
            style={{ background: 'linear-gradient(135deg, #009A44, #006B30)' }}
          >
            🔄 Try Again
          </button>
          {process.env.NODE_ENV !== 'production' && this.state.error && (
            <pre className="mt-4 text-left text-xs text-uae-red/70 bg-white/5 rounded-lg p-3 overflow-auto max-h-32">
              {this.state.error.message}
            </pre>
          )}
        </div>
      </div>
    );
  }
}
