import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import ProcessStepCard from '../../src/components/product/ProcessStepCard.vue';

describe('ProcessStepCard', () => {
  it('marks the active step accessibly', () => {
    const wrapper = mount(ProcessStepCard, {
      props: {
        step: '02',
        title: 'Analyze',
        description: 'Review signals.',
        variant: 'active',
      },
    });

    expect(wrapper.attributes('aria-current')).toBe('step');
    expect(wrapper.text()).toContain('02');
  });

  it('exposes compact and completed state classes', () => {
    const wrapper = mount(ProcessStepCard, {
      props: {
        step: 3,
        title: 'Recommend',
        description: 'Provide next actions.',
        variant: 'completed',
        density: 'compact',
      },
    });

    expect(wrapper.classes()).toContain('process-step-card--completed');
    expect(wrapper.classes()).toContain('process-step-card--compact');
  });
});
