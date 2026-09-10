import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, HelpCircle, ShieldAlert, Sparkles, Scale, Info } from 'lucide-react';

export default function FactTaxonomyModal({ isOpen, onClose, scenario }) {
  const [activeTab, setActiveTab] = useState('dossier'); // 'dossier' or 'guide'
  const [filterTag, setFilterTag] = useState('all'); // 'all', 'established', 'allegation', 'disputed', 'missing'

  if (!isOpen || !scenario) return null;

  const facts = scenario.facts || [];

  const counts = {
    all: facts.length,
    established: facts.filter(f => f.tag === 'established').length,
    allegation: facts.filter(f => f.tag === 'allegation').length,
    disputed: facts.filter(f => f.tag === 'disputed').length,
    missing: facts.filter(f => f.tag === 'missing').length
  };

  const filteredFacts = filterTag === 'all' ? facts : facts.filter(f => f.tag === filterTag);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#071324] text-slate-100 rounded-2xl border border-[#dfb15b]/50 max-w-3xl w-full shadow-2xl flex flex-col max-h-[90vh] overflow-hidden my-auto court-card-hover-dark">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-[#dfb15b]/30 flex items-center justify-between bg-[#050d17]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0b1b30] border border-[#dfb15b]/40 flex items-center justify-center text-[#dfb15b]">
              <Scale className="w-5 h-5 fill-[#dfb15b]/20" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-lg text-white">
                  Fact Classification & Procedural Gap Analysis
                </h3>
                <span className="px-2.5 py-0.5 rounded bg-[#0b1b30] text-[#eed89b] font-mono text-[10px] border border-[#dfb15b]/30">
                  {scenario.fir_number || scenario.scenario_id}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Case: <strong className="text-slate-200">{scenario.title}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#dfb15b]/20 bg-[#07111e] px-5 text-xs">
          <button
            onClick={() => setActiveTab('dossier')}
            className={`py-3 px-4 font-semibold border-b-2 transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'dossier'
                ? 'border-[#dfb15b] text-[#eed89b]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 fill-[#dfb15b]/30 text-[#dfb15b]" />
            <span>Case Facts Breakdown ({facts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`py-3 px-4 font-semibold border-b-2 transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'guide'
                ? 'border-[#dfc299] text-[#dfc299]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>Fact Taxonomy Guide (What Tags Mean)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          
          {/* TAB 1: CASE FACTS BREAKDOWN */}
          {activeTab === 'dossier' && (
            <div>
              {/* Category Filter Pills */}
              <div className="flex gap-2 flex-wrap mb-4">
                {[
                  { tag: 'all', label: `All Facts (${counts.all})`, color: 'slate' },
                  { tag: 'established', label: `Established (${counts.established})`, color: 'emerald' },
                  { tag: 'allegation', label: `Allegations (${counts.allegation})`, color: 'amber' },
                  { tag: 'disputed', label: `Disputed (${counts.disputed})`, color: 'rose' },
                  { tag: 'missing', label: `Missing Gaps (${counts.missing})`, color: 'indigo' }
                ].map((item) => (
                  <button
                    key={item.tag}
                    onClick={() => setFilterTag(item.tag)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition cursor-pointer ${
                      filterTag === item.tag
                        ? 'bg-[#dfc299] text-[#111827] font-bold shadow-sm'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Facts List */}
              <div className="space-y-3">
                {filteredFacts.map((fact) => {
                  let badge = {
                    label: 'Established Fact',
                    bg: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/80',
                    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
                    tacticalDesc: 'Indisputable baseline. Use as an anchor to build your defense narrative.'
                  };

                  if (fact.tag === 'allegation') {
                    badge = {
                      label: 'Prosecution Allegation',
                      bg: 'bg-[#261d14] text-[#dfc299] border-[#a88247]/50',
                      icon: <AlertCircle className="w-3.5 h-3.5" />,
                      tacticalDesc: 'Unverified police or complainant assertion. Prime target for cross-examination.'
                    };
                  } else if (fact.tag === 'disputed') {
                    badge = {
                      label: 'Disputed Fact',
                      bg: 'bg-rose-950/80 text-rose-300 border-rose-800/80',
                      icon: <HelpCircle className="w-3.5 h-3.5" />,
                      tacticalDesc: 'Contradiction between witnesses or physical record. Creates reasonable doubt.'
                    };
                  } else if (fact.tag === 'missing') {
                    badge = {
                      label: 'Missing Procedural Gap',
                      bg: 'bg-indigo-950/80 text-indigo-300 border-indigo-700/80',
                      icon: <ShieldAlert className="w-3.5 h-3.5" />,
                      tacticalDesc: 'Statutory omission or police non-compliance. Direct ground to seek bail or quash remand.'
                    };
                  }

                  return (
                    <div
                      key={fact.id}
                      className={`p-4 rounded-xl bg-slate-950/70 border transition ${
                        fact.tag === 'missing'
                          ? 'border-indigo-600/50 hover:border-indigo-500'
                          : 'border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium border ${badge.bg}`}>
                            {badge.icon}
                            <span>{badge.label}</span>
                          </span>
                          <span className="font-semibold text-white text-sm">
                            {fact.title}
                          </span>
                        </div>
                        {fact.timestamp && (
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 shrink-0">
                            {fact.timestamp}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed mb-3">
                        {fact.description}
                      </p>

                      <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-800/70 text-slate-400">
                        <span>Source: <strong className="text-slate-300">{fact.source || 'Case Record'}</strong></span>
                        <span className="italic text-slate-400">{badge.tacticalDesc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: FACT TAXONOMY GUIDE */}
          {activeTab === 'guide' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 leading-relaxed text-slate-300">
                <h4 className="font-serif font-bold text-sm text-white mb-1">
                  The Four Quadrants of Criminal Advocacy Facts
                </h4>
                <p>
                  In Indian criminal practice under the <strong>BNS</strong>, <strong>BNSS</strong>, and <strong>BSA</strong>, cases are won not on rhetoric alone, but by dissecting the prosecution's case file into four distinct evidential categories:
                </p>
              </div>

              {/* 1. Established Facts */}
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-900/60">
                <div className="flex items-center gap-2 mb-2 text-emerald-300 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>1. Established Facts (Corroborated Records)</span>
                </div>
                <p className="text-slate-300 leading-relaxed mb-2">
                  <strong>What they are:</strong> Objective, authenticated facts accepted by both sides or corroborated by independent documentary or digital evidence (e.g., CCTV timestamp, biometric university turnstile logs, certified hospital MLC record).
                </p>
                <div className="p-2.5 rounded bg-black/40 text-[11px] text-emerald-200/90 font-mono">
                  ⚖️ <strong>Advocate Strategy:</strong> Use established facts as uncontroverted foundations. Anchor your client's alibi or establish absence of mens rea around these verified timestamps.
                </div>
              </div>

              {/* 2. Prosecution Allegations */}
              <div className="p-4 rounded-xl bg-[#241c14]/50 border border-[#a88247]/40">
                <div className="flex items-center gap-2 mb-2 text-[#dfc299] font-bold text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>2. Prosecution Allegations (Unverified Accusations)</span>
                </div>
                <p className="text-slate-300 leading-relaxed mb-2">
                  <strong>What they are:</strong> Subjective claims made in the FIR or the complainant's Section 180 BNSS statement which have not yet been tested through trial cross-examination or independent forensic verification.
                </p>
                <div className="p-2.5 rounded bg-black/40 text-[11px] text-[#dfc299] font-mono">
                  ⚖️ <strong>Advocate Strategy:</strong> Remind the Court that allegations are mere assertions until proved. Emphasize that custodial arrest cannot be justified solely on complainant hostility.
                </div>
              </div>

              {/* 3. Disputed Facts */}
              <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
                <div className="flex items-center gap-2 mb-2 text-rose-300 font-bold text-sm">
                  <HelpCircle className="w-4 h-4" />
                  <span>3. Disputed Facts (Contested Contradictions)</span>
                </div>
                <p className="text-slate-300 leading-relaxed mb-2">
                  <strong>What they are:</strong> Points where police claims directly conflict with defense alibis or other witness testimonies (e.g., whether the accused held a weapon, or whether the fight was initiated in private defense).
                </p>
                <div className="p-2.5 rounded bg-black/40 text-[11px] text-rose-200/90 font-mono">
                  ⚖️ <strong>Advocate Strategy:</strong> Highlight inconsistencies to create reasonable doubt. Under settled law, disputed questions of fact require a full trial and favour pre-trial bail release.
                </div>
              </div>

              {/* 4. Missing Gaps (Procedural Deficiencies) */}
              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-900/60">
                <div className="flex items-center gap-2 mb-2 text-indigo-300 font-bold text-sm">
                  <ShieldAlert className="w-4 h-4" />
                  <span>4. Missing Gaps (Statutory & Procedural Lapses)</span>
                </div>
                <p className="text-slate-300 leading-relaxed mb-2">
                  <strong>What they are:</strong> Mandatory legal procedures that the police or prosecution <em>failed</em> to perform. Examples include:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-300 mb-2 pl-2">
                  <li><strong>BNSS Section 38:</strong> Failure to serve contemporaneous written grounds of arrest.</li>
                  <li><strong>BNSS Section 47:</strong> Search/seizure conducted without two independent local panchas.</li>
                  <li><strong>BNSS Section 48:</strong> Failure to immediately inform a designated family member.</li>
                  <li><strong>BSA Section 63:</strong> Producing digital records without a mandatory electronic hash certificate.</li>
                </ul>
                <div className="p-2.5 rounded bg-black/40 text-[11px] text-indigo-200/90 font-mono">
                  ⚖️ <strong>Advocate Strategy:</strong> Your strongest weapon in bail hearings! Argue that non-compliance with statutory safeguards vitiates lawful custody under Article 21 and the precedent of <em>Pankaj Bansal v. Union of India</em>.
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#dfb15b]/20 bg-[#050d17] flex items-center justify-between text-xs">
          <span className="text-slate-400 font-sans">
            Use these factual categories to craft targeted arguments in the simulator.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl court-btn-gold text-xs font-bold transition cursor-pointer shadow-sm"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
}
