import type {
  ProductBadgeType,
  ProductCardVariant,
  ProductHeadingLevel,
} from '../product';

export type SectionHeadingLevel = 1 | 2;

export interface SectionIntro {
  eyebrow?: string;
  title: string;
  description?: string;
  headingLevel?: SectionHeadingLevel;
}

export interface SectionAction {
  label: string;
  href?: string;
}

export interface ProblemItem {
  title: string;
  description?: string;
  variant?: ProductCardVariant | 'severe';
}

export interface SolutionItem {
  title: string;
  description: string;
  badgeLabel: string;
  badgeType?: ProductBadgeType;
  variant?: ProductCardVariant;
}

export interface FeatureItem {
  title: string;
  description: string;
  kicker?: string;
  badgeLabel?: string;
  variant?: 'default' | 'with-icon' | 'highlighted';
}

export interface ProcessStep {
  step: string | number;
  title: string;
  description: string;
  variant?: 'default' | 'active' | 'completed';
}

export interface PreviewInsight {
  title: string;
  badgeLabel: string;
  insight?: string;
  confidence?: number | null;
  badgeType?: ProductBadgeType;
  emptyText?: string;
  variant?: 'default' | 'high-fit' | 'medium-fit';
}

export interface PackageOption {
  name: string;
  price?: string;
  priceQualifier?: string;
  description: string;
  features: string[];
  badgeLabel?: string;
  action?: SectionAction;
  highlighted?: boolean;
}

export interface TrustMetricItem {
  value: string;
  label: string;
  explanation: string;
  variant?: 'default' | 'emphasized';
}

export interface TeamMember {
  initials: string;
  name: string;
  role: string;
  description: string;
  highlighted?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export type CardHeadingLevel = ProductHeadingLevel;
