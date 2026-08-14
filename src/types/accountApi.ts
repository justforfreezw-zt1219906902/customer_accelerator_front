export interface AccountListDto {
  id: string;
  name: string;
  industry: string | null;
  hq: string | null;
  lifecycle: string;
  analysis: {
    icpScore: number;
    icpFit: string;
    signalScore: number;
    resonanceScore: number;
    tier: string;
    nextBestAction: string | null;
  } | null;
  activeSignalCount: number;
}
export interface AccountDetailDto {
  id: string;
  name: string;
  domain: string;
  webUrl: string;
  industry: string | null;
  hq: string | null;
  employees: number | null;
  revenue: { amountM: number | null; currency: string | null } | null;
  founded: number | null;
  description: string | null;
  lifecycle: string;
  analysis: {
    icpScore: number;
    icpFit: string;
    signalScore: number;
    resonanceScore: number;
    tier: string;
    whyThisAccount: string | null;
    whyNow: string | null;
    nextBestAction: {
      action: string;
      rationale: string | null;
      timeWindow: string | null;
      priority: string | null;
    } | null;
  } | null;
}
export interface AccountSignalDto {
  id: string;
  type: string;
  title: string;
  body: string | null;
  strength: string;
  relevance: string | null;
  signalDate: string | null;
  signalDateRaw: string | null;
  freshnessLabel: string | null;
  evidenceStatus: string;
  verified: boolean;
  isActive: boolean;
  scoreEligible: boolean;
  source: { name: string | null; type: string | null; url: string } | null;
}

export interface SignalPulseSignalDto {
  id: string;
  type: string;
  title: string;
  strength: 'high' | 'medium' | 'low';
  signalDate: string | null;
}
export interface SignalPulseAccountDto {
  accountId: string;
  name: string;
  industry: string | null;
  tier: string | null;
  urgency: 'hot' | 'warm' | 'cold';
  activeSignalCount: number;
  highActiveSignalCount: number;
  latestActiveSignalDate: string | null;
  nextBestAction: string | null;
  signals: SignalPulseSignalDto[];
}
export interface SignalPulseDto {
  metrics: { activeSignals: number; newThisWeek: number; hotAccounts: number; goingCold: number };
  accounts: SignalPulseAccountDto[];
}
export interface DnaPortfolioItemDto {
  accountId: string;
  name: string;
  industry: string | null;
  tier: string | null;
  activeSignalCount: number;
  tone: string | null;
  vocabulary: string[];
  problemFraming: string | null;
  proofStyle: string | null;
  ctaStyle: string | null;
  doRules: string[];
  dontRules: string[];
  signalTypes: string[];
}
export interface DnaPortfolioDto {
  summary: { totalProfiles: number; byTier: Record<string, number>; byIndustry: Record<string, number> };
  items: DnaPortfolioItemDto[];
}
export interface DnaCompareDto {
  selectedCount: number;
  dominantTone: Array<{ value: string; count: number }>;
  sharedVocabulary: Array<{ value: string; count: number }>;
  uniqueVocabulary: Array<{ value: string; count: number }>;
  proofStyles: Array<{ value: string; count: number }>;
  ctaStyles: Array<{ value: string; count: number }>;
  doRules: Array<{ value: string; count: number }>;
  dontRules: Array<{ value: string; count: number }>;
  signalTypes: Array<{ value: string; count: number }>;
  problemFraming: Array<{ accountId: string; accountName: string; value: string | null }>;
}
export type OutreachEmailPart = 'subject' | 'opening' | 'value' | 'cta';
export interface OutreachEmailGenerationRequest {
  persona: 'marketing' | 'sales' | 'exec';
  anchorSignalId: string;
  parts: OutreachEmailPart[];
  currentDraft: { subject: string; opening: string; value: string; cta: string };
}
export interface OutreachEmailGenerationResponse {
  generatedParts: Partial<Record<OutreachEmailPart, string>>;
  traceability: { anchorSignalId: string; supportingSignalIds: string[]; communicationDnaUsed: boolean; analysisUsed: boolean };
}
import type { DemoDataStatus } from '../demo/types';

export interface DnaSource {
  name: string | null;
  type: string | null;
  url: string | null;
}
export interface CommunicationDnaDto {
  id: string;
  accountId: string;
  tone: {
    primary: string | null;
    secondary: string | null;
    description: string | null;
    status: DemoDataStatus;
    sources: DnaSource[];
  };
  vocabulary: {
    status: DemoDataStatus;
    terms: {
      term: string;
      context: string | null;
      frequency: string | null;
      sources: DnaSource[];
    }[];
  };
  valuePropositions: { quote: string; status: DemoDataStatus; sources: DnaSource[] }[];
  problemFraming: {
    description: string | null;
    quote: string | null;
    status: DemoDataStatus;
    sources: DnaSource[];
  };
  proofStyle: {
    primary: string | null;
    secondary: string | null;
    description: string | null;
    status: DemoDataStatus;
    sources: DnaSource[];
  };
  ctaPatterns: {
    style: string | null;
    description: string | null;
    examples: string[];
    status: DemoDataStatus;
    sources: DnaSource[];
  };
  recurringPhrases: {
    quote: string;
    description: string | null;
    status: DemoDataStatus;
    sources: DnaSource[];
  }[];
  doRules: string[];
  dontRules: string[];
  buyingSignalSources: DnaSource[];
  createdAt: string;
}
