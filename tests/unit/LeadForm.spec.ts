import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

import LeadForm from '../../src/components/contact/LeadForm.vue';
import { contactContentEn } from '../../src/content/contact/en';
import { ApiRequestError } from '../../src/utils/apiErrors';

const fillValidForm = async (
  wrapper: ReturnType<typeof mount<typeof LeadForm>>,
) => {
  await wrapper.get('input[name="firstName"]').setValue('Ada');
  await wrapper.get('input[name="familyName"]').setValue('Lovelace');
  await wrapper.get('input[name="company"]').setValue('Analytical Engines');
  await wrapper.get('input[name="workEmail"]').setValue('ada@example.com');
};

describe('LeadForm', () => {
  it('associates accessible labels and exposes only confirmed visible fields', () => {
    const wrapper = mount(LeadForm, {
      props: { content: contactContentEn.form },
    });

    for (const field of ['firstName', 'familyName', 'company', 'workEmail']) {
      const input = wrapper.get(`input[name="${field}"]`);
      const label = wrapper.get(`label[for="${input.attributes('id')}"]`);
      expect(label.attributes('for')).toBe(input.attributes('id'));
      expect(input.attributes('required')).toBeDefined();
    }

    expect(wrapper.find('input[name="owner"]').exists()).toBe(false);
    expect(wrapper.find('input[name="website"]').exists()).toBe(false);
    expect(wrapper.find('input[name="phoneNumber"]').exists()).toBe(false);
    expect(wrapper.find('textarea[name="message"]').exists()).toBe(false);
  });

  it('shows required and email errors with an accessible summary', async () => {
    const wrapper = mount(LeadForm, {
      props: { content: contactContentEn.form },
      attachTo: document.body,
    });

    await wrapper.get('form').trigger('submit');
    expect(wrapper.get('[role="alert"]').text()).toContain(
      'First name is required.',
    );
    expect(document.activeElement).toBe(
      wrapper.get('.lead-form__error-summary').element,
    );

    await wrapper.get('input[name="workEmail"]').setValue('invalid');
    await wrapper.get('input[name="workEmail"]').trigger('blur');
    expect(wrapper.text()).toContain('Enter a valid work email address.');

    wrapper.unmount();
  });

  it('submits by keyboard without owner and prevents duplicate submission while loading', async () => {
    let resolveSubmit: (() => void) | undefined;
    const submitAdapter = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveSubmit = resolve;
        }),
    );
    const wrapper = mount(LeadForm, {
      props: { content: contactContentEn.form, submitAdapter },
    });
    await fillValidForm(wrapper);

    await wrapper.get('input[name="workEmail"]').trigger('keydown.enter');
    await wrapper.get('form').trigger('submit');
    await wrapper.get('form').trigger('submit');

    expect(submitAdapter).toHaveBeenCalledTimes(1);
    expect(submitAdapter).toHaveBeenCalledWith({
      firstName: 'Ada',
      familyName: 'Lovelace',
      company: 'Analytical Engines',
      workEmail: 'ada@example.com',
    });
    expect(wrapper.get('form').attributes('aria-busy')).toBe('true');
    expect(
      wrapper.get('button[type="submit"]').attributes('disabled'),
    ).toBeDefined();
    expect(wrapper.text()).toContain('SENDING…');

    resolveSubmit?.();
    await Promise.resolve();
    await wrapper.vm.$nextTick();
    expect(wrapper.get('form').attributes('aria-busy')).toBe('false');
  });

  it('shows a safe server error, preserves memory-only values, and permits manual retry', async () => {
    const submitAdapter = vi
      .fn()
      .mockRejectedValueOnce(
        new ApiRequestError('server_error', 'Temporary service failure.'),
      )
      .mockResolvedValueOnce(undefined);
    const wrapper = mount(LeadForm, {
      props: { content: contactContentEn.form, submitAdapter },
    });
    await fillValidForm(wrapper);

    await wrapper.get('form').trigger('submit');
    await vi.waitFor(() =>
      expect(wrapper.text()).toContain('Temporary service failure.'),
    );
    expect(wrapper.get('input[name="workEmail"]').element).toHaveProperty(
      'value',
      'ada@example.com',
    );

    await wrapper.get('form').trigger('submit');
    await vi.waitFor(() => expect(submitAdapter).toHaveBeenCalledTimes(2));
  });
});
