import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BUILTIN_SCENARIOS,
  COLLEGE_FIGHT_SCENARIO,
  getCustomScenarios,
  deleteCustomScenario,
  clearAllCustomScenarios
} from '../data/legalData';
import { setActiveCaseId, startOrResumeHearing } from '../utils/courtroomDatabase';
import { Scale, ArrowRight, Sparkles, PlusCircle, Trash2, FileText, Info, Filter, ShieldCheck } from 'lucide-react';
import FactTaxonomyModal from '../components/FactTaxonomyModal';

function getActClassification(scenario) {
  const statutes = (scenario.statutes || []).join(' ').toLowerCase();
  const cat = (scenario.category || '').toLowerCase();
  if (cat.includes('evidence') || cat.includes('admissibility') || statutes.includes('bsa')) {
    return {
      act: 'BSA',
      label: 'BSA (Evidence Admissibility)',
      badgeClass: 'bg-indigo-950/90 text-indigo-300 border-indigo-500/50'
    };
  }
  if (cat.includes('substantive') || (statutes.includes('bns') && !statutes.includes('bnss'))) {
    return {
      act: 'BNS',
      label: 'BNS (Substantive Offences)',
      badgeClass: 'bg-rose-950/90 text-rose-300 border-rose-500/50'
    };
  }
  return {
    act: 'BNSS',
    label: 'BNSS (Procedure & Bail)',
    badgeClass: 'bg-emerald-950/90 text-emerald-300 border-emerald-500/50'
  };
}

export default function ScenarioSelection() {
  const navigate = useNavigate();
  const [filterCategory, setFilterCategory] = useState('All Dossiers');
  const [customCases, setCustomCases] = useState(() => getCustomScenarios());
  const [selectedScenarioForModal, setSelectedScenarioForModal] = useState(null);

  // Sync custom cases with localStorage whenever updated or window focused
  useEffect(() => {
    const syncCases = () => setCustomCases(getCustomScenarios());
    window.addEventListener('storage', syncCases);
    window.addEventListener('the_verdict_custom_cases_change', syncCases);
    window.addEventListener('focus', syncCases);
    return () => {
      window.removeEventListener('storage', syncCases);
      window.removeEventListener('the_verdict_custom_cases_change', syncCases);
      window.removeEventListener('focus', syncCases);
    };
  }, []);

  const handleDeleteCustomCase = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    if (window.confirm("Are you sure you want to remove this custom case dossier from the docket?")) {
      const updated = deleteCustomScenario(id);
      setCustomCases(updated);
    }
  };

  const handleClearAllCustomCases = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (window.confirm("Are you sure you want to clear ALL custom case dossiers? Pre-configured landmark cases will remain intact.")) {
      const updated = clearAllCustomScenarios();
      setCustomCases(updated);
    }
  };

  const handleLaunch = (scenario) => {
    if (scenario?.scenario_id) {
      setActiveCaseId(scenario.scenario_id);
      startOrResumeHearing(scenario.scenario_id);
    }
    navigate('/hearing', { state: { scenario } });
  };

  const additionalBuiltins = BUILTIN_SCENARIOS.slice(1); // SCN-02 and SCN-03

  const matchesFilter = (scenario) => {
    if (filterCategory === 'All Dossiers') return true;
    if (filterCategory === 'Custom Cases') return scenario.is_custom;
    const classification = getActClassification(scenario);
    if (filterCategory === 'BNSS (Procedure & Bail)') return classification.act === 'BNSS' || (scenario.statutes || []).some(s => s.toLowerCase().includes('bnss'));
    if (filterCategory === 'BSA (Evidence)') return classification.act === 'BSA' || (scenario.statutes || []).some(s => s.toLowerCase().includes('bsa'));
    if (filterCategory === 'BNS (Substantive Charges)') return classification.act === 'BNS' || (scenario.statutes || []).some(s => s.toLowerCase().includes('bns'));
    return true;
  };

  const filteredBuiltins = additionalBuiltins.filter(matchesFilter);
  const showPrimary = matchesFilter(COLLEGE_FIGHT_SCENARIO);
  const filteredCustomCases = customCases.filter(matchesFilter);

  const collegeFightFactCounts = {
    established: (COLLEGE_FIGHT_SCENARIO.facts || []).filter(f => f.tag === 'established').length,
    allegation: (COLLEGE_FIGHT_SCENARIO.facts || []).filter(f => f.tag === 'allegation').length,
    disputed: (COLLEGE_FIGHT_SCENARIO.facts || []).filter(f => f.tag === 'disputed').length,
    missing: (COLLEGE_FIGHT_SCENARIO.facts || []).filter(f => f.tag === 'missing').length
  };

  return (
    <div className="min-h-screen bg-[#07111e] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#dfb15b]/25 pb-6">
          <div>
            <div className="flex items-center gap-2 text-[#eed89b] text-xs font-semibold uppercase tracking-wider mb-2">
              <Scale className="w-4 h-4 text-[#dfb15b] fill-[#dfb15b]/30" />
              <span>Court Docket & Case Classification</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Courtroom Docket & Dossiers
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl font-sans">
              Launch pre-configured landmark cases or formulate custom procedural dossiers with rigorous statutory classification across BNSS, BNS, and BSA.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/create-scenario"
              className="px-4 py-2.5 rounded-xl court-btn-gold text-xs font-bold flex items-center gap-2 shadow-md"
            >
              <PlusCircle className="w-4 h-4 fill-[#07111e]/20" />
              <span>+ Build Custom Case</span>
            </Link>
            <span className="px-3 py-1.5 rounded-lg bg-[#0b1b30] border border-[#dfb15b]/30 text-[#eed89b] font-mono text-xs">
              {3 + customCases.length} Total Dossiers
            </span>
          </div>
        </div>

        {/* Classification Filter Bar */}
        <div className="mb-8 p-3 bg-[#0b1526]/90 rounded-2xl border border-slate-800 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-serif">
            <Filter className="w-3.5 h-3.5 text-[#dfb15b]" />
            <span>Filter Docket by Legal Domain:</span>
          </div>

          <div className="flex gap-1.5 flex-wrap text-xs">
            {['All Dossiers', 'BNSS (Procedure & Bail)', 'BSA (Evidence)', 'BNS (Substantive Charges)', 'Custom Cases'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterCategory(tab)}
                className={`px-3 py-1 rounded-xl font-mono text-[11px] font-semibold transition cursor-pointer ${
                  filterCategory === tab
                    ? 'bg-[#dfb15b] text-[#07111e] shadow-sm font-bold'
                    : 'bg-[#08101d] text-slate-300 hover:text-white border border-slate-700/80'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Scenarios Section (If any exist and match filter) */}
        {filteredCustomCases.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#dfb15b] fill-[#dfb15b]/20" />
                <h2 className="text-xl font-serif font-bold text-white">
                  User-Created Custom Dossiers ({filteredCustomCases.length})
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 hidden sm:inline">Compiled via Scenario Builder</span>
                <button
                  onClick={handleClearAllCustomCases}
                  className="text-xs text-rose-400 hover:text-rose-300 hover:underline flex items-center gap-1 cursor-pointer font-mono"
                  title="Clear all user-built custom cases"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Custom Cases</span>
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredCustomCases.map((custom) => {
                const estCount = (custom.facts || []).filter(f => f.tag === 'established').length;
                const allegCount = (custom.facts || []).filter(f => f.tag === 'allegation').length;
                const dispCount = (custom.facts || []).filter(f => f.tag === 'disputed').length;
                const missCount = (custom.facts || []).filter(f => f.tag === 'missing').length;
                const classification = getActClassification(custom);

                return (
                  <div
                    key={custom.scenario_id}
                    className="p-6 rounded-2xl bg-[#071324]/90 border border-[#1e3d6b]/70 hover:border-[#dfb15b] transition-all flex flex-col justify-between shadow-lg relative group court-card-hover-dark"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between text-xs mb-3 flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider font-mono ${classification.badgeClass}`}>
                            {classification.label}
                          </span>
                          <span className="font-mono text-slate-300 text-[11px]">
                            {custom.fir_number}
                          </span>
                        </div>
                        <button
                          onClick={(e) => handleDeleteCustomCase(e, custom.scenario_id)}
                          title="Remove custom case from docket"
                          className="text-slate-400 hover:text-rose-400 p-1 rounded transition cursor-pointer flex items-center gap-1 text-[11px]"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Clear</span>
                        </button>
                      </div>

                      <h3 className="text-lg font-serif font-bold text-white mb-1.5 group-hover:text-[#eed89b] transition-colors">
                        {custom.title}
                      </h3>

                      <div className="text-xs text-slate-400 mb-3 flex items-center gap-3">
                        <span>Court: <strong className="text-slate-300">{custom.court}</strong></span>
                        <span>•</span>
                        <span>Category: <strong className="text-slate-300">{custom.category}</strong></span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3 font-sans">
                        {custom.summary}
                      </p>

                      {/* Fact counts */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-[11px] mb-1.5">
                          <span className="text-slate-400 font-medium">Fact Breakdown:</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedScenarioForModal(custom);
                            }}
                            className="text-[#eed89b] hover:underline flex items-center gap-1 cursor-pointer font-medium"
                          >
                            <Info className="w-3 h-3 fill-[#dfb15b]/20 text-[#dfb15b]" />
                            <span>Inspect Gaps ➔</span>
                          </button>
                        </div>
                        <div
                          onClick={() => setSelectedScenarioForModal(custom)}
                          className="flex gap-1.5 flex-wrap text-[10px] font-mono cursor-pointer"
                          title="Click to inspect all facts and gap analysis"
                        >
                          <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300">
                            {estCount} Established
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-[#241c14] border border-[#a88247]/30 text-[#dfb15b]">
                            {allegCount} Allegations
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-rose-950/80 border border-rose-500/30 text-rose-300">
                            {dispCount} Disputed
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300">
                            {missCount} Missing
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleLaunch(custom)}
                      className="w-full py-2.5 px-4 rounded-xl court-btn-gold text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md mt-2"
                    >
                      <span>Launch Dossier into Simulator ➔</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Primary Interactive Scenario: The College Fight */}
        {showPrimary && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#dfb15b] fill-[#dfb15b]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#eed89b]">
                Primary Landmark Case Dossier
              </span>
            </div>

            <div className="rounded-2xl border border-[#dfb15b]/40 bg-gradient-to-br from-[#071324] via-[#0b172a] to-[#050d17] p-6 sm:p-8 shadow-xl relative overflow-hidden group court-card-hover-dark">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#dfb15b]/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 relative z-10">
                <div className="space-y-4 flex-1">
                  {/* Meta Badges */}
                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <span className="px-3 py-1 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 font-mono text-[11px] font-bold">
                      BNSS (Procedure & Bail)
                    </span>
                    <span className="px-3 py-1 rounded-full bg-rose-950/90 text-rose-300 border border-rose-500/50 font-mono text-[11px] font-bold">
                      BNS (Hurt & Restraint)
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#0b1b30] text-slate-300 font-mono border border-slate-700">
                      {COLLEGE_FIGHT_SCENARIO.fir_number}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                    {COLLEGE_FIGHT_SCENARIO.title}
                  </h2>

                  <p className="text-slate-300 text-sm leading-relaxed max-w-3xl font-sans">
                    Accused <span className="font-semibold text-white">{COLLEGE_FIGHT_SCENARIO.accused.name}</span>, a third-year engineering student with zero criminal antecedents, was detained from his dorm at 1:15 AM following a brawl outside the campus library. The police have invoked Sections 115(2) and 126(2) BNS without providing written grounds of arrest under BNSS Section 38.
                  </p>

                  {/* Accused / Complainant Profiles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-xl bg-[#050d17]/80 border border-[#1e3d6b] text-xs">
                      <span className="text-[#eed89b] font-semibold block mb-1 font-serif">Accused Client Profile:</span>
                      <p className="text-slate-200 font-medium">{COLLEGE_FIGHT_SCENARIO.accused.name} ({COLLEGE_FIGHT_SCENARIO.accused.age} yrs) - {COLLEGE_FIGHT_SCENARIO.accused.profile}</p>
                      <p className="text-slate-400 text-[11px] mt-0.5">{COLLEGE_FIGHT_SCENARIO.accused.background}</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#050d17]/80 border border-[#1e3d6b] text-xs">
                      <span className="text-[#eed89b] font-semibold block mb-1 font-serif">Complainant:</span>
                      <p className="text-slate-200 font-medium">{COLLEGE_FIGHT_SCENARIO.complainant.name} ({COLLEGE_FIGHT_SCENARIO.complainant.age} yrs)</p>
                      <p className="text-slate-400 text-[11px] mt-0.5">{COLLEGE_FIGHT_SCENARIO.complainant.profile}</p>
                    </div>
                  </div>

                  {/* Fact Breakdown Metrics */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-400 font-medium">Structural Facts Breakdown:</span>
                      <button
                        type="button"
                        onClick={() => setSelectedScenarioForModal(COLLEGE_FIGHT_SCENARIO)}
                        className="text-xs text-[#eed89b] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        <Info className="w-3.5 h-3.5 fill-[#dfb15b]/20 text-[#dfb15b]" />
                        <span>Inspect Facts & Procedural Gaps ➔</span>
                      </button>
                    </div>
                    <div
                      onClick={() => setSelectedScenarioForModal(COLLEGE_FIGHT_SCENARIO)}
                      className="flex gap-2 flex-wrap text-xs font-mono cursor-pointer group"
                      title="Click to inspect all facts and gap analysis"
                    >
                      <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                        {collegeFightFactCounts.established} Established
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-[#241c14] border border-[#a88247]/40 text-[#dfb15b]">
                        {collegeFightFactCounts.allegation} Allegations
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300">
                        {collegeFightFactCounts.disputed} Disputed
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/40 text-indigo-300">
                        {collegeFightFactCounts.missing} Missing Gaps
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Column */}
                <div className="flex flex-col items-start lg:items-end justify-between gap-6 shrink-0 lg:w-72 pt-4 lg:pt-0">
                  <div className="w-full p-4 rounded-xl bg-[#050d17]/90 border border-[#1e3d6b] text-xs space-y-2.5 shadow-md">
                    <span className="font-serif font-semibold text-[#eed89b] block">Invoked Statutes:</span>
                    <div className="space-y-1.5 font-mono text-[11px]">
                      <div className="text-slate-200 flex items-center gap-1.5">⚖️ <span>BNS 115(2) / 117 (Hurt)</span></div>
                      <div className="text-slate-200 flex items-center gap-1.5">⚖️ <span>BNS 126(2) (Restraint)</span></div>
                      <div className="text-[#eed89b] flex items-center gap-1.5">🛡️ <span>BNSS 480 (Regular Bail)</span></div>
                      <div className="text-[#eed89b] flex items-center gap-1.5">🛡️ <span>BNSS 38 / 48 (Arrest Rights)</span></div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleLaunch(COLLEGE_FIGHT_SCENARIO)}
                    className="w-full py-3.5 px-6 rounded-xl court-btn-gold text-xs font-bold flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <span>Launch Dossier into Simulator ➔</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Additional Pre-Fixed Builtin Dossiers */}
        {filteredBuiltins.length > 0 && (
          <div>
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
              <h3 className="text-lg font-serif font-bold text-white">
                Pre-Configured Landmark Dossiers
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredBuiltins.map((dossier) => {
                const classification = getActClassification(dossier);

                return (
                  <div
                    key={dossier.scenario_id}
                    className="p-6 rounded-2xl bg-[#071324]/90 border border-[#1e3d6b]/70 hover:border-[#dfb15b] transition-all flex flex-col justify-between court-card-hover-dark shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2 flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider font-mono ${classification.badgeClass}`}>
                            {classification.label}
                          </span>
                          <span className="font-mono text-slate-300 text-[11px]">
                            {dossier.fir_number || 'FIR Pending'}
                          </span>
                        </div>
                        <span className="text-[#eed89b] font-medium text-xs">
                          {dossier.difficulty || 'Advanced'}
                        </span>
                      </div>

                      <h4 className="text-lg font-serif font-bold text-white mb-2">
                        {dossier.title}
                      </h4>

                      <p className="text-xs text-slate-300 leading-relaxed mb-4 font-sans">
                        {dossier.summary}
                      </p>

                      <div className="flex gap-1.5 flex-wrap mb-3">
                        {(dossier.statutes || []).map((s, idx) => (
                          <span key={idx} className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#050d17] text-[#eed89b] border border-[#dfb15b]/30">
                            {s}
                          </span>
                        ))}
                      </div>

                      {/* Fact breakdown */}
                      {dossier.facts && dossier.facts.length > 0 && (
                        <div className="mb-4 pt-2 border-t border-slate-800/80">
                          <div className="flex items-center justify-between text-[11px] mb-1.5">
                            <span className="text-slate-400 font-medium">Fact Breakdown:</span>
                            <button
                              type="button"
                              onClick={() => setSelectedScenarioForModal(dossier)}
                              className="text-[#eed89b] hover:underline flex items-center gap-1 cursor-pointer font-medium"
                            >
                              <Info className="w-3 h-3 fill-[#dfb15b]/20 text-[#dfb15b]" />
                              <span>Inspect Gaps ➔</span>
                            </button>
                          </div>
                          <div
                            onClick={() => setSelectedScenarioForModal(dossier)}
                            className="flex gap-1.5 flex-wrap text-[10px] font-mono cursor-pointer"
                            title="Click to inspect all facts and gap analysis"
                          >
                            <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300">
                              {dossier.facts.filter(f => f.tag === 'established').length} Established
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-[#241c14] border border-[#a88247]/30 text-[#dfb15b]">
                              {dossier.facts.filter(f => f.tag === 'allegation').length} Allegations
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-rose-950/80 border border-rose-500/30 text-rose-300">
                              {dossier.facts.filter(f => f.tag === 'disputed').length} Disputed
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300">
                              {dossier.facts.filter(f => f.tag === 'missing').length} Missing
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleLaunch(dossier)}
                      className="w-full py-2.5 px-4 rounded-xl court-btn-navy text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      <span>Launch Dossier into Simulator ➔</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Fact Taxonomy & Gap Analysis Modal */}
      <FactTaxonomyModal
        isOpen={Boolean(selectedScenarioForModal)}
        scenario={selectedScenarioForModal}
        onClose={() => setSelectedScenarioForModal(null)}
      />
    </div>
  );
}
