import givingBackIcon from '../../assets/why/pillar-giving-back.svg';
import growthTalentIcon from '../../assets/why/pillar-growth-talent.svg';
import joyIcon from '../../assets/why/pillar-joy.svg';
import resilienceIcon from '../../assets/why/pillar-resilience.svg';
import sufficiencyIcon from '../../assets/why/pillar-sufficiency.svg';

export const whyContentEn = {
  source: {
    figmaPage: '259:2',
    desktopFrame: '259:3',
    version: '1.0.0',
  },
  hero: {
    eyebrow: 'WHY MI-GOTO',
    title: 'Technology should understand',
    highlightedTitle: 'before it speaks.',
    description:
      'Why we believe most sales technology fails at the same point — and why we built a company around fixing exactly that.',
  },
  story: {
    eyebrow: 'OUR STORY',
    title: 'It started with a pattern nobody wanted to name',
    introduction:
      'Everywhere we looked, B2B companies were caught in the same loop: invest in sales technology, watch the results disappoint, blame the tool, buy the next one.',
    paragraphs: [
      'The tools weren’t the problem. They worked exactly as advertised — mechanically. But they ran on assumptions. The messaging they produced reflected how the seller thinks and talks, not how the target account argues, builds trust, or frames its problems. More automation just meant reaching more people with words that didn’t resonate.',
      'The real gap was never tooling. It was understanding.',
    ],
    insightLabel: 'THE FOUNDING INSIGHT',
    insight: [
      'Miroslav came to this from an unusual angle — business psychology and education research, not sales tech. From that perspective, the diagnosis was obvious: communication only works when you understand the other side first. Every teacher knows it. Every psychologist knows it. Somehow, B2B marketing had forgotten it.',
      'The question that became mi-goTo: what if you could systematically decode how a target company communicates — its tone, its vocabulary, how it frames problems, what proof it trusts — from what it already says publicly? Not guessing. Not personas. Its actual, verifiable language.',
    ],
    quote:
      'Most sales messaging fails not because the tool is bad, but because nobody decoded the buyer’s language first.',
    companyLabel: 'FROM INSIGHT TO COMPANY',
    company: [
      'We tested it on accounts everyone knows. Cisco’s complete Communication DNA and Knowledge Graph, extracted in three hours. CrowdStrike, SentinelOne and Secunet decoded side by side — each with clearly distinguishable DNA, proof that the signal is real and specific, not generic AI output. Campaigns built on decoded DNA reached engagement rates the industry doesn’t see with templated messaging.',
      'Today mi-goTo is a Berlin-based team building the intelligence layer between account data and revenue activation: business intelligence, buying signals, and Communication DNA — combined per account, every claim source-attributed.',
    ],
  },
  principle: {
    tag: 'INSUFFICIENT_DATA',
    title: 'The principle we refuse to compromise',
    description:
      'In an industry racing to generate more confident-sounding content, we made the opposite bet: every claim we deliver is attributed to a verifiable source — or explicitly marked as unavailable. Trust is our product. Hallucination would be its opposite.',
  },
  mission: {
    eyebrow: 'OUR MISSION',
    title: 'The Bridge',
    lead:
      'We build a commercially successful company on purpose — because commercial success is the bridge that makes everything else possible: meaningful work, growing people, giving back, and staying independent.',
    body:
      'mi-goTo is not a company with a mission statement bolted on. The business model and the mission are one structure: honest intelligence work, sold at a fair price, done by people who enjoy doing it — funding a company that answers to no one but its own principles.',
  },
  pillars: {
    eyebrow: 'FIVE PILLARS',
    title: 'What we optimize for',
    description:
      'Revenue is a means. These five pillars are the ends — the standard we measure ourselves against beyond the P&L.',
    items: [
      {
        title: 'Joy',
        description:
          'Work should be energizing, not extractive. We build a company people are glad to wake up for — ourselves and our customers’ teams included.',
        icon: joyIcon,
        tone: 'purple',
      },
      {
        title: 'Growth & Talent',
        description:
          'Rooted in education research: every engagement transfers knowledge. People around mi-goTo — team, customers, partners — should leave more capable than they arrived.',
        icon: growthTalentIcon,
        tone: 'amber',
      },
      {
        title: 'Resilience',
        description:
          'We build for durability, not for a fast exit. Sustainable pace, honest commitments, a business that survives bad quarters.',
        icon: resilienceIcon,
        tone: 'purple',
      },
      {
        title: 'Sufficiency',
        description:
          'Enough is a strategy. We grow deliberately, keep the team lean, and refuse the growth-at-all-costs logic that breaks companies and people.',
        icon: sufficiencyIcon,
        tone: 'amber',
      },
      {
        title: 'Giving Back & Independence',
        description:
          'Commercial success funds contribution — and keeps us independent. No investor pressure deciding what we build or who we serve.',
        icon: givingBackIcon,
        tone: 'purple',
      },
    ],
  },
  impact: {
    eyebrow: 'IMPACT',
    title: 'Mapped to the UN Sustainable Development Goals',
    description:
      'We keep our impact claims to the same standard as our intelligence: specific and honest. These are the six SDGs where our work actually contributes.',
    items: [
      ['SDG 3', 'Good Health & Well-being', 'Joyful, sustainable work culture — no burnout economics.', 'purple'],
      ['SDG 4', 'Quality Education', 'Knowledge transfer in every engagement; learning built into the model.', 'amber'],
      ['SDG 8', 'Decent Work & Economic Growth', 'Fair, resilient growth for us and the mid-market companies we serve.', 'purple'],
      ['SDG 9', 'Industry, Innovation & Infrastructure', 'Source-grounded AI as responsible innovation in a hype-driven market.', 'amber'],
      ['SDG 10', 'Reduced Inequalities', 'Enterprise-grade intelligence at mid-market prices — leveling a playing field owned by six-figure platforms.', 'purple'],
      ['SDG 17', 'Partnerships for the Goals', 'We work as partners, not vendors — knowledge shared, capability transferred.', 'amber'],
    ].map(([number, title, description, tone]) => ({
      number,
      title,
      description,
      tone,
    })),
  },
  finalCta: {
    eyebrow: 'WORK WITH US',
    title: 'If this resonates, let’s talk',
    description:
      'We choose customers the way we’d want to be chosen: on fit, honestly assessed. Bring your target accounts — we’ll show you what understanding them actually looks like.',
    label: 'STRATEGY DISCUSSION',
    href: '/contact',
  },
} as const;
