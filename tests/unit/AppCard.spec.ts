import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import AppCard from '../../src/design-system/components/core/AppCard.vue';

describe('AppCard', () => {
  it('renders confirmed visual variants and named content slots', () => {
    const wrapper = mount(AppCard, {
      props: { variant: 'selected' },
      slots: {
        eyebrow: 'Signal',
        title: 'Buying intent',
        default: 'Evidence',
      },
    });

    expect(wrapper.classes()).toContain('app-card--selected');
    expect(wrapper.text()).toContain('Signal');
    expect(wrapper.text()).toContain('Buying intent');
    expect(wrapper.text()).toContain('Evidence');
  });

  it('uses a native button and emits activation when interactive', async () => {
    const wrapper = mount(AppCard, {
      props: { interactive: true },
      slots: { default: 'Open' },
    });

    expect(wrapper.element.tagName).toBe('BUTTON');
    expect(wrapper.attributes('type')).toBe('button');
    await wrapper.trigger('click');
    expect(wrapper.emitted('activate')).toHaveLength(1);
  });

  it('prevents activation when an interactive card is disabled', async () => {
    const wrapper = mount(AppCard, {
      props: { interactive: true, disabled: true },
    });

    expect(wrapper.attributes('disabled')).toBeDefined();
    await wrapper.trigger('click');
    expect(wrapper.emitted('activate')).toBeUndefined();
  });
});
