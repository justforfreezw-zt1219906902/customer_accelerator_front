import type { DemoAccountIdentity, DemoLifecycle } from './types';

export type ContentStudioPersona = 'marketing' | 'sales' | 'exec';
export type ContentStudioAsset =
  | 'LinkedIn Ad'
  | 'Landing Page'
  | 'Outreach Email'
  | 'LinkedIn Outreach'
  | 'Sales Talking Points';

export interface ContentStudioContext {
  accountId: DemoAccountIdentity['id'] | null;
  persona: ContentStudioPersona;
  anchorSignalId: string | null;
  asset: ContentStudioAsset;
  adType: 'Single Image Ad' | 'Document Ad' | 'Thought Leadership Ad';
}

export interface SalesTalkingPointsDraft {
  openingShift: string;
  thinkingMatch: string;
  angles: { value: string; proof: string; timing: string };
  objections: Array<{ objection: string; response: string }>;
  nextStep: string;
}

export const contentStudioPersonas = [
  { id: 'marketing' as const, label: 'Head of Marketing / CMO' },
  { id: 'sales' as const, label: 'Head of Sales / VP Sales' },
  { id: 'exec' as const, label: 'CEO / Founder' },
];

export const contentStudioAssets: readonly ContentStudioAsset[] = [
  'LinkedIn Ad',
  'Landing Page',
  'Outreach Email',
  'LinkedIn Outreach',
  'Sales Talking Points',
];

export const contentStudioAnchorSignals = [
  {
    id: 'oracle-fusion-release',
    label:
      'Product launch / major UI update: Oracle Fusion 26C Quarterly Release',
  },
  {
    id: 'hiring-field-marketing',
    label:
      'Hiring: Sr. Field Marketing Specialist – Government, Defense and Intelligence (Demand Gen/Webinar/Field Marketing)',
  },
] as const;

export const contentStudioLifecycle: Record<string, DemoLifecycle> = {
  'demo-acc-001': 'SQL',
  'demo-acc-002': 'MQL',
  'demo-acc-003': 'MQL',
  'demo-acc-004': 'Opportunity',
  'demo-acc-005': 'Lead',
  'demo-acc-006': 'SQL',
  'demo-acc-007': 'Lead',
};

export const defaultContentStudioContext = (
  accountId: ContentStudioContext['accountId'] = null,
): ContentStudioContext => ({
  accountId,
  persona: 'marketing',
  anchorSignalId: null,
  asset: 'LinkedIn Ad',
  adType: 'Single Image Ad',
});
