import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Trophy, 
  Check, 
  X, 
  ArrowRight, 
  FileText, 
  BookOpen, 
  Shield, 
  ChevronRight, 
  Scale, 
  Award, 
  Printer, 
  Briefcase, 
  Calendar,
  History,
  CheckCircle2,
  AlertTriangle,
  Gavel
} from 'lucide-react';
import { getHearingHistory, getActiveCaseId, getActiveHearingStatus } from '../utils/courtroomDatabase';
import { getScenarioById, COLLEGE_FIGHT_SCENARIO } from '../data/legalData';

export default function DebriefScreen() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('didWell');
  const [showFullReportModal, setShowFullReportModal] = useState(false);
  const [selectedHistoryIndex, setSelectedHistoryIndex] = useState(0);

  // Retrieve hearing history and active status from persistent database
  const history = getHearingHistory();
  const activeStatus = getActiveHearingStatus();
  const activeCaseId = getActiveCaseId();

  // Resolve active scenario
  const activeScenario = location.state?.scenario
    || (activeStatus?.scenario?.scenario_id === activeCaseId ? activeStatus.scenario : null)
    || getScenarioById(activeCaseId)
    || COLLEGE_FIGHT_SCENARIO;

  // Verify whether the current hearing has concluded with a verdict or history exists
  const isHearingCompleted = Boolean(
    location.state?.ruling ||
    location.state?.provision ||
    history.length > 0 ||
    (activeStatus && activeStatus.isCompleted && (activeStatus.caseId === activeScenario.scenario_id || activeStatus.caseId === activeCaseId))
  );

  // If hearing is NOT completed yet and no history exists, display the in-session judicial gate
  if (!isHearingCompleted) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#07111e] text-slate-100 flex items-center justify-center p-4 font-sans">
        <div className="max-w-xl w-full bg-[#0b1526]/95 border border-[#dfb15b]/40 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#dfb15b]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="w-16 h-16 rounded-2xl bg-[#07111e] border-2 border-[#dfb15b] flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Scale className="w-8 h-8 text-[#dfb15b] fill-[#dfb15b]/20" />
          </div>

          <span className="px-3.5 py-1 rounded-full text-[11px] font-mono font-bold bg-[#07111e] text-[#eed89b] border border-[#dfb15b]/50 uppercase tracking-wider mb-4 inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>Hearing In Session • Ruling Reserved</span>
          </span>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
            Judicial Debrief Pending Closure
          </h2>

          <p className="text-xs text-[#eed89b] font-mono mb-4">
            {activeScenario.title} • {activeScenario.fir_number}
          </p>

          <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto mb-6 font-sans">
            Under Indian courtroom advocacy protocol, the comprehensive performance scorecard, statutory breakdown, and judicial decree report are compiled only upon formal closure of proceedings and open-court delivery of the judicial order.
          </p>

          <div className="p-4 rounded-xl bg-[#07111e] border border-slate-800 text-xs text-left mb-6 space-y-2">
            <div className="flex justify-between text-slate-400">
              <span>Court:</span>
              <span className="text-slate-200 font-medium">{activeScenario.court || 'Sessions Court, Delhi'}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Advocacy Role:</span>
              <span className="text-[#eed89b] font-medium">{activeScenario.role || 'Defence Counsel'}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Hearing Stage:</span>
              <span className="text-amber-300 font-medium font-mono">Stage 5: Oral Submissions Open</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/hearing"
              className="w-full sm:w-auto px-6 py-3 rounded-xl court-btn-gold text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              <Gavel className="w-4 h-4" />
              <span>Enter Courtroom Simulator ➔</span>
            </Link>
            <Link
              to="/scenarios"
              className="w-full sm:w-auto px-5 py-3 rounded-xl court-btn-navy text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <span>Back to Docket</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Selected session from persistent history
  const selectedSession = (history.length > 0 && selectedHistoryIndex !== null && history[selectedHistoryIndex])
    ? history[selectedHistoryIndex]
    : null;

  // Resolve effective scenario for the chosen session
  const effectiveScenario = selectedSession 
    ? (getScenarioById(selectedSession.scenarioId) || {
        scenario_id: selectedSession.scenarioId,
        title: selectedSession.caseTitle,
        fir_number: selectedSession.firNumber || 'FIR Recorded',
        court: selectedSession.court || 'Sessions Court, New Delhi',
        category: 'Criminal Procedure & Bail',
        statutes: ['Section 480 BNSS', 'Section 47 BNSS', 'Section 115 BNS'],
        role: 'Defence Counsel'
      })
    : activeScenario;

  const defectsRaised = selectedSession 
    ? (selectedSession.defectsRaised || [])
    : (location.state?.defectsRaised || activeStatus?.defectsRaised || []);

  const effectiveScore = typeof selectedSession?.score === 'number'
    ? selectedSession.score
    : Math.min(35, 20 + Math.min(10, defectsRaised.length * 3));

  const judicialRuling = selectedSession?.ruling || (selectedSession ? {
    title: 'IN THE COURT OF THE PRINCIPAL SESSIONS JUDGE: NEW DELHI',
    caseTitle: `${selectedSession.caseTitle} [FIR ${selectedSession.firNumber || '204/2025'}]`,
    coram: 'CORAM: Hon\'ble Mr. Justice R.K. Varma, Sessions Judge',
    dateOfOrder: selectedSession.timestamp 
      ? new Date(selectedSession.timestamp).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
      : new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    outcome: selectedSession.verdictOutcome || 'BAIL APPLICATION DISPOSED',
    benchSummary: selectedSession.verdictSummary || `The Court has evaluated the hearing record for ${selectedSession.caseTitle}. Arguments heard and judicial decree delivered.`,
    conditions: [
      'Applicant/Accused shall furnish a personal bond in the sum of ₹40,000/- with one solvent surety.',
      'The applicant shall surrender passport (if any) to the Court Registry.',
      'The applicant shall cooperate in all further investigative proceedings.',
      'The applicant shall refrain from contacting or intimidating witnesses.'
    ]
  } : (location.state?.ruling || activeStatus?.ruling || {
    title: 'IN THE COURT OF THE PRINCIPAL SESSIONS JUDGE: NEW DELHI',
    caseTitle: `${effectiveScenario.title} [FIR ${effectiveScenario.fir_number || '204/2025'}]`,
    coram: 'CORAM: Hon\'ble Mr. Justice R.K. Varma, Sessions Judge',
    dateOfOrder: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    outcome: defectsRaised.length > 0 
      ? 'BAIL APPLICATION GRANTED WITH PROTECTIVE DIRECTIONS'
      : 'BAIL APPLICATION DISPOSED WITH DIRECTIONS',
    benchSummary: defectsRaised.length > 0
      ? `The Court has meticulously scrutinized the case diary. The procedural infirmities raised by the Defence regarding statutory notice under BNSS and search non-compliance significantly temper the allegations. Pre-trial liberty is protected subject to stringent conditions.`
      : `Having evaluated the case record, while investigation remains in progress, custody is no longer required for recovery purposes. The accused has deep local roots and clean antecedents.`,
    conditions: [
      'Applicant/Accused shall furnish a personal bond of ₹35,000/- with one sound surety of like amount to the satisfaction of the Trial Court.',
      'The applicant shall surrender passport (if any) to the Court Registry.',
      'The applicant shall cooperate in all further investigative proceedings.',
      'The applicant shall refrain from contacting or intimidating the complainant.'
    ]
  }));

  const currentScore = effectiveScore;
  const maxScore = 35;

  const getEvaluationTier = (score) => {
    if (score >= 30) return { label: 'Distinguished Advocate', color: 'bg-emerald-900/80 text-emerald-200 border-emerald-500/60' };
    if (score >= 26) return { label: 'Proficient Advocate', color: 'bg-[#ebdcc4] text-[#4f3a18] border-[#ddc6a4]' };
    return { label: 'Good Foundation', color: 'bg-[#ebdcc4] text-[#4f3a18] border-[#ddc6a4]' };
  };

  const tier = getEvaluationTier(currentScore);

  const skillRatio = currentScore / 35;
  const skills = [
    { name: 'Statutory Accuracy', score: Math.max(2, Math.min(5, Math.round(5 * skillRatio + (defectsRaised.length > 0 ? 0.5 : 0)))), max: 5 },
    { name: 'Issue Identification', score: Math.max(2, Math.min(5, Math.round(5 * skillRatio))), max: 5 },
    { name: 'Law → Facts Application', score: Math.max(2, Math.min(5, Math.round(4.8 * skillRatio))), max: 5 },
    { name: 'Evidence & Procedural Gaps', score: Math.max(2, Math.min(5, Math.min(5, 2 + defectsRaised.length))), max: 5 },
    { name: 'Case-law Application', score: Math.max(3, Math.min(5, Math.round(4.5 * skillRatio))), max: 5 },
    { name: 'Procedural Reasoning', score: Math.max(2, Math.min(5, Math.round(4.8 * skillRatio))), max: 5 },
    { name: 'Courtroom Conduct', score: 5, max: 5 }
  ];

  // Dynamic feedback items
  const dynamicWhatDidWell = [
    ...(defectsRaised.length > 0 
      ? defectsRaised.map(d => `Advocated effectively on procedural ground: "${d}" under codified Sanhita mandate.`) 
      : [`Demonstrated procedural command over statutory standards applicable to ${effectiveScenario.category || 'criminal bail'}.`]),
    `Proper decorum and address maintained before the Sessions Judge during oral submissions.`,
    `Accurately grounded arguments within the statutory framework of ${effectiveScenario.category || 'the active criminal charge'}.`
  ];

  const dynamicWhatMissed = [
    ...(defectsRaised.length < 2 ? ['Cross-examine seizure panchas regarding contemporaneous presence under BNSS Section 47.'] : []),
    'Elaborate on constitutional liberty guarantees under Article 21 in support of statutory bail provisions.',
    'Formally challenge omission of Section 63 BSA electronic hash certificates for digital records.'
  ];

  // Dynamic authorities for active case
  const authorities = (effectiveScenario.statutes || ['Section 480 BNSS', 'Section 115 BNS', 'Section 47 BNSS']).slice(0, 3);

  const handleSelectSession = (idx, openModal = false) => {
    setSelectedHistoryIndex(idx);
    if (openModal) {
      setShowFullReportModal(true);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#fbfaf7] text-[#07111e] py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Top Breadcrumb & Print Action */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <Link
            to="/hearing"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#07111e] transition-colors"
          >
            <span>← Return to Courtroom</span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-[#dfb15b]/60 hover:bg-[#fbf5ea] text-xs font-bold text-[#8c6508] flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              title="Print certified copy of the judicial decree and debrief report"
            >
              <Printer className="w-3.5 h-3.5 text-[#8c6508]" />
              <span>🖨️ Print Final Verdict</span>
            </button>
            <div className="flex items-center gap-2 text-xs font-mono text-[#8c6508] bg-[#fbf5ea] border border-[#e8d5b5] px-3 py-1 rounded-full">
              <span>{effectiveScenario.title} • {selectedSession ? `Session (${new Date(selectedSession.timestamp).toLocaleDateString('en-GB')})` : 'Verdict Delivered'}</span>
            </div>
          </div>
        </div>

        {/* Banner when viewing report in context of a specific statutory provision */}
        {location.state?.provision && (
          <div className="mb-6 p-4 rounded-2xl bg-[#fbf5ea] border border-[#dfb15b] text-[#07111e] flex items-center justify-between gap-3 shadow-xs flex-wrap">
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-[#8c6508] shrink-0" />
              <div className="text-xs">
                <span className="text-[#8c6508] font-bold">Statutory Provision Context: </span>
                <span className="font-semibold">{location.state.provision.section} ({location.state.provision.act})</span>
                <span className="text-slate-600 ml-1.5">— {location.state.provision.title}</span>
              </div>
            </div>
            <Link
              to={`/reference?section=${location.state.provision.id}`}
              className="text-xs font-bold text-[#8c6508] hover:underline"
            >
              Back to Provision ➔
            </Link>
          </div>
        )}

        {/* Banner when examining an archived past hearing report */}
        {selectedSession && selectedHistoryIndex > 0 && (
          <div className="mb-6 p-4 rounded-2xl bg-[#0b1b30] border border-[#dfb15b]/60 text-white flex items-center justify-between gap-3 shadow-md flex-wrap">
            <div className="flex items-center gap-2.5">
              <History className="w-4 h-4 text-[#dfb15b] shrink-0" />
              <div className="text-xs">
                <span className="text-[#eed89b] font-bold">Archived Proceeding Loaded: </span>
                <span className="font-semibold">{effectiveScenario.title}</span>
                <span className="text-slate-300 ml-1.5 font-mono">({new Date(selectedSession.timestamp).toLocaleDateString('en-GB')} • Score: {effectiveScore}/35)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFullReportModal(true)}
                className="px-3 py-1 rounded-lg bg-[#071324] hover:bg-slate-800 text-xs font-semibold text-[#eed89b] border border-[#dfb15b]/40 cursor-pointer"
              >
                Inspect Decree
              </button>
              <button
                onClick={() => handleSelectSession(0)}
                className="px-3 py-1 rounded-lg court-btn-gold text-xs font-bold cursor-pointer"
              >
                View Latest Hearing
              </button>
            </div>
          </div>
        )}

        {/* Header with Medallion Trophy & Score Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 pb-6 border-b border-[#e8e2d8]">
          <div className="flex items-center gap-4">
            {/* Dark Navy Circle with Solid Gold Filled Trophy */}
            <div className="w-14 h-14 rounded-full bg-[#07111e] border-2 border-[#dfb15b] flex items-center justify-center shadow-md shrink-0">
              <Trophy className="w-7 h-7 text-[#dfb15b] fill-[#dfb15b]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#07111e] tracking-tight">
                Hearing Evaluation & Judicial Order
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                Comprehensive advocacy assessment, statutory findings, and judicial ruling decree.
              </p>
            </div>
          </div>

          {/* Score Badge */}
          <div className="bg-[#f4efe6] border border-[#dfd6c7] rounded-2xl px-5 py-3 flex items-center gap-4 shrink-0 self-start sm:self-auto shadow-2xs court-card-hover">
            <div>
              <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold block">Your Score</span>
              <span className="font-serif font-bold text-2xl text-[#07111e]">
                {currentScore} <span className="text-sm text-slate-500 font-normal">/ {maxScore}</span>
              </span>
            </div>
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border shadow-2xs ${tier.color}`}>
              {tier.label}
            </span>
          </div>
        </div>

        {/* Judicial Determination Highlight Banner */}
        <div className="mb-8 p-5 rounded-2xl bg-[#07111e] text-white border border-[#dfb15b]/40 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#0b1b30] border border-[#dfb15b]/50 flex items-center justify-center text-[#dfb15b] shrink-0 mt-0.5">
              <Scale className="w-5 h-5 fill-[#dfb15b]/30" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-[#eed89b] uppercase tracking-wider">
                Pronounced Judicial Ruling • {judicialRuling.coram}
              </div>
              <h2 className="font-serif font-bold text-base sm:text-lg text-white mt-0.5">
                {judicialRuling.outcome}
              </h2>
              <p className="text-xs text-slate-300 font-sans mt-1 line-clamp-2 max-w-2xl leading-relaxed">
                "{judicialRuling.benchSummary}"
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowFullReportModal(true)}
            className="px-4 py-2 rounded-xl court-btn-gold text-xs font-bold shrink-0 self-start sm:self-auto shadow-sm flex items-center gap-1.5"
          >
            <span>Inspect Decree</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Two-Column Grid: Score Breakdown (Left) vs Assessment Analysis (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          
          {/* Left Column: Score Breakdown */}
          <div className="md:col-span-6 bg-white rounded-2xl border border-[#e6dfd3] p-6 shadow-xs court-card-hover flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5 pb-2 border-b border-slate-100">
                <h3 className="font-serif font-bold text-base text-[#07111e] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#dfb15b]" />
                  <span>Advocacy Skills Metric</span>
                </h3>
                <span className="text-[11px] font-mono text-slate-500">Benchmark: 70%</span>
              </div>

              <div className="space-y-4">
                {skills.map((skill, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                      <span className="text-[#07111e]">{skill.name}</span>
                      <span className="text-slate-500 font-mono font-semibold text-[11px]">
                        {skill.score}/{skill.max}
                      </span>
                    </div>
                    {/* Golden progress bar */}
                    <div className="w-full bg-[#f1ece2] h-2.5 rounded-full overflow-hidden p-0.5">
                      <div
                        className="bg-gradient-to-r from-[#eed89b] via-[#dfb15b] to-[#c59b27] h-full rounded-full transition-all duration-700 shadow-2xs"
                        style={{ width: `${(skill.score / skill.max) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Overall Evaluation:</span>
              <strong className="text-[#07111e]">{tier.label}</strong>
            </div>
          </div>

          {/* Right Column: Tabbed Feedback & Relevant Authorities */}
          <div className="md:col-span-6 space-y-6">
            
            {/* Tabbed Card (What You Did Well / What You Missed) */}
            <div className="bg-white rounded-2xl border border-[#e6dfd3] p-6 shadow-xs court-card-hover">
              {/* Tab Header with Golden Active Indicator */}
              <div className="flex gap-2 border-b border-[#eee9e0] pb-3 mb-4 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('didWell')}
                  className={`px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
                    activeTab === 'didWell'
                      ? 'bg-[#f4efe6] text-[#07111e] border-b-2 border-[#dfb15b] shadow-2xs'
                      : 'text-slate-500 hover:text-[#07111e] hover:bg-slate-50'
                  }`}
                >
                  What You Did Well ({dynamicWhatDidWell.length})
                </button>
                <button
                  onClick={() => setActiveTab('missed')}
                  className={`px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
                    activeTab === 'missed'
                      ? 'bg-[#f4efe6] text-[#07111e] border-b-2 border-[#dfb15b] shadow-2xs'
                      : 'text-slate-500 hover:text-[#07111e] hover:bg-slate-50'
                  }`}
                >
                  Procedural Areas to Fortify ({dynamicWhatMissed.length})
                </button>
              </div>

              {activeTab === 'didWell' ? (
                <ul className="space-y-3.5 text-xs text-slate-800">
                  {dynamicWhatDidWell.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 leading-relaxed">
                      <div className="w-4.5 h-4.5 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-2xs">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-3.5 text-xs text-slate-800">
                  {dynamicWhatMissed.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 leading-relaxed">
                      <div className="w-4.5 h-4.5 rounded-full bg-amber-600 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-2xs">
                        <AlertTriangle className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Relevant Authorities Card Linked to Active Case */}
            <div className="bg-white rounded-2xl border border-[#e6dfd3] p-5 shadow-xs court-card-hover">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-md bg-[#fbf5ea] border border-[#e8d5b5] flex items-center justify-center text-[#dfb15b]">
                  <BookOpen className="w-3.5 h-3.5 fill-[#dfb15b] text-[#8c6508]" />
                </div>
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider font-serif">
                  Key Authorities for this Hearing
                </span>
              </div>

              <div className="space-y-2">
                {authorities.map((auth, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#faf8f5] border border-[#e8d5b5] flex items-center justify-between gap-3 group hover:border-[#dfb15b] transition-colors">
                    <div>
                      <h4 className="text-xs font-bold text-[#07111e] group-hover:text-[#8c6508] transition-colors font-serif">
                        {auth}
                      </h4>
                      <span className="text-[10px] text-slate-500 font-sans">
                        (Applicable to Case: {effectiveScenario.fir_number || effectiveScenario.title})
                      </span>
                    </div>
                    <Link
                      to={`/reference?caseId=${effectiveScenario.scenario_id}`}
                      className="text-xs text-[#07111e] hover:text-[#dfb15b] hover:underline font-semibold flex items-center gap-1 shrink-0"
                    >
                      <span>Examine</span>
                      <span className="text-[#dfb15b]">→</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Persistent Database History Log (If Multiple Sessions Exist) */}
        {history.length > 1 && (
          <div className="mb-8 p-5 bg-white rounded-2xl border border-[#e6dfd3] shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#07111e]">
                <History className="w-4 h-4 text-[#dfb15b]" />
                <span>Hearing Sessions Database ({history.length} Hearings Recorded)</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">Stored in Local Database</span>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {history.slice(0, 6).map((sess, idx) => {
                const isSelected = selectedHistoryIndex === idx;
                return (
                  <div
                    key={sess.sessionId}
                    onClick={() => handleSelectSession(idx)}
                    className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all duration-200 flex flex-col justify-between group ${
                      isSelected
                        ? 'border-[#dfb15b] bg-[#fbf5ea] shadow-md ring-2 ring-[#dfb15b]/50'
                        : 'border-slate-200 bg-[#faf8f5] hover:border-[#dfb15b]/60 hover:bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1.5 font-mono">
                        <span>{new Date(sess.timestamp).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        <span className="font-bold text-[#07111e] bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
                          Score: {sess.score || 24}/35
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-xs text-[#07111e] truncate group-hover:text-[#8c6508] transition-colors">
                        {sess.caseTitle}
                      </h4>
                      <p className="text-[11px] text-slate-600 truncate mt-0.5 font-sans">
                        {sess.verdictOutcome}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between">
                      <span className={`text-[10px] font-mono font-semibold ${isSelected ? 'text-[#8c6508]' : 'text-slate-400'}`}>
                        {isSelected ? '● Active Report' : 'Stored Session'}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectSession(idx, true);
                          }}
                          className="px-2 py-0.5 rounded bg-white hover:bg-[#dfb15b] text-[#07111e] border border-slate-300 hover:border-[#dfb15b] text-[10px] font-bold transition shadow-2xs cursor-pointer"
                          title="Open formal Judicial Decree for this hearing"
                        >
                          Decree
                        </button>
                        <span className={`text-[11px] font-bold flex items-center gap-0.5 ${isSelected ? 'text-[#8c6508]' : 'text-slate-600 group-hover:text-[#07111e]'}`}>
                          <span>View Report</span>
                          <span>➔</span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#e8e2d8]">
          {/* Navy Button: View Full Report */}
          <button
            onClick={() => setShowFullReportModal(true)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl court-btn-navy text-xs font-semibold flex items-center justify-center gap-2.5 shadow-md cursor-pointer"
          >
            <FileText className="w-4 h-4 fill-white/20 text-[#dfb15b]" />
            <span>View Full Judicial Decree</span>
          </button>

          {/* Golden Button: Start Another Hearing */}
          <Link
            to="/hearing"
            className="w-full sm:w-auto px-6 py-3 rounded-xl court-btn-gold text-xs font-semibold flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <span>Resume Simulator</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>

      </div>

      {/* Comprehensive Judicial Ruling Modal */}
      {showFullReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#071324] text-slate-100 rounded-2xl border border-[#dfb15b]/60 p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative court-card-hover-dark space-y-4">
            
            <button
              onClick={() => setShowFullReportModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Formal Court Heading */}
            <div className="text-center pb-4 border-b border-[#dfb15b]/30">
              <div className="w-10 h-10 rounded-xl bg-[#0b1b30] border border-[#dfb15b]/50 flex items-center justify-center text-[#dfb15b] mx-auto mb-2 shadow-sm">
                <Scale className="w-5 h-5 fill-[#dfb15b]/30" />
              </div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#eed89b]">
                {judicialRuling.title || 'IN THE COURT OF THE PRINCIPAL SESSIONS JUDGE'}
              </h3>
              <h2 className="font-serif font-bold text-lg text-white mt-0.5">
                {judicialRuling.caseTitle}
              </h2>
              <p className="text-[11px] font-mono text-slate-400 mt-1">
                {judicialRuling.coram} • Pronounced: {judicialRuling.dateOfOrder}
              </p>
            </div>

            {/* Operative Verdict */}
            <div className="p-4 rounded-xl bg-[#0b1b30] border border-[#dfb15b]/40 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Formal Judicial Order</span>
                <span className="font-serif font-bold text-white text-sm">{judicialRuling.outcome}</span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/50">
                DECREE ENTERED
              </span>
            </div>

            {/* Judicial Reasoning Summary */}
            <div className="p-4 rounded-xl bg-[#050d17] border border-slate-800 text-xs leading-relaxed">
              <h4 className="text-xs font-serif font-bold text-[#eed89b] uppercase tracking-wider mb-2">
                Judicial Findings & Grounds:
              </h4>
              <p className="text-slate-300 leading-relaxed font-sans font-normal">
                {judicialRuling.benchSummary}
              </p>
            </div>

            {/* Operative Directions & Bail Conditions */}
            <div className="p-4 rounded-xl bg-[#050d17] border border-slate-800 text-xs">
              <h4 className="text-xs font-serif font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span>Operative Directions to Registry & Jail Superintendent:</span>
              </h4>
              <ul className="space-y-2 text-slate-300">
                {(judicialRuling.conditions || []).map((cond, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-[#0b1b30]/80 p-2.5 rounded-lg border border-slate-700/60">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span>{cond}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Actions: Print / Close */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-lg bg-[#0b1b30] hover:bg-[#162f52] border border-[#dfb15b]/40 text-xs text-[#eed89b] font-medium flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Order</span>
              </button>

              <button
                onClick={() => setShowFullReportModal(false)}
                className="px-5 py-2 rounded-lg court-btn-gold text-xs font-semibold cursor-pointer"
              >
                Close Decree
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
