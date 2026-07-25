import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import FeatureCard from '../../src/components/product/FeatureCard.vue';

describe('FeatureCard', () => {
  it('renders required props without optional content', () => {
    const wrapper = mount(FeatureCard, {
      props: { title: 'Signals', description: 'Source-backed context.' },
    });

    expect(wrapper.get('h3').text()).toBe('Signals');
    expect(wrapper.find('.feature-card__top').exists()).toBe(false);
  });

  it('renders the confirmed icon and highlighted variants', () => {
    const wrapper = mount(FeatureCard, {
      props: {
        title: 'Outreach',
        description: 'Relevant angles.',
        variant: 'with-icon',
        kicker: '03 · WHAT TO SAY',
      },
      slots: { icon: '<span data-test="icon">AI</span>' },
    });

    expect(wrapper.get('[data-test="icon"]').text()).toBe('AI');
    expect(wrapper.classes()).toContain('feature-card--with-icon');
  });
});
