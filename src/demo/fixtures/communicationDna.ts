import type { DemoCommunicationDna } from '../types';

const oracle = {
  label: 'oracle.com',
  kind: 'Homepage',
  url: 'https://oracle.com',
} as const;

export const demoCommunicationDna = [
  {
    accountId: 'demo-acc-001',
    tone: {
      primary: 'Technical-authoritative',
      secondary: 'Enterprise-confident',
      description: 'Precise, engineering-led, scale-oriented.',
      status: 'DERIVED',
      sources: [oracle],
    },
    vocabulary: [
      {
        term: 'cloud infrastructure',
        context: 'Core',
        frequency: 'HIGH',
        source: oracle,
      },
      {
        term: 'autonomous database',
        context: 'Product',
        frequency: 'HIGH',
        source: oracle,
      },
      { term: 'AI', context: 'Positioning', frequency: 'HIGH', source: oracle },
    ],
    valueProposition: {
      quote: '“Complete cloud applications and infrastructure”',
      status: 'SOURCE_BACKED',
      sources: [oracle],
    },
    problemFraming: {
      description:
        'Complexity & scale framed as solved by an integrated stack.',
      quote: '“Run your most demanding workloads with confidence”',
      status: 'DERIVED',
      sources: [oracle],
    },
    proofStyle: {
      primary: 'Benchmarks + enterprise scale',
      secondary: 'Reference customers',
      description: 'Performance numbers and reference customers.',
      status: 'DERIVED',
      sources: [oracle],
    },
    ctaPatterns: {
      style: 'Consultative',
      description: 'Enterprise-led with self-serve trials.',
      examples: ['Talk to sales', 'Try Oracle Cloud'],
      status: 'DERIVED',
      sources: [oracle],
    },
    recurringPhrases: {
      description: 'Language Oracle repeats across enterprise messaging.',
      quote: '“Complete and integrated” · “Built for the enterprise”',
      status: 'DERIVED',
      sources: [oracle],
    },
    mirroring: {
      do: ['Match technical precision', 'Lead with scale & reliability'],
      dont: ['Avoid fluffy claims', 'Don’t undersell security'],
    },
    buyingSignalSources: [
      {
        label: 'careers.oracle.com',
        kind: 'Career Page',
        url: 'https://careers.oracle.com/en/job/313929',
      },
      {
        label: 'education.oracle.com',
        kind: 'Website',
        url: 'https://education.oracle.com/',
      },
      {
        label: 'oracle.com / blogs.oracle.com',
        kind: 'Press Release / Blog',
        url: 'https://www.oracle.com/in/news/announcement/oracle-train-students-professionals-across-uttarpradesh-in-ai-cloud-cybersecurity-datascience-2026-06-15/',
      },
      {
        label: 'careers.oracle.com',
        kind: 'Career Page',
        url: 'https://careers.oracle.com/en/sites/jobsearch/jobs/preview/341879/',
      },
      {
        label: 'sec.gov',
        kind: 'SEC 10-K',
        url: 'https://www.sec.gov/Archives/edgar/data/1341439/000095017025087926/orcl-20250531.htm',
      },
      {
        label: 'careers.oracle.com',
        kind: 'Career Page',
        url: 'https://careers.oracle.com/en/sites/jobsearch/jobs/preview/341898/',
      },
      {
        label: 'careers.oracle.com',
        kind: 'Career Page',
        url: 'https://careers.oracle.com/en/sites/jobsearch/jobs/preview/338301/',
      },
      {
        label: 'careers.oracle.com',
        kind: 'Career Page',
        url: 'https://careers.oracle.com/en/sites/jobsearch/jobs/preview/338414/',
      },
      {
        label: 'careers.oracle.com',
        kind: 'Career Page',
        url: 'https://careers.oracle.com/en/sites/jobsearch/jobs/preview/339700/',
      },
      {
        label: 'flexagon.com (fasst offizielle Oracle Release Notes zusammen)',
        kind: 'Partner Blog / Release Notes Summary',
        url: 'https://flexagon.com/blog/oracle-fusion-26c-quarterly-update/',
      },
      {
        label: 'oracle.com/news',
        kind: 'Press Release',
        url: 'https://www.oracle.com/news/announcement/oracle-introduces-ai-native-builder-experience-2026-07-14/',
      },
      {
        label: 'community.oracle.com/customerconnect',
        kind: 'Website',
        url: 'https://community.oracle.com/customerconnect/',
      },
      {
        label: 'careers.oracle.com',
        kind: 'Career Page',
        url: 'https://careers.oracle.com/en/sites/jobsearch/jobs/preview/341052/',
      },
      {
        label: 'careers.oracle.com (aggregierte Suchergebnisse)',
        kind: 'Career Page (aggregiert)',
        url: 'https://careers.oracle.com/en/sites/jobsearch/jobs?keyword=Solutions%20Consultant',
      },
    ],
  },
] as const satisfies readonly DemoCommunicationDna[];
