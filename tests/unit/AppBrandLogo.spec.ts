import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import AppBrandLogo from '../../src/design-system/components/core/AppBrandLogo.vue';

describe('AppBrandLogo', () => {
  it('renders the approved transparent high-density asset as one Home link', () => {
    const wrapper = mount(AppBrandLogo, { props: { size: 'footer' } });
    const links = wrapper.findAll('a[aria-label="mi-goTo home"]');
    const image = wrapper.get('img');

    expect(links).toHaveLength(1);
    expect(links[0].attributes('href')).toBe('/');
    expect(image.attributes('src')).toContain('mi-goto-lockup-light-hidpi.png');
    expect(image.attributes('src')).not.toContain('mi-goto-lockup-light.png');
    expect(image.attributes('width')).toBe('132');
    expect(image.attributes('height')).toBe('38');
    expect(wrapper.classes()).toContain('app-brand-logo--footer');
    expect(wrapper.attributes('style')).toBeUndefined();
  });

  it('emits router-aware Home navigation from keyboard-compatible link semantics', async () => {
    const wrapper = mount(AppBrandLogo, {
      props: { spaNavigation: true },
    });

    await wrapper.get('a').trigger('click');
    expect(wrapper.emitted('homeNavigate')).toHaveLength(1);
  });
});
