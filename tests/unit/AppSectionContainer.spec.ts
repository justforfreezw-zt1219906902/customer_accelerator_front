import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import AppSectionContainer from '../../src/design-system/components/core/AppSectionContainer.vue';

describe('AppSectionContainer', () => {
  it('renders stable section markup and content', () => {
    const wrapper = mount(AppSectionContainer, {
      slots: { default: '<p>Section content</p>' },
    });

    expect(wrapper.element.tagName).toBe('SECTION');
    expect(wrapper.text()).toBe('Section content');
    expect(wrapper.find('.app-section-container__divider').exists()).toBe(true);
  });

  it('supports confirmed styles and divider states', () => {
    const wrapper = mount(AppSectionContainer, {
      props: {
        style: 'light-context',
        divider: 'without-top-divider',
        as: 'main',
      },
    });

    expect(wrapper.element.tagName).toBe('MAIN');
    expect(wrapper.attributes('data-theme')).toBe('light-impact');
    expect(wrapper.find('.app-section-container__divider').exists()).toBe(
      false,
    );
  });
});
