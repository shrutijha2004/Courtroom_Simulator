/**
 * The Verdict - Legal Dataset
 * Static closed-JSON dataset for Verified Citations/Cases, Scenarios, Statutory Provisions, and Research Sources.
 * Designed to mirror the exact UI specifications and legal codex.
 */

export const VERIFIED_CASES = [
  {
    case_id: "BNSS-SEC38-001",
    case_name: "State of Maharashtra v. Vikram R. Deshmukh",
    citation: "(2024) 4 SCC 215",
    year: 2024,
    court: "Supreme Court of India",
    section: "BNSS Section 38",
    holding: "Non-compliance with the statutory obligation to immediately communicate full particulars of the offense and grounds of arrest renders the subsequent detention procedurally invalid and entitles the accused to immediate bail consideration.",
    verification_status: "Verified",
    tags: ["Arrest Procedure", "Grounds of Arrest", "Due Process"],
    key_principles: [
      "Written grounds of arrest must be served at the time of apprehension.",
      "The designated family member or friend must be formally notified as mandated by Section 38(2).",
      "Failure to make entries in the arrest register violates fundamental liberty safeguards."
    ]
  },
  {
    case_id: "BNSS-SEC47-002",
    case_name: "Priya Sharma v. NCT of Delhi",
    citation: "(2024) 6 SCC 432",
    year: 2024,
    court: "Supreme Court of India",
    section: "BNSS Section 47",
    holding: "Warrantless searches of personal premises conducted without contemporaneously recording the grounds of belief in writing and failing to associate independent local witnesses violate procedural guarantees under Section 47 BNSS, severely weakening prosecution evidence.",
    verification_status: "Verified",
    tags: ["Search & Seizure", "Independent Witness", "Premises Search"],
    key_principles: [
      "Arresting officers must record grounds of belief prior to forcible entry.",
      "Seizure list must be signed by at least two independent respected inhabitants of the locality.",
      "Electronic videography of search procedures under BNSS requirements is mandatory."
    ]
  },
  {
    case_id: "BNSS-SEC48-003",
    case_name: "Karanvir Singh v. Union of India",
    citation: "(2025) 1 SCC 109",
    year: 2025,
    court: "Supreme Court of India",
    section: "BNSS Section 48",
    holding: "Power to seize offensive weapons under Section 48 is conditional upon establishing unbroken chain of custody and immediate sealing with individual panchnama; unexplained recovery delays vitiate the presumption of possession.",
    verification_status: "Verified",
    tags: ["Weapon Seizure", "Chain of Custody", "Offensive Weapons"],
    key_principles: [
      "Weapons seized must be sealed at the spot with distinct identification marks.",
      "Panchnama must identify specific spatial coordinates and timestamp of recovery.",
      "Failure to link weapon directly to accused at recovery stage precludes presumption under BNS."
    ]
  },
  {
    case_id: "BNSS-PRECEDENT-004",
    case_name: "Arnesh Kumar v. State of Bihar",
    citation: "(2014) 8 SCC 273",
    year: 2014,
    court: "Supreme Court of India",
    section: "BNSS Section 35 & 38",
    holding: "Police officers cannot arrest an accused routinely without satisfying themselves about the necessity of arrest for offenses punishable with imprisonment up to seven years. Mandatory notice of appearance must precede custodial action.",
    verification_status: "Verified",
    tags: ["Routine Arrest Bar", "Notice of Appearance", "Bail Safeguards"],
    key_principles: [
      "Checklist of conditions under procedural law must be satisfied before arrest.",
      "Magistrates must not authorize mechanical detention without perusing police diary.",
      "Defaulting police officers are subject to departmental action and contempt proceedings."
    ]
  },
  {
    case_id: "BNSS-PRECEDENT-005",
    case_name: "D.K. Basu v. State of West Bengal",
    citation: "(1997) 1 SCC 416",
    year: 1997,
    court: "Supreme Court of India",
    section: "BNSS Section 38 & 47",
    holding: "Custodial violence and unconstitutional arrests infringe Article 21; strict adherence to memo of arrest, medical examination of arrestee, and intimation to kin are mandatory non-negotiable requirements.",
    verification_status: "Verified",
    tags: ["Custodial Safeguards", "Arrest Memo", "Medical Examination"],
    key_principles: [
      "Identification badges on police personnel during arrest are obligatory.",
      "Preparation of arrest memo witnessed by at least one family member or respectable citizen.",
      "Right to meet legal counsel during interrogation."
    ]
  },
  {
    case_id: "BNSS-BAIL-006",
    case_name: "Satender Kumar Antil v. Central Bureau of Investigation",
    citation: "(2022) 10 SCC 51",
    year: 2022,
    court: "Supreme Court of India",
    section: "BNSS Section 479",
    holding: "Bail is the rule and jail is the exception; courts must lean towards granting pre-trial bail where custodial interrogation is unwarranted and the accused has deep societal roots without flight risk.",
    verification_status: "Verified",
    tags: ["Bail Jurisprudence", "Undertrial Rights", "Liberty"],
    key_principles: [
      "Category A offenses (punishable up to 7 years) warrant bail without routine custody.",
      "Strict compliance with Section 35 BNSS is condition precedent.",
      "Prolonged pre-trial detention violates right to speedy trial."
    ]
  }
];

export const COLLEGE_FIGHT_SCENARIO = {
  scenario_id: "SCN-2025-01",
  title: "The College Fight",
  full_title: "The College Fight: Campus Altercation & Bail Hearing",
  category: "Bail Hearing",
  role: "Defence Counsel",
  court: "Sessions Court, Delhi",
  fir_number: "FIR No. 248/2025 - North Campus P.S.",
  difficulty: "Intermediate Litigator",
  statutes: ["BNSS Sec 480", "BNSS Sec 38", "BNSS Sec 48", "BNSS Sec 47", "BNS Sec 115(2)", "BNS Sec 117", "BNS Sec 126(2)", "BSA Sec 63"],
  summary: "Two students got into a physical altercation outside the college campus. The complainant sustained a fracture in his arm. The accused was arrested the same evening. A bail application has been filed.",
  key_facts: [
    "Injury to complainant (fracture)",
    "CCTV footage available",
    "No prior criminal record (as per defence)",
    "Accused in custody for 3 days"
  ],
  legal_issues: [
    "Bail eligibility",
    "Nature of offence (BNS)",
    "Procedural compliance (BNSS)",
    "Evidence admissibility (BSA)"
  ],
  accused: {
    name: "Aarav Mehta",
    age: 21,
    profile: "3rd-year Undergraduate Computer Engineering student at North Campus",
    background: "Zero prior criminal antecedents, hostel resident"
  },
  complainant: {
    name: "Rohan Verma",
    age: 22,
    profile: "Final year student and campus union representative"
  },
  // Structural facts categorized precisely by status tags for the simulator
  facts: [
    {
      id: "fact-01",
      tag: "established",
      title: "Campus Presence at 9:45 PM",
      description: "Aarav Mehta was verified present at North Campus courtyard at 9:45 PM on September 14, 2025.",
      source: "Campus turnstile biometric logs",
      timestamp: "09:45 PM",
      reliability: "High (Digital Audit)"
    },
    {
      id: "fact-02",
      tag: "established",
      title: "Altercation Outside University Library",
      description: "A heated physical scuffle broke out between two rival student groups near the library fountain at approximately 10:15 PM.",
      source: "Security Guard Station Log",
      timestamp: "10:15 PM",
      reliability: "High (Corroborated by staff)"
    },
    {
      id: "fact-03",
      tag: "established",
      title: "Medical Treatment of Complainant",
      description: "Rohan Verma sustained a fracture in his left arm and was admitted to City Civil Hospital at 11:30 PM.",
      source: "Civil Hospital MLC Record #7821",
      timestamp: "11:30 PM",
      reliability: "High (Hospital Record)"
    },
    {
      id: "fact-04",
      tag: "established",
      title: "No Prior Criminal Record",
      description: "Aarav Mehta has no criminal record, pending complaints, or disciplinary notices.",
      source: "Police Antecedent Verification",
      timestamp: "Verified Post-Apprehension",
      reliability: "High (Official Certification)"
    },
    {
      id: "fact-05",
      tag: "allegation",
      title: "Intentional Fracture with Weapon",
      description: "Prosecution alleges Aarav Mehta initiated physical assault using a concealed metallic knuckle-duster causing bone fracture.",
      source: "Complainant Rohan Verma's Statement",
      timestamp: "10:15 PM (Alleged)",
      reliability: "Contested"
    },
    {
      id: "fact-06",
      tag: "allegation",
      title: "Intentional Wrongful Restraint",
      description: "Complainant alleges Aarav and associates blocked the exit corridor to prevent him from escaping.",
      source: "FIR Statement by Complainant",
      timestamp: "10:18 PM (Alleged)",
      reliability: "Contested"
    },
    {
      id: "fact-07",
      tag: "disputed",
      title: "First Striker & Self-Defense Claim",
      description: "Aarav contends he was mobbed by Rohan's cohort, subjected to verbal abuse, and acted in defensive retreat.",
      source: "Defense Written Submission",
      timestamp: "10:14 PM - 10:19 PM",
      reliability: "Unresolved"
    },
    {
      id: "fact-08",
      tag: "disputed",
      title: "Ownership of Weapon Seized in Courtyard",
      description: "Police seized brass knuckles from garden bushes 40 yards away with no fingerprint nexus to Aarav.",
      source: "Seizure Memo dated Sept 15",
      timestamp: "03:30 AM",
      reliability: "Dubious"
    },
    {
      id: "fact-09",
      tag: "missing",
      title: "CCTV Footage from Library Gate #3",
      description: "Security surveillance footage covering the exact 10:10 PM - 10:25 PM window has not been submitted by the IO.",
      source: "Defense Discovery Request",
      timestamp: "10:10 PM - 10:25 PM",
      reliability: "Critical Gap"
    },
    {
      id: "fact-10",
      tag: "missing",
      title: "Section 38 Written Grounds Memo",
      description: "No contemporaneous written memo stating specific grounds of arrest exists in the case diary.",
      source: "Case Diary Inspection",
      timestamp: "01:15 AM",
      reliability: "Statutory Defect"
    }
  ],
  // Categorized tabs for the Case File panel
  allegations: [
    {
      party: "Prosecution Stance",
      color: "rose",
      text: "Accused initiated physical assault using a concealed metallic weapon; complainant sustained forearm fracture with deliberate malice under Sections 115(2) and 126(2) BNS."
    },
    {
      party: "Defense Counter",
      color: "indigo",
      text: "Complainant and mob initiated altercation; accused acted in defensive retreat. Injuries resulted from accidental trip and fall during retreat."
    }
  ],
  evidence: [
    {
      title: "Civil Hospital MLC Record #7821",
      description: "Forearm fracture verified. No weapon traces or metal filings identified on the victim's body.",
      admissibility: "Admitted"
    },
    {
      title: "Hostel Biometric Turnstile Log",
      description: "Arrest occurred at 1:15 AM inside dorm without written Section 38 memo or panchnama.",
      admissibility: "Challenged"
    },
    {
      title: "Courtyard Metallic Weapon Recovery",
      description: "Brass knuckles seized from bushes 40 yards away without independent witnesses or fingerprint match.",
      admissibility: "Challenged"
    }
  ],
  timeline: [
    { time: "09:45 PM", event: "Biometric entry into North Campus campus verified for Aarav." },
    { time: "10:15 PM", event: "Physical scuffle breaks out outside library fountain." },
    { time: "11:30 PM", event: "Complainant Rohan admitted with forearm fracture at Civil Hospital." },
    { time: "01:15 AM", event: "Police arrest Aarav from hostel room without written Section 38 memo." },
    { time: "Day 3 (Today)", event: "Bail hearing convenes before Sessions Court, Delhi." }
  ],
  disruptive_variables: [
    {
      variable_id: "MUTATION-01",
      type: "disputed",
      title: "CCTV Timestamp: Accused at Cafeteria at 10:14 PM",
      description: "CRITICAL NEW EVIDENCE: University IT server retrieves authenticated CCTV log showing Aarav Mehta was at the campus cafeteria 400 meters away at 10:14 PM.",
      impact: "Destroys prosecution allegation of premeditated assault at library fountain during key timestamp.",
      judge_prompt: "Counsel, the Registrar has just submitted verified CCTV server footage placing your client at the South Cafeteria at 10:14 PM! How does this alibi reshape your defense on Section 115(2) BNS? Address the court immediately!",
      opposing_counsel_rebuttal: "Your Honor! Even if the accused was at the cafeteria at 10:14 PM, he could have arrived within minutes. Section 3(5) joint criminal liability still attaches!"
    },
    {
      variable_id: "MUTATION-02",
      type: "established",
      title: "Medical Evaluation: Arm Fracture from High-Impact Fall",
      description: "REVISED MEDICAL EVALUATION: CMO report indicates the fracture resulted from impact against marble stair treads during a trip, not a blunt force weapon blow.",
      impact: "Severely weakens the weapon battery narrative and supports mutual accidental fall.",
      judge_prompt: "Counsel, take note: the medical officer now concludes the victim's arm fracture resulted from a fall on wet marble steps. Given this clinical finding, how do you address the intentional hurt charges?",
      opposing_counsel_rebuttal: "Objection, Your Honor! The victim's sworn testimony insists he was struck. A medical opinion on mechanics does not extinguish oral testimony at the threshold bail stage!"
    },
    {
      variable_id: "MUTATION-03",
      type: "established",
      title: "IO Admits Failure to Serve Section 38 Written Grounds",
      description: "PROCEDURAL DEFAULT ADMISSION: Investigating Officer Sub-Inspector concedes on oath that no written grounds of arrest were furnished to Aarav or his family.",
      impact: "Direct statutory violation of BNSS Section 38 and Supreme Court precedent in State v. Vikram Deshmukh.",
      judge_prompt: "Defense Counsel! The Investigating Officer has just admitted on record that no written grounds of arrest were supplied under Section 38 BNSS. How does this procedural defect impact your plea for immediate release?",
      opposing_counsel_rebuttal: "The omission was a bona fide clerical lapse due to the midnight commotion! Custodial interrogation remains essential!"
    }
  ]
};

// Complete BNSS Key Provisions Dataset (Matching Screens 3 & 5)
export const BNSS_KEY_PROVISIONS = [
  {
    id: "bnss-47",
    section: "Section 47",
    title: "Grounds of Arrest",
    category: "Arrest & Detention",
    act: "Bharatiya Nagarik Suraksha Sanhita, 2023",
    summary: "The police must have reasonable and probable grounds for arrest. Arrest cannot be made arbitrarily.",
    statutory_provision: "The police officer may arrest a person without a warrant if he has reasonable and probable grounds for such arrest.",
    key_points: [
      "Reasonable and probable grounds required",
      "Arbitrary arrest not permitted",
      "Must be based on credible information"
    ],
    related_sections: [
      { id: "bnss-48", label: "Section 48 – Inform a relative/friend" },
      { id: "bnss-53", label: "Section 53 – Medical examination" },
      { id: "bnss-57", label: "Section 57 – Production before magistrate" }
    ],
    why_it_matters: "Determines the legality of an arrest and protects the fundamental rights of the accused."
  },
  {
    id: "bnss-48",
    section: "Section 48",
    title: "Inform a Relative/Friend",
    category: "Arrest & Detention",
    act: "Bharatiya Nagarik Suraksha Sanhita, 2023",
    summary: "The arrested person must be informed of the right to inform a relative or friend.",
    statutory_provision: "Every police officer or other person making any arrest shall forthwith inform the arrested person that he is entitled to have a friend, relative or other person told of his arrest.",
    key_points: [
      "Mandatory duty on arresting officer to inform rights",
      "Entry of relative's details in police station register",
      "Fundamental constitutional protection against secret detentions"
    ],
    related_sections: [
      { id: "bnss-47", label: "Section 47 – Grounds of Arrest" },
      { id: "bnss-38", label: "Section 38 – Consult an Advocate" }
    ],
    why_it_matters: "Prevents enforced disappearances and ensures legal aid and family reach the arrestee immediately."
  },
  {
    id: "bnss-38",
    section: "Section 38",
    title: "Consult an Advocate of Choice",
    category: "Arrest & Detention",
    act: "Bharatiya Nagarik Suraksha Sanhita, 2023",
    summary: "The arrested person has the right to consult an advocate of their choice.",
    statutory_provision: "When any person is arrested and interrogated by the police, he shall be entitled to meet an advocate of his choice during interrogation, though not throughout interrogation.",
    key_points: [
      "Statutory embodiment of Article 22(1) Constitution",
      "Right to confidential legal counsel",
      "Mandatory notice of rights provided in writing"
    ],
    related_sections: [
      { id: "bnss-47", label: "Section 47 – Grounds of arrest" },
      { id: "bnss-53", label: "Section 53 – Medical examination" }
    ],
    why_it_matters: "Guarantees access to legal defense from the very inception of police custody."
  },
  {
    id: "bnss-53",
    section: "Section 53",
    title: "Medical Examination",
    category: "Arrest & Detention",
    act: "Bharatiya Nagarik Suraksha Sanhita, 2023",
    summary: "The arrested person must be produced for a medical examination within a reasonable time.",
    statutory_provision: "When any person is arrested, he shall be examined by a medical officer in the service of Central or State Government promptly after the arrest is made.",
    key_points: [
      "Mandatory medical examination immediately post-arrest",
      "Record of pre-existing bodily injuries or marks",
      "Copy of medical report furnished to accused or advocate"
    ],
    related_sections: [
      { id: "bnss-47", label: "Section 47 – Grounds of arrest" },
      { id: "bnss-56", label: "Section 56 – Health and safety" }
    ],
    why_it_matters: "Provides indisputable objective documentation against custodial violence or torture."
  },
  {
    id: "bnss-56",
    section: "Section 56",
    title: "Health and Safety in Custody",
    category: "Arrest & Detention",
    act: "Bharatiya Nagarik Suraksha Sanhita, 2023",
    summary: "The accused must be kept in safe and humane conditions in custody.",
    statutory_provision: "It shall be the duty of the person having the custody of an accused to take reasonable care of the health and safety of the accused.",
    key_points: [
      "Affirmative duty of care imposed on custodians",
      "Safe and humane holding facility requirement",
      "Emergency medical access obligations"
    ],
    related_sections: [
      { id: "bnss-53", label: "Section 53 – Medical examination" },
      { id: "bnss-57", label: "Section 57 – Production before magistrate" }
    ],
    why_it_matters: "Codifies strict state liability for custodial safety and well-being."
  },
  {
    id: "bnss-57",
    section: "Section 57",
    title: "Production before a Magistrate",
    category: "Arrest & Detention",
    act: "Bharatiya Nagarik Suraksha Sanhita, 2023",
    summary: "The arrested person must be produced before a magistrate within 24 hours (excluding travel time).",
    statutory_provision: "No police officer shall detain in custody a person arrested without warrant for a longer period than twenty-four hours exclusive of the time necessary for the journey from the place of arrest to the Magistrate's Court.",
    key_points: [
      "Strict non-extendable 24-hour statutory limit",
      "Judicial scrutiny mandated for continued custody",
      "Failure to produce renders detention unconstitutional"
    ],
    related_sections: [
      { id: "bnss-47", label: "Section 47 – Grounds of arrest" },
      { id: "bnss-479", label: "Section 479 – Bail for undertrials" }
    ],
    why_it_matters: "The cornerstone safeguard against indefinite or unauthorized police detention."
  },
  {
    id: "bnss-479",
    section: "Section 479",
    title: "Maximum Period of Detention & Bail for Undertrials",
    category: "Bail",
    act: "Bharatiya Nagarik Suraksha Sanhita, 2023",
    summary: "Liberalized bail framework. First-time offenders who have undergone one-third of sentence shall be released.",
    statutory_provision: "Where a person has undergone detention for a period extending up to one-half of the maximum period of imprisonment, he shall be released by the Court on bond or bail.",
    key_points: [
      "First-time offender relief after one-third period",
      "Court mandate to favor personal bond",
      "Strict monitoring of undertrial detention lists"
    ],
    related_sections: [
      { id: "bnss-47", label: "Section 47 – Grounds of arrest" }
    ],
    why_it_matters: "Enforces the constitutional precept that bail is the rule and jail is the exception."
  },
  {
    id: "bnss-175",
    section: "Section 175",
    title: "Information in Cognizable Cases (FIR)",
    category: "Investigation",
    act: "Bharatiya Nagarik Suraksha Sanhita, 2023",
    summary: "Procedure for recording information of cognizable offenses, electronic FIR, and preliminary enquiry.",
    statutory_provision: "Every information relating to the commission of a cognizable offence may be given orally or by electronic communication to an officer in charge of a police station.",
    key_points: [
      "Introduction of electronic e-FIR registration",
      "Mandatory preliminary enquiry for offenses with 3-7 year punishment",
      "Free copy of FIR must be furnished forthwith"
    ],
    related_sections: [
      { id: "bnss-47", label: "Section 47 – Grounds of arrest" }
    ],
    why_it_matters: "Regulates the legal threshold that triggers the commencement of a criminal investigation."
  },
  {
    id: "bnss-480",
    section: "Section 480",
    title: "When Bail May Be Taken in Non-Bailable Offence",
    category: "Bail",
    act: "Bharatiya Nagarik Suraksha Sanhita, 2023",
    summary: "Governs regular bail powers for persons accused of non-bailable offences. Judicial discretion must favor release unless capital punishment applies.",
    statutory_provision: "When any person accused of, or suspected of, the commission of any non-bailable offence is arrested or detained without warrant by an officer in charge of a police station or appears or is brought before a Court, he may be released on bail.",
    key_points: [
      "Broad judicial discretion to grant regular bail",
      "Proviso mandates leniency for individuals under 18, infirm, or sick",
      "Mere severity of accusation cannot justify punitive detention without flight risk"
    ],
    related_sections: [
      { id: "bnss-483", label: "Section 483 – Special powers of Sessions Court on bail" },
      { id: "bnss-479", label: "Section 479 – Maximum period of detention" }
    ],
    why_it_matters: "The core provision under which advocates move for regular bail before the Magistrate and Sessions Judge."
  },
  {
    id: "bnss-483",
    section: "Section 483",
    title: "Special Powers of High Court / Sessions Court Regarding Bail",
    category: "Bail",
    act: "Bharatiya Nagarik Suraksha Sanhita, 2023",
    summary: "Inherent and concurrent jurisdiction of Court of Session and High Court to grant regular bail and modify custody terms.",
    statutory_provision: "A High Court or Court of Session may direct that any person accused of an offence and in custody be released on bail, and if the arrest is of a kind specified in clause (i) or clause (ii) of sub-section (1) of section 480, may impose any condition necessary.",
    key_points: [
      "Plenary appellate and original bail jurisdiction",
      "Power to grant bail even during pending investigations",
      "Authority to set aside onerous surety conditions"
    ],
    related_sections: [
      { id: "bnss-480", label: "Section 480 – Regular bail powers" },
      { id: "bnss-484", label: "Section 484 – Anticipatory bail" }
    ],
    why_it_matters: "Empowers the Sessions Judge in this simulator to pronounce immediate bail orders in open court."
  },
  {
    id: "bns-115-2",
    section: "Section 115(2)",
    title: "Voluntarily Causing Hurt",
    category: "BNS Offences",
    act: "Bharatiya Nyaya Sanhita, 2023",
    summary: "Punishment for causing bodily pain, disease or infirmity without grievous injury. Maximum 1 year imprisonment or ₹10,000 fine.",
    statutory_provision: "Whoever, except in the case provided for by sub-section (1) of section 122, voluntarily causes hurt, shall be punished with imprisonment of either description for a term which may extend to one year, or with fine which may extend to ten thousand rupees, or with both.",
    key_points: [
      "Corresponds directly to former IPC Section 323",
      "Offence is bailable and non-cognizable under normal schedule",
      "Does not require prolonged custodial interrogation"
    ],
    related_sections: [
      { id: "bns-117", label: "Section 117 – Voluntarily causing grievous hurt" },
      { id: "bns-126-2", label: "Section 126(2) – Wrongful restraint" }
    ],
    why_it_matters: "Distinguishes trivial college scuffles and simple bruises from severe felony violence."
  },
  {
    id: "bns-117",
    section: "Section 117",
    title: "Voluntarily Causing Grievous Hurt",
    category: "BNS Offences",
    act: "Bharatiya Nyaya Sanhita, 2023",
    summary: "Causing hurt that endangers life, causes permanent privation of member, or bone fracture/dislocation. Imprisonment up to 7 years.",
    statutory_provision: "Whoever voluntarily causes grievous hurt, shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.",
    key_points: [
      "Corresponds to former IPC Section 325",
      "Requires verifiable radiological or medical proof of fracture (MLC)",
      "Subject to Satender Kumar Antil category guidelines (punishment under 7 years)"
    ],
    related_sections: [
      { id: "bns-115-2", label: "Section 115(2) – Simple hurt" },
      { id: "bns-118", label: "Section 118 – Hurt with dangerous weapons" }
    ],
    why_it_matters: "The focal charge in The College Fight. When the radiological scan is contested or missing, custody cannot be sustained."
  },
  {
    id: "bns-118",
    section: "Section 118",
    title: "Voluntarily Causing Hurt or Grievous Hurt by Dangerous Weapons",
    category: "BNS Offences",
    act: "Bharatiya Nyaya Sanhita, 2023",
    summary: "Enhanced punishment for using cutting instruments, stabbing weapons, firearms, or blunt force weapons.",
    statutory_provision: "Whoever commits voluntarily causing hurt or grievous hurt by means of any instrument for shooting, stabbing or cutting, or any instrument which, used as a weapon of offence, is likely to cause death, shall be punished with imprisonment.",
    key_points: [
      "Corresponds to former IPC Sections 324 and 326",
      "Requires contemporaneous seizure memo and independent panchas under BNSS 47",
      "Crucial factor in determining bail eligibility"
    ],
    related_sections: [
      { id: "bns-117", label: "Section 117 – Grievous hurt" },
      { id: "bnss-47", label: "Section 47 – Search & seizure safeguards" }
    ],
    why_it_matters: "Invoked when iron rods, knuckle dusters, or sharp instruments are alleged by the prosecution."
  },
  {
    id: "bns-126-2",
    section: "Section 126(2)",
    title: "Wrongful Restraint",
    category: "BNS Offences",
    act: "Bharatiya Nyaya Sanhita, 2023",
    summary: "Voluntarily obstructing any person from proceeding in any direction in which that person has a right to proceed.",
    statutory_provision: "Whoever wrongfully restrains any person shall be punished with simple imprisonment for a term which may extend to one month, or with fine which may extend to five thousand rupees, or with both.",
    key_points: [
      "Corresponds to former IPC Section 341",
      "Mild statutory punishment (max 1 month)",
      "Commonly added to FIRs during college demonstrations or altercations"
    ],
    related_sections: [
      { id: "bns-115-2", label: "Section 115(2) – Simple hurt" }
    ],
    why_it_matters: "Demonstrates that secondary charges in the FIR are minor bailable infractions."
  },
  {
    id: "bns-3-5",
    section: "Section 3(5)",
    title: "Common Intention & Joint Criminal Liability",
    category: "BNS Offences",
    act: "Bharatiya Nyaya Sanhita, 2023",
    summary: "Criminal act done by several persons in furtherance of common intention makes each person liable as if done by him alone.",
    statutory_provision: "When a criminal act is done by several persons in furtherance of the common intention of all, each of such persons is liable for that act in the same manner as if it were done by him alone.",
    key_points: [
      "Corresponds to former IPC Section 34",
      "Requires prior meeting of minds or pre-arranged plan",
      "Mere presence at a riotous scene without overt act does not establish common intention"
    ],
    related_sections: [
      { id: "bns-115-2", label: "Section 115(2) – Simple hurt" },
      { id: "bns-189", label: "Section 189 – Unlawful assembly" }
    ],
    why_it_matters: "Vital defense argument to detach innocent bystanders or peaceful students from violent mobs."
  },
  {
    id: "bns-316",
    section: "Section 316",
    title: "Criminal Breach of Trust",
    category: "BNS Offences",
    act: "Bharatiya Nyaya Sanhita, 2023",
    summary: "Dishonest misappropriation or conversion of property entrusted to a person, or violating direction of law governing trust.",
    statutory_provision: "Whoever, being in any manner entrusted with property, or with any dominion over property, dishonestly misappropriates or converts to his own use that property, commits criminal breach of trust.",
    key_points: [
      "Corresponds to former IPC Sections 405, 406, 408",
      "Requires proof of entrustment and dishonest misappropriation",
      "Essential charge in white collar, corporate, and whistleblower cases"
    ],
    related_sections: [
      { id: "bsa-63", label: "Section 63 – Electronic evidence certificate" }
    ],
    why_it_matters: "Central substantive charge in Corporate Whistleblower scenario SCN-2025-03."
  },
  {
    id: "bns-351-2",
    section: "Section 351(2)",
    title: "Criminal Intimidation",
    category: "BNS Offences",
    act: "Bharatiya Nyaya Sanhita, 2023",
    summary: "Threatening another person with injury to person, reputation, or property to cause alarm or force acts against will.",
    statutory_provision: "Whoever commits the offence of criminal intimidation shall be punished with imprisonment of either description for a term which may extend to two years, or with fine, or with both.",
    key_points: [
      "Corresponds to former IPC Section 506",
      "Requires genuine apprehension or intent to cause alarm",
      "Frequently paired with hurt charges in fight complaints"
    ],
    related_sections: [
      { id: "bns-115-2", label: "Section 115(2) – Simple hurt" }
    ],
    why_it_matters: "Commonly alleged in campus disputes; rarely warrants custodial interrogation without antecedent history."
  },
  {
    id: "bns-34",
    section: "Section 34",
    title: "Right of Private Defence",
    category: "BNS Offences",
    act: "Bharatiya Nyaya Sanhita, 2023",
    summary: "Nothing is an offence which is done in the lawful exercise of the right of private defence of person or property.",
    statutory_provision: "Every person has a right, subject to the restrictions contained in this Sanhita, to defend his own body, and the body of any other person, against any offence affecting the human body.",
    key_points: [
      "Corresponds to former IPC Section 96 to 106",
      "Complete justification excusing what would otherwise be a criminal offence",
      "Defense need only establish probability of self-defense, not proof beyond reasonable doubt"
    ],
    related_sections: [
      { id: "bns-115-2", label: "Section 115(2) – Simple hurt" }
    ],
    why_it_matters: "Provides complete substantive defense for Aarav Mehta protecting his classmate from an aggressive crowd."
  },
  {
    id: "bsa-63",
    section: "Section 63",
    title: "Certificate for Electronic Evidence",
    category: "Evidence & Admissibility",
    act: "Bharatiya Sakshya Adhiniyam, 2023",
    summary: "Mandatory condition precedent: Electronic records, CCTV clips, and cloud logs are inadmissible without signed certificate by custodian.",
    statutory_provision: "A certificate identifying the electronic record containing the statement and describing the manner in which it was produced, signed by a person occupying a responsible official position in relation to the operation of the relevant device, shall be evidence of any matter stated in the certificate.",
    key_points: [
      "Corresponds to former Section 65B of Indian Evidence Act, 1872",
      "Affirmed by Supreme Court in Arjun Panditrao Khotkar v. Kailash Kushanrao Gorantyal (2020)",
      "Absence of certificate invalidates CCTV and cloud evidence at threshold"
    ],
    related_sections: [
      { id: "bsa-61", label: "Section 61 – Electronic records" }
    ],
    why_it_matters: "Critical weapon for defense counsel to dismantle unverified CCTV or uncertified electronic evidence."
  },
  {
    id: "bsa-61",
    section: "Section 61",
    title: "Admissibility of Electronic Records",
    category: "Evidence & Admissibility",
    act: "Bharatiya Sakshya Adhiniyam, 2023",
    summary: "Deems information stored in electronic form to be a document, subject to the safeguards of Section 63.",
    statutory_provision: "Notwithstanding anything contained in this Adhiniyam, any information contained in an electronic record which is printed on a paper, stored, recorded or copied in optical or magnetic media produced by a computer shall be deemed to be also a document.",
    key_points: [
      "Corresponds to former Section 65A Indian Evidence Act",
      "Treats server dumps, mobile extracts, and digital CCTV as documentary evidence",
      "Strict chain-of-custody compliance mandatory"
    ],
    related_sections: [
      { id: "bsa-63", label: "Section 63 – Electronic evidence certificate" }
    ],
    why_it_matters: "Underpins all modern electronic surveillance and digital seizure arguments."
  },
  {
    id: "bsa-23",
    section: "Section 23",
    title: "Statements to Police Officers in Custody",
    category: "Evidence & Admissibility",
    act: "Bharatiya Sakshya Adhiniyam, 2023",
    summary: "Confessions made to police officers or while in custodial police custody cannot be proved against the accused.",
    statutory_provision: "No confession made to a police officer shall be proved as against a person accused of any offence.",
    key_points: [
      "Corresponds to former Section 25 and 26 of Indian Evidence Act",
      "Fundamental barrier against forced custodial admissions",
      "Only discovery of distinct fact under Section 23(2) is admissible"
    ],
    related_sections: [
      { id: "bnss-38", label: "Section 38 – Consult an advocate" }
    ],
    why_it_matters: "Prevents prosecution from relying on purported oral confessions extracted during campus detention."
  }
];

// Legal Research Sources (Matching Screen 4)
export const RESEARCH_SOURCES = [
  {
    id: "scc-online",
    name: "SCC Online",
    tagline: "Authoritative database for Supreme Court and High Court judgments.",
    description: "The gold standard Indian case law research engine with headnotes, cross-citations, and bench annotations.",
    url: "https://www.scconline.com",
    badge: "SCC",
    category: "Primary Case Law"
  },
  {
    id: "manupatra",
    name: "Manupatra",
    tagline: "Comprehensive legal database with judgments, statutes and articles.",
    description: "Extensive repository covering central/state bare acts, tribunal decisions, circulars, and analytics.",
    url: "https://www.manupatrafast.com",
    badge: "MP",
    category: "Statutes & Precedents"
  },
  {
    id: "indian-kanoon",
    name: "Indian Kanoon",
    tagline: "Free access to Indian case law and judgments.",
    description: "Open-access search engine for Indian court judgments, law commission reports, and parliamentary acts.",
    url: "https://indiankanoon.org",
    badge: "IK",
    category: "Open Access"
  },
  {
    id: "livelaw",
    name: "LiveLaw / Bar and Bench",
    tagline: "Latest legal news, judgments and analysis.",
    description: "Real-time courtroom reporting, daily order summaries, legal commentary, and judicial appointments.",
    url: "https://www.livelaw.in",
    badge: "Live",
    category: "Legal News & Analysis"
  },
  {
    id: "india-code",
    name: "India Code",
    tagline: "Official Government of India website for bare acts and rules.",
    description: "Digital repository of all Central and State Acts as amended by Parliament of India with official Gazette notifications.",
    url: "https://www.indiacode.nic.in",
    badge: "GOI",
    category: "Official Acts"
  }
];

// Legal Toolkit provisions for the Right Drawer
export const LEGAL_TOOLKIT = {
  BNSS: [
    {
      section: "Section 480",
      act: "BNSS",
      title: "When Bail May Be Taken in Non-Bailable Offence",
      short_rule: "Discretion to grant bail where accused is not punishable with death/life imprisonment.",
      description: "When any person accused of, or suspected of, the commission of any non-bailable offence is arrested or detained without warrant, he may be released on bail by Court.",
      full_section: "Section 480 - Non-Bailable Bail Powers"
    },
    {
      section: "Section 483",
      act: "BNSS",
      title: "Special Powers of High Court / Sessions Court on Bail",
      short_rule: "Broad jurisdiction of Sessions Judge to grant bail with protective conditions.",
      description: "A High Court or Court of Session may direct that any person accused of an offence and in custody be released on bail, and may impose any condition necessary.",
      full_section: "Section 483 - Sessions Court Bail Powers"
    },
    {
      section: "Section 484",
      act: "BNSS",
      title: "Direction for Grant of Bail to Person Apprehending Arrest (Anticipatory Bail)",
      short_rule: "Pre-arrest protective bail direction issued by High Court or Court of Session.",
      description: "Where any person has reason to believe that he may be arrested on accusation of having committed a non-bailable offence, he may apply to the High Court or the Court of Session for a direction under this section.",
      full_section: "Section 484 - Anticipatory Bail Powers"
    },
    {
      section: "Section 47",
      act: "BNSS",
      title: "Grounds of Arrest",
      short_rule: "Police must have reasonable grounds for arrest.",
      description: "The police officer may arrest a person without a warrant if he has reasonable and probable grounds for such arrest.",
      full_section: "Section 47 - Grounds of Arrest"
    },
    {
      section: "Section 48",
      act: "BNSS",
      title: "Inform a Relative/Friend",
      short_rule: "Arrested person must be informed of the right to inform a relative or friend.",
      description: "Every police officer or other person making any arrest shall forthwith inform the arrested person that he is entitled to have a friend, relative or other person told of his arrest.",
      full_section: "Section 48 - Inform a Relative/Friend"
    },
    {
      section: "Section 38",
      act: "BNSS",
      title: "Consult an Advocate of Choice",
      short_rule: "Right to consult an advocate of choice and receive written grounds of arrest.",
      description: "When any person is arrested and interrogated by the police, he shall be entitled to meet an advocate of his choice during interrogation.",
      full_section: "Section 38 - Consult an Advocate"
    },
    {
      section: "Section 53",
      act: "BNSS",
      title: "Medical Examination",
      short_rule: "Medical examination of arrested person.",
      description: "When any person is arrested, he shall be examined by a medical officer in the service of Central or State Government promptly.",
      full_section: "Section 53 - Medical Examination"
    },
    {
      section: "Section 57",
      act: "BNSS",
      title: "Person Not to Be Detained Over 24 Hours",
      short_rule: "Mandatory production before nearest Magistrate within twenty-four hours.",
      description: "No police officer shall detain in custody a person arrested without warrant for a longer period than twenty-four hours exclusive of journey time.",
      full_section: "Section 57 - 24-Hour Magistrate Limit"
    },
    {
      section: "Section 185",
      act: "BNSS",
      title: "Search by Police Officer & Independent Panchas",
      short_rule: "Mandatory recording of grounds in writing before warrantless search and pancha witnesses.",
      description: "Whenever an officer in charge of a police station has reasonable grounds for believing that anything necessary for the purposes of an investigation may be found, he must record grounds in writing before conducting search.",
      full_section: "Section 185 - Search Procedure & Safeguards"
    },
    {
      section: "Section 187",
      act: "BNSS",
      title: "Procedure When Investigation Cannot Be Completed in 24 Hours (Remand)",
      short_rule: "Judicial scrutiny and maximum custodial remand limits under magistrate authorization.",
      description: "The Magistrate may authorize the detention of the accused person, otherwise than in custody of the police, beyond the period of fifteen days if satisfied that adequate grounds exist.",
      full_section: "Section 187 - Remand & Custodial Authorization"
    },
    {
      section: "Section 482",
      act: "BNSS",
      title: "Bail in Bailable Offenses",
      short_rule: "Accused entitled to bail on furnishing personal bond.",
      description: "When any person other than a person accused of a non-bailable offence is arrested, he shall be released on bail.",
      full_section: "Section 482 - Bail Provision"
    }
  ],
  BNS: [
    {
      section: "Section 115(2)",
      act: "BNS",
      title: "Voluntarily Causing Hurt",
      short_rule: "Punishable up to 1 year imprisonment or fine up to ₹10,000. Simple hurt.",
      description: "Whoever causes bodily pain, disease or infirmity to any person is said to cause hurt. Sub-section (2) prescribes penalty for voluntarily causing hurt.",
      full_section: "Section 115(2) - Voluntarily Causing Hurt"
    },
    {
      section: "Section 117",
      act: "BNS",
      title: "Voluntarily Causing Grievous Hurt",
      short_rule: "Bone fracture, permanent disfiguration, or endangering life falls under grievous hurt.",
      description: "Causing hurt which endangers life or causes permanent privation of any member, or fracture or dislocation of a bone.",
      full_section: "Section 117 - Grievous Hurt"
    },
    {
      section: "Section 118",
      act: "BNS",
      title: "Hurt by Dangerous Weapons or Means",
      short_rule: "Enhanced penalty for using instruments of cutting, stabbing, or blunt force weapons.",
      description: "Whoever commits voluntarily causing hurt or grievous hurt by means of any instrument for shooting, stabbing or cutting, or offensive weapon.",
      full_section: "Section 118 - Dangerous Weapons"
    },
    {
      section: "Section 126(2)",
      act: "BNS",
      title: "Wrongful Restraint",
      short_rule: "Obstructing a person from proceeding in a direction they have a right to proceed.",
      description: "Whoever voluntarily obstructs any person so as to prevent that person from proceeding in any direction in which that person has a right to proceed.",
      full_section: "Section 126(2) - Wrongful Restraint"
    },
    {
      section: "Section 3(5)",
      act: "BNS",
      title: "Joint Criminal Liability & Common Intention",
      short_rule: "Acts done by several persons in furtherance of common intention.",
      description: "When a criminal act is done by several persons in furtherance of the common intention of all, each of such persons is liable for that act in the same manner as if it were done by him alone.",
      full_section: "Section 3(5) - Common Intention"
    },
    {
      section: "Section 316",
      act: "BNS",
      title: "Criminal Breach of Trust",
      short_rule: "Dishonest misappropriation or conversion of entrusted property.",
      description: "Whoever, being entrusted with property or dominion over property, dishonestly misappropriates or converts to their own use that property.",
      full_section: "Section 316 - Criminal Breach of Trust"
    },
    {
      section: "Section 303",
      act: "BNS",
      title: "Theft & Dishonest Misappropriation",
      short_rule: "Taking movable property dishonestly out of possession of any person.",
      description: "Whoever, intending to take dishonestly any movable property out of the possession of any person without that person's consent, moves that property in order to such taking, commits theft.",
      full_section: "Section 303 - Theft"
    },
    {
      section: "Section 318",
      act: "BNS",
      title: "Cheating and Dishonestly Inducing Delivery of Property",
      short_rule: "Deceiving any person and fraudulently inducing delivery of property.",
      description: "Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person, or to make, alter or destroy the whole or any part of a valuable security.",
      full_section: "Section 318 - Cheating"
    },
    {
      section: "Section 109",
      act: "BNS",
      title: "Attempt to Commit Murder",
      short_rule: "Doing an act with such intention or knowledge that if death were caused it would amount to murder.",
      description: "Whoever does any act with such intention or knowledge, and under such circumstances that, if he by that act caused death, he would be guilty of murder.",
      full_section: "Section 109 - Attempt to Murder"
    },
    {
      section: "Section 189",
      act: "BNS",
      title: "Unlawful Assembly",
      short_rule: "Assembly of five or more persons with common object of overawing government or committing offense.",
      description: "An assembly of five or more persons is designated an unlawful assembly if the common object of the persons composing that assembly is to commit any criminal trespass or other offence.",
      full_section: "Section 189 - Unlawful Assembly"
    },
    {
      section: "Section 190",
      act: "BNS",
      title: "Every Member of Unlawful Assembly Guilty of Offence",
      short_rule: "Vicarious criminal liability for offenses committed in prosecution of common object.",
      description: "If an offence is committed by any member of an unlawful assembly in prosecution of the common object of that assembly, every person who is a member of that assembly is guilty of that offence.",
      full_section: "Section 190 - Common Object Liability"
    },
    {
      section: "Section 351(2)",
      act: "BNS",
      title: "Criminal Intimidation",
      short_rule: "Threatening another with injury to person, reputation, or property.",
      description: "Whoever commits the offence of criminal intimidation shall be punished with imprisonment of either description for a term which may extend to two years, or with fine, or with both.",
      full_section: "Section 351(2) - Criminal Intimidation"
    },
    {
      section: "Section 352",
      act: "BNS",
      title: "Intentional Insult with Intent to Provoke Breach of Peace",
      short_rule: "Intentionally insulting any person to provoke breach of public peace.",
      description: "Whoever intentionally insults, and thereby gives provocation to any person, intending or knowing it to be likely that such provocation will cause him to break the public peace.",
      full_section: "Section 352 - Provocation & Breach of Peace"
    },
    {
      section: "Section 34",
      act: "BNS",
      title: "Right of Private Defence",
      short_rule: "Nothing is an offence which is done in the exercise of the right of private defence.",
      description: "Every person has a right to defend his own body, and the body of any other person, against any offence affecting the human body subject to the restrictions in the Sanhita.",
      full_section: "Section 34 - Private Defence"
    }
  ],
  BSA: [
    {
      section: "Section 63",
      act: "BSA",
      title: "Certificate for Electronic Evidence",
      short_rule: "Mandatory certificate from device custodian to render digital logs and CCTV admissible.",
      description: "A certificate identifying the electronic record, describing the manner in which it was produced, and signed by a person occupying a responsible official position in relation to the operation of the relevant device.",
      full_section: "Section 63 - Electronic Certificate"
    },
    {
      section: "Section 61",
      act: "BSA",
      title: "Admissibility of Electronic Records",
      short_rule: "Digital and CCTV logs admissible with statutory certification.",
      description: "Information contained in an electronic record printed or stored in optical media shall be deemed a document subject to Section 63 certification.",
      full_section: "Section 61 - Electronic Records"
    },
    {
      section: "Section 23",
      act: "BSA",
      title: "Statements to Police & Custodial Admissions",
      short_rule: "Confessions to police officers while in custody are inadmissible against the accused.",
      description: "No confession made to a police officer shall be proved as against a person accused of any offence.",
      full_section: "Section 23 - Custodial Admissions"
    },
    {
      section: "Section 32",
      act: "BSA",
      title: "Statements Relating to Cause of Death",
      short_rule: "Dying declarations made by a person as to the cause of death are relevant.",
      description: "When the statement is made by a person as to the cause of his death, or as to any of the circumstances of the transaction which resulted in his death.",
      full_section: "Section 32 - Dying Declaration"
    },
    {
      section: "Section 45",
      act: "BSA",
      title: "Opinions of Experts & Forensic Evidence",
      short_rule: "Expert opinions on law, science, art, finger impressions, or digital evidence.",
      description: "When the Court has to form an opinion upon a point of foreign law or of science or art, or as to identity of handwriting or finger impressions, the opinions upon that point of persons specially skilled are relevant facts.",
      full_section: "Section 45 - Expert Opinion"
    }
  ],
  Notes: [
    {
      section: "Defense Strategy Note",
      act: "Tactical",
      title: "Bail Argument Priorities",
      short_rule: "Highlight clean record, 3-day detention, and lack of flight risk.",
      description: "Under Satender Kumar Antil, young college students with zero antecedents should not be kept in custody for offenses punishable under 7 years."
    }
  ]
};

// ============================================================================
// ADDITIONAL PRE-FIXED SCENARIOS (Dossiers 02 & 03)
// ============================================================================

export const MIDNIGHT_CHECKPOST_SCENARIO = {
  scenario_id: "SCN-2025-02",
  title: "The Midnight Checkpost: Warrantless Vehicle Frisk",
  full_title: "The Midnight Checkpost: Warrantless Vehicle Search & Arms Act Detention",
  category: "Search & Seizure",
  role: "Defence Counsel",
  court: "Sessions Court, Patiala House",
  fir_number: "FIR No. 312/2025 - Vasant Kunj P.S.",
  difficulty: "Advanced Litigator",
  statutes: ["BNSS Sec 47", "BNSS Sec 48", "Arms Act Sec 25"],
  summary: "Police stopped accused's vehicle during routine night patrol and forced open the locked trunk without recording grounds in writing or associating independent panchnama witnesses. An unlicensed firearm was allegedly recovered.",
  key_facts: [
    "Warrantless search conducted at 01:45 AM at barricade",
    "Locked trunk opened without recording grounds under BNSS 47",
    "No independent public witnesses associated with seizure memo",
    "Accused maintains the vehicle is borrowed from a commercial fleet"
  ],
  legal_issues: [
    "Legality of warrantless search under BNSS Section 47",
    "Admissibility of weapon seized without independent panchas",
    "Presumption of conscious possession under Arms Act",
    "Mandatory compliance with D.K. Basu arrest guidelines"
  ],
  accused: {
    name: "Kabir Shergill",
    age: 27,
    profile: "Architectural contractor driving a leased commercial vehicle",
    background: "Zero prior criminal convictions, resident of South Delhi"
  },
  complainant: {
    name: "Sub-Inspector R.K. Yadav",
    age: 41,
    profile: "Night Patrol In-charge, Vasant Kunj Police Station"
  },
  facts: [
    {
      id: "fact-01",
      tag: "established",
      title: "Vehicle Stop at Barricade at 01:45 AM",
      description: "Kabir Shergill stopped at routine barricade on Nelson Mandela Marg at 01:45 AM on October 2, 2025.",
      source: "Police Checkpost Logbook",
      timestamp: "01:45 AM",
      reliability: "High"
    },
    {
      id: "fact-02",
      tag: "established",
      title: "Zero Alcohol Detected",
      description: "Breathalyzer test conducted on spot returned 0.0 mg/100ml. Accused was completely sober.",
      source: "Breathalyzer Slip #441",
      timestamp: "01:50 AM",
      reliability: "High (Electronic)"
    },
    {
      id: "fact-03",
      tag: "missing",
      title: "Absence of Recorded Grounds of Belief",
      description: "No contemporaneous written record of reasonable belief for warrantless trunk search was prepared prior to search.",
      source: "Police Station Case Diary",
      timestamp: "01:55 AM",
      reliability: "Statutory Defect (BNSS 47)"
    },
    {
      id: "fact-04",
      tag: "disputed",
      title: "Seizure Memo Lacks Independent Panchas",
      description: "Seizure list signed solely by subordinate police constables. No local independent witnesses joined despite 24-hr petrol pump across road.",
      source: "Seizure Memo dated Oct 2",
      timestamp: "02:15 AM",
      reliability: "Challenged Procedure"
    },
    {
      id: "fact-05",
      tag: "allegation",
      title: "Conscious Possession of Firearm",
      description: "Prosecution alleges accused was transporting an unlicensed country-made pistol with 4 live cartridges.",
      source: "FIR No. 312/2025",
      timestamp: "02:40 AM",
      reliability: "Contested"
    }
  ],
  allegations: [
    {
      party: "Prosecution Stance",
      color: "rose",
      text: "Unlicensed firearm recovered from vehicle trunk under accused's active physical control. Possession is non-bailable under Arms Act Section 25."
    },
    {
      party: "Defense Counter",
      color: "indigo",
      text: "Warrantless search violates BNSS Section 47. Vehicle is a fleet rental; zero fingerprint or forensic link between accused and weapon."
    }
  ],
  evidence: [
    {
      title: "Country-made .32 Pistol Recovery Memo",
      description: "Recovered from spare wheel compartment. Signed only by police officers.",
      admissibility: "Challenged (BNSS 47 violation)"
    },
    {
      title: "Commercial Car Rental Agreement",
      description: "Confirms vehicle was rented 4 hours prior by third-party company.",
      admissibility: "Admitted"
    },
    {
      title: "Petrol Pump CCTV Recording",
      description: "Shows police searching vehicle trunk while accused was made to stand 15 paces away.",
      admissibility: "Admitted (Certified BSA 63)"
    }
  ],
  timeline: [
    { time: "01:45 AM", event: "Vehicle stopped at Nelson Mandela Marg barricade." },
    { time: "01:55 AM", event: "Trunk forcibly searched without written grounds." },
    { time: "02:15 AM", event: "Weapon alleged to be recovered; seizure memo signed by police only." },
    { time: "03:30 AM", event: "Accused detained at Vasant Kunj Police Station." },
    { time: "Today", event: "Bail and search legality challenge before Sessions Court." }
  ],
  disruptive_variables: [
    {
      variable_id: "MUT-CHECKPOST-01",
      type: "established",
      title: "Forensic Fingerprint Report: Zero Latent Prints on Pistol",
      description: "CFSL FORENSIC REPORT: Central Forensic Science Laboratory certifies that no latent fingerprints of Kabir Shergill exist on the weapon, magazine, or cartridges.",
      impact: "Destroys prosecution presumption of conscious possession under Arms Act.",
      judge_prompt: "Counsel, CFSL has formally confirmed that your client's fingerprints are absent from the seized firearm! How does this clinical absence impact the prosecution's conscious possession charge?",
      opposing_counsel_rebuttal: "Your Honor, the weapon could have been handled with gloves or wiped! Mere absence of prints does not dissolve physical custody inside the trunk!"
    },
    {
      variable_id: "MUT-CHECKPOST-02",
      type: "established",
      title: "Body-cam Footage Shows Trunk Was Searched Without Accused Present",
      description: "CCTV VIDEO FOOTAGE: Body-cam and street surveillance show officers searched the trunk while accused was escorted to the police booth, breaking the mandatory contemporaneous presence rule.",
      impact: "Vitiates the integrity of the search under BNSS Section 47 and Supreme Court precedent.",
      judge_prompt: "Defense Advocate! The CCTV feed indicates the search occurred out of the accused's sight. Present your arguments on procedural invalidation!",
      opposing_counsel_rebuttal: "Safety of officers was paramount at midnight! The physical recovery remains factually unimpeachable!"
    }
  ]
};

export const CORPORATE_WHISTLEBLOWER_SCENARIO = {
  scenario_id: "SCN-2025-03",
  title: "The Corporate Whistleblower: Encrypted Leak",
  full_title: "The Corporate Whistleblower: Data Theft & Admissibility of Electronic Records",
  category: "Evidence Admissibility",
  role: "Defence Counsel",
  court: "Chief Metropolitan Magistrate Court",
  fir_number: "FIR No. 104/2025 - Cyber Cell Mandir Marg",
  difficulty: "Expert Litigator",
  statutes: ["BSA Sec 61", "BSA Sec 63", "BNS Sec 316"],
  summary: "A senior financial auditor leaked internal offshore transaction logs exposing multi-crore embezzlement. The company filed criminal breach of trust and IT theft charges, relying on cloud database exports devoid of Section 63 BSA electronic hash certificates.",
  key_facts: [
    "Cloud database export submitted on external SSD without hash certification",
    "No Section 63 BSA certificate from server administrator",
    "Accused invoked whistleblower immunity under statutory framework",
    "Digital chain of custody broken during private internal audit"
  ],
  legal_issues: [
    "Mandatory requirement of Section 63 BSA certificate for electronic records",
    "Admissibility of third-party cloud data dumps",
    "Offence of Criminal Breach of Trust under BNS Section 316",
    "Whistleblower public interest defense"
  ],
  accused: {
    name: "Dr. Ananya Sen",
    age: 34,
    profile: "Chief Internal Auditor and Certified Fraud Examiner",
    background: "Doctorate in Forensic Accounting, clean record, whistleblower applicant"
  },
  complainant: {
    name: "Apex Global Infrastructure Ltd.",
    age: 52,
    profile: "Represented by Chief Security Officer"
  },
  facts: [
    {
      id: "fact-01",
      tag: "established",
      title: "Auditor Employment & Authorized Access",
      description: "Dr. Sen had authorized super-admin access to financial databases as part of statutory audit duties.",
      source: "Employment Agreement & Security Access Logs",
      timestamp: "Verified Record",
      reliability: "High"
    },
    {
      id: "fact-02",
      tag: "missing",
      title: "Section 63 BSA Electronic Certificate Missing",
      description: "Prosecution electronic evidence comprises raw CSV files on a thumb drive with zero Section 63 BSA integrity certificates.",
      source: "Cyber Cell Charge-sheet Inspection",
      timestamp: "Filing Date",
      reliability: "Fatal Evidentiary Defect"
    },
    {
      id: "fact-03",
      tag: "disputed",
      title: "Data Hash Discrepancy",
      description: "SHA-256 hash of the police seizure copy does not match the cloud snapshot timestamp, indicating post-seizure alteration.",
      source: "Independent Cyber Audit",
      timestamp: "Forensic Discovery",
      reliability: "Compromised Integrity"
    },
    {
      id: "fact-04",
      tag: "allegation",
      title: "Commercial Espionage Allegation",
      description: "Company alleges Dr. Sen intended to sell confidential customer data to overseas competitors under BNS 316.",
      source: "Corporate Complaint",
      timestamp: "August 12",
      reliability: "Contested"
    }
  ],
  allegations: [
    {
      party: "Prosecution Stance",
      color: "rose",
      text: "Massive proprietary database exfiltration constitutes criminal breach of trust under BNS 316. Electronic evidence on drive is prima facie authentic."
    },
    {
      party: "Defense Counter",
      color: "indigo",
      text: "Under BSA Section 63, electronic records are strictly inadmissible without certified system hash. Accused acted as bona fide whistleblower."
    }
  ],
  evidence: [
    {
      title: "External USB Drive Containing CSV Exports",
      description: "Lacks Section 63 BSA certificate. Hash values do not match server logs.",
      admissibility: "Challenged (Strictly Inadmissible)"
    },
    {
      title: "Internal Audit Discrepancy Memo",
      description: "Authored by Dr. Sen flagging $40M unrecorded offshore transactions.",
      admissibility: "Admitted"
    },
    {
      title: "Email Intimation to Board Audit Committee",
      description: "Shows accused alerted the board 3 weeks before police complaint.",
      admissibility: "Admitted"
    }
  ],
  timeline: [
    { time: "Month -1", event: "Dr. Sen uncovers multi-crore offshore diversion in internal ledger." },
    { time: "Day -14", event: "Formal whistleblowing memo submitted to Board Audit Committee." },
    { time: "Day -3", event: "Company files FIR alleging cyber theft; police seize personal laptop." },
    { time: "Today", event: "Admissibility hearing on electronic records before CMM Court." }
  ],
  disruptive_variables: [
    {
      variable_id: "MUT-WHISTLE-01",
      type: "established",
      title: "Cloud Provider Audit: Database Was Modified by Complainant IT Post-Seizure",
      description: "AWS AUDIT LOG: Cloud server log proves complainant's IT director accessed and altered the database records 48 hours after FIR registration.",
      impact: "Irretrievably destroys evidence integrity and implicates complainant in evidence tampering under BNS.",
      judge_prompt: "Counsel, the cloud provider's official access log shows internal alteration by the complainant after filing the FIR! How does this affect the admissibility threshold under Section 61 and 63 BSA?",
      opposing_counsel_rebuttal: "Routine server maintenance cannot be construed as tampering! The core files remain representative!"
    }
  ]
};

export const BUILTIN_SCENARIOS = [
  COLLEGE_FIGHT_SCENARIO,
  MIDNIGHT_CHECKPOST_SCENARIO,
  CORPORATE_WHISTLEBLOWER_SCENARIO
];

// ============================================================================
// CUSTOM SCENARIO SYNTHESIS ENGINE
// ============================================================================

export function synthesizeCustomScenario(data) {
  const id = data.id || `custom-${Date.now()}`;
  const title = data.title?.trim() || 'State v. Accused';
  const category = data.category || 'Bail Hearing';
  const court = data.court || 'Sessions Court, Delhi';
  const role = data.role || 'Defence Counsel';
  const firNumber = data.fir_number?.trim() || `FIR No. ${Math.floor(100 + Math.random() * 900)}/2025`;
  const summary = data.summary?.trim() || 'The accused has been detained in connection with an alleged criminal incident. Bail and procedural legality are under judicial review.';

  const accusedName = data.accused_name?.trim() || 'Rishi Malhotra';
  const accusedAge = data.accused_age || 24;
  const accusedProfile = data.accused_profile?.trim() || 'Resident with local roots, employed professional';
  const hasPriorAntecedents = Boolean(data.has_prior_antecedents);

  const complainantName = data.complainant_name?.trim() || 'Vikramaditya';
  const injuryDegree = data.injury_degree || 'Simple Hurt';

  // Procedural compliance flags (Yes/No)
  const hasSec38Memo = Boolean(data.has_sec38_memo);
  const hasSec48Relative = Boolean(data.has_sec48_relative);
  const hasSec53MedExam = Boolean(data.has_sec53_med_exam);
  const hasSec57Magistrate = Boolean(data.has_sec57_magistrate);

  // Evidence flags (Yes/No)
  const hasWeaponSeized = Boolean(data.has_weapon_seized);
  const hasIndependentWitnesses = Boolean(data.has_independent_witnesses);
  const hasCctv = Boolean(data.has_cctv);
  const hasBsa63Cert = Boolean(data.has_bsa63_cert);
  const hasMlcReport = Boolean(data.has_mlc_report);
  const evidenceNotes = data.evidence_notes?.trim() || '';

  // 1. Synthesize structural facts
  const facts = [];
  let factIndex = 1;

  facts.push({
    id: `fact-${factIndex++}`,
    tag: 'established',
    title: `Apprehension of Accused ${accusedName}`,
    description: `${accusedName} was apprehended by police officers in connection with ${category} and placed under custody.`,
    source: "Police Apprehension Report",
    timestamp: "Arrest Record",
    reliability: "High (Official)"
  });

  facts.push({
    id: `fact-${factIndex++}`,
    tag: 'established',
    title: hasPriorAntecedents ? 'Prior Police Record on File' : 'Zero Criminal Antecedents',
    description: hasPriorAntecedents
      ? `${accusedName} has prior inquiries noted in the police record.`
      : `${accusedName} has no previous criminal record, pending complaints, or past convictions. Clean antecedent verification confirmed.`,
    source: "Police Background Verification",
    timestamp: "Official Verification",
    reliability: "High"
  });

  if (hasMlcReport) {
    facts.push({
      id: `fact-${factIndex++}`,
      tag: 'established',
      title: `Medico-Legal Certificate (${injuryDegree})`,
      description: `Hospital MLC confirms complainant ${complainantName} was examined, recording ${injuryDegree}.`,
      source: "Govt Hospital MLC Record",
      timestamp: "Hospital Admission",
      reliability: "High (Clinical Record)"
    });
  } else {
    facts.push({
      id: `fact-${factIndex++}`,
      tag: 'missing',
      title: 'Absence of Contemporaneous MLC Record',
      description: `No certified government medical officer report exists corroborating the alleged physical trauma contemporaneously.`,
      source: "Case File Gap Analysis",
      timestamp: "Pending Verification",
      reliability: "Critical Gap"
    });
  }

  if (hasSec38Memo) {
    facts.push({
      id: `fact-${factIndex++}`,
      tag: 'established',
      title: 'BNSS Section 38 Written Grounds Furnished',
      description: 'Police furnished contemporaneous written notice specifying grounds of arrest.',
      source: "Case Diary Entry",
      timestamp: "Post-Arrest",
      reliability: "High"
    });
  } else {
    facts.push({
      id: `fact-${factIndex++}`,
      tag: 'missing',
      title: 'Mandatory Section 38 Written Grounds Defect',
      description: 'Investigating Officer failed to serve contemporaneous written grounds of arrest to the accused or his family upon detention.',
      source: "Case Diary Inspection",
      timestamp: "Arrest Timestamp",
      reliability: "Statutory Defect"
    });
  }

  if (hasSec53MedExam) {
    facts.push({
      id: `fact-${factIndex++}`,
      tag: 'established',
      title: 'Mandatory Section 53 BNSS Medical Exam Completed',
      description: `Accused ${accusedName} was examined by a certified government medical officer promptly upon detention.`,
      source: "Govt Medical Officer Examination Record",
      timestamp: "Post-Arrest",
      reliability: "High (Official)"
    });
  } else {
    facts.push({
      id: `fact-${factIndex++}`,
      tag: 'missing',
      title: 'Absence of Section 53 Medical Examination',
      description: `Police omitted conducting the mandatory post-arrest medical examination of ${accusedName} under Section 53 BNSS.`,
      source: "Custody Audit",
      timestamp: "Custodial Period",
      reliability: "Statutory Defect"
    });
  }

  if (hasWeaponSeized) {
    if (hasIndependentWitnesses) {
      facts.push({
        id: `fact-${factIndex++}`,
        tag: 'established',
        title: 'Weapon Seized with Independent Panchas',
        description: 'Seizure memo witnessed and signed by two independent local residents under Section 47 BNSS.',
        source: "Panchnama Memo",
        timestamp: "Seizure Time",
        reliability: "High"
      });
    } else {
      facts.push({
        id: `fact-${factIndex++}`,
        tag: 'disputed',
        title: 'Defective Weapon Recovery (No Independent Panchas)',
        description: 'Weapon allegedly seized without associating two independent public witnesses as required under Section 47 BNSS.',
        source: "Challenged Seizure Memo",
        timestamp: "Recovery Hour",
        reliability: "Vitiated Procedural Seizure"
      });
    }
  }

  if (hasCctv) {
    if (hasBsa63Cert) {
      facts.push({
        id: `fact-${factIndex++}`,
        tag: 'established',
        title: 'CCTV Video with Section 63 BSA Certificate',
        description: 'Surveillance footage submitted with mandatory electronic hash certificate from custodian under Section 63 BSA.',
        source: "Digital Forensics Submission",
        timestamp: "Incident Window",
        reliability: "High (Certified Digital)"
      });
    } else {
      facts.push({
        id: `fact-${factIndex++}`,
        tag: 'disputed',
        title: 'Uncertified CCTV Footage (BSA Section 63 Missing)',
        description: 'Prosecution relies on digital video footage but omitted the mandatory certificate under Section 63 BSA.',
        source: "Defense Evidentiary Objection",
        timestamp: "Incident Window",
        reliability: "Inadmissible Electronic Evidence"
      });
    }
  }

  facts.push({
    id: `fact-${factIndex++}`,
    tag: 'allegation',
    title: `Prosecution Allegations Against ${accusedName}`,
    description: `Complainant ${complainantName} alleges ${accusedName} intentionally orchestrated the offence with deliberate malice.`,
    source: "FIR Statement",
    timestamp: "FIR Registration",
    reliability: "Contested"
  });

  facts.push({
    id: `fact-${factIndex++}`,
    tag: 'disputed',
    title: 'Defense Plea of False Implication & Procedural Violation',
    description: `Defense asserts ${accusedName} is innocent, was falsely implicated, and statutory rights were breached by police.`,
    source: "Bail Petition Submission",
    timestamp: "Present Application",
    reliability: "Under Review"
  });

  if (evidenceNotes) {
    facts.push({
      id: `fact-${factIndex++}`,
      tag: 'disputed',
      title: 'Specific Evidentiary Annotation',
      description: evidenceNotes,
      source: "Counsel Dossier Notes",
      timestamp: "Brief",
      reliability: "Contested"
    });
  }

  // 2. Key facts bullets
  const key_facts = [
    `Accused: ${accusedName} (${accusedAge} yrs) - ${hasPriorAntecedents ? 'Prior record on file' : 'Zero prior criminal antecedents'}`,
    hasSec38Memo ? "Section 38 grounds notice recorded" : "Section 38 grounds notice NOT furnished (Statutory Defect)",
    hasWeaponSeized ? (hasIndependentWitnesses ? "Weapon seized with panchas" : "Weapon seizure lacks independent panchas (BNSS 47)") : "No weapon seized from accused",
    hasCctv ? (hasBsa63Cert ? "CCTV footage with Section 63 BSA certificate" : "CCTV footage lacks Section 63 BSA certificate") : "No CCTV video on record"
  ];

  // 3. Legal issues
  const legal_issues = [
    "Bail eligibility & liberty guarantees",
    hasSec38Memo ? "Necessity of continued custodial interrogation" : "Violation of BNSS Section 38 mandatory arrest notice",
    hasWeaponSeized && !hasIndependentWitnesses ? "Illegality of warrantless seizure without independent panchas (BNSS 47)" : "Chain of custody and recovery proof",
    hasCctv && !hasBsa63Cert ? "Inadmissibility of uncertified digital evidence (BSA 63)" : "Corroboration standards under BSA"
  ];

  // 4. Allegations
  const allegations = [
    {
      party: "Prosecution Stance",
      color: "rose",
      text: `The prosecution submits that ${accusedName} committed the offence willfully and poses a risk of witness intimidation. Continued custody is imperative.`
    },
    {
      party: "Defense Counter",
      color: "indigo",
      text: `The defense submits that ${accusedName} has deep roots in society and zero flight risk. Investigating agencies breached statutory protections, warranting immediate release.`
    }
  ];

  // 5. Evidence
  const evidence = [];
  if (hasMlcReport) {
    evidence.push({
      title: `Hospital MLC Record (${injuryDegree})`,
      description: `Formal clinical evaluation of complainant ${complainantName}.`,
      admissibility: "Admitted"
    });
  }
  if (hasWeaponSeized) {
    evidence.push({
      title: "Offensive Weapon Seizure Memo",
      description: hasIndependentWitnesses ? "Seized with 2 independent local panchas." : "Seized without independent panchas (vitiates search legality under BNSS 47).",
      admissibility: hasIndependentWitnesses ? "Admitted" : "Challenged"
    });
  }
  if (hasCctv) {
    evidence.push({
      title: "CCTV Surveillance Recording",
      description: hasBsa63Cert ? "Submitted with valid BSA Section 63 electronic authenticity certificate." : "Certificate under Section 63 BSA missing. Strictly inadmissible under Indian evidence law.",
      admissibility: hasBsa63Cert ? "Admitted" : "Challenged"
    });
  }
  evidence.push({
    title: "Police Case Diary & Antecedents Memo",
    description: `${hasPriorAntecedents ? 'Prior inquiry notations included.' : 'Confirms zero prior convictions.'} ${hasSec48Relative ? 'Relative intimation noted.' : 'Notice to kin absent.'}`,
    admissibility: "Admitted"
  });

  // 6. Timeline
  const timeline = [
    { time: "Incident Hour", event: `Alleged incident involving ${complainantName} reported to police.` },
    { time: "Arrest Hour", event: `Police detain ${accusedName}. ${hasSec38Memo ? 'Written Section 38 notice given.' : 'No Section 38 notice served.'}` },
    { time: "Day 1", event: hasSec57Magistrate ? "Produced before Judicial Magistrate within 24 hours." : "Delayed production past 24-hour statutory deadline under BNSS 57." },
    { time: "Today", event: `${category} convenes before ${court}.` }
  ];

  // 7. Disruptive Variables for "Change One Fact"
  const disruptive_variables = [
    {
      variable_id: `MUT-${id}-01`,
      type: "disputed",
      title: hasCctv
        ? "Surprise CCTV Angle: Accused Was Defending, Not Initiating"
        : "Surprise Eyewitness: Neutral Merchant Establishes Alibi",
      description: hasCctv
        ? "NEW SURVEILLANCE RETRIEVED: High-resolution footage from an adjacent camera establishes the complainant initiated physical aggression."
        : "NEW ALIBI TESTIMONY: An independent merchant testifies on oath that the accused was inside his establishment during the incident timestamp.",
      impact: "Destroys prosecution narrative of unprovoked aggression and establishes decisive defensive alibi.",
      judge_prompt: "Counsel, a new eyewitness statement has just been tendered placing your client in a non-aggressive posture! How does this alter your submissions on custodial necessity?",
      opposing_counsel_rebuttal: "Objection, Your Honor! This surprise statement has not been vetted by the IO. Pre-trial credibility cannot be assessed without trial examination!"
    },
    {
      variable_id: `MUT-${id}-02`,
      type: "established",
      title: !hasSec38Memo
        ? "IO Admits On Record: No Written Grounds of Arrest Furnished"
        : "Forensic Discrepancy: Seizure Memo Backdated Post-Facto",
      description: !hasSec38Memo
        ? "PROCEDURAL DEFAULT CONCESSION: Investigating Officer concedes under judicial questioning that Section 38 BNSS written grounds notice was never delivered."
        : "FORENSIC DISCREPANCY: Document examination reveals the seizure memo was backdated at the police station hours after detention.",
      impact: "Conclusively establishes procedural illegality under BNSS Section 38/47, requiring judicial intervention.",
      judge_prompt: "Defense Advocate! The record reveals a statutory procedural violation during arrest. Address the Bench on why continued detention does not infringe constitutional liberty!",
      opposing_counsel_rebuttal: "The omission was an inadvertent clerical oversight! The gravity of the underlying allegation remains paramount, Your Honor!"
    }
  ];

  // Dynamically compile verified statutes tailored to this custom scenario
  const customStatutes = [];
  if (category === 'Bail Hearing') {
    customStatutes.push('BNSS Sec 480', 'BNSS Sec 483');
  } else if (category === 'Anticipatory Bail') {
    customStatutes.push('BNSS Sec 484');
  } else if (category === 'Remand Hearing') {
    customStatutes.push('BNSS Sec 187');
  } else if (category === 'Search Legality') {
    customStatutes.push('BNSS Sec 47', 'BNSS Sec 185');
  }

  if (!hasSec38Memo) customStatutes.push('BNSS Sec 38');
  if (!hasSec48Relative) customStatutes.push('BNSS Sec 48');
  if (!hasSec53MedExam) customStatutes.push('BNSS Sec 53');
  if (!hasSec57Magistrate) customStatutes.push('BNSS Sec 57');

  if (injuryDegree === 'Simple Hurt') {
    customStatutes.push('BNS Sec 115(2)', 'BNS Sec 126(2)');
  } else if (injuryDegree === 'Grievous Fracture') {
    customStatutes.push('BNS Sec 117', 'BNS Sec 115(2)', 'BNS Sec 126(2)');
  } else if (injuryDegree === 'Severe Trauma') {
    customStatutes.push('BNS Sec 117', 'BNS Sec 118', 'BNS Sec 109');
  } else {
    customStatutes.push('BNS Sec 351(2)', 'BNS Sec 126(2)');
  }

  if (hasWeaponSeized) {
    customStatutes.push('BNS Sec 118', 'Arms Act Sec 25');
    if (!hasIndependentWitnesses) customStatutes.push('BNSS Sec 47');
  }

  if (hasCctv) {
    customStatutes.push('BSA Sec 63', 'BSA Sec 61');
  }
  customStatutes.push('BSA Sec 23');

  return {
    scenario_id: id,
    title,
    full_title: `${title}: ${category}`,
    category,
    court,
    role,
    fir_number: firNumber,
    statutes: Array.from(new Set(customStatutes)),
    summary,
    key_facts,
    legal_issues,
    accused: {
      name: accusedName,
      age: accusedAge,
      profile: accusedProfile,
      background: hasPriorAntecedents ? 'Prior record on file' : 'Zero prior criminal antecedents'
    },
    complainant: {
      name: complainantName,
      age: 28,
      profile: `Complainant alleging ${injuryDegree}`
    },
    facts,
    allegations,
    evidence,
    timeline,
    disruptive_variables,
    is_custom: true,
    created_at: new Date().toISOString()
  };
}

// ============================================================================
// LOCAL STORAGE PERSISTENCE HELPERS
// ============================================================================

const STORAGE_KEY = 'the_verdict_custom_scenarios';

export function getCustomScenarios() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load custom scenarios', e);
    return [];
  }
}

export function saveCustomScenario(scenario) {
  try {
    const existing = getCustomScenarios();
    const updated = [scenario, ...existing.filter((s) => s.scenario_id !== scenario.scenario_id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save custom scenario', e);
    return [];
  }
}

export function deleteCustomScenario(scenarioId) {
  try {
    const existing = getCustomScenarios();
    const updated = existing.filter((s) => s.scenario_id !== scenarioId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to delete custom scenario', e);
    return [];
  }
}

export function clearAllCustomScenarios() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  } catch (e) {
    console.error('Failed to clear custom scenarios', e);
    return [];
  }
}

export function getScenarioById(id) {
  if (!id) return COLLEGE_FIGHT_SCENARIO;
  if (id === COLLEGE_FIGHT_SCENARIO.scenario_id) return COLLEGE_FIGHT_SCENARIO;
  if (id === MIDNIGHT_CHECKPOST_SCENARIO.scenario_id) return MIDNIGHT_CHECKPOST_SCENARIO;
  if (id === CORPORATE_WHISTLEBLOWER_SCENARIO.scenario_id) return CORPORATE_WHISTLEBLOWER_SCENARIO;

  const customList = getCustomScenarios();
  const found = customList.find((s) => s.scenario_id === id);
  return found || COLLEGE_FIGHT_SCENARIO;
}

