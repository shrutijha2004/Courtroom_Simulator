import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Copy, Check, Scale, Bookmark } from 'lucide-react';
import CitationBadge from './CitationBadge';

export default function StatutoryCard({
  item,
  type = 'statute', // 'statute' or 'case'
  onCite,
  defaultExpanded = false
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    const citeText = type === 'case'
      ? `${item.case_name}, ${item.citation} (${item.court}) - ${item.section}`
      : `${item.act} - ${item.section}: ${item.title}`;

    navigator.clipboard?.writeText(citeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleCite = (e) => {
    e.stopPropagation();
    if (onCite) {
      if (type === 'case') {
        onCite(`Under the precedent of ${item.case_name}, ${item.citation}, ${item.holding}`);
      } else {
        onCite(`Pursuant to ${item.section} of the ${item.act}, regarding ${item.title}`);
      }
    }
  };

  if (type === 'case') {
    return (
      <div className="rounded-xl border border-[#1e3d6b]/70 bg-[#071324]/90 hover:border-[#dfb15b] transition-all duration-200 shadow-sm overflow-hidden mb-3 court-card-hover-dark">
        <div 
          onClick={() => setExpanded(!expanded)}
          className="p-3.5 cursor-pointer flex items-start justify-between gap-2 hover:bg-[#0b1b30]/60 select-none"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#0b1b30] text-[#eed89b] border border-[#dfb15b]/40">
                {item.section}
              </span>
              <span className="text-xs text-slate-400">
                {item.year} • {item.court}
              </span>
              <CitationBadge status="verified" citation={item.citation} />
            </div>
            <h4 className="text-sm font-serif font-bold text-white truncate hover:text-[#eed89b] transition-colors">
              {item.case_name}
            </h4>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 text-slate-400">
            <button
              onClick={handleCopy}
              title="Copy citation"
              className="p-1 hover:text-[#dfb15b] hover:bg-[#0b1b30] rounded transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" /> : <Copy className="w-3.5 h-3.5 stroke-[2]" />}
            </button>
            <span className="p-1">
              {expanded ? <ChevronUp className="w-4 h-4 text-[#dfb15b]" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </span>
          </div>
        </div>

        {/* Expanding Reference Drawer */}
        {expanded && (
          <div className="px-3.5 pb-3.5 pt-1.5 border-t border-[#1e3d6b]/60 text-xs bg-[#050d17]/80 space-y-2.5">
            <div>
              <span className="font-semibold text-[#eed89b] block mb-1 font-serif">Judicial Holding:</span>
              <p className="text-slate-200 leading-relaxed bg-[#071324] p-2.5 rounded-lg border border-[#1e3d6b]">
                "{item.holding}"
              </p>
            </div>

            {item.key_principles && item.key_principles.length > 0 && (
              <div>
                <span className="font-semibold text-slate-300 block mb-1">Key Principles:</span>
                <ul className="space-y-1 text-slate-300">
                  {item.key_principles.map((pr, idx) => (
                    <li key={idx} className="leading-normal flex items-start gap-1.5">
                      <span className="text-[#dfb15b]">•</span>
                      <span>{pr}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between">
              <div className="flex gap-1 flex-wrap">
                {item.tags?.map((t, idx) => (
                  <span key={idx} className="text-[10px] bg-[#0b1b30] text-slate-400 px-2 py-0.5 rounded-full border border-slate-700">
                    #{t}
                  </span>
                ))}
              </div>
              {onCite && (
                <button
                  onClick={handleCite}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg court-btn-gold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Scale className="w-3.5 h-3.5 fill-[#07111e]/20" />
                  <span>Cite in Argument</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Statute render (BNS, BNSS, BSA)
  return (
    <div className="rounded-xl border border-[#1e3d6b]/70 bg-[#071324]/90 hover:border-[#dfb15b] transition-all duration-200 shadow-sm overflow-hidden mb-3 court-card-hover-dark">
      <div 
        onClick={() => setExpanded(!expanded)}
        className="p-3.5 cursor-pointer flex items-start justify-between gap-2 hover:bg-[#0b1b30]/60 select-none"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#0b1b30] text-[#eed89b] border border-[#dfb15b]/40">
              {item.section}
            </span>
            {item.bailable && (
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                item.bailable === 'Bailable' ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60' : 'bg-rose-950 text-rose-300 border border-rose-700/60'
              }`}>
                {item.bailable}
              </span>
            )}
            {item.statutory_mandate && (
              <span className="text-[10px] text-slate-300 bg-[#0b1b30] px-2 py-0.5 rounded-full border border-slate-700">
                {item.statutory_mandate}
              </span>
            )}
          </div>
          <h4 className="text-sm font-serif font-bold text-white truncate hover:text-[#eed89b] transition-colors">
            {item.title}
          </h4>
          <p className="text-[11px] text-slate-400 truncate font-sans">
            {item.act}
          </p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 text-slate-400">
          <button
            onClick={handleCopy}
            title="Copy section reference"
            className="p-1 hover:text-[#dfb15b] hover:bg-[#0b1b30] rounded transition cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" /> : <Copy className="w-3.5 h-3.5 stroke-[2]" />}
          </button>
          <span className="p-1">
            {expanded ? <ChevronUp className="w-4 h-4 text-[#dfb15b]" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </span>
        </div>
      </div>

      {/* Expanding Reference Drawer */}
      {expanded && (
        <div className="px-3.5 pb-3.5 pt-1.5 border-t border-[#1e3d6b]/60 text-xs bg-[#050d17]/80 space-y-2.5">
          <div>
            <span className="font-semibold text-[#eed89b] block mb-1 font-serif">Statutory Provision:</span>
            <p className="text-slate-200 leading-relaxed bg-[#071324] p-2.5 rounded-lg border border-[#1e3d6b]">
              {item.description}
            </p>
          </div>

          {item.punishment && (
            <div className="text-[11px] text-slate-300 flex items-center gap-1.5 bg-[#071324] p-2 rounded-lg border border-[#1e3d6b]">
              <span className="font-semibold text-[#eed89b]">Penalty:</span>
              <span>{item.punishment}</span>
            </div>
          )}

          {item.defense_notes && (
            <div className="text-[11px] text-slate-300 bg-[#071324] p-2.5 rounded-lg border border-[#1e3d6b]">
              <span className="font-semibold text-[#dfb15b] block mb-0.5">Advocate Notes:</span>
              <p className="leading-relaxed">{item.defense_notes}</p>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end">
            {onCite && (
              <button
                onClick={handleCite}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg court-btn-gold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Scale className="w-3.5 h-3.5 fill-[#07111e]/20" />
                <span>Invoke Section</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
