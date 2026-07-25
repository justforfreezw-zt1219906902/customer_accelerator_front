import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import CustomerProblemCard from '../../src/components/product/CustomerProblemCard.vue';

describe('CustomerProblemCard', () => {
  it('renders restrained severe and compact variants', () => {
    const wrapper = mount(CustomerProblemCard, {
      props: {
        title: 'Signals are fragmented',
        description: 'Timing is difficult to assess.',
        variant: 'severe',
      },
    });

    expect(wrapper.classes()).toContain('customer-problem-card--severe');
    expect(wrapper.get('h3').text()).toBe('Signals are fragmented');
  });

  it('allows an empty optional description', () => {
    const wrapper = mount(CustomerProblemCard, {
      props: { title: 'Context unavailable', variant: 'compact' },
    });

    expect(wrapper.find('.customer-problem-card__description').exists()).toBe(
      false,
    );
    expect(wrapper.classes()).toContain('customer-problem-card--compact');
  });
});
