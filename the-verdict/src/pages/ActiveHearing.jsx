import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import {
  COLLEGE_FIGHT_SCENARIO,
  LEGAL_TOOLKIT,
  VERIFIED_CASES,
  BNSS_KEY_PROVISIONS,
  getScenarioById
} from '../data/legalData.js';
import { verifyOutputCitation } from '../utils/citationSafeguard.js';
import {
  getInitialCourtroomDialogue,
  evaluateAdvocateArgument,
  generateJudicialRuling
} from '../utils/courtroomEngine.js';
import { setActiveCaseId, saveHearingSession, startOrResumeHearing, markHearingCompleted } from '../utils/courtroomDatabase.js';
import FactTaxonomyModal from '../components/FactTaxonomyModal.jsx';
import courtroomBenchImg from '../assets/courtroom_bench.jpg';
import {
  Gavel,
  Scale,
  Zap,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  ArrowLeft,
  Search,
  User,
  Shield,
  Maximize2,
  AlertTriangle,
  Lightbulb,
  X,
  Info,
  Award,
  BookOpen,
  Briefcase,
  Sparkles,
  ChevronRight,
  Eye,
  EyeOff,
  Printer
} from 'lucide-react';

function getCaseQuickCites(scenario) {
  const id = scenario?.scenario_id || '';
  const statutes = scenario?.statutes || [];

  // 1. Landmark Scenario 1: The College Fight
  if (id === 'scn-01' || scenario.title?.includes('College Fight')) {
    return [
      {
        label: 'Sec 480 Bail Plea',
        text: 'May it please the Court. My client Aarav Mehta is entitled to regular bail under Section 480 BNSS as there are zero criminal antecedents, strong family roots, and no risk of flight.'
      },
      {
        label: 'Sec 115(2) vs 117 BNS',
        text: 'Milord, the allegations at highest reveal simple hurt under BNS Section 115(2) during an unintended student quarrel; the Section 117 charge is unsubstantiated without radiological proof.'
      },
      {
        label: 'Sec 38 Arrest Defect',
        text: 'Under Section 38 BNSS, failure by the police to serve contemporaneous written grounds of arrest vitiates custody under the binding mandate of Pankaj Bansal.'
      },
      {
        label: 'Sec 63 BSA CCTV',
        text: 'The purported campus CCTV recording cannot be considered in evidence as the mandatory authenticity certificate under Section 63 BSA has not been submitted.'
      },
      {
        label: '⚖️ Pray for Verdict',
        text: 'Milord, I rest my submissions on behalf of the accused and pray that the final judicial verdict be pronounced.'
      }
    ];
  }

  // 2. Landmark Scenario 2: The Midnight Checkpost
  if (id === 'SCN-2025-02' || scenario.title?.includes('Checkpost')) {
    return [
      {
        label: 'Sec 47 Search Illegality',
        text: 'May it please the Court. Under Section 47 BNSS, the warrantless search of the vehicle trunk without recording reasons in writing and without independent panchas is void ab initio.'
      },
      {
        label: 'Sec 48 Relative Notice',
        text: 'Under Section 48 BNSS, the arresting officer breached statutory duty by failing to intimate the arrestee\'s relative or nominated friend upon midnight detention.'
      },
      {
        label: 'Arms Act No Conscious Possession',
        text: 'The accused was operating a commercially leased vehicle from a fleet pool; the prosecution has failed to establish conscious possession of the alleged weapon.'
      },
      {
        label: '⚖️ Pray for Verdict',
        text: 'Milord, I rest my submissions and pray that the Hon\'ble Court pronounce the final judicial order.'
      }
    ];
  }

  // 3. Landmark Scenario 3: The Corporate Whistleblower
  if (id === 'SCN-2025-03' || scenario.title?.includes('Whistleblower')) {
    return [
      {
        label: 'Sec 63 BSA Certificate Missing',
        text: 'May it please the Court. Under Section 63 BSA, secondary electronic records on the external SSD are completely inadmissible without a hash certificate from the system administrator.'
      },
      {
        label: 'Sec 61 Digital Chain Broken',
        text: 'Under Section 61 BSA, digital integrity was fatally compromised during the unilateral private internal audit before police seizure.'
      },
      {
        label: 'BNS 316 No Criminal Breach',
        text: 'Under BNS Section 316, the accused had legitimate super-admin authorization; disclosing statutory malfeasance in public interest negates dishonest mens rea.'
      },
      {
        label: '⚖️ Pray for Verdict',
        text: 'Milord, having demonstrated that the electronic evidence is defective, I pray that the Court pass the final verdict.'
      }
    ];
  }

  // 4. Dynamic Generation for User-Built Custom Scenarios
  const cites = [];
  const hasSec38Defect = scenario.procedural_compliance ? !scenario.procedural_compliance.writtenGroundsMemoProvided : statutes.includes('BNSS Sec 38');
  const hasSec47PanchaDefect = scenario.procedural_compliance ? !scenario.procedural_compliance.independentPanchasPresent : statutes.includes('BNSS Sec 47');
  const hasBsa63Issue = statutes.includes('BSA Sec 63') || (scenario.evidence || []).some(e => (e.description || '').includes('63'));

  if (scenario.category === 'Bail Hearing' || scenario.category === 'Anticipatory Bail') {
    cites.push({
      label: 'Sec 480 Regular Bail',
      text: `Milord, accused ${scenario.accused?.name || 'my client'} has no previous convictions and deep local roots. Continued custodial detention serves no investigative purpose under Section 480 BNSS.`
    });
  }

  if (hasSec38Defect) {
    cites.push({
      label: 'Sec 38 Written Grounds Defect',
      text: `Under Section 38 BNSS, failure to furnish written grounds of arrest to ${scenario.accused?.name || 'the accused'} infringes statutory procedure and warrants immediate release.`
    });
  }

  if (hasSec47PanchaDefect) {
    cites.push({
      label: 'Sec 47 Pancha Defect',
      text: `Under Section 47 BNSS, the recovery memo is vitiated because the investigating agency failed to associate independent local public panchas during seizure.`
    });
  }

  if (hasBsa63Issue) {
    cites.push({
      label: 'Sec 63 BSA Certificate Defect',
      text: `Milord, the prosecution cannot rely on digital or CCTV logs in the absence of a contemporaneous electronic hash certificate mandated under Section 63 BSA.`
    });
  }

  const bnsStatute = statutes.find(s => s.startsWith('BNS'));
  if (bnsStatute) {
    cites.push({
      label: `${bnsStatute} Defense`,
      text: `With respect to allegations under ${bnsStatute}, the prosecution's evidentiary threshold is not satisfied on the face of the FIR case diary.`
    });
  }

  cites.push({
    label: '⚖️ Pray for Verdict',
    text: 'Milord, I rest my submissions and pray that the final judicial verdict be pronounced by the Bench.'
  });

  return cites;
}

const STAGES = [
  { id: 1, name: 'Facts', description: 'Review Case Dossier, Timeline & Established Facts' },
  { id: 2, name: 'Issue', description: 'Examine Disputed Allegations & Prosecution Stance' },
  { id: 3, name: 'Law', description: 'Consult Codified Provisions under BNS, BNSS & BSA' },
  { id: 4, name: 'Evidence', description: 'Scrutinize Forensics, Seizure Memos & Admissibility' },
  { id: 5, name: 'Argument', description: 'Present Submissions to the Bench in Open Court' },
  { id: 6, name: 'Debrief', description: 'Bench Ruling, Advocacy Scoring & Reasoning Report' }
];

export default function ActiveHearing() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Dynamic scenario resolution:
  // 1. Passed via router state from ScenarioBuilder or Docket
  // 2. Query param ?scenarioId=...
  // 3. Fallback to default College Fight
  const activeScenario = location.state?.scenario
    || (searchParams.get('scenarioId') ? getScenarioById(searchParams.get('scenarioId')) : COLLEGE_FIGHT_SCENARIO);

  // Sync active case in database
  useEffect(() => {
    if (activeScenario?.scenario_id) {
      setActiveCaseId(activeScenario.scenario_id);
    }
  }, [activeScenario]);

  const idCounter = useRef(100);

  // 1. Stage Tracker
  const [currentStageId, setCurrentStageId] = useState(5); // Default on "Argument"

  // 2. Case File Tabs
  const [activeCaseTab, setActiveCaseTab] = useState('Facts');
  const [mutationCount, setMutationCount] = useState(0);
  const [mutatedFacts, setMutatedFacts] = useState([]);

  // 3. Legal Toolkit Tabs - Default to Active Case
  const [activeToolkitTab, setActiveToolkitTab] = useState('Active Case');
  const [toolkitSearch, setToolkitSearch] = useState('');
  const [selectedDetailSection, setSelectedDetailSection] = useState(null);

  // 4. Chat Messages
  const [messages, setMessages] = useState(() => getInitialCourtroomDialogue(activeScenario));
  const [showFactModal, setShowFactModal] = useState(false);
  const [defectsRaised, setDefectsRaised] = useState([]);
  const [judicialRuling, setJudicialRuling] = useState(null);

  const [inputVal, setInputVal] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isVoiceOutputEnabled, setIsVoiceOutputEnabled] = useState(true);
  const [safeguardWarning, setSafeguardWarning] = useState(null);
  const [showCourtroomImage, setShowCourtroomImage] = useState(true);
  const [speakingMessageId, setSpeakingMessageId] = useState(null);
  const [stageToast, setStageToast] = useState(null);
  const [highlightedPanel, setHighlightedPanel] = useState(null);

  const recognitionRef = useRef(null);
  const chatScrollRef = useRef(null);
  const baseInputRef = useRef('');
  const isListeningRef = useRef(false);
  const currentInputValRef = useRef('');

  // Synchronize ref with inputVal state
  useEffect(() => {
    currentInputValRef.current = inputVal;
  }, [inputVal]);

  // Auto-clear stage toast notification after 3.5 seconds
  useEffect(() => {
    if (stageToast) {
      const timer = setTimeout(() => setStageToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [stageToast]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Web Speech API with clean continuous multi-sentence accumulation (no word repetition)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-IN';

      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = 0; i < event.results.length; i++) {
          const result = event.results[i];
          const text = result[0]?.transcript || '';
          if (result.isFinal) {
            finalTranscript += text + ' ';
          } else {
            interimTranscript += text;
          }
        }

        const fullSpeech = (finalTranscript + interimTranscript).trim();
        if (fullSpeech) {
          const base = baseInputRef.current;
          const combined = base ? `${base}${fullSpeech}` : fullSpeech;
          setInputVal(combined);
          currentInputValRef.current = combined;
        }
      };

      recognition.onerror = (event) => {
        if (event.error === 'no-speech') {
          return; // Continue listening across natural pauses between sentences
        }
        console.warn('Speech recognition warning:', event.error);
        if (event.error !== 'aborted') {
          setIsListening(false);
          isListeningRef.current = false;
        }
      };

      recognition.onend = () => {
        // Keep listening across multiple sentences until advocate explicitly toggles mic off or sends argument
        if (isListeningRef.current) {
          if (currentInputValRef.current && currentInputValRef.current.trim()) {
            baseInputRef.current = `${currentInputValRef.current.trim()} `;
          }
          try {
            recognition.start();
          } catch (e) {
            // Already active or temporary lock
            console.warn('Recognition restart notice:', e);
          }
        } else {
          setIsListening(false);
        }
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const speakText = (text, role = 'judge', messageId = null) => {
    if (!isVoiceOutputEnabled || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/⚠️.*?\)/g, '').replace(/\[✓.*?\]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      const voices = window.speechSynthesis.getVoices();

      if (role === 'prosecutor') {
        const prosecutorVoice = voices.find(v => (v.name.includes('David') || v.name.includes('Alex') || v.name.includes('Male')) && !v.name.includes('Rishi')) || voices[1] || voices[0];
        if (prosecutorVoice) utterance.voice = prosecutorVoice;
        utterance.rate = 1.05;
        utterance.pitch = 1.05;
      } else {
        const judgeVoice = voices.find(v => v.lang.includes('en-IN') || v.lang.includes('en-GB') || v.name.includes('India') || v.name.includes('Daniel') || v.name.includes('Google UK English Male')) || voices[0];
        if (judgeVoice) utterance.voice = judgeVoice;
        utterance.rate = 0.92;
        utterance.pitch = 0.9;
      }

      setSpeakingMessageId(messageId || role);
      utterance.onend = () => setSpeakingMessageId(null);
      utterance.onerror = () => setSpeakingMessageId(null);

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis failed:', e);
      setSpeakingMessageId(null);
    }
  };

  const handleStageClick = (st) => {
    setCurrentStageId(st.id);
    if (st.id === 1) {
      setActiveCaseTab('Facts');
      setHighlightedPanel('dossier');
      setStageToast('Step 1: Reviewing Case Facts, Biometrics & Incident Timeline in Dossier.');
      const el = document.getElementById('case-dossier-panel');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else if (st.id === 2) {
      setActiveCaseTab('Allegations');
      setHighlightedPanel('dossier');
      setStageToast('Step 2: Examining Legal Issues, Charges & Disputed Stances.');
      const el = document.getElementById('case-dossier-panel');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else if (st.id === 3) {
      setActiveToolkitTab('Active Case');
      setHighlightedPanel('toolkit');
      setStageToast('Step 3: Researching Codified Provisions (BNS, BNSS, BSA) & Precedents.');
      const el = document.getElementById('legal-toolkit-panel');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else if (st.id === 4) {
      setActiveCaseTab('Evidence');
      setHighlightedPanel('dossier');
      setStageToast('Step 4: Inspecting Forensic MLCs, Seizure Memos & Admissibility Gaps.');
      const el = document.getElementById('case-dossier-panel');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else if (st.id === 5) {
      setHighlightedPanel('input');
      setStageToast("Step 5: Submitting Arguments to the Hon'ble Bench in Open Court.");
      const inputEl = document.getElementById('courtroom-argument-input');
      if (inputEl) {
        inputEl.focus();
        inputEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } else if (st.id === 6) {
      setStageToast('Step 6: Accessing Final Judicial Ruling & Performance Debrief.');
      if (judicialRuling) {
        navigate('/debrief', { state: { scenario: activeScenario, defectsRaised, messagesCount: messages.length, ruling: judicialRuling } });
      } else {
        const ruling = generateJudicialRuling(activeScenario, defectsRaised, messages);
        saveHearingSession({
          scenario: activeScenario,
          messages,
          verdict: ruling,
          score: 24 + Math.min(10, defectsRaised.length * 3),
          defectsRaised
        });
        navigate('/debrief', { state: { scenario: activeScenario, defectsRaised, messagesCount: messages.length, ruling } });
      }
    }

    setTimeout(() => {
      setHighlightedPanel(null);
    }, 2200);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech Recognition is not supported in this browser. Please type your argument.');
      return;
    }
    if (isListening) {
      isListeningRef.current = false;
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        baseInputRef.current = inputVal.trim() ? `${inputVal.trim()} ` : '';
        currentInputValRef.current = inputVal;
        isListeningRef.current = true;
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error('Failed to start speech recognition:', e);
        setIsListening(false);
        isListeningRef.current = false;
      }
    }
  };

  // "CHANGE ONE FACT" INJECTION MECHANIC
  const handleChangeOneFact = () => {
    const vars = (activeScenario.disruptive_variables && activeScenario.disruptive_variables.length > 0)
      ? activeScenario.disruptive_variables
      : COLLEGE_FIGHT_SCENARIO.disruptive_variables;
    const mutationIdx = mutationCount % vars.length;
    const mutation = vars[mutationIdx];

    const newMutatedFact = {
      id: `mutated-${++idCounter.current}`,
      title: mutation.title,
      description: mutation.description,
      impact: mutation.impact
    };

    setMutatedFacts((prev) => [newMutatedFact, ...prev]);
    setMutationCount((prev) => prev + 1);
    setActiveCaseTab('Facts');

    const judgePivotMessage = {
      id: `msg-pivot-${++idCounter.current}`,
      sender: 'judge',
      senderName: "Hon'ble Presiding Judge",
      court: activeScenario.court || 'Sessions Court, Delhi',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: mutation.judge_prompt,
      isHighPriority: true,
      pivotAlert: mutation.title
    };

    setMessages((prev) => [...prev, judgePivotMessage]);
    speakText(mutation.judge_prompt, 'judge', judgePivotMessage.id);

    setTimeout(() => {
      const rebuttalMsg = {
        id: `msg-rebuttal-${++idCounter.current}`,
        sender: 'prosecutor',
        senderName: 'Special Public Prosecutor',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: mutation.opposing_counsel_rebuttal
      };
      setMessages((prev) => [...prev, rebuttalMsg]);
      speakText(mutation.opposing_counsel_rebuttal, 'prosecutor', rebuttalMsg.id);
    }, 2200);
  };

  // Deliver Final Judicial Ruling
  const handlePronounceFinalVerdict = () => {
    const ruling = generateJudicialRuling(activeScenario, defectsRaised, messages);
    setJudicialRuling(ruling);

    const verdictMsg = {
      id: `msg-verdict-${++idCounter.current}`,
      sender: 'judge',
      senderName: "Hon'ble Presiding Judge",
      court: activeScenario.court || 'Sessions Court, Delhi',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `ORDER PRONOUNCED IN OPEN COURT: ${ruling.outcome}. ${ruling.benchSummary}`,
      isHighPriority: true,
      pivotAlert: 'FINAL JUDICIAL ORDER PRONOUNCED'
    };

    const updatedMessages = [...messages, verdictMsg];
    setMessages(updatedMessages);

    // Save and mark hearing as completed in persistent database
    markHearingCompleted({
      scenario: activeScenario,
      messages: updatedMessages,
      verdict: ruling,
      score: 24 + Math.min(10, defectsRaised.length * 3),
      defectsRaised
    });

    // Read aloud complete judicial decree & bench determination
    const verdictVoiceText = `Order pronounced in open court. ${ruling.outcome}. ${ruling.benchSummary}. The applicant shall be released on bail subject to personal bond and cooperative conditions.`;
    speakText(verdictVoiceText, 'judge', verdictMsg.id);
  };

  // Submit Argument (Lawyers can argue anything)
  const handleSendMessage = (textToSend = inputVal) => {
    if (!textToSend.trim()) return;

    // Scan text via Citation Safeguard System
    const verifiedCheck = verifyOutputCitation(textToSend);

    const userMessage = {
      id: `msg-user-${++idCounter.current}`,
      sender: 'user',
      senderName: `You (${activeScenario.role || 'Defence Counsel'})`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: verifiedCheck.text,
      hasSafeguardWarning: verifiedCheck.hasUnverified,
      unverifiedCitations: verifiedCheck.unverifiedCitations
    };

    if (verifiedCheck.hasUnverified) {
      setSafeguardWarning(`System Safeguard Alert: Citation not verified by system safeguard.`);
    } else {
      setSafeguardWarning(null);
    }

    setMessages((prev) => [...prev, userMessage]);
    setInputVal('');
    baseInputRef.current = '';
    currentInputValRef.current = '';
    if (isListening) {
      isListeningRef.current = false;
      recognitionRef.current?.stop();
      setIsListening(false);
    }

    // Evaluate advocate argument
    const evalResult = evaluateAdvocateArgument({
      argumentText: textToSend,
      scenario: activeScenario,
      verifiedCheck
    });

    if (evalResult.isDefectHit && evalResult.defectTitle) {
      setDefectsRaised((prev) => Array.from(new Set([...prev, evalResult.defectTitle])));
    }

    // 1. Hon'ble Judge response
    setTimeout(() => {
      const newJudgeMsg = {
        id: `msg-resp-judge-${++idCounter.current}`,
        sender: 'judge',
        senderName: "Hon'ble Presiding Judge",
        court: activeScenario.court || 'Sessions Court, Delhi',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: evalResult.judgeText
      };

      setMessages((prev) => [...prev, newJudgeMsg]);
      speakText(evalResult.judgeText, 'judge', newJudgeMsg.id);

      // If user explicitly requested verdict, trigger verdict after brief pause
      if (evalResult.isRequestingVerdict) {
        setTimeout(() => {
          handlePronounceFinalVerdict();
        }, 2200);
        return;
      }

      // 2. Public Prosecutor counter-argument
      if (evalResult.prosecutorText) {
        setTimeout(() => {
          const newProsecutorMsg = {
            id: `msg-resp-prosecutor-${++idCounter.current}`,
            sender: 'prosecutor',
            senderName: 'Special Public Prosecutor',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            text: evalResult.prosecutorText
          };
          setMessages((prev) => [...prev, newProsecutorMsg]);
          speakText(evalResult.prosecutorText, 'prosecutor', newProsecutorMsg.id);
        }, 2400);
      }
    }, 900);
  };

  const getToolkitItems = () => {
    // 1. Gather all provisions across categories
    const allProvisions = [
      ...BNSS_KEY_PROVISIONS,
      ...(LEGAL_TOOLKIT.BNSS || []),
      ...(LEGAL_TOOLKIT.BNS || []),
      ...(LEGAL_TOOLKIT.BSA || [])
    ];

    // Deduplicate by normalized section key
    const uniqueProvisions = [];
    const seen = new Set();
    for (const p of allProvisions) {
      const key = `${p.act || ''}-${p.section || ''}`.toLowerCase().replace(/\s+/g, '');
      if (!seen.has(key)) {
        seen.add(key);
        uniqueProvisions.push(p);
      }
    }

    if (activeToolkitTab === 'Active Case') {
      const activeStatutes = (activeScenario.statutes || []).map(s => s.toLowerCase());

      const matched = uniqueProvisions.filter(p => {
        const sec = (p.section || '').toLowerCase();
        const fullSec = (p.full_section || '').toLowerCase();

        const isDirectMatch = activeStatutes.some(st => {
          const normSt = st.toLowerCase().replace('section ', 'sec ');
          const normSec = sec.toLowerCase().replace('section ', 'sec ');
          return normSt.includes(normSec) || normSec.includes(normSt) || fullSec.includes(normSt);
        });

        const isCore = ['bnss-47', 'bnss-38', 'bnss-48', 'bnss-53', 'bnss-57'].includes(p.id);
        return isDirectMatch || isCore;
      });

      // Ensure any statutes in activeScenario.statutes not matched get added cleanly
      for (const st of activeScenario.statutes || []) {
        const normSt = st.toLowerCase().replace('section ', 'sec ');
        const alreadyIncluded = matched.some(m => {
          const mSec = (m.section || '').toLowerCase().replace('section ', 'sec ');
          return normSt.includes(mSec) || mSec.includes(normSt);
        });
        if (!alreadyIncluded) {
          const actGuess = st.toUpperCase().includes('BNS') ? 'BNS' : st.toUpperCase().includes('BNSS') ? 'BNSS' : st.toUpperCase().includes('BSA') ? 'BSA' : 'Statute';
          matched.push({
            id: `stat-${st.replace(/\s+/g, '-').toLowerCase()}`,
            section: st,
            act: actGuess,
            title: `Statutory Mandate (${st})`,
            short_rule: `Governing section formally cited in ${activeScenario.title}.`,
            description: `Statutory provision invoked in ${activeScenario.fir_number || 'case proceedings'}.`,
            full_section: st,
            statutory_provision: `Statutory mandate under ${st} governing legal liability or procedural safeguard.`
          });
        }
      }

      return matched;
    }

    if (activeToolkitTab === 'Case Law') {
      return VERIFIED_CASES.map((c) => ({
        section: c.section,
        act: 'Case Law',
        title: c.case_name,
        short_rule: c.holding,
        description: c.holding,
        full_section: c.case_name
      }));
    }

    if (activeToolkitTab === 'BNS') {
      return uniqueProvisions.filter(p => (p.act || '').toUpperCase().includes('BNS') || (p.act || '').includes('Nyaya'));
    }

    if (activeToolkitTab === 'BNSS') {
      return uniqueProvisions.filter(p => (p.act || '').toUpperCase().includes('BNSS') || (p.act || '').includes('Nagarik Suraksha'));
    }

    if (activeToolkitTab === 'BSA') {
      return uniqueProvisions.filter(p => (p.act || '').toUpperCase().includes('BSA') || (p.act || '').includes('Sakshya'));
    }

    return LEGAL_TOOLKIT[activeToolkitTab] || [];
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#070e1b] text-slate-100 flex flex-col font-sans">

      {/* 1. TOP SUB-HEADER: Title, Badges, Pronounce Verdict, Actions */}
      <div className="bg-[#0b1526] border-b border-[#dfb15b]/20 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">

          <div>
            <Link
              to="/scenarios"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#eed89b] mb-1 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Back to Docket</span>
            </Link>

            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-lg sm:text-xl font-serif font-bold text-white">
                {activeScenario.title}
              </h1>

              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#0f223d] text-[#eed89b] border border-[#dfb15b]/40">
                {activeScenario.category}
              </span>

              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#0f223d] text-slate-200 border border-slate-700 flex items-center gap-1">
                <User className="w-3 h-3 text-[#dfb15b]" />
                <span>{activeScenario.role || 'Defence Counsel'}</span>
              </span>
            </div>
          </div>

          {/* Top Actions: Voice Toggle, Facts & Gaps, Change One Fact, Pronounce Verdict */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsVoiceOutputEnabled(!isVoiceOutputEnabled)}
              className={`p-2 rounded-xl border transition cursor-pointer ${isVoiceOutputEnabled ? 'bg-[#0f223d] text-[#eed89b] border-[#dfb15b]/40' : 'bg-slate-900 text-slate-500 border-slate-800'
                }`}
              title={isVoiceOutputEnabled ? 'Audio Synthesis Active (Click to mute)' : 'Audio Synthesis Muted'}
            >
              {isVoiceOutputEnabled ? <Volume2 className="w-4 h-4 text-[#dfb15b]" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            <button
              onClick={() => setShowFactModal(true)}
              className="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-xs flex items-center gap-1.5 transition cursor-pointer"
              title="Inspect established facts, allegations, and procedural gaps"
            >
              <Info className="w-3.5 h-3.5 text-[#dfb15b]" />
              <span>Facts & Gaps</span>
            </button>

            <button
              onClick={handleChangeOneFact}
              className="px-3 py-1.5 rounded-xl border border-[#dfb15b]/40 bg-[#0b1b30] hover:bg-[#15243b] text-slate-100 hover:text-white font-medium text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              title="Inject a disruptive surprise fact and force judicial pivot"
            >
              <Zap className="w-3.5 h-3.5 text-[#dfb15b] fill-[#dfb15b]" />
              <span>Change One Fact</span>
              {mutationCount > 0 && (
                <span className="bg-[#dfb15b] text-[#07111e] px-1.5 rounded-full text-[10px] font-bold">
                  +{mutationCount}
                </span>
              )}
            </button>

            {/* Pronounce Final Verdict Button */}
            <button
              onClick={handlePronounceFinalVerdict}
              className="px-3.5 py-1.5 rounded-xl court-btn-gold text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-md"
              title="Call upon the Bench to deliver the final judicial verdict"
            >
              <Gavel className="w-3.5 h-3.5 fill-[#07111e]/20" />
              <span>Pass Final Verdict</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. 6-STAGE HEADER TRACKER WITH DIRECT STEP JUMP */}
      <div className="bg-[#091220] border-b border-slate-800/80 px-4 sm:px-6 py-2.5">
        <div className="max-w-4xl mx-auto flex items-center justify-between relative">

          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[1px] bg-slate-800 pointer-events-none" />

          {STAGES.map((st) => {
            const isActive = st.id === currentStageId;
            const isCompleted = st.id < currentStageId;

            return (
              <button
                key={st.id}
                onClick={() => handleStageClick(st)}
                className="relative z-10 flex flex-col items-center group cursor-pointer"
                title={`Click to jump to Step ${st.id}: ${st.name} – ${st.description}`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-200 ${isActive
                    ? 'bg-[#dfb15b] text-[#07111e] ring-4 ring-[#dfb15b]/25 scale-110 shadow-md font-extrabold'
                    : isCompleted
                      ? 'bg-[#152843] text-[#eed89b] border border-[#dfb15b]/40 hover:scale-105'
                      : 'bg-[#101b2d] text-slate-400 border border-slate-800 hover:border-slate-600 hover:text-white'
                  }`}>
                  {st.id}
                </div>
                <span className={`text-[10px] mt-1 font-medium transition ${isActive ? 'text-[#eed89b] font-bold' : 'text-slate-400 group-hover:text-slate-200'
                  }`}>
                  {st.name}
                </span>
              </button>
            );
          })}

        </div>

        {/* Dynamic Stage Toast Notification Bar */}
        {stageToast && (
          <div className="max-w-lg mx-auto mt-2 py-1 px-3.5 rounded-full bg-[#0b1b30] border border-[#dfb15b]/40 text-[11px] text-[#eed89b] text-center font-mono flex items-center justify-center gap-2 animate-in fade-in duration-150 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#dfb15b] shrink-0" />
            <span>{stageToast}</span>
          </div>
        )}
      </div>

      {/* 3. THREE-COLUMN WORKSPACE */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* LEFT COLUMN: CASE FILE */}
        <div
          id="case-dossier-panel"
          className={`lg:col-span-3 flex flex-col bg-[#0b1526]/90 rounded-2xl border border-slate-800/90 overflow-hidden max-h-[82vh] shadow-sm transition-all duration-300 ${highlightedPanel === 'dossier' ? 'ring-2 ring-[#dfb15b] shadow-xl shadow-[#dfb15b]/20 scale-[1.01]' : ''
            }`}
        >

          <div className="p-3 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-xs font-serif font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[#dfb15b]" />
              <span>Case Dossier</span>
            </h2>
            <Maximize2 className="w-3.5 h-3.5 text-slate-500" />
          </div>

          <div className="flex border-b border-slate-800 bg-[#09111f] text-[11px]">
            {['Facts', 'Allegations', 'Evidence', 'Timeline'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveCaseTab(tab)}
                className={`flex-1 py-2 text-center font-medium transition cursor-pointer ${activeCaseTab === tab
                    ? 'text-[#eed89b] border-b-2 border-[#dfb15b] bg-[#0d1829] font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-3.5 space-y-4 text-xs">

            {/* Mutated Facts Alert */}
            {mutatedFacts.length > 0 && (
              <div className="space-y-2">
                {mutatedFacts.map((mf) => (
                  <div key={mf.id} className="p-2.5 rounded-xl bg-[#111e33] border border-[#dfb15b]/70 text-slate-100 animate-pulse">
                    <div className="flex items-center gap-1 font-bold text-[10px] uppercase text-[#dfb15b] mb-1">
                      <Zap className="w-3 h-3 fill-[#dfb15b]" />
                      <span>Injected Variable:</span>
                    </div>
                    <p className="font-semibold text-xs mb-0.5 text-white">{mf.title}</p>
                    <p className="text-[11px] text-slate-300 leading-snug">{mf.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Tab: Facts */}
            {activeCaseTab === 'Facts' && (
              <div className="space-y-3.5">
                <div className="p-3 rounded-xl bg-[#0e1b30] border border-slate-800 text-[11px] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">Client: {activeScenario.accused?.name || 'Accused'} ({activeScenario.accused?.age || '21'} yrs)</span>
                    <span className="font-mono text-[#eed89b] text-[10px]">{activeScenario.fir_number || 'FIR Pending'}</span>
                  </div>
                  <p className="text-slate-300 leading-snug">{activeScenario.accused?.profile}</p>
                  <p className="text-slate-400 text-[10px]">{activeScenario.accused?.background}</p>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">
                    Facts Breakdown ({activeScenario.facts?.length || 0})
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowFactModal(true)}
                    className="text-[#eed89b] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                  >
                    <Info className="w-3 h-3 text-[#dfb15b]" />
                    <span>Fact Guide ➔</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {(activeScenario.facts || []).slice(0, 5).map((f) => (
                    <div key={f.id} className="p-2.5 rounded-lg bg-[#07111e] border border-slate-800/80">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="font-semibold text-white text-[11px] truncate">{f.title}</span>
                        <span className="text-[9px] uppercase px-1.5 py-0.2 rounded font-mono bg-[#0f223d] text-[#eed89b] border border-[#dfb15b]/30">
                          {f.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-snug line-clamp-2">{f.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Allegations */}
            {activeCaseTab === 'Allegations' && (
              <div className="space-y-2 text-[11px]">
                <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-800/50">
                  <span className="text-rose-300 font-bold block mb-1">State Charges:</span>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    {(activeScenario.statutes || []).map((s, idx) => (
                      <li key={idx}><strong>{s}</strong></li>
                    ))}
                  </ul>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {activeScenario.summary}
                </p>
              </div>
            )}

            {/* Tab: Evidence */}
            {activeCaseTab === 'Evidence' && (
              <div className="space-y-2 text-[11px]">
                <div className="p-2.5 rounded-lg bg-[#0e1b30] border border-slate-800">
                  <span className="font-semibold text-[#eed89b] block mb-1">Key Recoveries & Proof:</span>
                  <p className="text-slate-300">{activeScenario.evidence_notes || 'Case diary extracts, CCTV footage, and panchnama recovery.'}</p>
                </div>
              </div>
            )}

            {/* Tab: Timeline */}
            {activeCaseTab === 'Timeline' && (
              <div className="space-y-2 text-[11px]">
                <div className="border-l-2 border-[#dfb15b] pl-2.5 space-y-2">
                  <div>
                    <span className="text-slate-400 block font-mono text-[10px]">14 Sep 2025 • 09:30 PM</span>
                    <p className="text-slate-200">Incident altercation reported</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-mono text-[10px]">15 Sep 2025 • 01:15 AM</span>
                    <p className="text-slate-200">Accused detained from campus</p>
                  </div>
                  <div>
                    <span className="text-[#eed89b] block font-mono text-[10px]">Current Hearing</span>
                    <p className="text-white font-semibold">Bail consideration before the Court</p>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* CENTER COLUMN: LIVE COURTROOM DIALOGUE */}
        <div className="lg:col-span-6 flex flex-col bg-[#0b1526]/90 rounded-2xl border border-slate-800/90 overflow-hidden max-h-[82vh] shadow-xl">

          {/* Authentic Courtroom Visual Banner (Restored) */}
          {showCourtroomImage && (
            <div className="relative w-full h-36 sm:h-44 overflow-hidden border-b border-[#dfb15b]/30 shrink-0 group">
              <img
                src={courtroomBenchImg}
                alt="Courtroom Bench"
                className="w-full h-full object-cover object-top select-none group-hover:scale-102 transition-transform duration-700"
              />
              {/* Rich dark overlay to keep text readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08101d] via-[#08101d]/60 to-black/40" />

              {/* Courtroom Banner Info & Controls */}
              <div className="absolute inset-0 p-3 flex flex-col justify-between z-10 pointer-events-none">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#07111e]/90 text-[#eed89b] border border-[#dfb15b]/50 shadow-sm flex items-center gap-1.5 backdrop-blur-xs shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                      <span>IN SESSION • SESSIONS COURT</span>
                    </span>
                    <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-md bg-black/60 text-[10px] font-mono text-slate-300 border border-slate-700/60 truncate">
                      {activeScenario.fir_number}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pointer-events-auto shrink-0">
                    <button
                      onClick={() => setIsVoiceOutputEnabled(!isVoiceOutputEnabled)}
                      className={`w-7 h-7 rounded-lg border transition flex items-center justify-center cursor-pointer backdrop-blur-sm shadow-sm ${isVoiceOutputEnabled
                          ? 'bg-[#0f223d]/90 text-[#eed89b] border-[#dfb15b]/70 hover:bg-[#15325c]'
                          : 'bg-black/60 text-slate-400 border-slate-700 hover:text-slate-200'
                        }`}
                      title={isVoiceOutputEnabled ? 'Speech Read Aloud: Enabled (Click to Mute)' : 'Speech Read Aloud: Muted (Click to Unmute)'}
                      aria-label={isVoiceOutputEnabled ? 'Audio Enabled' : 'Audio Muted'}
                    >
                      {isVoiceOutputEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#dfb15b]" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
                    </button>
                  </div>
                </div>

                <div className="bg-[#07111e]/85 border border-[#dfb15b]/30 rounded-xl p-2.5 backdrop-blur-sm shadow-md">
                  <h3 className="font-serif font-bold text-xs sm:text-sm text-white tracking-tight flex items-center gap-2 truncate">
                    <Scale className="w-3.5 h-3.5 text-[#dfb15b] fill-[#dfb15b]/20 shrink-0" />
                    <span>IN THE COURT OF THE PRINCIPAL SESSIONS JUDGE: NEW DELHI</span>
                  </h3>
                  <div className="flex items-center justify-between text-[10px] text-[#eed89b] mt-0.5">
                    <span>CORAM: Hon'ble Mr. Justice R.K. Varma</span>
                    <span className="text-slate-300 font-sans truncate ml-2">{activeScenario.title}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Judicial Bench Sub-Banner */}
          <div className="p-2.5 px-3 border-b border-slate-800 bg-[#08101d] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#dfb15b] fill-[#dfb15b]/20" />
              <span className="text-xs font-serif font-bold text-white">
                Live Courtroom Proceedings
              </span>
              {speakingMessageId && (
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-[#dfb15b]/20 text-[#eed89b] border border-[#dfb15b]/40 flex items-center gap-1 animate-pulse">
                  <Volume2 className="w-2.5 h-2.5" />
                  <span>Speaking Now...</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {!showCourtroomImage && (
                <button
                  onClick={() => setShowCourtroomImage(true)}
                  className="text-[10px] text-[#eed89b] hover:underline cursor-pointer flex items-center gap-1 font-mono"
                >
                  <Eye className="w-3 h-3" />
                  <span>Show Courtroom Bench</span>
                </button>
              )}
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Open Court
              </span>
            </div>
          </div>

          {/* Safeguard Alert */}
          {safeguardWarning && (
            <div className="bg-rose-950/90 border-b border-rose-500/50 px-3 py-1.5 flex items-center justify-between text-xs text-rose-200 shrink-0">
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>⚠️ Citation not verified by system safeguard.</span>
              </div>
              <button onClick={() => setSafeguardWarning(null)} className="text-rose-400 hover:text-white cursor-pointer">✕</button>
            </div>
          )}

          {/* Dialogue Feed */}
          <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#050d17]/70">
            {messages.map((msg) => {
              const isJudge = msg.sender === 'judge';
              const isProsecutor = msg.sender === 'prosecutor';

              // Judge Bubble
              if (isJudge) {
                return (
                  <div key={msg.id} className="flex items-start gap-2.5 max-w-[90%] sm:max-w-[85%]">
                    <div className="w-8 h-8 rounded-full bg-[#07111e] border border-[#dfb15b]/50 flex items-center justify-center text-[#dfb15b] shrink-0 mt-1 shadow-sm">
                      <Gavel className="w-4 h-4 fill-[#dfb15b]/20" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-serif font-bold text-white">{msg.senderName}</span>
                          {msg.court && <span className="text-[10px] text-[#eed89b]/80">({msg.court})</span>}
                          <span className="text-[10px] text-slate-500 font-mono">{msg.timestamp}</span>
                        </div>
                        <button
                          onClick={() => speakText(msg.text, 'judge', msg.id)}
                          className={`p-1 rounded-md transition cursor-pointer flex items-center gap-1 text-[10px] ${speakingMessageId === msg.id ? 'text-[#dfb15b] bg-[#dfb15b]/20 ring-1 ring-[#dfb15b]/40' : 'text-slate-400 hover:text-[#eed89b]'
                            }`}
                          title="Read Aloud Judge's Words"
                        >
                          <Volume2 className="w-3 h-3 text-[#dfb15b]" />
                          <span className="font-mono text-[9px]">{speakingMessageId === msg.id ? 'Reading...' : 'Listen'}</span>
                        </button>
                      </div>
                      <div className={`p-3.5 rounded-2xl rounded-tl-sm text-xs leading-relaxed ${msg.isHighPriority
                          ? 'bg-[#0f223d] border border-[#dfb15b]/70 text-white ring-1 ring-[#dfb15b]/30 shadow-lg'
                          : 'bg-[#0b172a] border border-[#1e3d6b] text-slate-100'
                        }`}>
                        {msg.isHighPriority && (
                          <div className="flex items-center gap-1.5 text-[#eed89b] font-bold text-[10px] uppercase mb-1.5 pb-1 border-b border-[#dfb15b]/30">
                            <Zap className="w-3 h-3 text-[#dfb15b] fill-[#dfb15b]" />
                            <span>Judicial Notice: {msg.pivotAlert}</span>
                          </div>
                        )}
                        <p>{msg.text}</p>
                      </div>
                    </div>
                  </div>
                );
              }

              // Prosecution Bubble
              if (isProsecutor) {
                return (
                  <div key={msg.id} className="flex items-start gap-2.5 max-w-[90%] sm:max-w-[85%]">
                    <div className="w-8 h-8 rounded-full bg-[#2a141b] flex items-center justify-center text-rose-300 shrink-0 mt-1 shadow-sm border border-rose-900/60">
                      <Shield className="w-4 h-4 text-rose-400 fill-rose-400/20" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-rose-300">{msg.senderName}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{msg.timestamp}</span>
                        </div>
                        <button
                          onClick={() => speakText(msg.text, 'prosecutor', msg.id)}
                          className={`p-1 rounded-md transition cursor-pointer flex items-center gap-1 text-[10px] ${speakingMessageId === msg.id ? 'text-rose-300 bg-rose-950 ring-1 ring-rose-500/40' : 'text-slate-400 hover:text-rose-300'
                            }`}
                          title="Read Aloud Prosecutor's Counter-Argument"
                        >
                          <Volume2 className="w-3 h-3 text-rose-400" />
                          <span className="font-mono text-[9px]">{speakingMessageId === msg.id ? 'Reading...' : 'Listen'}</span>
                        </button>
                      </div>
                      <div className="p-3.5 rounded-2xl rounded-tl-sm bg-[#161019] border border-rose-900/40 text-slate-200 text-xs leading-relaxed">
                        <p>{msg.text}</p>
                      </div>
                    </div>
                  </div>
                );
              }

              // User Bubble (Defence Counsel)
              return (
                <div key={msg.id} className="flex items-start gap-2.5 max-w-[90%] sm:max-w-[85%] ml-auto flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-[#0b1b30] border border-[#dfb15b]/50 flex items-center justify-center text-[#dfb15b] shrink-0 mt-1 shadow-sm">
                    <User className="w-4 h-4 fill-[#dfb15b]/20" />
                  </div>
                  <div className="flex-1 text-right">
                    <div className="flex items-center justify-end gap-2 mb-1">
                      <span className="text-[10px] text-slate-500 font-mono">{msg.timestamp}</span>
                      <span className="text-xs font-semibold text-[#eed89b]">{msg.senderName}</span>
                    </div>
                    <div className="p-3.5 rounded-2xl rounded-tr-sm bg-[#0d223f] border border-[#dfb15b]/40 text-white text-xs leading-relaxed text-left shadow-sm">
                      <p>{msg.text}</p>
                      {msg.hasSafeguardWarning && (
                        <div className="mt-2 pt-1 border-t border-rose-500/40 text-[10px] text-rose-300">
                          ⚠️ Citation not verified by system safeguard ({msg.unverifiedCitations?.join(', ')})
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Cite Pills (Dynamically aligned to active case) */}
          <div className="px-3 py-2 bg-[#07111e] border-t border-[#1e3d6b]/70 flex items-center gap-2 overflow-x-auto scrollbar-none text-[11px] shrink-0">
            <span className="text-[10px] text-[#eed89b] font-mono uppercase tracking-wider font-semibold shrink-0">Quick Cite:</span>
            {getCaseQuickCites(activeScenario).map((qc, idx) => (
              <button
                key={idx}
                onClick={() => setInputVal(qc.text)}
                className={`px-2.5 py-1 rounded-lg shrink-0 transition cursor-pointer text-[10px] ${qc.label.includes('Pray')
                    ? 'bg-[#dfb15b]/20 hover:bg-[#dfb15b]/30 text-[#eed89b] border border-[#dfb15b]/50 font-bold'
                    : 'bg-[#0b1b30] hover:bg-[#162f52] text-slate-200 hover:text-white border border-[#1e3d6b] hover:border-[#dfb15b] font-medium'
                  }`}
                title={qc.text}
              >
                {qc.label}
              </button>
            ))}
          </div>

          {/* Input Bar (Lawyers can argue anything) */}
          <div
            id="argument-input-container"
            className={`p-3 bg-[#07111e] border-t border-[#1e3d6b]/70 flex items-center gap-2.5 shrink-0 transition-all duration-300 ${highlightedPanel === 'input' ? 'ring-2 ring-[#dfb15b] shadow-lg shadow-[#dfb15b]/25' : ''
              }`}
          >
            <button
              onClick={toggleListening}
              className={`p-2.5 rounded-xl border transition cursor-pointer shrink-0 ${isListening ? 'bg-rose-600 text-white border-rose-500 animate-pulse' : 'bg-[#0b1b30] text-slate-300 border-[#1e3d6b] hover:border-[#dfb15b]'
                }`}
              title="Speech Input (Web Speech API dictation)"
            >
              {isListening ? <Mic className="w-4 h-4 fill-white" /> : <MicOff className="w-4 h-4" />}
            </button>

            <input
              id="courtroom-argument-input"
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder="Submit any legal or factual argument to the Bench..."
              className="flex-1 bg-[#050d17] border border-[#1e3d6b] focus:border-[#dfb15b] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-colors"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={!inputVal.trim()}
              className="p-2.5 rounded-xl court-btn-gold disabled:opacity-40 transition cursor-pointer shrink-0 shadow-sm"
              title="Submit oral/written argument to the Bench"
            >
              <Send className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: LEGAL TOOLKIT DYNAMICALLY LINKED TO ACTIVE CASE */}
        <div
          id="legal-toolkit-panel"
          className={`lg:col-span-3 flex flex-col bg-[#0b1526]/90 rounded-2xl border border-slate-800/90 overflow-hidden max-h-[82vh] shadow-sm transition-all duration-300 ${highlightedPanel === 'toolkit' ? 'ring-2 ring-[#dfb15b] shadow-xl shadow-[#dfb15b]/20 scale-[1.01]' : ''
            }`}
        >

          <div className="p-3 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-xs font-serif font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#dfb15b]" />
              <span>Legal Codex</span>
            </h2>
            <span className="text-[10px] text-[#eed89b] font-mono">Dynamic</span>
          </div>

          {/* Sub-tabs: Active Case FIRST, then BNSS, BNS, BSA, Case Law */}
          <div className="flex border-b border-slate-800 bg-[#09111f] text-[11px] overflow-x-auto scrollbar-none">
            {['Active Case', 'BNSS', 'BNS', 'BSA', 'Case Law'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveToolkitTab(tab)}
                className={`py-2 px-2.5 text-center font-medium transition cursor-pointer shrink-0 ${activeToolkitTab === tab
                    ? 'text-[#eed89b] border-b-2 border-[#dfb15b] bg-[#0d1829] font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-2.5 border-b border-slate-800/80 bg-[#070e1b]">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={toolkitSearch}
                onChange={(e) => setToolkitSearch(e.target.value)}
                placeholder="Search section or keyword..."
                className="w-full pl-8 pr-2.5 py-1.5 bg-[#0b1526] border border-slate-700/80 rounded-xl text-[11px] text-slate-200 placeholder-slate-500 outline-none focus:border-[#dfb15b]"
              />
            </div>
          </div>

          {/* Toolkit Cards List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
            {getToolkitItems()
              .filter((item) =>
                toolkitSearch
                  ? item.section.toLowerCase().includes(toolkitSearch.toLowerCase()) ||
                  item.title.toLowerCase().includes(toolkitSearch.toLowerCase())
                  : true
              )
              .map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#071324]/90 border border-[#1e3d6b]/70 hover:border-[#dfb15b] transition-all text-xs group court-card-hover-dark shadow-xs"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#07111e] flex items-center justify-center text-[#dfb15b] shrink-0 mt-0.5 border border-[#dfb15b]/40 shadow-2xs">
                      <Scale className="w-3.5 h-3.5 fill-[#dfb15b]/20 text-[#dfb15b]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-white text-xs truncate group-hover:text-[#eed89b] transition-colors">
                        {item.section} – {item.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 block mb-1 font-mono">
                        {item.act}
                      </span>
                      <p className="text-slate-300 text-[11px] leading-snug mb-2 font-sans line-clamp-2">
                        {item.short_rule || item.description}
                      </p>

                      <div className="flex items-center justify-between pt-1.5 border-t border-[#1e3d6b]/70">
                        <button
                          onClick={() => {
                            const matched = BNSS_KEY_PROVISIONS.find((p) => p.section.toLowerCase() === item.section.toLowerCase()) || {
                              section: item.section,
                              title: item.title,
                              act: item.act,
                              statutory_provision: item.description,
                              key_points: ["Statutory safeguard", "Applicable in active criminal hearing"],
                              why_it_matters: "Protects procedural regularity."
                            };
                            setSelectedDetailSection(matched);
                          }}
                          className="text-[11px] text-[#eed89b] hover:text-[#dfb15b] hover:underline font-semibold cursor-pointer flex items-center gap-1"
                        >
                          <span>View Details</span>
                          <span>→</span>
                        </button>

                        <button
                          onClick={() => setInputVal((prev) => (prev ? `${prev} ${item.section} (${item.act})` : `${item.section} (${item.act})`))}
                          className="text-[10px] px-2 py-0.5 rounded bg-[#0b1b30] hover:bg-[#162f52] text-[#eed89b] border border-[#dfb15b]/40 cursor-pointer font-medium"
                        >
                          + Cite
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

        </div>

      </div>

      {/* SECTION DETAIL MODAL */}
      {selectedDetailSection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-[#fbfaf7] text-[#07111e] rounded-2xl border border-[#dfb15b]/40 p-6 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto font-sans court-card-hover">
            <button
              onClick={() => setSelectedDetailSection(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-[#07111e] p-1 rounded-md cursor-pointer transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between gap-4 mb-4 pb-2 border-b border-[#e8e2d8]">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#07111e]">
                  {selectedDetailSection.section} – {selectedDetailSection.title}
                </h3>
                <span className="text-xs text-slate-500 font-medium">{selectedDetailSection.act || 'BNSS'}</span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#f1ece1] text-[#07111e] border border-[#ded5c5]">
                Verified Provision
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#e6dfd3] shadow-xs mb-4">
              <span className="text-[11px] font-bold text-[#07111e] uppercase tracking-wider block mb-1 font-serif">
                Statutory Provision
              </span>
              <p className="text-xs text-slate-800 leading-relaxed font-sans font-normal border-l-2 border-[#dfb15b] pl-3">
                "{selectedDetailSection.statutory_provision || selectedDetailSection.description}"
              </p>
            </div>

            {selectedDetailSection.key_points && (
              <div className="mb-4 p-4 rounded-xl bg-white border border-[#e6dfd3]">
                <h4 className="font-serif font-bold text-xs text-[#07111e] mb-2">Key Points:</h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {selectedDetailSection.key_points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#07111e] mt-1.5 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedDetailSection.why_it_matters && (
              <div className="p-4 rounded-xl bg-[#fbf5ea] border border-[#e8d5b5] flex items-start gap-3 text-xs text-slate-800 mb-4">
                <Lightbulb className="w-4 h-4 text-[#8c6508] fill-[#dfb15b] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#07111e] font-serif font-bold mb-0.5">Why It Matters:</strong>
                  <span className="text-slate-700 leading-relaxed">{selectedDetailSection.why_it_matters}</span>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2 border-t border-[#e8e2d8]">
              <button
                onClick={() => {
                  setInputVal((prev) => (prev ? `${prev} ${selectedDetailSection.section}` : selectedDetailSection.section));
                  setSelectedDetailSection(null);
                }}
                className="px-5 py-2.5 rounded-xl court-btn-gold text-xs font-semibold cursor-pointer shadow-xs"
              >
                Insert into Argument
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fact Taxonomy & Procedural Gap Modal */}
      <FactTaxonomyModal
        isOpen={showFactModal}
        scenario={activeScenario}
        onClose={() => setShowFactModal(false)}
      />

      {/* REALISTIC HIGH COURT / SESSIONS COURT JUDICIAL DECREE MODAL */}
      {judicialRuling && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-[#071324] text-slate-100 rounded-2xl border-2 border-[#dfb15b]/60 max-w-2xl w-full shadow-2xl p-6 sm:p-8 space-y-5 my-auto court-card-hover-dark">

            {/* Formal Judicial Heading */}
            <div className="text-center pb-4 border-b border-[#dfb15b]/30">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0b1b30] border border-[#dfb15b]/50 text-[#dfb15b] mb-2 shadow-md">
                <Scale className="w-6 h-6 fill-[#dfb15b]/30 text-[#dfb15b]" />
              </div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-[#eed89b]">
                {judicialRuling.title || 'IN THE COURT OF THE PRINCIPAL SESSIONS JUDGE: NEW DELHI'}
              </h2>
              <h3 className="font-serif font-bold text-lg text-white mt-1">
                {judicialRuling.caseTitle}
              </h3>
              <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                {judicialRuling.coram} • Date: {judicialRuling.dateOfOrder || 'Today'}
              </p>
            </div>

            {/* Operative Verdict Badge */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0b1b30] border border-[#dfb15b]/40">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Formal Judicial Determination</span>
                <h4 className="font-serif font-bold text-base text-white">{judicialRuling.outcome}</h4>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-500/60 shadow-xs">
                DECREE SIGNED
              </span>
            </div>

            {/* Bench Findings & Reasoning */}
            <div className="p-4 rounded-xl bg-[#050d17] border border-[#1e3d6b] text-xs leading-relaxed text-slate-200">
              <span className="font-bold text-[#eed89b] block mb-1.5 uppercase tracking-wider text-[10px] font-serif">
                Judicial Grounds & Analysis:
              </span>
              <p className="font-sans leading-relaxed text-slate-300">{judicialRuling.benchSummary}</p>
            </div>

            {/* Operative Bail/Custody Directions */}
            <div>
              <span className="text-xs font-bold text-slate-200 block mb-2 font-serif">
                Operative Directions & Conditions:
              </span>
              <ul className="space-y-2 text-xs text-slate-300 max-h-40 overflow-y-auto pr-1">
                {judicialRuling.conditions.map((cond, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 bg-[#0b1b30] p-2.5 rounded-xl border border-slate-700/80">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span>{cond}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setJudicialRuling(null)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl court-btn-navy text-xs font-semibold transition cursor-pointer"
                >
                  Return to Hearing
                </button>

                <button
                  onClick={() => {
                    const decreeVoiceText = `Judicial Decree Pronounced. In the Court of the Principal Sessions Judge. Cause Title: ${judicialRuling.caseTitle}. Outcome: ${judicialRuling.outcome}. Findings: ${judicialRuling.benchSummary}. Operative conditions: ${(judicialRuling.conditions || []).join('. ')}`;
                    speakText(decreeVoiceText, 'judge');
                  }}
                  className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-[#0b1b30] hover:bg-[#162f52] border border-[#dfb15b]/50 text-[#eed89b] text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs"
                  title="Read aloud full judicial decree and bail order"
                >
                  <Volume2 className="w-4 h-4 text-[#dfb15b]" />
                  <span>🔊 Read Aloud</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-[#0b1b30] hover:bg-[#162f52] border border-[#dfb15b]/50 text-[#eed89b] text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs"
                  title="Print certified judicial order sheet"
                >
                  <Printer className="w-4 h-4 text-[#dfb15b]" />
                  <span>🖨️ Print Final Verdict</span>
                </button>
              </div>

              <button
                onClick={() => navigate('/debrief', { state: { scenario: activeScenario, defectsRaised, messagesCount: messages.length, ruling: judicialRuling } })}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl court-btn-gold text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
              >
                <span>View Full Reasoning Report ➔</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
