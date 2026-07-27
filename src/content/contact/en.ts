export const contactContentEn = {
  eyebrow: 'CONTACT',
  title: 'Let’s start with the right context.',
  description:
    'Tell us which accounts, market, or growth challenge you are working on. We review every request before we reply, so the first conversation starts with useful context.',
  badges: ['SOURCE-GROUNDED', 'PRIVATE BY DEFAULT'],
  expectationsTitle: 'What you can expect',
  expectations: [
    'A direct reply from the people doing the work.',
    'Your information is used only to prepare and answer your enquiry.',
    'Recommendations are source-grounded, never generated from guesswork.',
    'A considered response within two business days.',
  ],
  directContactLabel: 'PREFER EMAIL?',
  directContactEmail: 'hello@mi-goto.com',
  form: {
    title: 'Tell us where you want to go',
    description:
      'A few details are enough. We use them only to prepare a relevant first conversation.',
    fields: {
      firstName: {
        label: 'First name',
        placeholder: 'Your first name',
      },
      familyName: {
        label: 'Family name',
        placeholder: 'Your family name',
      },
      company: {
        label: 'Company',
        placeholder: 'Company name',
      },
      workEmail: {
        label: 'Work email',
        placeholder: 'name@company.com',
      },
    },
    privacyNote:
      'By sending this request, you agree that we may use these details only to respond to your enquiry. No mailing list and no automated sales sequence.',
    responseNote: 'Usually within 2 business days',
    submitLabel: 'SEND REQUEST',
    submittingLabel: 'SENDING…',
    errorSummaryTitle: 'Please correct the following fields:',
  },
} as const;
