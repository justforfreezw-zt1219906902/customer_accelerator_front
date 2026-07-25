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
}

export const defaultFooterContent: FooterContent = {
  brand: 'mi-goTo',
  description: 'ABM-first Revenue Marketing Partner for B2B growth companies.',
  groups: [
    {
      id: 'navigation',
      heading: 'NAVIGATION',
      links: [
        { id: 'problem', label: 'The problem' },
        { id: 'solutions', label: 'Solutions' },
        { id: 'packages', label: 'Packages' },
        { id: 'contact', label: 'Contact' },
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
        { id: 'imprint', label: 'Imprint' },
        { id: 'data-protection', label: 'Data protection' },
      ],
    },
  ],
  copyright: '© 2026 mi-goTo. All rights reserved.',
};
