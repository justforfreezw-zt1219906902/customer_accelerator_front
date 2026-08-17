import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import SignalSummary from '../../src/components/product/SignalSummary.vue';

describe('SignalSummary decorative dots', () => {
  it.each([0, 1, 12])('renders fixed decorative dots for API count %s', (count) => {
    const wrapper = mount(SignalSummary, { props: { count } });

    expect(wrapper.findAll('.signal-summary__dots i')).toHaveLength(5);
    expect(wrapper.get('.signal-summary__dots').attributes('aria-hidden')).toBe('true');
    expect(wrapper.get('.signal-summary').attributes('aria-label')).toBe(
      `${count} active signals`,
    );
    expect(wrapper.text()).toContain(`${count} active`);
    expect(wrapper.findAll('.signal-summary__dots i.is-active')).toHaveLength(0);
    expect(wrapper.findAll('.signal-summary__dots i.is-inactive')).toHaveLength(0);
  });

  it('preserves fixture visual patterns while keeping dots decorative', () => {
    const wrapper = mount(SignalSummary, {
      props: { count: 3, pattern: ['active', 'active', 'inactive', 'inactive', 'inactive'] },
    });

    expect(wrapper.findAll('.signal-summary__dots i')).toHaveLength(5);
    expect(wrapper.findAll('.signal-summary__dots i.is-active')).toHaveLength(2);
    expect(wrapper.findAll('.signal-summary__dots i.is-inactive')).toHaveLength(3);
    expect(wrapper.get('.signal-summary__dots').attributes('aria-hidden')).toBe('true');
    expect(wrapper.get('.signal-summary').attributes('aria-label')).toBe('3 active signals');
  });
});
