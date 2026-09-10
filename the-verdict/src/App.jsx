import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import ScenarioSelection from './pages/ScenarioSelection';
import ActiveHearing from './pages/ActiveHearing';
import DebriefScreen from './pages/DebriefScreen';
import QuickReference from './pages/QuickReference';
import ResearchSources from './pages/ResearchSources';
import ScenarioBuilder from './pages/ScenarioBuilder';
import ErrorBoundary from './components/ErrorBoundary';

function AppRoutes() {
  const location = useLocation();
  return (
    <ErrorBoundary key={location.pathname}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/scenarios" element={<ScenarioSelection />} />
        <Route path="/create-scenario" element={<ScenarioBuilder />} />
        <Route path="/hearing" element={<ActiveHearing />} />
        <Route path="/debrief" element={<DebriefScreen />} />
        <Route path="/reference" element={<QuickReference />} />
        <Route path="/sources" element={<ResearchSources />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#08101d] text-slate-100 flex flex-col font-sans selection:bg-[#334155] selection:text-white">
        <Navbar />
        <main className="flex-1">
          <AppRoutes />
        </main>
      </div>
    </Router>
  );
}
