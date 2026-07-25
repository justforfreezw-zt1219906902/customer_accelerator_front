import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import AIInsightPreviewCard from '../../src/components/product/AIInsightPreviewCard.vue';

describe('AIInsightPreviewCard', () => {
  it('renders externally supplied confidence with progress semantics', () => {
    const wrapper = mount(AIInsightPreviewCard, {
      props: {
        title: 'Account fit',
        badgeLabel: 'Sourced',
        insight: 'Relevant market overlap.',
        confidence: 91,
        variant: 'high-fit',
      },
    });

    expect(wrapper.get('[role="progressbar"]').attributes('aria-valuenow')).toBe(
      '91',
    );
    expect(wrapper.classes()).toContain('ai-insight-preview-card--high-fit');
  });

  it('supports an explicit empty state without inventing copy or numbers', () => {
    const wrapper = mount(AIInsightPreviewCard, {
      props: {
        title: 'Buying signal',
        badgeLabel: 'Insufficient data',
        emptyText: 'No approved insight supplied.',
      },
    });

    expect(wrapper.get('[role="status"]').text()).toBe(
      'No approved insight supplied.',
    );
    expect(wrapper.find('[role="progressbar"]').exists()).toBe(false);
    expect(wrapper.text()).not.toContain('%');
  });
});
