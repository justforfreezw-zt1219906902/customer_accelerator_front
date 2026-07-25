import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import ValuePropositionCard from '../../src/components/product/ValuePropositionCard.vue';

describe('ValuePropositionCard', () => {
  it('renders required content and confirmed variants', () => {
    const wrapper = mount(ValuePropositionCard, {
      props: {
        title: 'Account fit',
        description: 'Evidence-backed prioritization.',
        badgeLabel: 'Value',
        variant: 'highlighted',
      },
    });

    expect(wrapper.get('h3').text()).toBe('Account fit');
    expect(wrapper.text()).toContain('Evidence-backed prioritization.');
    expect(wrapper.classes()).toContain('value-proposition-card--highlighted');
  });

  it('supports compact responsive composition and long text', () => {
    const longText = 'Context '.repeat(80);
    const wrapper = mount(ValuePropositionCard, {
      props: {
        title: 'Long title',
        description: longText,
        badgeLabel: 'Value',
        variant: 'compact',
      },
    });

    expect(wrapper.classes()).toContain('value-proposition-card--compact');
    expect(wrapper.text()).toContain(longText.trim());
  });
});
