// ============================================================================
// THE VERDICT: HIGH-PRECISION COURTROOM ADVOCACY & VERDICT ENGINE
// Designed for authentic legal proceedings under BNS, BNSS, and BSA
// ============================================================================

/**
 * Returns scenario-specific opening dialogue tailored to case type and facts.
 */
export function getInitialCourtroomDialogue(scenario) {
  const accusedName = scenario.accused?.name || 'the accused';
  const firNo = scenario.fir_number || 'FIR on record';
  const category = scenario.category || 'Bail Hearing';
  const courtName = scenario.court || 'Sessions Court, Delhi';
  const statutes = (scenario.statutes || []).join(', ') || 'invoked BNS provisions';

  let judgeGreeting = `In the matter of ${scenario.title} (${firNo}). `;
  let userOpening = '';
  let prosecutorOpposition = '';

  if (category.toLowerCase().includes('bail')) {
    judgeGreeting += `The Court is in session for consideration of the Bail Application filed on behalf of ${accusedName}. Counsel for the defence, you may open your submissions under BNSS.`;
    userOpening = `May it please the Court. My client ${accusedName} is entitled to regular bail under Section 480 BNSS. There are zero criminal antecedents, no flight risk, and glaring procedural lapses by the investigating agency.`;
    prosecutorOpposition = `With due respect, the prosecution strongly opposes bail. The offences charged under ${statutes} involve public order and violence. Custodial presence remains imperative for continuous investigation.`;
  } else if (category.toLowerCase().includes('search') || category.toLowerCase().includes('seizure')) {
    judgeGreeting += `The Court is hearing the defence challenge to the legality of warrantless search and recovery in ${firNo}. Counsel, present your statutory objections under BNSS Section 47.`;
    userOpening = `Your Honour, the search of the vehicle and alleged seizure of contraband was executed in flagrant disregard of Section 47 BNSS. No written grounds were recorded prior to entry, and independent panchas were deliberately bypassed.`;
    prosecutorOpposition = `The recovery was conducted during emergent night patrol under reasonable suspicion. Delay in search would have resulted in concealment or disposal of the weapon.`;
  } else if (category.toLowerCase().includes('evidence') || category.toLowerCase().includes('admissibility')) {
    judgeGreeting += `Matter placed for threshold scrutiny of evidence admissibility under the Bharatiya Sakshya Adhiniyam (BSA). Counsel for defence, what is your preliminary objection?`;
    userOpening = `Your Honour, the prosecution seeks to place reliance on electronic database exports without furnishing the mandatory hash certificate under Section 63 BSA. In the absence of primary verification, this data is legally inadmissible.`;
    prosecutorOpposition = `The electronic records are internal audit logs maintained in the ordinary course of business. Minor technical certificates can be supplied at the stage of framing charges.`;
  } else {
    judgeGreeting += `Counsel for the defence, the Bench is ready to hear your submissions in ${firNo}.`;
    userOpening = `May it please the Court. We submit that the arrest and detention of ${accusedName} cannot withstand judicial scrutiny due to procedural infirmities.`;
    prosecutorOpposition = `The prosecution submits that the charges on record are serious and investigation is underway.`;
  }

  return [
    {
      id: 'msg-01',
      sender: 'judge',
      senderName: "Hon'ble Presiding Judge",
      court: courtName,
      timestamp: '10:00 AM',
      text: judgeGreeting
    },
    {
      id: 'msg-02',
      sender: 'user',
      senderName: `You (${scenario.role || 'Defence Counsel'})`,
      timestamp: '10:02 AM',
      text: userOpening
    },
    {
      id: 'msg-03',
      sender: 'prosecutor',
      senderName: 'Special Public Prosecutor',
      timestamp: '10:04 AM',
      text: prosecutorOpposition
    }
  ];
}

/**
 * Intelligent judicial reasoning engine that handles ANY advocate argument.
 * Evaluates statutes, precedents, evidentiary challenges, procedural flaws, and factual pleas.
 */
export function evaluateAdvocateArgument({ argumentText, scenario, verifiedCheck }) {
  const lower = argumentText.toLowerCase();
  const accusedName = scenario.accused?.name || 'the accused';
  const compliance = scenario.procedural_compliance || {};

  // 1. Check if user is asking for the Final Verdict
  const isRequestingVerdict = lower.includes('verdict') ||
    lower.includes('pronounce') ||
    lower.includes('rest my case') ||
    lower.includes('rest my submission') ||
    lower.includes('pray for order') ||
    lower.includes('pass the order') ||
    lower.includes('pray for bail');

  // 2. Unverified Citation / Hallucination Safeguard
  if (verifiedCheck?.hasUnverified) {
    return {
      judgeText: `Counsel is strictly cautioned against citing unverified precedents or hallucinated authorities. In this Court, every cited precedent must be authenticated against the Supreme Court and High Court Law Reports. Please confine your submissions strictly to verified statutory codes and recognized authorities.`,
      prosecutorText: `The prosecution strongly objects! The defence is attempting to mislead the Court with phantom citations. We pray that no judicial reliance be placed on unsubstantiated assertions.`,
      isDefectHit: false,
      isRequestingVerdict
    };
  }

  // 3. BNSS Section 38: Written Grounds of Arrest
  if (lower.includes('38') || lower.includes('written ground') || lower.includes('grounds of arrest') || lower.includes('memo') || lower.includes('pankaj bansal') || lower.includes('prabir purkayastha')) {
    const hasMemo = compliance.writtenGroundsMemoProvided ?? (scenario.facts || []).some(f => f.tag === 'missing' && f.title.toLowerCase().includes('ground'));
    
    if (!hasMemo || (scenario.facts || []).some(f => f.tag === 'missing' && f.title.toLowerCase().includes('38'))) {
      return {
        judgeText: `The Court has examined the case diary in ${scenario.fir_number || 'the matter'}. Counsel's objection under Section 38 BNSS is completely substantiated. The record reveals that no contemporaneous written grounds of arrest were furnished to ${accusedName} at the time of apprehension. As authoritatively held by the Supreme Court in Pankaj Bansal v. Union of India and Prabir Purkayastha, non-furnishing of written grounds infringes fundamental liberty under Article 22(1), rendering subsequent custody illegal.`,
        prosecutorText: `Milord, the arresting officer orally communicated the accusations at the spot because the situation was tense and volatile. The non-preparation of contemporaneous written grounds was merely an administrative irregularity and cannot nullify the gravity of the offences!`,
        isDefectHit: true,
        defectTitle: 'Section 38 BNSS Statutory Non-Compliance (No Written Grounds)',
        isRequestingVerdict
      };
    } else {
      return {
        judgeText: `Counsel, the record indicates that a written arrest memo was served upon ${accusedName} and acknowledged with his signature. If you allege that the grounds stated are vague or non-specific, point out the exact deficiency in the memo.`,
        prosecutorText: `The arrest memo contains the exact particulars of time, place, and offences. Defence cannot claim prejudice under Section 38.`,
        isDefectHit: false,
        isRequestingVerdict
      };
    }
  }

  // 4. BNSS Section 47: Warrantless Search & Independent Panchas
  if (lower.includes('47') || lower.includes('pancha') || lower.includes('independent witness') || lower.includes('search') || lower.includes('seizure') || lower.includes('priya sharma') || lower.includes('karanvir')) {
    const hasPanchas = compliance.independentPanchasPresent ?? (scenario.facts || []).some(f => f.tag === 'missing' && f.title.toLowerCase().includes('pancha'));

    if (!hasPanchas || (scenario.facts || []).some(f => f.tag === 'missing' && f.title.toLowerCase().includes('47'))) {
      return {
        judgeText: `Section 47 BNSS mandates that warrantless searches of personal premises or vehicles must be contemporaneously recorded with grounds of belief and witnessed by at least two independent, respected inhabitants of the locality. Here, the panchnama contains only signatures of subordinate police constables. Without independent local attestation, the purported recovery cannot be prima facie relied upon to justify custodial remand.`,
        prosecutorText: `Your Honour, the search occurred late at night in a deserted area. The Investigating Officer made efforts to call local residents, but none consented to sign. Under settled jurisprudence, police witness testimony is admissible when corroborated by spot videography!`,
        isDefectHit: true,
        defectTitle: 'Section 47 BNSS Procedural Defect (No Independent Panchas)',
        isRequestingVerdict
      };
    } else {
      return {
        judgeText: `Counsel, the seizure memo on record lists two civilian witnesses who attested the recovery at the spot. What specific evidence do you possess to impeach their neutrality at this stage?`,
        prosecutorText: `Independent citizens have verified the panchnama. The defence's allegations of biased search are completely unfounded.`,
        isDefectHit: false,
        isRequestingVerdict
      };
    }
  }

  // 5. BSA Section 63: Electronic Record & Hash Certificate
  if (lower.includes('63') || lower.includes('61') || lower.includes('cctv') || lower.includes('electronic') || lower.includes('hash') || lower.includes('certificate') || lower.includes('digital') || lower.includes('anvar') || lower.includes('arjun panditrao')) {
    const hasCert = compliance.bsaCertificateAttached;

    if (!hasCert || (scenario.facts || []).some(f => f.tag === 'missing' && f.title.toLowerCase().includes('63'))) {
      return {
        judgeText: `The Court upholds Counsel's objection under Section 63 of the Bharatiya Sakshya Adhiniyam, 2023. Under the updated evidentiary codex, secondary electronic evidence—including CCTV exports and mobile extractions—is inadmissible as evidence without a contemporaneous Section 63 certificate affirming device identity and cryptographic hash integrity. The prosecution cannot seek remand on unverified digital extracts.`,
        prosecutorText: `Milord, the raw digital media is in safe custody and has been sent to the Central Forensic Science Laboratory (CFSL). The formal Section 63 certificate will be submitted along with the final charge-sheet!`,
        isDefectHit: true,
        defectTitle: 'Section 63 BSA Electronic Certification Defect',
        isRequestingVerdict
      };
    } else {
      return {
        judgeText: `The electronic audit trail is accompanied by a Section 63 certificate signed by the system custodian. Unless Counsel demonstrates concrete evidence of cryptographic hash discrepancy, the record is admissible prima facie.`,
        prosecutorText: `The digital media has been duly verified and certified by the forensic nodal officer.`,
        isDefectHit: false,
        isRequestingVerdict
      };
    }
  }

  // 6. BNSS Section 48: Intimation to Kin / Relatives
  if (lower.includes('48') || lower.includes('relative') || lower.includes('family') || lower.includes('friend') || lower.includes('intimat') || lower.includes('d.k. basu') || lower.includes('kin')) {
    const hasKin = compliance.kinIntimatedImmediately;

    if (!hasKin || (scenario.facts || []).some(f => f.tag === 'missing' && f.title.toLowerCase().includes('48'))) {
      return {
        judgeText: `Section 48 BNSS guarantees the non-negotiable right of an arrested person to have an identified friend, relative, or advocate informed of their arrest without delay. The case diary shows an unexplained delay exceeding eight hours before ${accusedName}'s family was contacted. Such institutional secrecy is in direct violation of the landmark guidelines in D.K. Basu v. State of West Bengal.`,
        prosecutorText: `The accused was provided telephone access immediately upon booking at the police station. The slight delay was due to network verification and resulted in no demonstrable prejudice.`,
        isDefectHit: true,
        defectTitle: 'Section 48 BNSS Kin Intimation Lapse',
        isRequestingVerdict
      };
    }
  }

  // 7. BNSS Section 57: 24-Hour Production Before Magistrate
  if (lower.includes('57') || lower.includes('24 hour') || lower.includes('twenty-four') || lower.includes('magistrate') || lower.includes('illegal custody') || lower.includes('article 22(2)')) {
    return {
      judgeText: `Section 57 BNSS enforces the constitutional command under Article 22(2) that no citizen may be detained in police custody beyond 24 hours without judicial sanction. Any unrecorded detention prior to formal production vitiates the remand request and entitles the accused to immediate enlargement on bail.`,
      prosecutorText: `Milord, the transit time between apprehension, medical examination, and production before this Court has been scrupulously documented in the General Diary. There is zero delay.`,
      isDefectHit: true,
      defectTitle: 'Section 57 BNSS 24-Hour Magistrate Production Mandate',
      isRequestingVerdict
    };
  }

  // 8. Clean Antecedents & Triple Test (Bail Discretion)
  if (lower.includes('antecedent') || lower.includes('first time') || lower.includes('clean') || lower.includes('flight') || lower.includes('tamper') || lower.includes('arnesh') || lower.includes('triple test') || lower.includes('satender')) {
    const hasPrior = scenario.accused?.background?.toLowerCase().includes('prior') || false;

    if (!hasPrior) {
      return {
        judgeText: `The Court takes judicial notice that ${accusedName} is a young citizen with zero criminal antecedents, deep academic/familial ties, and permanent domicile. In terms of Satender Kumar Antil v. CBI and Arnesh Kumar v. State of Bihar, bail is the rule and jail is the exception. The triple test—absence of flight risk, witness tampering, and risk of recurrence—is prima facie satisfied in favour of conditional bail.`,
        prosecutorText: `Even for an accused with no prior convictions, the severity of the public disorder and injuries caused demands judicial firmness. Should the Court grant bail, strict geographical restrictions and heavy sureties are imperative.`,
        isDefectHit: true,
        defectTitle: 'Clean Antecedents & Triple Test Satisfaction',
        isRequestingVerdict
      };
    } else {
      return {
        judgeText: `Counsel, the prosecution draws attention to past complaints on record against ${accusedName}. How does the defence ensure that the accused will not intimidate witnesses if enlarged on bail?`,
        prosecutorText: `The accused has demonstrated habitual non-cooperation. Pre-trial release will severely endanger prosecution witnesses.`,
        isDefectHit: false,
        isRequestingVerdict
      };
    }
  }

  // 9. Right of Private Defence / Factual Alibi / Medical Discrepancy
  if (lower.includes('private defence') || lower.includes('self defence') || lower.includes('alibi') || lower.includes('dorm') || lower.includes('library') || lower.includes('elsewhere') || lower.includes('medical') || lower.includes('injury') || lower.includes('provocation')) {
    return {
      judgeText: `The Bench has taken note of Counsel's factual submissions regarding the absence of offensive intent and the alleged defensive posture of ${accusedName}. While trial is the appropriate forum to conclusively determine private defence under BNS Sections 34-44, the nature of injuries in the Medico-Legal Case (MLC) report does not indicate premeditated violence justifying prolonged custodial interrogation.`,
      prosecutorText: `The defence cannot plead self-defence or alibi at the bail stage without entering the witness box! The complainant suffered identifiable trauma, and the weapon recovered establishes prima facie culpability.`,
      isDefectHit: true,
      defectTitle: 'Factual Defence & Non-Custodial Grounds',
      isRequestingVerdict
    };
  }

  // 10. Open-Ended / General Legal Argument (Lawyers can argue anything)
  return {
    judgeText: `Submissions of Counsel on behalf of ${accusedName} in ${scenario.title} have been heard and evaluated by the Bench. The Court is weighing the procedural regularity of the investigating agency against the severity of invoked provisions (${(scenario.statutes || []).join(', ') || 'BNS'}). Counsel, you may conclude your oral arguments or pray for the final verdict.`,
    prosecutorText: `The State submits that investigation is actively proceeding and statements under Section 180 BNSS are being collated. We oppose unconditional release.`,
    isDefectHit: false,
    isRequestingVerdict
  };
}

/**
 * Generates an authentic, authoritative High Court / Sessions Court Judicial Decree & Verdict.
 */
export function generateJudicialRuling(scenario, defectsIdentified = [], argumentHistory = []) {
  const accusedName = scenario.accused?.name || 'the accused';
  const firNo = scenario.fir_number || 'FIR No. 248/2025';
  const court = scenario.court || 'Court of the Sessions Judge, New Delhi';
  const hasDefects = defectsIdentified.length > 0;
  const statutes = (scenario.statutes || []).join(', ') || 'BNS Sections 115(2), 126(2) and BNSS Sections 38, 47';

  return {
    title: `IN THE COURT OF THE PRINCIPAL SESSIONS JUDGE: NEW DELHI`,
    court,
    firNo,
    coram: "Hon'ble Mr. Justice R.K. Kaushik, Sessions Judge",
    caseTitle: `State (NCT of Delhi) v. ${accusedName}`,
    hearingType: scenario.category || 'Bail Application under Section 480 BNSS, 2023',
    outcome: hasDefects ? 'BAIL GRANTED & CUSTODY VACATED' : 'CONDITIONAL REGULAR BAIL GRANTED',
    verdictType: 'favourable',
    dateOfOrder: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }),
    benchSummary: hasDefects
      ? `Having heard learned Defence Counsel and the learned Special Public Prosecutor, and upon examining the case diary, this Court finds that procedural safeguards under the Bharatiya Nagarik Suraksha Sanhita (BNSS) are mandatory constitutional prerequisites. The investigating agency committed grave procedural infractions (${defectsIdentified.join(', ')}). In view of the law laid down by the Supreme Court in Pankaj Bansal v. Union of India, Satender Kumar Antil v. CBI, and Arnesh Kumar v. State of Bihar, custodial detention is wholly unwarranted.`
      : `Considering that the accused ${accusedName} has clean antecedents, verified community roots, and has cooperated with initial inquiries, and noting that the trial is likely to take substantial time, this Court finds that the triple test is satisfied in favour of liberty under Section 480 BNSS.`,
    conditions: [
      `1. The applicant ${accusedName} shall be enlarged on regular bail upon executing a personal bond in the sum of ₹25,000/- with one solvent local surety of the like amount.`,
      `2. The applicant shall surrender his passport (if any) and shall not leave the National Capital Territory without prior permission of the Trial Court.`,
      `3. The applicant shall not directly or indirectly make any inducement, threat, or promise to any person acquainted with the facts of ${firNo}.`,
      `4. The applicant shall report to the Investigating Officer on the first Saturday of every calendar month until the charge-sheet is filed.`,
      `5. Copy of this Order be dispatched forthwith to the Superintendent, Central Jail, for immediate compliance.`
    ]
  };
}
