import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import AppFooter from '../../src/design-system/components/composite/AppFooter.vue';

describe('AppFooter', () => {
  it('preserves the approved default footer copy', () => {
    const wrapper = mount(AppFooter);

    for (const copy of [
      'mi-goTo',
      'ABM-first Revenue Marketing Partner for B2B growth companies.',
      'NAVIGATION',
      'The problem',
      'Solutions',
      'Packages',
      'Contact',
      'CONTACT',
      'hello@mi-goto.com',
      'LinkedIn',
      'LEGAL',
      'Imprint',
      'Data protection',
      '© 2026 mi-goTo. All rights reserved.',
    ]) {
      expect(wrapper.text()).toContain(copy);
    }
  });

  it('renders confirmed links and emits unresolved navigation choices', async () => {
    const wrapper = mount(AppFooter);
    const email = wrapper.get('a[href="mailto:hello@mi-goto.com"]');
    const unresolvedLink = wrapper.findAll('button').find((item) =>
      item.text().includes('LinkedIn'),
    );

    expect(email.attributes('href')).toBe('mailto:hello@mi-goto.com');
    expect(unresolvedLink).toBeDefined();
    await unresolvedLink?.trigger('click');
    expect(wrapper.emitted('navigate')).toHaveLength(1);
  });
});
