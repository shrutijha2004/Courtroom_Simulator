import { VERIFIED_CASES } from '../data/legalData.js';

/**
 * Normalizes text for case comparison (lowercase, trims, removes punctuation variations)
 */
function normalizeCaseName(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/\b(versus|vs\.|vs|v\.)\b/g, 'v')
    .replace(/[^a-z0-9\s]/g, '')
    .trim();
}

// Pre-compute normalized verified names and aliases
const VERIFIED_TARGETS = VERIFIED_CASES.map((c) => {
  return {
    raw: c,
    normalizedFullName: normalizeCaseName(c.case_name),
    shortName: normalizeCaseName(c.case_name.split(' v')[0]),
    citation: c.citation.toLowerCase()
  };
});

/**
 * Check if a detected case name corresponds to an explicitly verified case in VERIFIED_CASES
 * @param {string} detectedCase 
 * @returns {object|null} verified case or null
 */
export function findVerifiedCase(detectedCase) {
  const norm = normalizeCaseName(detectedCase);
  for (const item of VERIFIED_TARGETS) {
    if (
      norm === item.normalizedFullName ||
      norm.includes(item.normalizedFullName) ||
      item.normalizedFullName.includes(norm) ||
      (norm.length > 7 && item.shortName.length > 5 && (norm.includes(item.shortName) || item.shortName.includes(norm)))
    ) {
      return item.raw;
    }
  }
  return null;
}

/**
 * Removes common leading introductory legal prepositions from extracted case names
 */
function cleanCaseTitle(raw) {
  return raw.replace(/^(?:under|in|pursuant to|as held in|as per|see|refer to|cite|citing|the precedent of|the case of)\s+/i, '').trim();
}

/**
 * Regex to scan strings for legal citations and case names
 * Matches patterns like:
 * - "State of Maharashtra v. Vikram R. Deshmukh"
 * - "Smith v. State of Ohio"
 * - "Jones versus Union of India"
 */
const CASE_NAME_REGEX = /\b([A-Z][A-Za-z0-9.'\s]{1,40}?\s+(?:v\.|vs\.|v|versus)\s+[A-Z][A-Za-z0-9.'\s]{1,40}?)(?=\s*(?:\(\d{4}\)|[,;:\n]|$|\s+which|\s+that|\s+where|\s+for|\s+and|\s+is|\s+in|\s+under|\s+held|\s+holds|\s+rules|\s+entitles|\s+renders))/gi;

/**
 * Core Safeguard System Function
 * Scans strings for case names. If an AI or system output mentions a case NOT
 * explicitly present in VERIFIED_CASES, intercepts the string and replaces the
 * text block or injects the safeguard warning.
 * 
 * @param {string} text - Input text from system/AI/user
 * @returns {object} {
 *   originalText: string,
 *   text: string (safeguarded string with warnings),
 *   hasUnverified: boolean,
 *   unverifiedCitations: Array<string>,
 *   verifiedCitations: Array<object>,
 *   warningMessage: string|null
 * }
 */
export function verifyOutputCitation(text) {
  if (!text || typeof text !== 'string') {
    return {
      originalText: text || '',
      text: text || '',
      hasUnverified: false,
      unverifiedCitations: [],
      verifiedCitations: [],
      warningMessage: null
    };
  }

  const unverifiedCitations = [];
  const verifiedCitations = [];
  
  // Find all matches in text
  const modifiedText = text.replace(CASE_NAME_REGEX, (match) => {
    const cleanedCase = cleanCaseTitle(match);
    if (cleanedCase.length < 5) return match;

    const matchedVerified = findVerifiedCase(cleanedCase);

    if (matchedVerified) {
      if (!verifiedCitations.some((c) => c.case_id === matchedVerified.case_id)) {
        verifiedCitations.push(matchedVerified);
      }
      return `${match} [✓ Verified: ${matchedVerified.citation}]`;
    } else {
      unverifiedCitations.push(cleanedCase);
      // Intercept and replace with warning
      return `⚠️ Citation not verified by system safeguard (${cleanedCase})`;
    }
  });

  const hasUnverified = unverifiedCitations.length > 0;
  const warningMessage = hasUnverified
    ? `⚠️ Citation not verified by system safeguard.`
    : null;

  return {
    originalText: text,
    text: modifiedText,
    hasUnverified,
    unverifiedCitations,
    verifiedCitations,
    warningMessage
  };
}

/**
 * Quick helper to verify if a single citation string is authenticated
 */
export function isCitationVerified(citationName) {
  return findVerifiedCase(citationName) !== null;
}
