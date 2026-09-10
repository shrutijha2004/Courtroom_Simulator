import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scale, User, X, Trophy, Gavel, Plus } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [showAbout, setShowAbout] = useState(false);

  const isHome = location.pathname === '/';
  const isSimulator = location.pathname === '/hearing';
  const isDebrief = location.pathname === '/debrief';
  const isReference = location.pathname.startsWith('/reference');
  const isDocket = location.pathname === '/scenarios';
  const isSources = location.pathname === '/sources';
  const isCreateCase = location.pathname === '/create-scenario';

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#dfb15b]/25 bg-[#07111e]/95 text-white backdrop-blur-md shadow-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-lg bg-[#0b1b30] border border-[#dfb15b]/50 flex items-center justify-center text-[#dfb15b] group-hover:border-[#dfb15b] transition-all duration-300 shadow-md group-hover:scale-105">
                <Scale className="w-5 h-5 fill-[#dfb15b]/30 text-[#dfb15b]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold tracking-tight text-lg sm:text-xl text-white group-hover:text-[#eed89b] transition-colors">
                  The Verdict
                </span>
                <span className="text-[10px] tracking-wider uppercase font-medium text-[#eed89b]/80">
                  Think. Argue. Apply.
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links with Continuous Gold Hover Animations */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              to="/"
              className={`text-sm px-3 py-1.5 rounded-md font-medium tracking-wide font-sans transition-all court-nav-item ${
                isHome ? 'text-[#eed89b] font-bold active' : 'text-[#9CA3AF] hover:text-[#F8F9FA]'
              }`}
            >
              Home
            </Link>

            <Link
              to="/hearing"
              className={`text-sm px-3 py-1.5 rounded-md font-medium tracking-wide font-sans transition-all court-nav-item flex items-center gap-1.5 ${
                isSimulator ? 'text-[#eed89b] font-bold active' : 'text-[#9CA3AF] hover:text-[#F8F9FA]'
              }`}
            >
              <Gavel className="w-3.5 h-3.5 text-[#dfb15b] fill-[#dfb15b]/20" />
              <span>Simulator</span>
            </Link>

            <Link
              to="/debrief"
              className={`text-sm px-3 py-1.5 rounded-md font-medium tracking-wide font-sans transition-all court-nav-item flex items-center gap-1.5 ${
                isDebrief ? 'text-[#eed89b] font-bold active' : 'text-[#9CA3AF] hover:text-[#F8F9FA]'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-[#dfb15b] fill-[#dfb15b]" />
              <span>Hearing Report</span>
            </Link>

            <Link
              to="/reference"
              className={`text-sm px-3 py-1.5 rounded-md font-medium tracking-wide font-sans transition-all court-nav-item ${
                isReference ? 'text-[#eed89b] font-bold active' : 'text-[#9CA3AF] hover:text-[#F8F9FA]'
              }`}
            >
              Provisions
            </Link>

            <Link
              to="/scenarios"
              className={`text-sm px-3 py-1.5 rounded-md font-medium tracking-wide font-sans transition-all court-nav-item ${
                isDocket ? 'text-[#eed89b] font-bold active' : 'text-[#9CA3AF] hover:text-[#F8F9FA]'
              }`}
            >
              Docket
            </Link>

            <Link
              to="/sources"
              className={`text-sm px-3 py-1.5 rounded-md font-medium tracking-wide font-sans transition-all court-nav-item ${
                isSources ? 'text-[#eed89b] font-bold active' : 'text-[#9CA3AF] hover:text-[#F8F9FA]'
              }`}
            >
              Sources
            </Link>

            <button
              onClick={() => setShowAbout(true)}
              className="text-sm px-3 py-1.5 rounded-md font-medium tracking-wide font-sans text-[#9CA3AF] hover:text-[#F8F9FA] transition-all court-nav-item cursor-pointer"
            >
              About
            </button>
          </nav>

          {/* Rightmost Section: Create Case & User Profile */}
          <div className="flex items-center gap-3">
            <Link
              to="/create-scenario"
              className={`text-sm font-medium tracking-wide font-sans transition-all flex items-center gap-1.5 court-nav-item px-2.5 py-1.5 ${
                isCreateCase
                  ? 'text-[#eed89b] font-bold active'
                  : 'text-[#9CA3AF] hover:text-[#F8F9FA]'
              }`}
              title="Create Custom Scenario"
            >
              <Plus className="w-3.5 h-3.5 text-[#dfb15b] stroke-[2.5]" />
              <span>Create Case</span>
            </Link>

            {/* Profile Avatar Circle with filled styling */}
            <div
              onClick={() => setShowAbout(true)}
              className="w-9 h-9 rounded-full border border-[#dfb15b]/50 bg-[#0f223d] flex items-center justify-center text-[#eed89b] hover:border-[#dfb15b] hover:scale-105 transition-all cursor-pointer shadow-md shrink-0"
              title="Advocate Profile • The Verdict"
            >
              <User className="w-4 h-4 fill-[#dfb15b]/30" />
            </div>
          </div>

        </div>
      </header>

      {/* Detailed, Authentic About The Verdict Modal */}
      {showAbout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#071324] text-slate-100 rounded-2xl border border-[#dfb15b]/50 p-6 sm:p-7 max-w-2xl w-full shadow-2xl relative max-h-[92vh] flex flex-col court-card-hover-dark font-sans">
            <button
              onClick={() => setShowAbout(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 text-[#dfb15b] mb-4 pb-3 border-b border-[#dfb15b]/20 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-[#0b1b30] border border-[#dfb15b]/40 flex items-center justify-center shadow-sm">
                <Scale className="w-5 h-5 fill-[#dfb15b]/30 text-[#dfb15b]" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-white">About The Verdict</h3>
                <span className="text-[11px] font-mono text-[#eed89b]">High-Fidelity Indian Courtroom Advocacy Simulator</span>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-4 text-xs text-slate-300 leading-relaxed font-sans">
              
              {/* Mission & Litigator Origin */}
              <div className="p-4 rounded-xl bg-[#0b1b30]/80 border border-[#1e3d6b]/80 space-y-2">
                <h4 className="font-serif font-bold text-sm text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#dfb15b]" />
                  <span>The Litigator's Craft: Beyond Textbook Rote</span>
                </h4>
                <p>
                  In Indian trial courtrooms, justice is rarely decided by abstract theory. It is determined by an advocate's immediate command of the case diary, the timing of statutory objections, and the tactical courage to challenge procedural shortcuts taken by investigating agencies.
                </p>
                <p>
                  <strong>The Verdict</strong> was created to bridge the critical gap between law school lectures and open-court trial advocacy. Instead of static multiple-choice questions or scripted dialogues, it places counsel directly before the Bench in an authentic adversarial crucible where oral submissions trigger immediate judicial questioning and sharp prosecutorial counter-arguments.
                </p>
              </div>

              {/* The 2023 Sanhitas Transition */}
              <div className="p-4 rounded-xl bg-[#08111e] border border-slate-800 space-y-2.5">
                <h4 className="font-serif font-bold text-sm text-[#eed89b] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>The 2023 Sanhita Transition: Precision in New Codification</span>
                </h4>
                <p>
                  With the historic replacement of the colonial Indian Penal Code (1860), Code of Criminal Procedure (1973), and Indian Evidence Act (1872) by the <strong>Bharatiya Nyaya Sanhita (BNS)</strong>, <strong>Bharatiya Nagarik Suraksha Sanhita (BNSS)</strong>, and <strong>Bharatiya Sakshya Adhiniyam (BSA)</strong>, legal practitioners face an urgent need for practical mastery over new numbering and modernized statutory mandates:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-mono text-[10px]">
                  <div className="p-2.5 rounded-lg bg-[#050d17] border border-slate-700/80">
                    <strong className="text-emerald-300 block mb-0.5">BNSS, 2023</strong>
                    <span className="text-slate-400">§ 38 (Written Grounds)</span><br />
                    <span className="text-slate-400">§ 480 / 483 (Bail Powers)</span><br />
                    <span className="text-slate-400">§ 47 (Search / Panchas)</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#050d17] border border-slate-700/80">
                    <strong className="text-rose-300 block mb-0.5">BNS, 2023</strong>
                    <span className="text-slate-400">§ 115(2) (Simple Hurt)</span><br />
                    <span className="text-slate-400">§ 117 (Grievous Hurt)</span><br />
                    <span className="text-slate-400">§ 316 (Breach of Trust)</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#050d17] border border-slate-700/80">
                    <strong className="text-indigo-300 block mb-0.5">BSA, 2023</strong>
                    <span className="text-slate-400">§ 63 (Digital Hash Cert)</span><br />
                    <span className="text-slate-400">§ 61 (Electronic Records)</span><br />
                    <span className="text-slate-400">§ 23 (Custodial Admissions)</span>
                  </div>
                </div>
              </div>

              {/* Core Architectural Pillars */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[#0b1b30]/70 border border-[#1e3d6b]/70 space-y-1">
                  <h5 className="font-serif font-bold text-xs text-white flex items-center gap-1.5">
                    <span>🛡️ Closed Citation Safeguard</span>
                  </h5>
                  <p className="text-[11px] text-slate-300">
                    Eliminates AI hallucinations by cross-checking every statute and case citation against verified Supreme Court and High Court precedents (*Pankaj Bansal*, *Satender Kumar Antil*, *Arnesh Kumar*, *Arjun Panditrao*).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0b1b30]/70 border border-[#1e3d6b]/70 space-y-1">
                  <h5 className="font-serif font-bold text-xs text-white flex items-center gap-1.5">
                    <span>📜 Certified Judicial Orders</span>
                  </h5>
                  <p className="text-[11px] text-slate-300">
                    Generates authentic Sessions Court decrees with detailed coram, formal grounds, operative bail conditions, solvent surety directions, and complete printable order sheets.
                  </p>
                </div>
              </div>

              {/* Curator's Colophon */}
              <div className="p-3.5 rounded-xl bg-[#050d17] border border-[#dfb15b]/25 flex items-start gap-3">
                <Gavel className="w-4 h-4 text-[#dfb15b] shrink-0 mt-0.5" />
                <div className="text-[11px] text-slate-300 space-y-1">
                  <span className="font-serif font-bold text-[#eed89b] block">Curator's Note:</span>
                  <p>
                    Crafted for judicial service aspirants, trial advocates, moot court litigators, and criminal jurisprudence scholars across India. Dedicated to the principle that procedural safeguards are the primary shield of constitutional liberty.
                  </p>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-3.5 mt-3 border-t border-slate-800 shrink-0">
              <p className="text-[11px] text-[#eed89b] italic font-serif">
                "The history of liberty has largely been the history of observance of procedural safeguards."
              </p>
              <button
                onClick={() => setShowAbout(false)}
                className="px-4 py-2 rounded-xl court-btn-gold text-xs font-bold cursor-pointer shadow-sm"
              >
                Close Briefing
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
