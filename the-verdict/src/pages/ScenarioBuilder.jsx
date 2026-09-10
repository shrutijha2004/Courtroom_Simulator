import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { synthesizeCustomScenario, saveCustomScenario } from '../data/legalData';
import { setActiveCaseId, startOrResumeHearing } from '../utils/courtroomDatabase';
import {
  ArrowLeft,
  ArrowRight,
  Scale,
  Sparkles,
  CheckCircle2,
  XCircle,
  FileText,
  Shield,
  User,
  Gavel,
  RotateCcw,
  Zap
} from 'lucide-react';

const CATEGORIES = [
  'Bail Hearing',
  'Search Legality',
  'Remand Hearing',
  'Evidence Admissibility',
  'Anticipatory Bail'
];

const INJURY_OPTIONS = [
  { value: 'None', label: 'No Physical Injury Alleged' },
  { value: 'Simple Hurt', label: 'Simple Hurt / Minor Bruising' },
  { value: 'Grievous Fracture', label: 'Bone Fracture (Grievous Hurt - BNS 117)' },
  { value: 'Severe Trauma', label: 'Hospitalization / Severe Trauma' }
];

const DEMO_TEMPLATE = {
  title: 'State of NCT v. Raghav Sen',
  category: 'Bail Hearing',
  role: 'Defence Counsel',
  court: 'Sessions Court, Patiala House',
  fir_number: 'FIR No. 284/2025 - P.S. Vasant Vihar',
  summary: 'The accused, a 23-year-old postgraduate scholar, was apprehended late at night following a demonstration outside a public building. Police allege illegal assembly and hurt, while defense claims wrongful detention without statutory notice.',
  accused_name: 'Raghav Sen',
  accused_age: 23,
  accused_profile: 'Postgraduate student in Public Policy with deep family ties in Delhi',
  has_prior_antecedents: false,
  complainant_name: 'Inspector V.K. Bhardwaj',
  injury_degree: 'Simple Hurt',
  // Procedural flags
  has_sec38_memo: false, // NO written grounds notice -> procedural violation!
  has_sec48_relative: true,
  has_sec53_med_exam: false, // NO medical examination
  has_sec57_magistrate: true,
  // Evidence flags
  has_weapon_seized: true,
  has_independent_witnesses: false, // NO panchas -> vitiates recovery under BNSS 47!
  has_cctv: true,
  has_bsa63_cert: false, // NO BSA 63 certificate -> inadmissible digital evidence!
  has_mlc_report: true,
  evidence_notes: 'CCTV feed from Metro station camera #4 shows accused was standing 30 meters away when the barricade fell.'
};

const INITIAL_FORM = {
  title: '',
  category: 'Bail Hearing',
  role: 'Defence Counsel',
  court: 'Sessions Court, Delhi',
  fir_number: '',
  summary: '',
  accused_name: '',
  accused_age: 25,
  accused_profile: '',
  has_prior_antecedents: false,
  complainant_name: '',
  injury_degree: 'Simple Hurt',
  has_sec38_memo: false,
  has_sec48_relative: true,
  has_sec53_med_exam: false,
  has_sec57_magistrate: true,
  has_weapon_seized: false,
  has_independent_witnesses: false,
  has_cctv: true,
  has_bsa63_cert: false,
  has_mlc_report: true,
  evidence_notes: ''
};

export default function ScenarioBuilder() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSaved, setIsSaved] = useState(false);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLoadDemo = () => {
    setFormData(DEMO_TEMPLATE);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
  };

  // Live compiled preview of scenario
  const synthesizedScenario = synthesizeCustomScenario(formData);

  const handleSaveDossier = () => {
    saveCustomScenario(synthesizedScenario);
    setActiveCaseId(synthesizedScenario.scenario_id);
    startOrResumeHearing(synthesizedScenario.scenario_id);
    window.dispatchEvent(new CustomEvent('the_verdict_custom_cases_change'));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleLaunchSimulator = () => {
    saveCustomScenario(synthesizedScenario);
    setActiveCaseId(synthesizedScenario.scenario_id);
    startOrResumeHearing(synthesizedScenario.scenario_id);
    window.dispatchEvent(new CustomEvent('the_verdict_custom_cases_change'));
    navigate('/hearing', { state: { scenario: synthesizedScenario } });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#07111e] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Top Navigation & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#dfb15b]/25">
          <div>
            <Link
              to="/scenarios"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#eed89b] transition mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Back to Docket</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Interactive Scenario Builder
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5 font-sans">
              Formulate your custom criminal cases with Yes/No questions, procedural infractions, and evidence.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handleLoadDemo}
              className="px-3.5 py-1.5 rounded-xl bg-[#0b1b30] border border-[#dfb15b]/40 hover:border-[#dfb15b] text-[#eed89b] text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-2xs court-card-hover"
              title="Populate with realistic sample case"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#dfb15b] fill-[#dfb15b]/20" />
              <span>Load Demo Template</span>
            </button>
            <button
              onClick={handleReset}
              className="p-2 rounded-xl bg-[#0b1b30] border border-[#dfb15b]/30 hover:text-white text-slate-400 transition cursor-pointer"
              title="Clear all fields"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step Indicator Tabs */}
        <div className="grid grid-cols-5 gap-2 mb-8 text-center text-xs">
          {[
            { num: 1, label: 'Offence' },
            { num: 2, label: 'Parties' },
            { num: 3, label: 'BNSS Checks' },
            { num: 4, label: 'Evidence' },
            { num: 5, label: 'Review & Launch' }
          ].map((item) => (
            <button
              key={item.num}
              onClick={() => setStep(item.num)}
              className={`py-2 px-1 rounded-xl border transition cursor-pointer court-card-hover ${
                step === item.num
                  ? 'bg-[#dfb15b] text-[#07111e] font-bold border-transparent shadow-sm'
                  : step > item.num
                  ? 'bg-[#0b1b30] text-[#eed89b] border-[#dfb15b]/30'
                  : 'bg-[#071324] text-slate-400 border-[#1e3d6b]/60'
              }`}
            >
              <span className="block font-mono text-[11px]">0{item.num}</span>
              <span className="truncate block mt-0.5 text-[11px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* STEP 1: CASE IDENTITY & NATURE OF OFFENCE                                 */}
        {/* ========================================================================= */}
        {step === 1 && (
          <div className="p-6 rounded-2xl bg-[#0c1626] border border-slate-800 space-y-6 shadow-xl">
            <div>
              <h2 className="text-lg font-serif font-bold text-white mb-1">
                Step 1: Case Identity & Incident Details
              </h2>
              <p className="text-xs text-slate-400">
                Provide basic case identifying details and select the legal hearing stage.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-300 mb-1.5">Case Title / Docket Name *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="e.g. State v. Aarav Mehta (or The Metro Station Brawl)"
                  className="w-full bg-[#070e1b] border border-slate-700 focus:border-[#dfc299] rounded-md px-3 py-2 text-slate-100 placeholder-slate-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-slate-300 mb-1.5">Hearing Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => updateField('category', e.target.value)}
                    className="w-full bg-[#070e1b] border border-slate-700 focus:border-[#dfc299] rounded-md px-3 py-2 text-slate-100 outline-none"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-300 mb-1.5">Advocacy Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => updateField('role', e.target.value)}
                    className="w-full bg-[#070e1b] border border-slate-700 focus:border-[#dfc299] rounded-md px-3 py-2 text-slate-100 outline-none"
                  >
                    <option value="Defence Counsel">Defence Counsel (Advocate for Accused)</option>
                    <option value="Special Public Prosecutor">Special Public Prosecutor (State)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-slate-300 mb-1.5">FIR Reference (Optional)</label>
                  <input
                    type="text"
                    value={formData.fir_number}
                    onChange={(e) => updateField('fir_number', e.target.value)}
                    placeholder="e.g. FIR No. 341/2025 - P.S. Connaught Place"
                    className="w-full bg-[#070e1b] border border-slate-700 focus:border-[#dfc299] rounded-md px-3 py-2 text-slate-100 placeholder-slate-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-300 mb-1.5">Court Bench</label>
                  <input
                    type="text"
                    value={formData.court}
                    onChange={(e) => updateField('court', e.target.value)}
                    placeholder="e.g. Sessions Court, Delhi"
                    className="w-full bg-[#070e1b] border border-slate-700 focus:border-[#dfc299] rounded-md px-3 py-2 text-slate-100 placeholder-slate-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-300 mb-1.5">Incident Background & Facts Summary</label>
                <textarea
                  rows={4}
                  value={formData.summary}
                  onChange={(e) => updateField('summary', e.target.value)}
                  placeholder="Summarize what allegedly occurred, where the arrest took place, and the primary point of contention..."
                  className="w-full bg-[#070e1b] border border-slate-700 focus:border-[#dfc299] rounded-md px-3 py-2 text-slate-100 placeholder-slate-500 outline-none leading-relaxed"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-800">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2 rounded-md bg-[#dfc299] hover:bg-[#d0b084] text-[#111827] font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              >
                <span>Proceed to Parties Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: ACCUSED & COMPLAINANT PROFILES                                   */}
        {/* ========================================================================= */}
        {step === 2 && (
          <div className="p-6 rounded-2xl bg-[#0c1626] border border-slate-800 space-y-6 shadow-xl">
            <div>
              <h2 className="text-lg font-serif font-bold text-white mb-1">
                Step 2: Accused & Complainant Profile
              </h2>
              <p className="text-xs text-slate-400">
                Identify the client details and determine if prior criminal antecedents are present.
              </p>
            </div>

            <div className="space-y-5 text-xs">
              {/* Accused Details */}
              <div className="p-4 rounded-xl bg-[#08101d] border border-slate-800 space-y-3">
                <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-slate-400" />
                  <span>Accused Client Details</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-slate-400 mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      value={formData.accused_name}
                      onChange={(e) => updateField('accused_name', e.target.value)}
                      placeholder="e.g. Aarav Mehta"
                      className="w-full bg-[#0c1626] border border-slate-700 focus:border-[#dfc299] rounded-md px-3 py-1.5 text-slate-100 placeholder-slate-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Age (Years)</label>
                    <input
                      type="number"
                      value={formData.accused_age}
                      onChange={(e) => updateField('accused_age', Number(e.target.value))}
                      className="w-full bg-[#0c1626] border border-slate-700 focus:border-[#dfc299] rounded-md px-3 py-1.5 text-slate-100 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Profession / Social Roots Background</label>
                  <input
                    type="text"
                    value={formData.accused_profile}
                    onChange={(e) => updateField('accused_profile', e.target.value)}
                    placeholder="e.g. 3rd-year Engineering Student with family roots in Delhi"
                    className="w-full bg-[#0c1626] border border-slate-700 focus:border-[#dfc299] rounded-md px-3 py-1.5 text-slate-100 placeholder-slate-500 outline-none"
                  />
                </div>

                {/* Yes / No Toggle for Antecedents */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-800/80">
                  <div>
                    <span className="text-slate-200 font-medium block">Prior Criminal Antecedents / Past Inquiries?</span>
                    <span className="text-[11px] text-slate-500">
                      Crucial under Satender Kumar Antil precedent for Category A bail eligibility.
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => updateField('has_prior_antecedents', false)}
                      className={`px-3 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                        !formData.has_prior_antecedents
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                          : 'bg-[#101b2d] text-slate-400 border border-slate-800'
                      }`}
                    >
                      ✓ No (Clean Record)
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField('has_prior_antecedents', true)}
                      className={`px-3 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                        formData.has_prior_antecedents
                          ? 'bg-rose-950 text-rose-300 border border-rose-700'
                          : 'bg-[#101b2d] text-slate-400 border border-slate-800'
                      }`}
                    >
                      ⚠ Yes (Has Record)
                    </button>
                  </div>
                </div>
              </div>

              {/* Complainant Details */}
              <div className="p-4 rounded-xl bg-[#08101d] border border-slate-800 space-y-3">
                <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-slate-400" />
                  <span>Complainant Details & Alleged Harm</span>
                </span>

                <div>
                  <label className="block text-slate-400 mb-1">Complainant / Victim Name</label>
                  <input
                    type="text"
                    value={formData.complainant_name}
                    onChange={(e) => updateField('complainant_name', e.target.value)}
                    placeholder="e.g. Rohan Verma"
                    className="w-full bg-[#0c1626] border border-slate-700 focus:border-[#dfc299] rounded-md px-3 py-1.5 text-slate-100 placeholder-slate-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Alleged Physical Harm / Medical Severity</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                    {INJURY_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => updateField('injury_degree', opt.value)}
                        className={`p-2 rounded-lg border text-left transition cursor-pointer text-xs ${
                          formData.injury_degree === opt.value
                            ? 'bg-[#dfc299]/15 border-[#dfc299] text-white font-medium'
                            : 'bg-[#0c1626] border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 rounded-md bg-[#131f33] text-slate-300 hover:text-white text-xs font-medium cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-5 py-2 rounded-md bg-[#dfc299] hover:bg-[#d0b084] text-[#111827] font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              >
                <span>Proceed to BNSS Compliance</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: BNSS PROCEDURAL COMPLIANCE (YES/NO QUESTIONS)                     */}
        {/* ========================================================================= */}
        {step === 3 && (
          <div className="p-6 rounded-2xl bg-[#0c1626] border border-slate-800 space-y-6 shadow-xl">
            <div>
              <h2 className="text-lg font-serif font-bold text-white mb-1">
                Step 3: Procedural Compliance Checklist (Yes / No)
              </h2>
              <p className="text-xs text-slate-400">
                Toggle compliance for each statutory protection under the Bharatiya Nagarik Suraksha Sanhita (BNSS).
                Any "No" selection generates critical procedural arguments for your defense!
              </p>
            </div>

            <div className="space-y-3.5 text-xs">
              
              {/* Question 1: Section 38 Written Grounds Notice */}
              <div className="p-4 rounded-xl bg-[#08101d] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-white">BNSS Section 38 – Written Grounds of Arrest</span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">Mandatory</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Did the arresting officer deliver a contemporaneous written memo detailing the specific factual grounds of arrest?
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => updateField('has_sec38_memo', true)}
                    className={`px-3.5 py-1.5 rounded-md font-semibold text-xs transition cursor-pointer flex items-center gap-1 ${
                      formData.has_sec38_memo
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                        : 'bg-[#101b2d] text-slate-400 border border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Yes (Notice Served)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => updateField('has_sec38_memo', false)}
                    className={`px-3.5 py-1.5 rounded-md font-semibold text-xs transition cursor-pointer flex items-center gap-1 ${
                      !formData.has_sec38_memo
                        ? 'bg-rose-950 text-rose-300 border border-rose-600'
                        : 'bg-[#101b2d] text-slate-400 border border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>No (Statutory Defect)</span>
                  </button>
                </div>
              </div>

              {/* Question 2: Section 48 Relative Intimation */}
              <div className="p-4 rounded-xl bg-[#08101d] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-white">BNSS Section 48 – Intimation to Family / Relative</span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">Custodial Right</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Was a designated family member or friend formally informed of the arrest location immediately after apprehension?
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => updateField('has_sec48_relative', true)}
                    className={`px-3.5 py-1.5 rounded-md font-semibold text-xs transition cursor-pointer flex items-center gap-1 ${
                      formData.has_sec48_relative
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                        : 'bg-[#101b2d] text-slate-400 border border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Yes (Informed)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => updateField('has_sec48_relative', false)}
                    className={`px-3.5 py-1.5 rounded-md font-semibold text-xs transition cursor-pointer flex items-center gap-1 ${
                      !formData.has_sec48_relative
                        ? 'bg-rose-950 text-rose-300 border border-rose-600'
                        : 'bg-[#101b2d] text-slate-400 border border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>No (Kin Uninformed)</span>
                  </button>
                </div>
              </div>

              {/* Question 3: Section 53 Medical Examination */}
              <div className="p-4 rounded-xl bg-[#08101d] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-white">BNSS Section 53 – Mandatory Medical Examination</span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">Safety Audit</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Was the arrested person examined by a certified government medical officer recording pre-existing marks or trauma?
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => updateField('has_sec53_med_exam', true)}
                    className={`px-3.5 py-1.5 rounded-md font-semibold text-xs transition cursor-pointer flex items-center gap-1 ${
                      formData.has_sec53_med_exam
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                        : 'bg-[#101b2d] text-slate-400 border border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Yes (Examined)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => updateField('has_sec53_med_exam', false)}
                    className={`px-3.5 py-1.5 rounded-md font-semibold text-xs transition cursor-pointer flex items-center gap-1 ${
                      !formData.has_sec53_med_exam
                        ? 'bg-rose-950 text-rose-300 border border-rose-600'
                        : 'bg-[#101b2d] text-slate-400 border border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>No (Exam Skipped)</span>
                  </button>
                </div>
              </div>

              {/* Question 4: Section 57 Production within 24h */}
              <div className="p-4 rounded-xl bg-[#08101d] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-white">BNSS Section 57 – Production Before Magistrate within 24 Hours</span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">Article 22(2)</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Was the detainee produced before the nearest Judicial Magistrate strictly within 24 hours of apprehension?
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => updateField('has_sec57_magistrate', true)}
                    className={`px-3.5 py-1.5 rounded-md font-semibold text-xs transition cursor-pointer flex items-center gap-1 ${
                      formData.has_sec57_magistrate
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                        : 'bg-[#101b2d] text-slate-400 border border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Yes (Within 24h)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => updateField('has_sec57_magistrate', false)}
                    className={`px-3.5 py-1.5 rounded-md font-semibold text-xs transition cursor-pointer flex items-center gap-1 ${
                      !formData.has_sec57_magistrate
                        ? 'bg-rose-950 text-rose-300 border border-rose-600'
                        : 'bg-[#101b2d] text-slate-400 border border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>No (Unlawful Delay)</span>
                  </button>
                </div>
              </div>

            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 rounded-md bg-[#131f33] text-slate-300 hover:text-white text-xs font-medium cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="px-5 py-2 rounded-md bg-[#dfc299] hover:bg-[#d0b084] text-[#111827] font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              >
                <span>Proceed to Evidence & Seizures</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 4: EVIDENCE, SEIZURES & BSA COMPLIANCE (YES/NO)                      */}
        {/* ========================================================================= */}
        {step === 4 && (
          <div className="p-6 rounded-2xl bg-[#0c1626] border border-slate-800 space-y-6 shadow-xl">
            <div>
              <h2 className="text-lg font-serif font-bold text-white mb-1">
                Step 4: Evidence & Seizure Inventory
              </h2>
              <p className="text-xs text-slate-400">
                Define the evidentiary material gathered by the police and test for electronic admissibility under the Bharatiya Sakshya Adhiniyam (BSA).
              </p>
            </div>

            <div className="space-y-4 text-xs">
              
              {/* Evidence Question 1: Weapon Seizure & Panchas */}
              <div className="p-4 rounded-xl bg-[#08101d] border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-semibold text-white block">Was a physical weapon or contraband seized?</span>
                    <span className="text-[11px] text-slate-400">E.g., knife, blunt object, firearm, or contraband item.</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => updateField('has_weapon_seized', true)}
                      className={`px-3 py-1 rounded-md font-semibold text-xs transition cursor-pointer ${
                        formData.has_weapon_seized
                          ? 'bg-[#dfc299] text-[#111827]'
                          : 'bg-[#101b2d] text-slate-400 border border-slate-800'
                      }`}
                    >
                      Yes (Seized)
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField('has_weapon_seized', false)}
                      className={`px-3 py-1 rounded-md font-semibold text-xs transition cursor-pointer ${
                        !formData.has_weapon_seized
                          ? 'bg-[#101b2d] text-white border border-slate-600'
                          : 'bg-[#101b2d] text-slate-400 border border-slate-800'
                      }`}
                    >
                      No Weapon
                    </button>
                  </div>
                </div>

                {/* Sub-question: Panchas */}
                {formData.has_weapon_seized && (
                  <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0d1829] p-3 rounded-lg">
                    <div>
                      <span className="font-medium text-slate-200 block">Did 2 independent public witnesses sign the seizure memo (BNSS 47)?</span>
                      <span className="text-[11px] text-slate-400">If No, weapon recovery can be challenged as a planted recovery.</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => updateField('has_independent_witnesses', true)}
                        className={`px-3 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                          formData.has_independent_witnesses
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                            : 'bg-[#101b2d] text-slate-400 border border-slate-800'
                        }`}
                      >
                        ✓ Independent Panchas
                      </button>
                      <button
                        type="button"
                        onClick={() => updateField('has_independent_witnesses', false)}
                        className={`px-3 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                          !formData.has_independent_witnesses
                            ? 'bg-rose-950 text-rose-300 border border-rose-600'
                            : 'bg-[#101b2d] text-slate-400 border border-slate-800'
                        }`}
                      >
                        ⚠ Police Only (Defect)
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Evidence Question 2: CCTV Video & BSA Section 63 */}
              <div className="p-4 rounded-xl bg-[#08101d] border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-semibold text-white block">Is there digital or CCTV surveillance footage?</span>
                    <span className="text-[11px] text-slate-400">Campus cameras, street surveillance, or mobile recordings.</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => updateField('has_cctv', true)}
                      className={`px-3 py-1 rounded-md font-semibold text-xs transition cursor-pointer ${
                        formData.has_cctv
                          ? 'bg-[#dfc299] text-[#111827]'
                          : 'bg-[#101b2d] text-slate-400 border border-slate-800'
                      }`}
                    >
                      Yes (CCTV Available)
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField('has_cctv', false)}
                      className={`px-3 py-1 rounded-md font-semibold text-xs transition cursor-pointer ${
                        !formData.has_cctv
                          ? 'bg-[#101b2d] text-white border border-slate-600'
                          : 'bg-[#101b2d] text-slate-400 border border-slate-800'
                      }`}
                    >
                      No CCTV
                    </button>
                  </div>
                </div>

                {/* Sub-question: Section 63 BSA certificate */}
                {formData.has_cctv && (
                  <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0d1829] p-3 rounded-lg">
                    <div>
                      <span className="font-medium text-slate-200 block">Is Section 63 BSA Electronic Certificate Attached?</span>
                      <span className="text-[11px] text-slate-400">Electronic records without a valid certificate are strictly inadmissible.</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => updateField('has_bsa63_cert', true)}
                        className={`px-3 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                          formData.has_bsa63_cert
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                            : 'bg-[#101b2d] text-slate-400 border border-slate-800'
                        }`}
                      >
                        ✓ Certified (Admissible)
                      </button>
                      <button
                        type="button"
                        onClick={() => updateField('has_bsa63_cert', false)}
                        className={`px-3 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                          !formData.has_bsa63_cert
                            ? 'bg-rose-950 text-rose-300 border border-rose-600'
                            : 'bg-[#101b2d] text-slate-400 border border-slate-800'
                        }`}
                      >
                        ⚠ Missing BSA 63 Certificate
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Evidence Question 3: Medico-Legal Certificate */}
              <div className="p-4 rounded-xl bg-[#08101d] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="font-semibold text-white block">Is there a certified Medico-Legal Certificate (MLC)?</span>
                  <span className="text-[11px] text-slate-400">Official medical examination of the complainant's injuries.</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => updateField('has_mlc_report', true)}
                    className={`px-3 py-1 rounded-md font-semibold text-xs transition cursor-pointer ${
                      formData.has_mlc_report
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                        : 'bg-[#101b2d] text-slate-400 border border-slate-800'
                    }`}
                  >
                    ✓ MLC on Record
                  </button>
                  <button
                    type="button"
                    onClick={() => updateField('has_mlc_report', false)}
                    className={`px-3 py-1 rounded-md font-semibold text-xs transition cursor-pointer ${
                      !formData.has_mlc_report
                        ? 'bg-rose-950 text-rose-300 border border-rose-600'
                        : 'bg-[#101b2d] text-slate-400 border border-slate-800'
                    }`}
                  >
                    ⚠ No MLC Report
                  </button>
                </div>
              </div>

              {/* Specific Custom Evidence Annotation */}
              <div>
                <label className="block font-medium text-slate-300 mb-1.5">Additional Evidentiary Details / Notes</label>
                <textarea
                  rows={2}
                  value={formData.evidence_notes}
                  onChange={(e) => updateField('evidence_notes', e.target.value)}
                  placeholder="e.g. Discrepancy between complainant's statement and police diary timestamps..."
                  className="w-full bg-[#070e1b] border border-slate-700 focus:border-[#dfc299] rounded-md px-3 py-2 text-slate-100 placeholder-slate-500 outline-none leading-relaxed"
                />
              </div>

            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => setStep(3)}
                className="px-4 py-2 rounded-md bg-[#131f33] text-slate-300 hover:text-white text-xs font-medium cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={() => setStep(5)}
                className="px-5 py-2 rounded-md bg-[#dfc299] hover:bg-[#d0b084] text-[#111827] font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              >
                <span>Compile & Review Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 5: REVIEW & LAUNCH CASE DOSSIER                                      */}
        {/* ========================================================================= */}
        {step === 5 && (
          <div className="space-y-6">
            
            {/* Dossier Preview Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0c1626] border-2 border-slate-700 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#1a293e] text-slate-200 border border-slate-700">
                    {synthesizedScenario.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700">
                    {synthesizedScenario.fir_number}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#dfc299]/20 text-[#dfc299] border border-[#dfc299]/40">
                    Custom Created Dossier
                  </span>
                </div>

                <span className="text-xs text-slate-400 font-mono">
                  {synthesizedScenario.court}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
                {synthesizedScenario.title}
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                {synthesizedScenario.summary}
              </p>

              {/* Accused & Complainant Profiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="p-3 rounded-lg bg-[#070e1b] border border-slate-800 text-xs">
                  <span className="font-semibold text-slate-200 block mb-1">Accused Client Profile:</span>
                  <p className="text-slate-300">
                    {synthesizedScenario.accused.name} ({synthesizedScenario.accused.age} yrs) - {synthesizedScenario.accused.profile}
                  </p>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    {synthesizedScenario.accused.background}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#070e1b] border border-slate-800 text-xs">
                  <span className="font-semibold text-slate-200 block mb-1">Complainant / Alleged Victim:</span>
                  <p className="text-slate-300">
                    {synthesizedScenario.complainant.name} - {synthesizedScenario.complainant.profile}
                  </p>
                </div>
              </div>

              {/* Structural Fact Classification Breakdown */}
              <div className="mb-6">
                <span className="text-xs font-medium text-slate-400 block mb-2">
                  Structural Facts Breakdown (Synthesized by Engine):
                </span>
                <div className="flex gap-2 flex-wrap text-xs font-mono">
                  <span className="px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                    {synthesizedScenario.facts.filter(f => f.tag === 'established').length} Established Facts
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[#241c14] border border-[#a88247]/40 text-[#dfc299]">
                    {synthesizedScenario.facts.filter(f => f.tag === 'allegation').length} Allegations
                  </span>
                  <span className="px-2.5 py-1 rounded bg-rose-950/80 border border-rose-500/40 text-rose-300">
                    {synthesizedScenario.facts.filter(f => f.tag === 'disputed').length} Disputed
                  </span>
                  <span className="px-2.5 py-1 rounded bg-indigo-950/80 border border-indigo-500/40 text-indigo-300">
                    {synthesizedScenario.facts.filter(f => f.tag === 'missing').length} Statutory Gaps
                  </span>
                </div>
              </div>

              {/* Key Issues & Procedural Flaws */}
              <div className="p-4 rounded-xl bg-[#08101d] border border-slate-800 mb-6">
                <span className="font-semibold text-slate-200 text-xs block mb-2">
                  Primary Legal Points & Defenses Formulated:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {synthesizedScenario.legal_issues.map((issue, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Scale className="w-3.5 h-3.5 text-[#dfc299] shrink-0 mt-0.5" />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dynamic Mutations Preview */}
              <div className="p-3.5 rounded-xl bg-[#0e1b30] border border-slate-800 mb-6">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#dfc299] mb-1">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Dynamic Fact Mutations Configured ({synthesizedScenario.disruptive_variables.length} Variants)</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  During the live hearing, clicking "Change One Fact" will inject surprise evidentiary twists tailored directly to your case inputs.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setStep(4)}
                  className="w-full sm:w-auto px-4 py-2 rounded-md bg-[#131f33] text-slate-300 hover:text-white text-xs font-medium cursor-pointer"
                >
                  Back to Evidence
                </button>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleSaveDossier}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition border border-slate-700 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-300" />
                    <span>{isSaved ? '✓ Saved to Docket!' : 'Save to My Cases'}</span>
                  </button>

                  <button
                    onClick={handleLaunchSimulator}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-md bg-[#dfc299] hover:bg-[#d0b084] text-[#111827] text-xs font-bold transition cursor-pointer shadow-md flex items-center justify-center gap-2"
                  >
                    <Gavel className="w-4 h-4" />
                    <span>Enter Courtroom Simulator ➔</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
