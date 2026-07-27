import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import { footerEn } from '../../src/content/footer/en';
import { landingContentEn } from '../../src/content/landing/en';
import { navigationEn } from '../../src/content/navigation/en';
import LandingPage from '../../src/pages/LandingPage.vue';

describe('Phase 6A Landing Page', () => {
  it('renders the approved section order and stable anchors', () => {
    const wrapper = mount(LandingPage);
    const sectionIds = wrapper
      .findAll('section[id]')
      .map((section) => section.attributes('id'));

    expect(sectionIds).toEqual([
      'hero',
      'problem',
      'solution',
      'method',
      'principle',
      'proof',
      'benefits',
      'packages',
      'team',
      'faq',
      'final-cta',
    ]);
    expect(new Set(sectionIds).size).toBe(sectionIds.length);
    expect(wrapper.get('#team').attributes('id')).toBe('team');
    expect(wrapper.get('#faq').attributes('id')).toBe('faq');
  });

  it('preserves the approved heading hierarchy and exact claims', () => {
    const wrapper = mount(LandingPage);

    expect(wrapper.findAll('h1')).toHaveLength(1);
    expect(wrapper.get('h1').text()).toBe(
      'Stop hoping for enterprise deals. Build pipeline you can predict.',
    );
    expect(wrapper.findAll('h2')).toHaveLength(10);
    expect(wrapper.text()).toContain('1.3–8%');
    expect(wrapper.text()).toContain('€1,500');
    expect(wrapper.text()).toContain('€3,500');
    expect(wrapper.text()).toContain('The people behind the intelligence');
    expect(wrapper.text()).toContain('Before you book a call');
  });

  it('uses the approved CTA destinations', () => {
    const wrapper = mount(LandingPage);
    const hrefs = wrapper.findAll('a').map((link) => link.attributes('href'));

    expect(hrefs.filter((href) => href === '/contact').length).toBeGreaterThan(
      1,
    );
    expect(hrefs).toContain('#method');
  });

  it('preserves Header and Footer content through EN configuration', () => {
    expect(navigationEn.brand).toBe('mi-goTo');
    expect(
      navigationEn.navigation.map(({ label, href }) => [label, href]),
    ).toEqual([
      ['THE PROBLEM', '/#problem'],
      ['THE METHOD', '/#method'],
      ['PROOF', '/#proof'],
      ['PACKAGES', '/#packages'],
      ['WHY MI-GOTO', '/why-mi-goto'],
    ]);
    expect(
      navigationEn.languages.map(({ label, available }) => [label, available]),
    ).toEqual([
      ['DE', false],
      ['EN', true],
      ['CN', false],
    ]);
    expect(navigationEn.strategyDiscussionLabel).toBe('STRATEGY DISCUSSION');

    expect(footerEn.brand).toBe('mi-goTo');
    expect(footerEn.description).toBe(
      'Technology should understand before it speaks.',
    );
    expect(footerEn.copyright).toBe('© 2026 mi-goTo. All rights reserved.');
    expect(footerEn.bottomStatement).toBe(
      'Source-grounded ABM intelligence for B2B growth companies',
    );
    expect(
      footerEn.groups.flatMap((group) => group.links).map((link) => link.label),
    ).toEqual([
      'The Problem',
      'The Method',
      'Packages',
      'Team',
      'Why mi-goTo',
      'hello@mi-goto.com',
      'LinkedIn',
      'Imprint',
      'Data protection',
    ]);
  });

  it('keeps approved content external to the Page component', () => {
    expect(landingContentEn.team.members).toHaveLength(4);
    expect(landingContentEn.faq.items).toHaveLength(6);
    expect(
      landingContentEn.packages.packages.map((item) => item.price),
    ).toEqual(['On request', '€1,500', '€3,500', 'Custom']);
  });

  it('keeps insufficient-data content inside its intended cards', () => {
    const wrapper = mount(LandingPage);
    const principleCard = wrapper.get('[data-testid="insufficient-data-card"]');
    const heroCard = wrapper.get('[data-testid="account-intelligence-card"]');

    expect(
      principleCard.get('[data-testid="insufficient-data-label"]').text(),
    ).toBe('INSUFFICIENT_DATA');
    expect(principleCard.text()).toContain('If we can’t source it, we say so.');
    expect(principleCard.text()).toContain(
      'Every claim in every deliverable is attributed',
    );
    expect(
      heroCard.get('[data-testid="hero-insufficient-data-card"]').text(),
    ).toContain('No public source available — we say so instead of guessing.');
    expect(
      principleCard.findAll('[data-testid="insufficient-data-label"]'),
    ).toHaveLength(1);
    expect(wrapper.text()).not.toContain('Preview content is not available.');
  });

  it('places the approved final CTA immediately before the shared Footer slot', () => {
    const wrapper = mount(LandingPage);
    const finalCta = wrapper.get('#final-cta');

    expect(finalCta.text()).toContain('CONTACT');
    expect(finalCta.text()).toContain(
      'Let’s decode your first account together',
    );
    expect(finalCta.text()).toContain('STRATEGY DISCUSSION');
    expect(finalCta.text().indexOf('CONTACT')).toBeLessThan(
      finalCta.text().indexOf('Let’s decode your first account together'),
    );
    expect(
      finalCta.text().indexOf('Let’s decode your first account together'),
    ).toBeLessThan(finalCta.text().indexOf('STRATEGY DISCUSSION'));
    expect(finalCta.findComponent({ name: 'LandingCtaPanel' }).exists()).toBe(
      true,
    );
    expect(finalCta.element.nextElementSibling).toBeNull();
  });

  it('places validation data in the Hero copy before Account Intelligence', () => {
    const wrapper = mount(LandingPage);
    const hero = wrapper.get('#hero');
    const validation = hero.get('[data-testid="hero-validation-data"]');
    const intelligence = hero.get('[data-testid="account-intelligence-card"]');

    expect(
      validation.element.compareDocumentPosition(intelligence.element) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(validation.find('dl').exists()).toBe(true);
    expect(validation.text()).toContain('3 hrs');
    expect(validation.text()).toContain('100%');
    expect(validation.text()).toContain('1.3–8%');
  });
});
