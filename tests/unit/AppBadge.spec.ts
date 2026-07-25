import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import AppBadge from '../../src/design-system/components/core/AppBadge.vue';

describe('AppBadge', () => {
  it('renders confirmed type and state classes', () => {
    const wrapper = mount(AppBadge, {
      props: { type: 'source-amber', state: 'hover' },
      slots: { default: 'Source grounded' },
    });

    expect(wrapper.classes()).toContain('app-badge--source-amber');
    expect(wrapper.classes()).toContain('app-badge--hover');
    expect(wrapper.text()).toBe('Source grounded');
  });

  it('can hide its decorative status icon', () => {
    const wrapper = mount(AppBadge, {
      props: { showIcon: false },
      slots: { default: 'Signal' },
    });

    expect(wrapper.find('.app-badge__icon').exists()).toBe(false);
  });

  it('uses the Figma-confirmed icon default for each type', () => {
    const sourced = mount(AppBadge);
    const signal = mount(AppBadge, { props: { type: 'signal' } });

    expect(sourced.find('.app-badge__icon').exists()).toBe(true);
    expect(signal.find('.app-badge__icon').exists()).toBe(false);
  });

  it('exposes disabled state without implying button behavior', () => {
    const wrapper = mount(AppBadge, {
      props: { state: 'disabled' },
      slots: { default: 'Sourced' },
    });

    expect(wrapper.element.tagName).toBe('SPAN');
    expect(wrapper.attributes('aria-disabled')).toBe('true');
  });
});
