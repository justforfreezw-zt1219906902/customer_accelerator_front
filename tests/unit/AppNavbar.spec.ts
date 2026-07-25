import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import AppNavbar from '../../src/design-system/components/composite/AppNavbar.vue';

describe('AppNavbar', () => {
  it('preserves configured navigation, language, and CTA content', () => {
    const wrapper = mount(AppNavbar);

    for (const label of [
      'mi-goTo',
      'THE PROBLEM',
      'THE SOLUTION',
      'PACKAGES',
      'CONTACT',
      'DE',
      'EN',
      'CN',
      'STRATEGY DISCUSSION',
    ]) {
      expect(wrapper.text()).toContain(label);
    }
  });

  it('supports keyboard-accessible mobile menu behavior', async () => {
    const wrapper = mount(AppNavbar, { props: { variant: 'mobile' } });
    const toggle = wrapper.get('.app-navbar__menu-button');

    expect(toggle.attributes('aria-expanded')).toBe('false');
    await toggle.trigger('click');
    expect(toggle.attributes('aria-expanded')).toBe('true');

    await wrapper.get('header').trigger('keydown', { key: 'Escape' });
    expect(toggle.attributes('aria-expanded')).toBe('false');
  });

  it('emits navigation and language selection without finalizing routes', async () => {
    const wrapper = mount(AppNavbar);

    await wrapper.findAll('.app-navbar__link')[0].trigger('click');
    await wrapper.findAll('.app-navbar__language')[0].trigger('click');

    expect(wrapper.emitted('navigate')).toHaveLength(1);
    expect(wrapper.emitted('languageChange')?.[0]).toEqual(['de']);
  });
});
