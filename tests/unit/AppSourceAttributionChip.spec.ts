import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import AppSourceAttributionChip from '../../src/design-system/components/core/AppSourceAttributionChip.vue';

describe('AppSourceAttributionChip', () => {
  it('renders source text with neutral semantics by default', () => {
    const wrapper = mount(AppSourceAttributionChip, {
      props: { source: 'Annual report 2025, p.14' },
    });

    expect(wrapper.element.tagName).toBe('SPAN');
    expect(wrapper.text()).toContain('Annual report 2025, p.14');
    expect(wrapper.classes()).toContain('app-source-attribution-chip--neutral');
    expect(wrapper.get('[aria-hidden="true"]').text()).toBe('◇');
  });

  it('supports the Figma-confirmed amber emphasis without changing content', () => {
    const wrapper = mount(AppSourceAttributionChip, {
      props: { source: 'CRM evidence', tone: 'amber' },
    });

    expect(wrapper.classes()).toContain('app-source-attribution-chip--amber');
    expect(wrapper.text()).toContain('CRM evidence');
  });
});
