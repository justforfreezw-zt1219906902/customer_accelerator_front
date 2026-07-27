export interface FooterLink {
  id: string;
  label: string;
  href?: string;
  external?: boolean;
}

export interface FooterLinkGroup {
  id: string;
  heading: string;
  links: readonly FooterLink[];
}

export interface FooterContent {
  brand: string;
  description: string;
  groups: readonly FooterLinkGroup[];
  copyright: string;
  bottomStatement: string;
  compactLinks?: readonly FooterLink[];
}

export const defaultFooterContent: FooterContent = {
  brand: 'mi-goTo',
  description: 'Technology should understand before it speaks.',
  groups: [
    {
      id: 'navigation',
      heading: 'NAVIGATION',
      links: [
        { id: 'problem', label: 'The Problem', href: '/#problem' },
        { id: 'method', label: 'The Method', href: '/#method' },
        { id: 'packages', label: 'Packages', href: '/#packages' },
        { id: 'team', label: 'Team', href: '/#team' },
        {
          id: 'why-mi-goto',
          label: 'Why mi-goTo',
          href: '/why-mi-goto',
        },
      ],
    },
    {
      id: 'contact',
      heading: 'CONTACT',
      links: [
        {
          id: 'email',
          label: 'hello@mi-goto.com',
          href: 'mailto:hello@mi-goto.com',
        },
        { id: 'linkedin', label: 'LinkedIn', external: true },
      ],
    },
    {
      id: 'legal',
      heading: 'LEGAL',
      links: [
        { id: 'imprint', label: 'Imprint', href: '/imprint' },
        {
          id: 'data-protection',
          label: 'Data protection',
          href: '/data-protection',
        },
      ],
    },
  ],
  copyright: '© 2026 mi-goTo. All rights reserved.',
  bottomStatement: 'Source-grounded ABM intelligence for B2B growth companies',
};
