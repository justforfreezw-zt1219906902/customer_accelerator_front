export type HeaderNavigationItemId =
  'problem' | 'solution' | 'packages' | 'contact';

export interface HeaderNavigationItem {
  id: HeaderNavigationItemId;
  label: string;
  href?: string;
}

export type SupportedLanguage = 'de' | 'en' | 'cn';

export interface HeaderLanguageOption {
  code: SupportedLanguage;
  label: string;
  available: boolean;
  unavailableLabel?: string;
}

export interface HeaderContent {
  brand: string;
  navigation: readonly HeaderNavigationItem[];
  languages: readonly HeaderLanguageOption[];
  strategyDiscussionLabel: string;
  strategyDiscussionHref?: string;
}

export const defaultHeaderContent: HeaderContent = {
  brand: 'mi-goTo',
  navigation: [
    { id: 'problem', label: 'THE PROBLEM', href: '/#problem' },
    { id: 'solution', label: 'THE SOLUTION', href: '/#solution' },
    { id: 'packages', label: 'PACKAGES', href: '/#packages' },
    { id: 'contact', label: 'CONTACT', href: '/contact' },
  ],
  languages: [
    {
      code: 'de',
      label: 'DE',
      available: false,
      unavailableLabel: 'German translation unavailable',
    },
    { code: 'en', label: 'EN', available: true },
    {
      code: 'cn',
      label: 'CN',
      available: false,
      unavailableLabel: 'Chinese translation unavailable',
    },
  ],
  strategyDiscussionLabel: 'STRATEGY DISCUSSION',
  strategyDiscussionHref: '/contact',
};
