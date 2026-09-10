/**
 * The Verdict - Persistent Courtroom Database
 * Manages active case state, custom cases, hearing completion status, transcripts, and final verdicts.
 */

const STORAGE_KEYS = {
  ACTIVE_CASE_ID: 'the_verdict_active_case_id',
  ACTIVE_HEARING_STATUS: 'the_verdict_active_hearing_status',
  HEARING_HISTORY: 'the_verdict_hearing_history',
  CUSTOM_CASES: 'the_verdict_custom_scenarios'
};

/**
 * Get current active case ID, fallback to 'scn-01' (The College Fight)
 */
export function getActiveCaseId() {
  try {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_CASE_ID) || 'scn-01';
  } catch (e) {
    return 'scn-01';
  }
}

/**
 * Set active case ID
 */
export function setActiveCaseId(id) {
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_CASE_ID, id);
    window.dispatchEvent(new CustomEvent('the_verdict_case_change', { detail: { caseId: id } }));
  } catch (e) {
    console.error('Failed to set active case id', e);
  }
}

/**
 * Get active hearing status for the currently running or recently completed session
 */
export function getActiveHearingStatus() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_HEARING_STATUS);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

/**
 * Initialize or reset a hearing session as "In Progress"
 */
export function startOrResumeHearing(caseId) {
  try {
    setActiveCaseId(caseId);
    const currentStatus = getActiveHearingStatus();
    // If the hearing for this case was already completed, keep completed; otherwise mark as in-progress
    if (!currentStatus || currentStatus.caseId !== caseId) {
      const newStatus = {
        caseId,
        isCompleted: false,
        startedAt: new Date().toISOString(),
        completedAt: null,
        ruling: null,
        defectsRaised: []
      };
      localStorage.setItem(STORAGE_KEYS.ACTIVE_HEARING_STATUS, JSON.stringify(newStatus));
    }
  } catch (e) {
    console.error('Failed to start/resume hearing', e);
  }
}

/**
 * Mark active hearing as formally completed upon judicial decree delivery
 */
export function markHearingCompleted({ scenario, messages = [], verdict = null, score = 24, defectsRaised = [] }) {
  try {
    const sessionRecord = {
      sessionId: `session-${Date.now()}`,
      timestamp: new Date().toISOString(),
      scenarioId: scenario.scenario_id,
      caseTitle: scenario.title,
      firNumber: scenario.fir_number,
      court: scenario.court,
      verdictOutcome: verdict?.outcome || 'VERDICT DELIVERED',
      verdictSummary: verdict?.benchSummary || '',
      ruling: verdict,
      defectsRaised,
      score,
      messageCount: messages.length,
      transcript: messages
    };

    // Save to active hearing status
    const status = {
      caseId: scenario.scenario_id,
      isCompleted: true,
      completedAt: new Date().toISOString(),
      scenario,
      ruling: verdict,
      score,
      defectsRaised,
      messages
    };
    localStorage.setItem(STORAGE_KEYS.ACTIVE_HEARING_STATUS, JSON.stringify(status));

    // Save to hearing history
    const raw = localStorage.getItem(STORAGE_KEYS.HEARING_HISTORY);
    const history = raw ? JSON.parse(raw) : [];
    const updated = [sessionRecord, ...history.slice(0, 19)];
    localStorage.setItem(STORAGE_KEYS.HEARING_HISTORY, JSON.stringify(updated));

    window.dispatchEvent(new CustomEvent('the_verdict_hearing_completed', { detail: status }));
    return sessionRecord;
  } catch (e) {
    console.error('Failed to mark hearing completed', e);
    return null;
  }
}

/**
 * Save completed hearing session & final verdict (backward compatibility)
 */
export function saveHearingSession({ scenario, messages, verdict, score = 24, defectsRaised = [] }) {
  return markHearingCompleted({ scenario, messages, verdict, score, defectsRaised });
}

/**
 * Retrieve past hearing sessions
 */
export function getHearingHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HEARING_HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Delete a specific custom case from persistent storage
 */
export function clearCustomCase(id) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_CASES);
    const list = raw ? JSON.parse(raw) : [];
    const filtered = list.filter(item => item.scenario_id !== id && item.id !== id);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_CASES, JSON.stringify(filtered));
    window.dispatchEvent(new CustomEvent('the_verdict_custom_cases_change'));
    return filtered;
  } catch (e) {
    console.error('Failed to delete custom case', e);
    return [];
  }
}

/**
 * Clear all user-built custom cases
 */
export function clearAllCustomCases() {
  try {
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_CASES);
    window.dispatchEvent(new CustomEvent('the_verdict_custom_cases_change'));
    return [];
  } catch (e) {
    console.error('Failed to clear all custom cases', e);
    return [];
  }
}
