import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import ContactPage from '../../src/pages/ContactPage.vue';

describe('ContactPage', () => {
  it('renders exact Figma Contact content through the approved form composition', () => {
    const wrapper = mount(ContactPage);

    expect(wrapper.get('h1').text()).toBe(
      'Let’s start with the right context.',
    );
    expect(wrapper.text()).toContain('Tell us where you want to go');
    expect(wrapper.text()).toContain('What you can expect');
    expect(wrapper.text()).toContain('hello@mi-goto.com');
    expect(wrapper.findComponent({ name: 'LeadForm' }).exists()).toBe(true);
    expect(wrapper.findAll('input')).toHaveLength(4);
  });
});
