import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import { defaultHeaderContent } from '../../src/content/header/defaultHeaderContent';
import { contactNavigationEn } from '../../src/content/navigation/contact.en';
import AppNavbar from '../../src/design-system/components/composite/AppNavbar.vue';

describe('AppNavbar', () => {
  it('preserves configured navigation, language, and CTA content', () => {
    const wrapper = mount(AppNavbar);

    for (const label of [
      'mi-goTo',
      'THE PROBLEM',
      'THE METHOD',
      'PROOF',
      'PACKAGES',
      'WHY MI-GOTO',
      'DE',
      'EN',
      'CN',
      'STRATEGY DISCUSSION',
    ]) {
      expect(wrapper.text()).toContain(label);
    }
  });

  it('uses the Landing presentation as its explicit default variant', () => {
    const wrapper = mount(AppNavbar);

    expect(wrapper.classes()).toContain('app-navbar--landing');
    expect(
      wrapper.findAll('.app-navbar__link').map((item) => item.text()),
    ).toEqual(defaultHeaderContent.navigation.map((item) => item.label));
  });

  it('preserves the exact approved item order and landing chrome structure', () => {
    const wrapper = mount(AppNavbar);

    expect(
      wrapper.findAll('.app-navbar__link').map((item) => item.text()),
    ).toEqual(defaultHeaderContent.navigation.map((item) => item.label));
    expect(wrapper.get('.app-navbar__brand-text').text()).toBe('mi-goTo');
    expect(wrapper.get('.app-navbar__logo').attributes('width')).toBe('124');
    expect(
      wrapper
        .getComponent({ name: 'AppSectionContainer' })
        .props('contentWidth'),
    ).toBe('landing');
    expect(wrapper.get('.app-button').text()).toBe('STRATEGY DISCUSSION');
    expect(
      wrapper
        .get('.app-navbar__actions')
        .find('.app-navbar__languages')
        .exists(),
    ).toBe(true);
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
    await wrapper.findAll('.app-navbar__language')[1].trigger('click');

    expect(wrapper.emitted('navigate')).toHaveLength(1);
    expect(wrapper.emitted('languageChange')?.[0]).toEqual(['en']);
  });

  it('keeps DE and CN visible but unavailable', async () => {
    const wrapper = mount(AppNavbar);
    const languages = wrapper.findAll('.app-navbar__language');

    expect(languages.map((item) => item.text())).toEqual(['DE', 'EN', 'CN']);
    expect(languages[0].attributes('disabled')).toBeDefined();
    expect(languages[1].attributes('disabled')).toBeUndefined();
    expect(languages[2].attributes('disabled')).toBeDefined();
    expect(languages[1].classes()).toContain('app-navbar__language--active');

    await languages[0].trigger('click');
    expect(wrapper.emitted('languageChange')).toBeUndefined();
  });

  it('renders the exact Contact Header content and order without Landing actions', () => {
    const wrapper = mount(AppNavbar, {
      props: { variant: 'contact', content: contactNavigationEn },
    });

    expect(wrapper.classes()).toContain('app-navbar--contact');
    expect(wrapper.get('.app-navbar__brand-text').text()).toBe('mi-goTo');
    expect(
      wrapper.findAll('.app-navbar__link').map((item) => item.text()),
    ).toEqual(['HOME']);
    expect(wrapper.get('.app-navbar__link').attributes('href')).toBe('/');
    expect(wrapper.find('.app-navbar__languages').exists()).toBe(false);
    expect(wrapper.find('.app-navbar__actions').exists()).toBe(false);
    expect(wrapper.find('.app-navbar__menu-button').exists()).toBe(false);
  });

  it('emits Contact HOME navigation through the shared API', async () => {
    const wrapper = mount(AppNavbar, {
      props: {
        variant: 'contact',
        content: contactNavigationEn,
        spaNavigation: true,
      },
    });

    await wrapper.get('.app-navbar__link').trigger('click');

    expect(wrapper.emitted('navigate')?.[0]).toEqual([
      contactNavigationEn.navigation[0],
    ]);
  });
});

type NavbarProps = InstanceType<typeof AppNavbar>['$props'];
// @ts-expect-error invalid Navbar variants must be rejected by TypeScript
const invalidNavbarVariant: NavbarProps = { variant: 'invalid' };
void invalidNavbarVariant;
