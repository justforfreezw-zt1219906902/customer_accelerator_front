import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import TrustMetricCard from '../../src/components/product/TrustMetricCard.vue';

describe('TrustMetricCard', () => {
  it('uses only externally supplied metric content', () => {
    const wrapper = mount(TrustMetricCard, {
      props: {
        value: 'Verified',
        label: 'Source coverage',
        explanation: 'Supplied by the consuming content source.',
      },
    });

    expect(wrapper.get('.trust-metric-card__value').text()).toBe('Verified');
    expect(wrapper.get('h3').text()).toBe('Source coverage');
  });

  it('allows the optional explanation to be empty', () => {
    const wrapper = mount(TrustMetricCard, {
      props: { value: 'External', label: 'Metric' },
    });

    expect(wrapper.find('.trust-metric-card__explanation').exists()).toBe(false);
  });
});
