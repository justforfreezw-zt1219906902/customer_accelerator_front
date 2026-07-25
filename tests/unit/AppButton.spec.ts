import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import AppButton from '../../src/design-system/components/core/AppButton.vue';

describe('AppButton', () => {
  it('renders confirmed variant and size classes', () => {
    const wrapper = mount(AppButton, {
      props: { variant: 'secondary', size: 'lg' },
      slots: { default: 'Continue' },
    });

    expect(wrapper.element.tagName).toBe('BUTTON');
    expect(wrapper.classes()).toContain('app-button--secondary');
    expect(wrapper.classes()).toContain('app-button--lg');
    expect(wrapper.text()).toBe('Continue');
  });

  it('emits clicks while enabled and blocks them while disabled', async () => {
    const wrapper = mount(AppButton, {
      slots: { default: 'Submit' },
    });

    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);

    await wrapper.setProps({ disabled: true });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
    expect(wrapper.attributes('disabled')).toBeDefined();
  });

  it('uses link semantics and removes disabled links from keyboard order', () => {
    const wrapper = mount(AppButton, {
      props: { href: '/contact', disabled: true },
      slots: { default: 'Contact' },
    });

    expect(wrapper.element.tagName).toBe('A');
    expect(wrapper.attributes('href')).toBe('/contact');
    expect(wrapper.attributes('aria-disabled')).toBe('true');
    expect(wrapper.attributes('tabindex')).toBe('-1');
  });

  it('remains keyboard focusable when enabled', () => {
    const wrapper = mount(AppButton, {
      attachTo: document.body,
      slots: { default: 'Continue' },
    });

    (wrapper.element as HTMLElement).focus();
    expect(document.activeElement).toBe(wrapper.element);
    wrapper.unmount();
  });
});
