import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import AppSelect from '../../src/design-system/components/composite/AppSelect.vue';

const options = [
  { label: 'Customer intelligence', value: 'customer' },
  { label: 'Market analysis', value: 'market' },
] as const;

describe('AppSelect', () => {
  it('associates its label and emits the typed option value', async () => {
    const wrapper = mount(AppSelect, {
      props: {
        id: 'signal',
        label: 'Signal type',
        options,
        placeholder: 'Select a signal',
      },
    });

    await wrapper.get('select').setValue('market');

    expect(wrapper.get('label').attributes('for')).toBe('signal');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['market']);
  });

  it('forwards disabled, required, and invalid attributes', () => {
    const wrapper = mount(AppSelect, {
      props: {
        label: 'Signal type',
        options,
        disabled: true,
        required: true,
        invalid: true,
      },
    });
    const select = wrapper.get('select');

    expect(select.attributes('disabled')).toBeDefined();
    expect(select.attributes('required')).toBeDefined();
    expect(select.attributes('aria-invalid')).toBe('true');
  });
});
