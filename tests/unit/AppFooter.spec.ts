import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import { contactFooterEn } from '../../src/content/footer/contact.en';
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

  it('uses the Landing presentation as its explicit default variant', () => {
    const wrapper = mount(AppFooter);

    expect(wrapper.classes()).toContain('app-footer--landing');
    expect(wrapper.find('.app-footer__top').exists()).toBe(true);
    expect(wrapper.find('.app-footer__contact').exists()).toBe(false);
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
    expect(wrapper.get('.app-brand-logo__text').text()).toBe('mi-goTo');
    expect(wrapper.get('.app-footer__brand img').attributes('src')).toContain(
      'mi-goto-lockup-light-hidpi.png',
    );
    expect(wrapper.get('.app-footer__brand img').attributes('width')).toBe(
      '132',
    );
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

  it('renders exact Contact Footer content and order without Landing columns', () => {
    const wrapper = mount(AppFooter, {
      props: { variant: 'contact', content: contactFooterEn },
    });

    expect(wrapper.classes()).toContain('app-footer--contact');
    expect(wrapper.get('.app-footer__contact').text()).toContain(
      '© 2026 mi-goTo. All rights reserved.',
    );
    expect(
      wrapper.findAll('.app-footer__contact-link').map((item) => item.text()),
    ).toEqual(['Home', 'Imprint', 'Data protection']);
    expect(
      wrapper
        .findAll('.app-footer__contact-link')
        .map((item) => item.attributes('href')),
    ).toEqual(['/', '/imprint', '/data-protection']);
    expect(wrapper.find('.app-footer__top').exists()).toBe(false);
    expect(wrapper.find('.app-footer__divider').exists()).toBe(false);
    expect(wrapper.find('.app-footer__bottom-statement').exists()).toBe(false);
    expect(wrapper.findAll('a[aria-label="mi-goTo home"]')).toHaveLength(1);
  });

  it('renders one transparent shared brand link and emits Home navigation', async () => {
    const wrapper = mount(AppFooter, {
      props: { spaNavigation: true },
    });
    const brandLinks = wrapper.findAll('a[aria-label="mi-goTo home"]');

    expect(brandLinks).toHaveLength(1);
    expect(brandLinks[0].attributes('href')).toBe('/');
    expect(brandLinks[0].classes()).toContain('app-brand-logo');
    expect(brandLinks[0].classes()).toContain('app-footer__brand');
    expect(brandLinks[0].attributes('style')).toBeUndefined();
    expect(wrapper.find('.app-footer__logo-background').exists()).toBe(false);

    await brandLinks[0].trigger('click');
    expect(wrapper.emitted('homeNavigate')).toHaveLength(1);
  });

  it('emits Contact legal navigation through the shared API', async () => {
    const wrapper = mount(AppFooter, {
      props: {
        variant: 'contact',
        content: contactFooterEn,
        spaNavigation: true,
      },
    });

    await wrapper.findAll('.app-footer__contact-link')[1].trigger('click');

    expect(wrapper.emitted('navigate')?.[0]).toEqual([
      contactFooterEn.compactLinks?.[1],
    ]);
  });
});

type FooterProps = InstanceType<typeof AppFooter>['$props'];
// @ts-expect-error invalid Footer variants must be rejected by TypeScript
const invalidFooterVariant: FooterProps = { variant: 'invalid' };
void invalidFooterVariant;
