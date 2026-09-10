import React from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

export default function CitationBadge({ status = 'verified', citation, caseName }) {
  if (status === 'verified') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 shadow-xs">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/30 shrink-0" />
        <span>Verified Precedent</span>
        {citation && <span className="opacity-80 text-[10px] font-mono">({citation})</span>}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-950/90 text-rose-300 border border-rose-500/60 shadow-xs animate-pulse">
      <AlertTriangle className="w-3.5 h-3.5 text-rose-400 fill-rose-400/30 shrink-0" />
      <span>⚠️ Citation not verified by system safeguard</span>
      {caseName && <span className="opacity-80 text-[10px] italic">[{caseName}]</span>}
    </span>
  );
}
