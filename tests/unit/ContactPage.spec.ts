import { flushPromises, mount } from '@vue/test-utils';
import { createMemoryHistory } from 'vue-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import ContactPage from '../../src/pages/ContactPage.vue';
import { createAppRouter } from '../../src/router';
import { submitLead } from '../../src/services/leadApi';

vi.mock('../../src/services/leadApi', () => ({
  submitLead: vi.fn(),
}));

const fillValidForm = async (wrapper: ReturnType<typeof mount>) => {
  await wrapper.get('input[name="firstName"]').setValue('Ada');
  await wrapper.get('input[name="familyName"]').setValue('Lovelace');
  await wrapper.get('input[name="company"]').setValue('Analytical Engines');
  await wrapper.get('input[name="workEmail"]').setValue('ada@example.com');
};

describe('ContactPage', () => {
  beforeEach(() => {
    vi.mocked(submitLead).mockReset();
    vi.stubGlobal('scrollTo', vi.fn());
  });

  it('renders exact Figma Contact content through the approved form composition', async () => {
    const router = createAppRouter(createMemoryHistory());
    await router.push('/contact');
    const wrapper = mount(ContactPage, {
      global: { plugins: [router] },
    });

    expect(wrapper.get('h1').text()).toBe(
      'Let’s start with the right context.',
    );
    expect(wrapper.text()).toContain('Tell us where you want to go');
    expect(wrapper.text()).toContain('What you can expect');
    expect(wrapper.text()).toContain('hello@mi-goto.com');
    expect(wrapper.findComponent({ name: 'LeadForm' }).exists()).toBe(true);
    expect(wrapper.findAll('input')).toHaveLength(4);
  });

  it('navigates valid success to a privacy-safe Thank You route', async () => {
    vi.mocked(submitLead).mockResolvedValue({
      message: 'lead submitted successfully',
      hubspot_contact_id: '796484549850',
    });
    const router = createAppRouter(createMemoryHistory());
    await router.push('/contact');
    const wrapper = mount(ContactPage, {
      global: { plugins: [router] },
    });
    await fillValidForm(wrapper);

    await wrapper.get('form').trigger('submit');
    await flushPromises();

    expect(submitLead).toHaveBeenCalledTimes(1);
    await vi.waitFor(() => {
      expect(router.currentRoute.value.fullPath).toBe('/thank-you');
    });
    expect(router.currentRoute.value.fullPath).not.toContain('Ada');
    expect(router.currentRoute.value.fullPath).not.toContain('796484549850');
  });

  it('does not call the API when client validation fails', async () => {
    const router = createAppRouter(createMemoryHistory());
    await router.push('/contact');
    const wrapper = mount(ContactPage, {
      global: { plugins: [router] },
    });
    await wrapper.get('form').trigger('submit');
    expect(submitLead).not.toHaveBeenCalled();
  });
});
