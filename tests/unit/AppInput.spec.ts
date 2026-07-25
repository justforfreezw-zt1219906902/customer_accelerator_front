import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import AppInput from '../../src/design-system/components/core/AppInput.vue';

describe('AppInput', () => {
  it('supports v-model, native types, and focus events', async () => {
    const wrapper = mount(AppInput, {
      props: {
        id: 'email',
        label: 'Email',
        modelValue: '',
        type: 'email',
      },
    });
    const input = wrapper.get('input');

    await input.setValue('tom@example.com');
    await input.trigger('focus');

    expect(input.attributes('type')).toBe('email');
    expect(wrapper.get('label').attributes('for')).toBe('email');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([
      'tom@example.com',
    ]);
    expect(wrapper.emitted('focus')).toHaveLength(1);
  });

  it('connects invalid state and error text accessibly', () => {
    const wrapper = mount(AppInput, {
      props: {
        id: 'work-email',
        invalid: true,
        errorMessage: 'Use a valid company email.',
      },
    });
    const input = wrapper.get('input');

    expect(input.attributes('aria-invalid')).toBe('true');
    expect(input.attributes('aria-describedby')).toBe('work-email-message');
    expect(wrapper.get('#work-email-message').text()).toBe(
      'Use a valid company email.',
    );
  });

  it('forwards disabled and required native attributes', () => {
    const wrapper = mount(AppInput, {
      props: { disabled: true, required: true },
    });

    expect(wrapper.get('input').attributes('disabled')).toBeDefined();
    expect(wrapper.get('input').attributes('required')).toBeDefined();
  });
});
