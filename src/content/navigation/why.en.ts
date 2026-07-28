import type { HeaderContent } from '../header/defaultHeaderContent';

export const whyNavigationEn: HeaderContent = {
  brand: 'mi-goTo',
  navigation: [
    { id: 'home', label: 'HOME', href: '/' },
    { id: 'story', label: 'OUR STORY', href: '/why-mi-goto#story' },
    { id: 'mission', label: 'MISSION', href: '/why-mi-goto#mission' },
    { id: 'pillars', label: 'FIVE PILLARS', href: '/why-mi-goto#pillars' },
    { id: 'impact', label: 'IMPACT', href: '/why-mi-goto#impact' },
  ],
  languages: [],
  strategyDiscussionLabel: 'STRATEGY DISCUSSION',
  strategyDiscussionHref: '/contact',
};
