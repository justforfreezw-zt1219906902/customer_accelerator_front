import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import AppTextarea from '../../src/design-system/components/composite/AppTextarea.vue';

describe('AppTextarea', () => {
  it('supports v-model, rows, counter, and accessible description', async () => {
    const wrapper = mount(AppTextarea, {
      props: {
        id: 'brief',
        label: 'Research brief',
        modelValue: '',
        rows: 6,
        maxLength: 500,
        showCounter: true,
        description: 'Add relevant context.',
      },
    });
    const textarea = wrapper.get('textarea');

    await textarea.setValue('Enterprise context');

    expect(textarea.attributes('rows')).toBe('6');
    expect(textarea.attributes('maxlength')).toBe('500');
    expect(textarea.attributes('aria-describedby')).toBe('brief-description');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([
      'Enterprise context',
    ]);
    expect(wrapper.text()).toContain('0 / 500');
  });

  it('forwards disabled and invalid states', () => {
    const wrapper = mount(AppTextarea, {
      props: {
        label: 'Notes',
        disabled: true,
        invalid: true,
      },
    });

    expect(wrapper.get('textarea').attributes('disabled')).toBeDefined();
    expect(wrapper.get('textarea').attributes('aria-invalid')).toBe('true');
  });
});
