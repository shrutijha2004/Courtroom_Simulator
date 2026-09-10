import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Courtroom Simulator Error caught by Boundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[70vh] flex items-center justify-center p-6 bg-[#08101d] text-slate-100">
          <div className="max-w-lg w-full p-8 rounded-2xl bg-[#0d1728] border border-rose-900/60 shadow-2xl text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-rose-950/80 border border-rose-800 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-7 h-7" />
            </div>
            
            <h2 className="text-xl font-serif font-bold text-white mb-2">
              Procedural Anomaly Encountered
            </h2>
            
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              A courtroom dossier rendering exception occurred. The simulator state has been safely contained.
            </p>

            {this.state.error && (
              <div className="p-3.5 rounded-lg bg-black/50 border border-slate-800 text-left mb-6 overflow-auto max-h-32">
                <p className="text-[11px] font-mono text-rose-300 break-words">
                  {this.state.error?.toString()}
                </p>
              </div>
            )}

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Page</span>
              </button>

              <button
                onClick={this.handleReset}
                className="px-4 py-2 rounded-lg bg-[#dfc299] hover:bg-[#d0b084] text-[#111827] text-xs font-bold flex items-center gap-2 cursor-pointer shadow"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Return Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
