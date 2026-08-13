export type DemoAccountTier = 'Focus Accounts' | 'Tier 1' | 'Tier 2';
export type DemoLifecycle = 'Lead' | 'MQL' | 'SQL' | 'Opportunity' | 'Customer';
export type DemoSignalCategory =
  'Job Posting' | 'News & Events' | 'Company Data';
export type DemoEvidenceConfidence = 'SOURCE-BACKED' | 'INSUFFICIENT DATA';

export interface DemoEvidenceSource {
  label: string;
  url?: string;
  verified: boolean;
}

export interface DemoBuyingSignal {
  id: string;
  category: DemoSignalCategory;
  title: string;
  timing: string;
  confidence: DemoEvidenceConfidence;
  description: string;
  source: DemoEvidenceSource;
}

export interface DemoAccountOverview {
  employeeCount: string;
  revenue: string;
  summary: string;
  whyThisAccount: string;
  whyNow: string;
  nextBestAction: {
    action: string;
    rationale: string;
    window: string;
    priority: string;
  };
  buyingSignalTotal: number;
  buyingSignals: readonly DemoBuyingSignal[];
}

export type DemoDataStatus = 'SOURCE_BACKED' | 'DERIVED' | 'INSUFFICIENT_DATA';
export type DemoFrequency = 'HIGH' | 'MEDIUM' | 'LOW';

export interface DemoDnaSource {
  label: string;
  kind: string;
  url?: string;
}

export interface DemoDnaVocabularyItem {
  term: string;
  context: string;
  frequency: DemoFrequency;
  source: DemoDnaSource;
}

export interface DemoCommunicationDna {
  accountId: DemoAccountIdentity['id'];
  tone: {
    primary: string;
    secondary: string;
    description: string;
    status: DemoDataStatus;
    sources: readonly DemoDnaSource[];
  };
  vocabulary: readonly DemoDnaVocabularyItem[];
  valueProposition: {
    quote: string;
    status: DemoDataStatus;
    sources: readonly DemoDnaSource[];
  };
  problemFraming: {
    description: string;
    quote: string;
    status: DemoDataStatus;
    sources: readonly DemoDnaSource[];
  };
  proofStyle: {
    primary: string;
    secondary: string;
    description: string;
    status: DemoDataStatus;
    sources: readonly DemoDnaSource[];
  };
  ctaPatterns: {
    style: string;
    description: string;
    examples: readonly string[];
    status: DemoDataStatus;
    sources: readonly DemoDnaSource[];
  };
  recurringPhrases: {
    description: string;
    quote: string;
    status: DemoDataStatus;
    sources: readonly DemoDnaSource[];
  };
  mirroring: { do: readonly string[]; dont: readonly string[] };
  buyingSignalSources: readonly DemoDnaSource[];
}

export type DemoSignalStrength = 'urgent' | 'high' | 'medium' | 'low';
export type DemoPulsePersona =
  'Overview' | 'Prioritize' | 'Outreach' | 'Content' | 'Strategy';

export interface DemoPulseSignal {
  id: string;
  title: string;
  date: string;
  strength: DemoSignalStrength;
  type: string;
}

export interface DemoPulseAccount {
  key: string;
  accountId?: DemoAccountIdentity['id'];
  name: string;
  initials: string;
  industry: string;
  tier: DemoAccountTier;
  routability: 'routable' | 'representative_non_routable_fixture';
  signals: readonly DemoPulseSignal[];
  nextBestAction: string;
}

export interface DemoMarketPattern {
  id: string;
  count: number;
  title: string;
  accounts: string;
  contentAngle: string;
}

export interface DemoSignalPulse {
  representativeMetrics: {
    activeSignals: 42;
    newThisWeek: 2;
    hotAccounts: 3;
    goingCold: 129;
    marketPatterns: 3;
  };
  patterns: readonly DemoMarketPattern[];
  accounts: readonly DemoPulseAccount[];
}

export interface DemoDnaPortfolioProfile {
  accountId: DemoAccountIdentity['id'];
  tone: string;
  vocabulary: readonly string[];
  problemFraming: string;
  proofStyle: string;
  ctaStyle: string;
  doRules: readonly string[];
  dontRules: readonly string[];
  signalTypes: readonly string[];
}

export interface DemoDnaPortfolio {
  representativeTierCounts: readonly { value: string; label: string }[];
  representativeIndustryCounts: readonly { value: string; label: string }[];
  profiles: readonly DemoDnaPortfolioProfile[];
}

export interface DemoAccountIdentity {
  id: `demo-acc-${string}`;
  initials: string;
  name: string;
  industry: string;
  location: string;
  tier: DemoAccountTier;
  icpFit: number;
  signalScore: number;
  resonance: number;
  activeSignals: number;
  signalPattern: readonly ('active' | 'inactive')[];
  nextBestAction: string;
  discoveryVisible: boolean;
  overview?: DemoAccountOverview;
}

export interface DemoAccountProvider {
  listAccounts(): readonly DemoAccountIdentity[];
  listDiscoveryAccounts(): readonly DemoAccountIdentity[];
  findAccountById(id: string): DemoAccountIdentity | undefined;
  findCommunicationDna(id: string): DemoCommunicationDna | undefined;
  getSignalPulse(): DemoSignalPulse;
  getDnaPortfolio(): DemoDnaPortfolio;
}
