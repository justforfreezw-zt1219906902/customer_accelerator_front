import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import { defaultFooterContent } from '../../src/content/footer/defaultFooterContent';
import AppFooter from '../../src/design-system/components/composite/AppFooter.vue';

describe('AppFooter', () => {
  it('preserves the approved default footer copy', () => {
    const wrapper = mount(AppFooter);

    for (const copy of [
      'mi-goTo',
      'Technology should understand before it speaks.',
      'NAVIGATION',
      'The Problem',
      'The Method',
      'Packages',
      'Team',
      'Why mi-goTo',
      'CONTACT',
      'hello@mi-goto.com',
      'LinkedIn',
      'LEGAL',
      'Imprint',
      'Data protection',
      '© 2026 mi-goTo. All rights reserved.',
      'Source-grounded ABM intelligence for B2B growth companies',
    ]) {
      expect(wrapper.text()).toContain(copy);
    }
  });

  it('renders confirmed links and emits unresolved navigation choices', async () => {
    const wrapper = mount(AppFooter);
    const email = wrapper.get('a[href="mailto:hello@mi-goto.com"]');
    const unresolvedLink = wrapper
      .findAll('button')
      .find((item) => item.text().includes('LinkedIn'));

    expect(email.attributes('href')).toBe('mailto:hello@mi-goto.com');
    expect(unresolvedLink).toBeDefined();
    await unresolvedLink?.trigger('click');
    expect(wrapper.emitted('navigate')).toHaveLength(1);
  });

  it('preserves approved column and link order in the landing-width container', () => {
    const wrapper = mount(AppFooter);

    expect(
      wrapper.findAll('.app-footer__heading').map((item) => item.text()),
    ).toEqual(defaultFooterContent.groups.map((group) => group.heading));
    expect(
      wrapper.findAll('.app-footer__link').map((item) => item.text()),
    ).toEqual(
      defaultFooterContent.groups.flatMap((group) =>
        group.links.map((link) => link.label),
      ),
    );
    expect(wrapper.get('.app-footer__brand-text').text()).toBe('mi-goTo');
    expect(wrapper.get('.app-footer__logo').attributes('width')).toBe('132');
    expect(
      wrapper
        .getComponent({ name: 'AppSectionContainer' })
        .props('contentWidth'),
    ).toBe('landing');
    expect(wrapper.find('.app-footer__divider').exists()).toBe(true);
    expect(wrapper.get('.app-footer__bottom-statement').text()).toBe(
      defaultFooterContent.bottomStatement,
    );
  });
});
