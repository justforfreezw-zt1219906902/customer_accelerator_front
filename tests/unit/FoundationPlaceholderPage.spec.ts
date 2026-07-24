import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import FoundationPlaceholderPage from '../../src/pages/FoundationPlaceholderPage.vue';

describe('FoundationPlaceholderPage', () => {
  it('identifies the application as a foundation placeholder', () => {
    const wrapper = mount(FoundationPlaceholderPage);

    expect(wrapper.get('h1').text()).toBe('Vue foundation is ready for review');
  });
});
