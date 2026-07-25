export type HeaderNavigationItemId =
  | 'problem'
  | 'solution'
  | 'packages'
  | 'contact';

export interface HeaderNavigationItem {
  id: HeaderNavigationItemId;
  label: string;
  href?: string;
}

export type SupportedLanguage = 'de' | 'en' | 'cn';

export interface HeaderLanguageOption {
  code: SupportedLanguage;
  label: string;
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
    { id: 'problem', label: 'THE PROBLEM' },
    { id: 'solution', label: 'THE SOLUTION' },
    { id: 'packages', label: 'PACKAGES' },
    { id: 'contact', label: 'CONTACT' },
  ],
  languages: [
    { code: 'de', label: 'DE' },
    { code: 'en', label: 'EN' },
    { code: 'cn', label: 'CN' },
  ],
  strategyDiscussionLabel: 'STRATEGY DISCUSSION',
};
