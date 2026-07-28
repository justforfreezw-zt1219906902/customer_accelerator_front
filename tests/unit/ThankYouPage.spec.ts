import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import ThankYouPage from '../../src/pages/ThankYouPage.vue';

describe('ThankYouPage', () => {
  it('renders the exact Figma confirmation and three-step process', () => {
    const wrapper = mount(ThankYouPage);

    expect(wrapper.get('h1').text()).toBe('Thank you. We have your request.');
    expect(wrapper.get('h2').text()).toBe('What happens next');
    expect(wrapper.findAll('.thank-you-page__step')).toHaveLength(3);
    expect(wrapper.text()).toContain('BACK TO HOME');
    expect(wrapper.get('a[href="mailto:hello@mi-goto.com"]').text()).toBe(
      'hello@mi-goto.com',
    );
  });

  it('does not render submitted lead or backend identifiers', () => {
    const html = mount(ThankYouPage).html();

    for (const sensitiveKey of [
      'firstName',
      'familyName',
      'workEmail',
      'company',
      'owner',
      'hubspot_contact_id',
    ]) {
      expect(html).not.toContain(sensitiveKey);
    }
  });
});
