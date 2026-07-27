import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import {
  FAQSection,
  TeamSection,
  TrustMetricsSection,
} from '../../src/components/sections';
import { landingContentEn } from '../../src/content/landing/en';

describe('Phase 6A sections', () => {
  it('renders externally supplied Team content responsively', () => {
    const wrapper = mount(TeamSection, {
      props: landingContentEn.team,
    });

    expect(wrapper.attributes('id')).toBe('team');
    expect(wrapper.findAll('h3')).toHaveLength(4);
    expect(wrapper.find('.team-section__grid').exists()).toBe(true);
  });

  it('uses accessible FAQ disclosure controls', async () => {
    const wrapper = mount(FAQSection, {
      props: landingContentEn.faq,
    });
    const buttons = wrapper.findAll('button');

    expect(buttons).toHaveLength(6);
    expect(buttons[0]?.attributes('aria-expanded')).toBe('true');
    await buttons[1]?.trigger('click');
    expect(buttons[0]?.attributes('aria-expanded')).toBe('false');
    expect(buttons[1]?.attributes('aria-expanded')).toBe('true');
    expect(wrapper.text()).toContain(
      landingContentEn.faq.items[1]?.answer ?? '',
    );
  });

  it('renders approved proof metrics through TrustMetricCard', () => {
    const wrapper = mount(TrustMetricsSection, {
      props: landingContentEn.proof,
    });

    expect(wrapper.attributes('id')).toBe('proof');
    expect(wrapper.findAllComponents({ name: 'TrustMetricCard' })).toHaveLength(
      3,
    );
    expect(wrapper.text()).toContain('Cisco account decoded');
  });
});
