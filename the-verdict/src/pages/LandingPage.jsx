import React from 'react';
import { Link } from 'react-router-dom';
import { Gavel, BookOpen, FolderArchive, ArrowRight } from 'lucide-react';
import justiceHeroImg from '../assets/justice_hero.jpg';

export default function LandingPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#08101d] text-slate-100 flex flex-col justify-between relative overflow-hidden">
      
      {/* Background Picture Covering Full Page with Statue on the Right */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <img
          src={justiceHeroImg}
          alt="Courtroom Justice"
          className="w-full h-full object-cover object-[85%_center] sm:object-right select-none"
        />
        {/* Navy gradient overlay keeping statue visible on the right while giving left text high contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#08101d] via-[#08101d]/85 via-45% to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08101d] via-transparent to-[#08101d]/60" />
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12 relative z-10 w-full flex-1 flex flex-col justify-center">
        
        {/* Professional Hero Typography */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <h1 className="text-5xl sm:text-6xl font-serif font-bold text-[#F8F9FA] tracking-tight leading-tight mb-4">
            Practice Criminal Law. <br />
            <span className="text-[#F8F9FA]">Think Like a Lawyer.</span>
          </h1>

          <p className="text-lg font-sans font-normal text-[#9CA3AF] leading-relaxed max-w-xl">
            An AI-powered courtroom simulator and legal learning platform for BNS, BNSS and BSA.
          </p>
        </div>

        {/* Three Core Feature Cards with Continuous Smooth Hover */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mb-16">
          
          {/* Card 1: Courtroom Simulator */}
          <div className="rounded-xl border border-slate-800 bg-[#0d1829]/90 backdrop-blur-md p-6 flex flex-col justify-between court-card-hover-dark shadow-lg group">
            <div>
              <div className="w-10 h-10 rounded-lg border border-slate-700 bg-[#131f33] flex items-center justify-center text-[#dfc299] mb-5">
                <Gavel className="w-5 h-5 fill-[#dfc299]/20 text-[#dfc299]" />
              </div>
              <h3 className="text-lg sm:text-xl font-tool font-semibold text-[#F8F9FA] mb-2 group-hover:text-white transition-colors">
                Courtroom Simulator
              </h3>
              <p className="text-sm font-sans font-normal text-[#9CA3AF] leading-relaxed mb-6">
                Argue your case, face legal challenges and get a detailed performance analysis.
              </p>
            </div>

            <Link
              to="/hearing"
              className="w-full py-2.5 px-4 rounded-md court-btn-gold text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-sm cursor-pointer"
            >
              <span>Start Simulator</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </Link>
          </div>

          {/* Card 2: Quick Reference */}
          <div className="rounded-xl border border-slate-800 bg-[#0d1829]/90 backdrop-blur-md p-6 flex flex-col justify-between court-card-hover-dark shadow-lg group">
            <div>
              <div className="w-10 h-10 rounded-lg border border-slate-700 bg-[#131f33] flex items-center justify-center text-[#dfc299] mb-5">
                <BookOpen className="w-5 h-5 fill-[#dfc299]/20 text-[#dfc299]" />
              </div>
              <h3 className="text-lg sm:text-xl font-tool font-semibold text-[#F8F9FA] mb-2 group-hover:text-white transition-colors">
                Quick Reference
              </h3>
              <p className="text-sm font-sans font-normal text-[#9CA3AF] leading-relaxed mb-6">
                Access verified sections, key provisions and your legal rights (BNSS).
              </p>
            </div>

            <Link
              to="/reference"
              className="w-full py-2.5 px-4 rounded-md court-btn-gold text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-sm cursor-pointer"
            >
              <span>Explore Reference</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </Link>
          </div>

          {/* Card 3: Research Sources */}
          <div className="rounded-xl border border-slate-800 bg-[#0d1829]/90 backdrop-blur-md p-6 flex flex-col justify-between court-card-hover-dark shadow-lg group">
            <div>
              <div className="w-10 h-10 rounded-lg border border-slate-700 bg-[#131f33] flex items-center justify-center text-[#dfc299] mb-5">
                <FolderArchive className="w-5 h-5 fill-[#dfc299]/20 text-[#dfc299]" />
              </div>
              <h3 className="text-lg sm:text-xl font-tool font-semibold text-[#F8F9FA] mb-2 group-hover:text-white transition-colors">
                Research Sources
              </h3>
              <p className="text-sm font-sans font-normal text-[#9CA3AF] leading-relaxed mb-6">
                Find trusted legal databases and case law resources.
              </p>
            </div>

            <Link
              to="/sources"
              className="w-full py-2.5 px-4 rounded-md court-btn-gold text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-sm cursor-pointer"
            >
              <span>Browse Sources</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </Link>
          </div>

        </div>

      </div>

      {/* Footer Quote */}
      <footer className="relative z-10 py-6 text-center border-t border-slate-800/60 bg-[#08101d]/60 backdrop-blur-xs">
        <p className="text-xs sm:text-sm text-slate-400 font-serif italic tracking-wide">
          "The law is not just what it is, but what it does."
        </p>
      </footer>

    </div>
  );
}
