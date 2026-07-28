import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import { whyFooterEn } from '../../src/content/footer/why.en';
import { whyNavigationEn } from '../../src/content/navigation/why.en';
import { AppFooter, AppNavbar } from '../../src/design-system/components/composite';
import WhyMiGotoPage from '../../src/pages/WhyMiGotoPage.vue';

describe('WhyMiGotoPage', () => {
  it('renders the exact approved section order and one primary heading', () => {
    const wrapper = mount(WhyMiGotoPage);

    expect(wrapper.findAll('section')).toHaveLength(7);
    expect(wrapper.findAll('h1')).toHaveLength(1);
    expect(wrapper.findAll('section').map((section) => section.attributes('id') ?? section.classes()[0])).toEqual([
      'why-hero',
      'story',
      'why-principle',
      'mission',
      'pillars',
      'impact',
      'why-cta',
    ]);
    expect(wrapper.text()).toContain('Technology should understand');
    expect(wrapper.text()).toContain('before it speaks.');
    expect(wrapper.text()).not.toContain('Phase 5 route shell');
  });

  it('renders the approved Why chrome variants from typed content', () => {
    const navbar = mount(AppNavbar, {
      props: { variant: 'why', content: whyNavigationEn },
    });
    const footer = mount(AppFooter, {
      props: { variant: 'why', content: whyFooterEn },
    });

    expect(navbar.classes()).toContain('app-navbar--why');
    expect(navbar.text()).toContain('OUR STORY');
    expect(navbar.text()).toContain('FIVE PILLARS');
    expect(navbar.text()).not.toContain('THE PROBLEM');
    expect(footer.classes()).toContain('app-footer--why');
    expect(footer.text()).toContain('Data protection');
    expect(footer.text()).not.toContain('NAVIGATION');
  });

  it('uses only the five approved pillar assets and six approved impact claims', () => {
    const wrapper = mount(WhyMiGotoPage);

    expect(wrapper.findAll('.why-pillar img')).toHaveLength(5);
    expect(wrapper.findAll('.why-impact article')).toHaveLength(6);
    expect(wrapper.text()).toContain('SDG 17');
  });
});
