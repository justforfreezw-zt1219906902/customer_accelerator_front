import type {
  FAQItem,
  FeatureItem,
  PackageOption,
  PreviewInsight,
  ProblemItem,
  ProcessStep,
  SectionAction,
  SectionIntro,
  SolutionItem,
  TeamMember,
  TrustMetricItem,
} from '../../components/sections';

export interface LandingContentEn {
  hero: {
    intro: SectionIntro;
    primaryAction: SectionAction;
    secondaryAction: SectionAction;
    metrics: readonly { value: string; label: string }[];
    preview: {
      account: string;
      badge: string;
      insights: readonly { label: string; text: string; source?: string }[];
    };
  };
  problem: {
    intro: SectionIntro;
    quote: string;
    quoteAttribution: string;
    items: ProblemItem[];
  };
  solution: { intro: SectionIntro; items: SolutionItem[] };
  method: { intro: SectionIntro; steps: ProcessStep[] };
  principle: {
    intro: SectionIntro;
    label: string;
  };
  proof: { intro: SectionIntro; metrics: TrustMetricItem[] };
  benefits: { intro: SectionIntro; items: FeatureItem[] };
  packages: { intro: SectionIntro; packages: PackageOption[] };
  team: { intro: SectionIntro; members: TeamMember[] };
  faq: { intro: SectionIntro; items: FAQItem[] };
  finalCta: { intro: SectionIntro; action: SectionAction };
  previewInsights: PreviewInsight[];
}

const strategyAction = {
  label: 'STRATEGY DISCUSSION',
  href: '/contact',
} as const;

export const landingContentEn: LandingContentEn = {
  hero: {
    intro: {
      eyebrow: 'PREDICTABLE ENTERPRISE PIPELINE',
      title:
        'Stop hoping for enterprise deals. Build pipeline you can predict.',
      description:
        'mi-goTo tells you which target accounts to pursue, why now, and what to say — business intelligence, buying signals, and the account’s own language, combined per account. Every claim source-attributed. No guesswork, no generic AI copy.',
      headingLevel: 1,
    },
    primaryAction: strategyAction,
    secondaryAction: { label: 'SEE THE METHOD', href: '#method' },
    metrics: [
      { value: '3 hrs', label: 'to decode an enterprise account' },
      { value: '100%', label: 'of claims source-attributed' },
      { value: '1.3–8%', label: 'ad engagement in live campaigns' },
    ],
    preview: {
      account: 'Account Intelligence · Northstar Systems (sample)',
      badge: 'SOURCE-GROUNDED',
      insights: [
        {
          label: 'BUYING SIGNAL · SCORE 87',
          text: 'Hiring 12 enterprise AEs in DACH — expansion into your exact segment, now.',
          source: 'Careers page, crawled 07/2026',
        },
        {
          label: 'BUSINESS INTELLIGENCE',
          text: 'New COO since Q1. Annual report shifts stated priority to operational efficiency.',
          source: 'Annual report 2025, p.14 · Press release, 02/2026',
        },
        {
          label: 'COMMUNICATION DNA',
          text: 'Frames security as “resilience of operations”, never “threat prevention” — mirror this.',
          source: 'Product pages & CTO keynote, 03/2026',
        },
        {
          label: 'BUDGET CYCLE',
          text: 'INSUFFICIENT_DATA',
          source: 'No public source available — we say so instead of guessing.',
        },
      ],
    },
  },
  problem: {
    intro: {
      eyebrow: 'THE PROBLEM',
      title: 'Your pipeline runs on activity. Not on evidence.',
      description:
        'Your biggest revenue comes from enterprise customers — but which of those deals actually close this quarter is a guess. The team hits its activity numbers, the tools are in place, and still: big deals appear and disappear from the forecast, outreach goes unanswered, and nobody can say why a deal was won or lost.',
    },
    quote:
      '“We want to reach the big accounts. We know who uses our product — we don’t know who signs.”',
    quoteAttribution:
      '— what we hear from marketing and sales leads, again and again',
    items: [
      {
        title: 'Forecasts built on hope',
        description:
          'Enterprise deals slip quarter after quarter because nobody knows which accounts are actually ready to buy.',
      },
      {
        title: 'More outreach, fewer replies',
        description:
          'Activity metrics go up, pipeline doesn’t. The messaging runs on your assumptions — not on what the account cares about.',
        variant: 'severe',
      },
      {
        title: 'Enterprise platforms are overkill',
        description:
          '6sense-class tooling costs six figures and takes months to implement. You need results this quarter.',
      },
      {
        title: 'Agencies take the knowledge with them',
        description:
          'You’ve been burned before: expensive retainers, and the learnings leave when the contract ends.',
      },
    ],
  },
  solution: {
    intro: {
      eyebrow: 'THE SOLUTION',
      title:
        'Predictable pipeline is three answered questions: who, why now, and what to say',
      description:
        'Not another database. Not a generic AI copilot. Not an agency. mi-goTo answers all three per account — from public sources, with attribution — so your team spends its time on accounts that will actually close.',
    },
    items: [
      {
        badgeLabel: '01 · WHO',
        title: 'Business Intelligence',
        description:
          'Structured facts per account: strategy shifts, leadership changes, priorities, org context. A Knowledge Graph that tells you which accounts fit — and why they matter now.',
      },
      {
        badgeLabel: '02 · WHY NOW',
        badgeType: 'signal',
        title: 'Buying Signals',
        description:
          'Hiring waves, funding, category moves, expansion — identified, scored, and source-attributed. So outreach lands in the business moment when the account is actually listening.',
      },
      {
        badgeLabel: '03 · WHAT TO SAY',
        title: 'Communication DNA',
        description:
          'How the account talks: tone, vocabulary, problem framing, proof style, recurring phrases. Turned into emails, ads and pages that sound like the prospect wrote the brief.',
        variant: 'highlighted',
      },
    ],
  },
  method: {
    intro: {
      eyebrow: 'ACCOUNT RESONANCE METHOD™',
      title: 'Five steps from target list to predictable pipeline',
      description:
        'A repeatable operating rhythm — 10 to 20 campaigns per quarter instead of 1 to 3 per year. When account selection, timing and messaging follow a method instead of gut feeling, pipeline stops being a lottery.',
    },
    steps: [
      {
        step: '01',
        title: 'Fit',
        description:
          'Sharpen your ICP and score which accounts are actually worth pursuing.',
      },
      {
        step: '02',
        title: 'Signal',
        description:
          'Detect buying signals — hiring, funding, category moves — each with a source.',
      },
      {
        step: '03',
        title: 'Decode',
        description:
          'Extract the account’s Communication DNA from the open web.',
      },
      {
        step: '04',
        title: 'Mirror',
        description:
          'Generate emails, LinkedIn ads, landing pages and sales content in their language.',
        variant: 'active',
      },
      {
        step: '05',
        title: 'Activate',
        description:
          'Prioritized accounts, CRM-ready context, conversation angles your team uses immediately.',
      },
    ],
  },
  principle: {
    intro: {
      eyebrow: 'INSUFFICIENT_DATA',
      title: 'If we can’t source it, we say so.',
      description:
        'Every claim in every deliverable is attributed to a verifiable source — or explicitly marked as unavailable. No AI hallucination reaches your prospect. In a market full of confident-sounding generated copy, this is our non-negotiable.',
    },
    label: 'INSUFFICIENT_DATA',
  },
  proof: {
    intro: { eyebrow: 'PROOF', title: 'Validated on accounts you know' },
    metrics: [
      {
        value: '3 hours',
        label: 'Cisco account decoded',
        explanation:
          'Full Communication DNA and Knowledge Graph extracted for Cisco — work that takes a research team weeks.',
      },
      {
        value: '1.3–8%',
        label: 'Live engagement',
        explanation:
          'Video awareness engagement rates in a live Cisco TLA ad campaign built on decoded DNA.',
        variant: 'emphasized',
      },
      {
        value: '3 vendors',
        label: 'Distinct DNA',
        explanation:
          'CrowdStrike, SentinelOne and Secunet decoded side by side — clearly distinguishable DNA, proving the signal is real, not generic.',
      },
    ],
  },
  benefits: {
    intro: {
      eyebrow: 'HOW WE WORK',
      title: 'Like headcount. Not like an agency.',
      description:
        'We know why teams hesitate to bring in outside help. This engagement is designed around the four things our customers told us matter most.',
    },
    items: [
      {
        kicker: '✓',
        title: 'Knowledge stays with you',
        description:
          'Every engagement includes documented learnings and workflow transfer. When we leave, the capability doesn’t.',
      },
      {
        kicker: '✓',
        title: 'You keep full control',
        description:
          'Your accounts, your CRM, your voice. We deliver intelligence and assets — you decide what goes out.',
      },
      {
        kicker: '✓',
        title: 'Results in weeks, not quarters',
        description:
          'First decoded accounts and usable conversation angles within the first weeks. No six-month implementation.',
      },
      {
        kicker: '✓',
        title: 'Low complexity by design',
        description:
          'No new platform to learn, no seats to license. We plug into how your team already works.',
      },
    ],
  },
  packages: {
    intro: {
      eyebrow: 'PACKAGES',
      title: 'Choose the engagement that matches your growth motion',
      description:
        'Transparent monthly engagements — no fake SaaS pricing, no annual lock-in surprise. Every package starts with a strategy discussion.',
    },
    packages: [
      {
        name: 'Pilot',
        price: 'On request',
        description: 'A focused proof of value before a monthly engagement.',
        features: [
          '3 target accounts, fully decoded',
          'ICP & fit snapshot',
          'Buying-signal review',
          'Communication DNA preview',
          'Decision-ready readout',
        ],
        action: strategyAction,
      },
      {
        name: 'Entry',
        price: '€1,500',
        priceQualifier: '/ month',
        description: 'Focused start for teams clarifying where to aim first.',
        features: [
          '5 target accounts, fully decoded',
          'ICP & fit scoring',
          'Buying-signal monitoring',
          'Conversation angles per account',
        ],
        action: strategyAction,
      },
      {
        name: 'Growth',
        price: '€3,500',
        priceQualifier: '/ month',
        description: 'An operating rhythm for repeatable account-based growth.',
        features: [
          '25 target accounts, fully decoded',
          'Everything in Entry',
          'Asset generation: email, LinkedIn ads, landing pages',
          'Quarterly campaign cadence (10–20 campaigns)',
          'Knowledge transfer sessions',
        ],
        badgeLabel: 'RECOMMENDED',
        action: strategyAction,
        highlighted: true,
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        description: 'A tailored intelligence layer for mature GTM teams.',
        features: [
          'Custom account volume & tiers',
          'Everything in Growth',
          'CRM & data integration',
          'Dedicated intelligence cadence',
        ],
        action: strategyAction,
      },
    ],
  },
  team: {
    intro: {
      eyebrow: 'TEAM',
      title: 'The people behind the intelligence',
      description:
        'A small Berlin-based team — you work directly with the people doing the work, not an account manager.',
    },
    members: [
      {
        initials: 'MS',
        name: 'Miroslav Stanojevic',
        role: 'FOUNDER · STRATEGY',
        description:
          'ABM strategy and Communication DNA methodology. Your direct counterpart in every engagement.',
        highlighted: true,
      },
      {
        initials: 'WZ',
        name: 'Wei Zhao',
        role: 'CO-FOUNDER · DATA',
        description:
          'Backend and data science. Builds the Knowledge Graph that keeps every claim traceable.',
      },
      {
        initials: 'LL',
        name: 'Longfei Li',
        role: 'CO-FOUNDER · AI',
        description:
          'AI and Industry 4.0 engineering behind the Communication DNA Engine.',
      },
      {
        initials: 'BB',
        name: 'Bharghav BK',
        role: 'SALES',
        description:
          'Makes sure the method translates into your sales motion — MBA, FLAME University.',
      },
    ],
  },
  faq: {
    intro: { eyebrow: 'FAQ', title: 'Before you book a call' },
    items: [
      {
        question: 'What happens in a strategy discussion?',
        answer:
          '45 minutes. We look at your target market, pick 2–3 accounts you actually want to win, and show you what decoded intelligence for those accounts would look like. No slideware, no pressure — you leave with a clearer picture either way.',
      },
      {
        question: 'How is this different from Clay, Copy.ai or 6sense?',
        answer:
          'Data tools give you contacts and firmographics. Generic AI gives you fluent but unsourced copy. Enterprise ABM platforms give you six-figure contracts and months of implementation. mi-goTo is the layer between: source-grounded account understanding, translated into assets that mirror how each account communicates — delivered as a service, live in weeks.',
      },
      {
        question: 'How does this make our pipeline more predictable?',
        answer:
          'Unpredictability comes from guessing: which accounts, when, with what message. When accounts are scored on fit and live buying signals, and every campaign runs on evidence about what the account cares about, win patterns become repeatable — and your forecast starts reflecting reality instead of hope.',
      },
      {
        question: 'How fast do we see results?',
        answer:
          'Your first decoded accounts with usable conversation angles arrive within the first weeks. A full Communication DNA extraction takes hours, not weeks — we’ve done it for Cisco in three.',
      },
      {
        question: 'Where does the intelligence come from?',
        answer:
          'Exclusively from public, open-web sources: annual reports, product pages, hiring pages, webinars, press. Every claim carries its source. Where no source exists, the field says INSUFFICIENT_DATA — we never fill gaps with plausible-sounding guesses.',
      },
      {
        question: 'What happens to the knowledge when the engagement ends?',
        answer:
          'It stays with you. Documented account intelligence, transferred workflows, and trained routines are part of every package — the opposite of the classic agency model.',
      },
    ],
  },
  finalCta: {
    intro: {
      eyebrow: 'CONTACT',
      title: 'Let’s decode your first account together',
      description:
        'Bring 2–3 accounts you want to win. We’ll show you their buying signals, business context and Communication DNA — and whether mi-goTo fits your growth motion.',
    },
    action: strategyAction,
  },
  previewInsights: [],
};
