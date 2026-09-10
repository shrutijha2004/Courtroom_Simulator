import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BNSS_KEY_PROVISIONS, getScenarioById } from '../data/legalData';
import { getActiveCaseId } from '../utils/courtroomDatabase';
import { verifyOutputCitation } from '../utils/citationSafeguard';
import {
  ArrowLeft,
  ChevronRight,
  Shield,
  UserCheck,
  User,
  Activity,
  HeartHandshake,
  Clock,
  BookOpen,
  Lightbulb,
  ShieldCheck,
  AlertTriangle,
  Link2,
  ExternalLink,
  Briefcase
} from 'lucide-react';

const CATEGORIES = [
  'Active Case Provisions',
  'BNS Offences',
  'Bail',
  'Arrest & Detention',
  'Evidence & Admissibility',
  'Investigation',
  'All Provisions'
];

export default function QuickReference() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSectionId = searchParams.get('section') || null;
  const [activeCategory, setActiveCategory] = useState('Active Case Provisions');

  // Active scenario resolution from database
  const activeCaseId = searchParams.get('caseId') || getActiveCaseId();
  const activeScenario = getScenarioById(activeCaseId);

  // Extract section numbers associated with active case
  const activeCaseStatutes = (activeScenario.statutes || []).map(s => s.toLowerCase());

  // Interactive Safeguard Tester state
  const [showSafeguardTester, setShowSafeguardTester] = useState(false);
  const [testInput, setTestInput] = useState(
    'We rely on State of Maharashtra v. Vikram R. Deshmukh for procedural arrest, and also refer to fictitious case Johnson v. Police Commissioner (2023).'
  );
  const [testResult, setTestResult] = useState(() => verifyOutputCitation(testInput));

  const handleTestSafeguard = (text) => {
    setTestInput(text);
    setTestResult(verifyOutputCitation(text));
  };

  const selectedSection = BNSS_KEY_PROVISIONS.find((s) => s.id === selectedSectionId);

  // Filter sections by Active Case or Category
  const filteredSections = BNSS_KEY_PROVISIONS.filter((s) => {
    if (activeCategory === 'Active Case Provisions') {
      const secNum = s.section.toLowerCase();
      const isDirectlyInvoked = activeCaseStatutes.some(st => {
        const normSt = st.toLowerCase().replace('section ', 'sec ');
        const normSec = secNum.toLowerCase().replace('section ', 'sec ');
        return normSt.includes(normSec) || normSec.includes(normSt);
      });
      const isProceduralCore = ['bnss-47', 'bnss-38', 'bnss-48', 'bnss-53', 'bnss-57'].includes(s.id);
      return isDirectlyInvoked || isProceduralCore;
    }
    if (activeCategory === 'All Provisions') return true;
    return s.category === activeCategory;
  });

  const getSectionIcon = (id) => {
    switch (id) {
      case 'bnss-47':
        return Shield;
      case 'bnss-48':
        return UserCheck;
      case 'bnss-38':
        return User;
      case 'bnss-53':
        return Activity;
      case 'bnss-56':
        return HeartHandshake;
      case 'bnss-57':
        return Clock;
      default:
        return BookOpen;
    }
  };

  const getOfficialActUrl = (actName = '') => {
    if (actName.includes('Nagarik Suraksha') || actName.includes('BNSS')) {
      return 'https://www.indiacode.nic.in/handle/123456789/21868';
    }
    if (actName.includes('Nyaya') || actName.includes('BNS')) {
      return 'https://www.indiacode.nic.in/handle/123456789/21867';
    }
    if (actName.includes('Sakshya') || actName.includes('BSA')) {
      return 'https://www.indiacode.nic.in/handle/123456789/21869';
    }
    return 'https://www.indiacode.nic.in/';
  };

  // =========================================================================
  // VIEW 1: UPLOADED SECTION DETAIL VIEW
  // =========================================================================
  if (selectedSection) {
    const isRelToActiveCase = activeCaseStatutes.some(st => st.includes(selectedSection.section.toLowerCase())) ||
      ['bnss-47', 'bnss-38', 'bnss-48', 'bnss-53', 'bnss-57'].includes(selectedSection.id);

    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#fbfaf7] text-[#07111e] py-8 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-4xl mx-auto">
          
          {/* Top Row: Breadcrumbs & Back Button */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <button
                onClick={() => setSearchParams({})}
                className="hover:text-[#07111e] flex items-center gap-1 cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
              <span>&gt;</span>
              <span
                className="hover:underline cursor-pointer"
                onClick={() => setSearchParams({})}
              >
                Quick Reference
              </span>
              <span>&gt;</span>
              <span className="text-[#07111e] font-semibold">{selectedSection.section}</span>
            </div>

            {isRelToActiveCase && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#fbf5ea] text-[#8c6508] border border-[#e8d5b5]">
                <Briefcase className="w-3 h-3 text-[#dfb15b]" />
                <span>Invoked in Active Case: {activeScenario.title}</span>
              </span>
            )}
          </div>

          {/* Sub Navigation Bar: Back on Left, WORKING External India Code Link on Right */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <button
              onClick={() => setSearchParams({})}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#e6dfd3] text-xs font-semibold text-[#07111e] hover:border-[#dfb15b] hover:bg-[#faf7f0] transition-all duration-200 cursor-pointer shadow-2xs court-card-hover"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#07111e] stroke-[2.5]" />
              <span>Back</span>
            </button>

            {/* Working External Link to Official Gazette / India Code */}
            <a
              href={getOfficialActUrl(selectedSection.act)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#f1ece1] hover:bg-[#e8decb] text-[#07111e] border border-[#ded5c5] hover:border-[#dfb15b] transition-all duration-200 shrink-0 shadow-2xs group cursor-pointer"
              title={`Open Official India Code Gazette for ${selectedSection.act}`}
            >
              <Link2 className="w-3.5 h-3.5 text-[#dfb15b] stroke-[2.5]" />
              <span>BNSS</span>
              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-[#07111e] transition-colors" />
            </a>
          </div>

          {/* Section Header */}
          <div className="mb-6 pb-4 border-b border-[#e8e2d8]">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#07111e] tracking-tight">
              {selectedSection.section} – {selectedSection.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              {selectedSection.act}
            </p>
          </div>

          {/* 1. Statutory Provision Card */}
          <div className="p-6 rounded-2xl bg-white border border-[#e6dfd3] shadow-xs mb-6 court-card-hover">
            <div className="flex items-center gap-2.5 text-xs font-bold text-[#07111e] mb-3 uppercase tracking-wider">
              <div className="w-6 h-6 rounded-md bg-[#0b1b30] flex items-center justify-center text-[#dfb15b] shrink-0">
                <Shield className="w-3.5 h-3.5 fill-[#dfb15b] text-[#dfb15b]" />
              </div>
              <span className="font-serif font-bold text-sm tracking-wide">Statutory Provision</span>
            </div>
            <p className="text-sm text-slate-800 leading-relaxed font-sans font-normal pl-8 border-l-2 border-[#dfb15b]">
              "{selectedSection.statutory_provision}"
            </p>
          </div>

          {/* 2. Key Points & Related Sections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            
            {/* Left: Key Points */}
            <div className="p-6 rounded-2xl bg-white border border-[#e6dfd3] shadow-xs court-card-hover flex flex-col justify-between">
              <div>
                <h3 className="font-serif font-bold text-base text-[#07111e] mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#dfb15b]" />
                  <span>Key Points</span>
                </h3>
                <ul className="space-y-3 text-xs text-slate-700">
                  {selectedSection.key_points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#07111e] mt-1.5 shrink-0" />
                      <span className="font-medium">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Related Sections */}
            <div className="p-6 rounded-2xl bg-white border border-[#e6dfd3] shadow-xs court-card-hover flex flex-col justify-between">
              <div>
                <h3 className="font-serif font-bold text-base text-[#07111e] mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#dfb15b]" />
                  <span>Related Sections</span>
                </h3>
                <div className="space-y-2 text-xs">
                  {selectedSection.related_sections.map((rel) => (
                    <button
                      key={rel.id}
                      onClick={() => setSearchParams({ section: rel.id })}
                      className="w-full text-left flex items-center justify-between text-slate-700 hover:text-[#07111e] hover:bg-[#faf7f0] p-2.5 rounded-lg transition-all duration-200 cursor-pointer group border border-transparent hover:border-[#dfb15b]/40"
                    >
                      <span className="font-medium flex items-center gap-2">
                        <span className="text-[#dfb15b] font-bold">➔</span>
                        <span>{rel.label}</span>
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#dfb15b] transition-transform group-hover:translate-x-0.5" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* 3. Why It Matters */}
          <div className="p-5 rounded-2xl bg-[#fbf5ea] border border-[#e8d5b5] shadow-xs flex items-start gap-3.5 court-card-hover">
            <div className="w-8 h-8 rounded-lg bg-[#edd8b6] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
              <Lightbulb className="w-4 h-4 text-[#8c6508] fill-[#dfb15b]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#07111e] uppercase tracking-wider mb-1 font-serif">
                Why It Matters
              </h4>
              <p className="text-xs text-slate-800 leading-relaxed font-sans font-medium">
                {selectedSection.why_it_matters}
              </p>
            </div>
          </div>

          {/* Bottom Action Jump to Simulator */}
          <div className="mt-8 pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#e8e2d8]">
            <Link
              to="/debrief"
              state={{ scenario: activeScenario, provision: selectedSection }}
              className="px-4 py-2 rounded-lg bg-[#07111e] hover:bg-[#0f223d] text-white text-xs font-semibold flex items-center gap-2 transition court-btn-navy"
            >
              <span>View Hearing Report for This Provision</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#dfb15b]" />
            </Link>

            <Link
              to="/hearing"
              className="px-4 py-2 rounded-lg court-btn-gold text-xs flex items-center gap-2"
            >
              <span>Practice in Simulator</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: BNSS KEY PROVISIONS LIST WITH ACTIVE CASE FILTERING
  // =========================================================================
  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#fbfaf7] text-[#07111e] py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Top Back Link & Safeguard Sandbox Toggle */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#07111e] hover:text-[#dfb15b] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Home</span>
          </Link>

          <button
            onClick={() => setShowSafeguardTester(!showSafeguardTester)}
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white hover:bg-[#faf7f0] text-[#07111e] border border-[#ded5c5] transition-all cursor-pointer flex items-center gap-2 shadow-2xs court-card-hover"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 fill-emerald-700/20" />
            <span>{showSafeguardTester ? 'Hide Citation Sandbox' : 'Citation Safeguard Sandbox'}</span>
          </button>
        </div>

        {/* Active Case Context Bar */}
        <div className="mb-6 p-4 rounded-2xl bg-[#07111e] text-white border border-[#dfb15b]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0b1b30] border border-[#dfb15b]/40 flex items-center justify-center text-[#dfb15b]">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#eed89b]">Currently Synchronized with Active Simulation</div>
              <h3 className="text-sm font-serif font-bold text-white">
                {activeScenario.title} <span className="text-slate-400 font-mono text-xs font-normal">({activeScenario.fir_number || 'FIR Reference Active'})</span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-[#0b1b30] text-[#eed89b] border border-[#dfb15b]/30">
              {(activeScenario.statutes || []).length} Codified Statutes Linked
            </span>
            <Link
              to="/hearing"
              className="px-3.5 py-1.5 rounded-lg court-btn-gold text-xs font-semibold flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
            >
              <span>Practice in Courtroom</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#07111e] mb-1">
            Statutory Provisions Codex
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Codified legal sections linked to active docket hearings and case facts under BNS, BNSS, and BSA.
          </p>
        </div>

        {/* Optional Citation Safeguard Sandbox */}
        {showSafeguardTester && (
          <div className="mb-8 p-5 rounded-2xl border border-[#dfb15b]/40 bg-[#07111e] text-slate-100 shadow-xl">
            <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2 text-white font-serif font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                <span>Citation Safeguard Engine Verification</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700/40">
                Verified Codex Active
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">Input Test Argument:</label>
                <textarea
                  rows={3}
                  value={testInput}
                  onChange={(e) => handleTestSafeguard(e.target.value)}
                  className="w-full bg-[#050d17] border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 font-mono focus:border-[#dfb15b] outline-hidden"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleTestSafeguard('Under State of Maharashtra v. Vikram R. Deshmukh, the arrest is void.')}
                    className="text-[10px] px-2.5 py-1 rounded bg-[#0f223d] text-emerald-300 hover:bg-[#162f52] cursor-pointer border border-emerald-500/30"
                  >
                    ✓ Verified Precedent
                  </button>
                  <button
                    onClick={() => handleTestSafeguard('We cite Fictitious Smith v. Union of Atlantis (2024).')}
                    className="text-[10px] px-2.5 py-1 rounded bg-[#0f223d] text-rose-300 hover:bg-[#162f52] cursor-pointer border border-rose-500/30"
                  >
                    ⚠️ Unverified Citation
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">Safeguarded Intercept Result:</label>
                <div className="w-full min-h-[76px] bg-[#050d17] border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 font-mono">
                  {testResult.text}
                </div>
                {testResult.warningMessage && (
                  <div className="mt-2 p-2 rounded bg-rose-950/80 border border-rose-500/40 text-[11px] text-rose-200 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>{testResult.warningMessage}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Category Pills: Active Case Provisions FIRST */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer shrink-0 court-card-hover ${
                activeCategory === cat
                  ? 'bg-[#07111e] text-[#eed89b] font-bold border border-[#dfb15b] shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-[#faf7f0] border border-[#e6dfd3]'
              }`}
            >
              {cat === 'Active Case Provisions' ? `Active Case (${filteredSections.length})` : cat}
            </button>
          ))}
        </div>

        {/* Provisions List */}
        <div className="space-y-3">
          {filteredSections.map((item) => {
            const IconComponent = getSectionIcon(item.id);
            const isDirectCaseItem = activeCaseStatutes.some(st => st.includes(item.section.toLowerCase()));

            return (
              <div
                key={item.id}
                onClick={() => setSearchParams({ section: item.id })}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-[#e6dfd3] hover:border-[#dfb15b] transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer group court-card-hover shadow-xs"
              >
                <div className="flex items-center gap-4">
                  {/* Navy Circular Icon with Filled Gold Symbol */}
                  <div className="w-11 h-11 rounded-full bg-[#07111e] border border-[#dfb15b]/40 flex items-center justify-center text-[#dfb15b] shrink-0 group-hover:bg-[#0b172a] transition-colors shadow-2xs">
                    <IconComponent className="w-5 h-5 fill-[#dfb15b]/30 text-[#dfb15b]" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-sm font-serif font-bold text-[#07111e] group-hover:text-[#0b172a] transition-colors">
                        {item.section} – {item.title}
                      </h3>
                      {isDirectCaseItem && (
                        <span className="px-2 py-0.2 rounded bg-[#fbf5ea] text-[#8c6508] border border-[#e8d5b5] text-[9px] font-mono font-bold">
                          Invoked
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug font-sans">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div className="text-slate-400 group-hover:text-[#dfb15b] pl-2 shrink-0 transition-transform group-hover:translate-x-1">
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
