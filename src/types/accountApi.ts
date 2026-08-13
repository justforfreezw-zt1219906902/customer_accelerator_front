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
