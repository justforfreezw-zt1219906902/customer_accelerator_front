import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import LandingCtaPanel from '../../src/components/product/LandingCtaPanel.vue';

describe('LandingCtaPanel', () => {
  it('renders accessible heading and link structure from supplied props', () => {
    const wrapper = mount(LandingCtaPanel, {
      props: {
        title: 'Discuss your account strategy',
        ctaLabel: 'Contact',
        ctaHref: '/contact',
        headingLevel: 2,
      },
    });

    expect(wrapper.get('h2').text()).toBe('Discuss your account strategy');
    expect(wrapper.get('a').attributes('href')).toBe('/contact');
  });

  it('supports compact responsive class and button action without a route', async () => {
    const wrapper = mount(LandingCtaPanel, {
      props: {
        title: 'Start analysis',
        ctaLabel: 'Continue',
        variant: 'compact',
      },
    });

    expect(wrapper.classes()).toContain('landing-cta-panel--compact');
    await wrapper.get('button').trigger('click');
    expect(wrapper.emitted('action')).toHaveLength(1);
  });
});
