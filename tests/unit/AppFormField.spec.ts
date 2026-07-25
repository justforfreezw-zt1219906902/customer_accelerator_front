import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import AppFormField from '../../src/design-system/components/composite/AppFormField.vue';

describe('AppFormField', () => {
  it('associates its label, description, and error with the slotted control', () => {
    const wrapper = mount(AppFormField, {
      props: {
        id: 'company',
        label: 'Company',
        description: 'Use the registered company name.',
        error: 'Company is required.',
        required: true,
      },
      slots: {
        default: (field) =>
          `<input id="${field.controlId}" aria-describedby="${field.describedBy}" />`,
      },
    });

    expect(wrapper.get('label').attributes('for')).toBe('company');
    expect(wrapper.text()).toContain('Required');
    expect(wrapper.get('#company-description').text()).toBe(
      'Use the registered company name.',
    );
    expect(wrapper.get('#company-error').attributes('role')).toBe('alert');
  });

  it('exposes disabled presentation', () => {
    const wrapper = mount(AppFormField, {
      props: { label: 'Company', disabled: true },
    });

    expect(wrapper.classes()).toContain('app-form-field--disabled');
  });
});
