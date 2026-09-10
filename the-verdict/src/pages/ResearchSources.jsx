import React from 'react';
import { Link } from 'react-router-dom';
import { RESEARCH_SOURCES } from '../data/legalData';
import { ArrowLeft, ExternalLink, BookOpen, ShieldCheck } from 'lucide-react';
import { getSourceLogoComponent } from '../components/SourceLogos';

export default function ResearchSources() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#fbfaf7] text-[#07111e] py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Top Back Link */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#07111e] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fbf5ea] border border-[#e8d5b5] text-[#8c6508] text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5 fill-[#dfb15b] text-[#8c6508]" />
            <span>Verified Precedent Repositories</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#07111e] mb-1.5">
            Trusted Legal Research Platforms
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Access authentic legal databases, case-law archives, and official Gazette notifications for BNS, BNSS, and BSA.
          </p>
        </div>

        {/* Platform Cards List with Original Logos & Continuous Hover Animations */}
        <div className="space-y-4 mb-12">
          {RESEARCH_SOURCES.map((source) => (
            <a
              key={source.id}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-5 rounded-2xl bg-white border border-[#e6dfd3] court-card-hover transition-all duration-200 shadow-xs group"
            >
              <div className="flex items-center gap-4">
                {/* Platform Badge with Authentic Original Logo */}
                <div className="shrink-0 group-hover:scale-105 transition-transform duration-200">
                  {getSourceLogoComponent(source.id, "w-13 h-13 rounded-2xl shadow-sm")}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-bold text-base text-[#07111e] group-hover:text-[#8c6508] transition-colors">
                      {source.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 font-sans">
                    {source.tagline}
                  </p>
                </div>
              </div>

              <div className="text-slate-400 group-hover:text-[#dfb15b] pl-3 shrink-0 transition-transform group-hover:translate-x-1">
                <ExternalLink className="w-4 h-4 stroke-[2.5]" />
              </div>
            </a>
          ))}
        </div>

        {/* Footer Guarantee */}
        <div className="p-5 rounded-2xl bg-[#fbf5ea] border border-[#e8d5b5] flex items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 fill-emerald-600/20 shrink-0" />
            <p className="text-xs text-slate-700 font-medium">
              All citations generated within <strong>The Verdict</strong> courtroom simulator are cross-validated against these statutory gazettes to avoid judicial hallucination.
            </p>
          </div>
          <Link
            to="/reference?section=bnss-47"
            className="px-3.5 py-1.5 rounded-lg court-btn-gold text-xs font-semibold shrink-0"
          >
            Check Section 47
          </Link>
        </div>

      </div>
    </div>
  );
}
