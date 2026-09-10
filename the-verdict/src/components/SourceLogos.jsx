import React from 'react';

/**
 * High-fidelity authentic vector logos for trusted legal research platforms in India.
 */

export function SccOnlineLogo({ className = "w-11 h-11" }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="18" fill="#002B5C" />
      {/* Golden accent border */}
      <rect x="1.5" y="1.5" width="97" height="97" rx="16.5" stroke="#DFB15B" strokeOpacity="0.4" strokeWidth="3" />
      {/* SCC Text in classic serif */}
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#FFFFFF"
        fontFamily="'Georgia', 'Times New Roman', serif"
        fontWeight="900"
        fontSize="30"
        letterSpacing="-1"
      >
        SCC
      </text>
      {/* Golden bar */}
      <rect x="20" y="66" width="60" height="3" rx="1.5" fill="#F5A623" />
      {/* ONLINE tag */}
      <text
        x="50"
        y="78"
        textAnchor="middle"
        fill="#F5A623"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontWeight="800"
        fontSize="9"
        letterSpacing="2.5"
      >
        ONLINE
      </text>
    </svg>
  );
}

export function ManupatraLogo({ className = "w-11 h-11" }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="18" fill="#0A1E3F" />
      <rect x="1.5" y="1.5" width="97" height="97" rx="16.5" stroke="#DFB15B" strokeOpacity="0.3" strokeWidth="3" />
      {/* Manupatra orange orbiting swoosh */}
      <path
        d="M22 62C22 38 42 22 66 24C72 24.5 76 27 76 27C76 27 71 29 65 29C46 29 32 41 30 58C29 64 25 67 22 62Z"
        fill="#FF6A00"
      />
      {/* Manupatra distinctive 'm' */}
      <path
        d="M32 72V44H38V48.5C40 45.2 44.5 43.5 49 43.5C53.5 43.5 56.5 45.5 58 49C60.5 45.5 64.5 43.5 69.5 43.5C77 43.5 80 48 80 56V72H74V57C74 51.5 72 48.5 67.5 48.5C63 48.5 60.5 52 60.5 57.5V72H54.5V57C54.5 51.5 52.5 48.5 48 48.5C43.5 48.5 41 52 41 57.5V72H32Z"
        fill="#FFFFFF"
      />
      {/* Golden dot */}
      <circle cx="75" cy="30" r="4" fill="#FF8C00" />
    </svg>
  );
}

export function IndianKanoonLogo({ className = "w-11 h-11" }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="18" fill="#5C1315" />
      <rect x="1.5" y="1.5" width="97" height="97" rx="16.5" stroke="#E28743" strokeOpacity="0.5" strokeWidth="3" />
      {/* Circular Ashoka Chakra / Legal Scales Medallion */}
      <circle cx="50" cy="46" r="28" stroke="#E28743" strokeWidth="2.5" strokeDasharray="3 3" />
      <circle cx="50" cy="46" r="22" stroke="#FFF" strokeWidth="1.5" />
      
      {/* Central Scales of Justice */}
      <path d="M50 30V60M36 40L50 35L64 40" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
      <path d="M33 46C33 50 39 50 39 46H33ZM61 46C61 50 67 50 67 46H61Z" fill="#E28743" stroke="#FFF" strokeWidth="1" />
      <line x1="36" y1="40" x2="33" y2="46" stroke="#FFF" strokeWidth="1" />
      <line x1="36" y1="40" x2="39" y2="46" stroke="#FFF" strokeWidth="1" />
      <line x1="64" y1="40" x2="61" y2="46" stroke="#FFF" strokeWidth="1" />
      <line x1="64" y1="40" x2="67" y2="46" stroke="#FFF" strokeWidth="1" />
      <path d="M44 60H56" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Brand Text */}
      <text
        x="50"
        y="83"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="'Georgia', serif"
        fontWeight="bold"
        fontSize="9.5"
        letterSpacing="0.8"
      >
        INDIAN KANOON
      </text>
    </svg>
  );
}

export function LiveLawLogo({ className = "w-11 h-11" }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* LiveLaw Signature Vivid Red Background */}
      <rect width="100" height="100" rx="18" fill="#D32F2F" />
      <rect x="1.5" y="1.5" width="97" height="97" rx="16.5" stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="2" />
      {/* Bold white stacked logo */}
      <text
        x="50"
        y="42"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#FFFFFF"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Impact', 'Arial Black', sans-serif"
        fontWeight="900"
        fontSize="24"
        letterSpacing="1"
      >
        LIVE
      </text>
      <text
        x="50"
        y="68"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#FFFFFF"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Impact', 'Arial Black', sans-serif"
        fontWeight="900"
        fontSize="24"
        letterSpacing="1"
      >
        LAW
      </text>
      {/* Yellow / Golden dot */}
      <circle cx="82" cy="68" r="4.5" fill="#FFEB3B" />
    </svg>
  );
}

export function IndiaCodeLogo({ className = "w-11 h-11" }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="18" fill="#0C1B2E" />
      <rect x="1.5" y="1.5" width="97" height="97" rx="16.5" stroke="#DFB15B" strokeOpacity="0.5" strokeWidth="3" />
      
      {/* Lion Capital of Ashoka Stylized Representation in Gold */}
      <path
        d="M50 20C42 20 40 25 40 28C40 33 44 35 44 38C44 41 42 43 40 45C40 48 44 50 47 50H53C56 50 60 48 60 45C58 43 56 41 56 38C56 35 60 33 60 28C60 25 58 20 50 20Z"
        fill="#DFB15B"
      />
      <circle cx="50" cy="27" r="3" fill="#0C1B2E" />
      
      {/* Ashoka Abacus Base with Wheel */}
      <rect x="36" y="52" width="28" height="5" rx="1" fill="#DFB15B" />
      <circle cx="50" cy="54.5" r="2.5" fill="#0C1B2E" />
      <path d="M42 59L50 56L58 59V63H42V59Z" fill="#DFB15B" />

      {/* Official Typography */}
      <text
        x="50"
        y="75"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontWeight="800"
        fontSize="11"
        letterSpacing="1"
      >
        INDIA CODE
      </text>
      <text
        x="50"
        y="86"
        textAnchor="middle"
        fill="#DFB15B"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontWeight="600"
        fontSize="7"
        letterSpacing="1.2"
      >
        GOVT. OF INDIA
      </text>
    </svg>
  );
}

export function BarAndBenchLogo({ className = "w-11 h-11" }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="18" fill="#111111" />
      <rect x="1.5" y="1.5" width="97" height="97" rx="16.5" stroke="#DFB15B" strokeOpacity="0.4" strokeWidth="3" />
      {/* Iconic B&B Monogram */}
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#DFB15B"
        fontFamily="'Georgia', serif"
        fontWeight="bold"
        fontSize="28"
      >
        B&B
      </text>
      <text
        x="50"
        y="78"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="-apple-system, BlinkMacSystemFont, sans-serif"
        fontWeight="700"
        fontSize="8"
        letterSpacing="1"
      >
        BAR & BENCH
      </text>
    </svg>
  );
}

export function getSourceLogoComponent(sourceId, className = "w-11 h-11") {
  switch (sourceId) {
    case 'scc-online':
      return <SccOnlineLogo className={className} />;
    case 'manupatra':
      return <ManupatraLogo className={className} />;
    case 'indian-kanoon':
      return <IndianKanoonLogo className={className} />;
    case 'livelaw':
      return <LiveLawLogo className={className} />;
    case 'india-code':
      return <IndiaCodeLogo className={className} />;
    default:
      return <BarAndBenchLogo className={className} />;
  }
}
