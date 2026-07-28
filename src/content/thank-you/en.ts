export interface ThankYouStep {
  number: string;
  title: string;
  description: string;
}

export interface ThankYouContent {
  eyebrow: string;
  title: string;
  description: string;
  badges: readonly string[];
  privacyNote: string;
  backHomeLabel: string;
  directContactLabel: string;
  directContactEmail: string;
  nextStepsTitle: string;
  nextStepsDescription: string;
  nextSteps: readonly ThankYouStep[];
  closingNote: string;
}

export const thankYouContentEn: ThankYouContent = {
  eyebrow: 'REQUEST RECEIVED',
  title: 'Thank you. We have your request.',
  description:
    'We’ll review the context you shared and reply personally within two business days. The first response will come from the people doing the work.',
  badges: ['SOURCE-GROUNDED', 'PRIVATE BY DEFAULT'],
  privacyNote:
    'Your details are used only for this enquiry. No mailing list and no automated sales sequence.',
  backHomeLabel: 'BACK TO HOME',
  directContactLabel: 'NEED TO ADD CONTEXT?',
  directContactEmail: 'hello@mi-goto.com',
  nextStepsTitle: 'What happens next',
  nextStepsDescription: 'A short, human process from here.',
  nextSteps: [
    {
      number: '01',
      title: 'We review your request',
      description:
        'A team member reads the context you shared and checks where we can be genuinely useful.',
    },
    {
      number: '02',
      title: 'We prepare relevant context',
      description:
        'We look at your market, accounts, or growth challenge before the first conversation.',
    },
    {
      number: '03',
      title: 'We reply directly',
      description:
        'You’ll hear from us personally, usually within two business days.',
    },
  ],
  closingNote:
    'No handoff to an automated sales sequence. Your request stays with the mi-goTo team.',
};
