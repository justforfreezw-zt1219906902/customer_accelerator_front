import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import {
  FeatureGridSection,
  FinalCtaSection,
  HeroSection,
  HowItWorksSection,
  PackagesSection,
  ProblemSection,
  ProductPreviewSection,
  SolutionOverviewSection,
} from '../../src/components/sections';

const intro = {
  eyebrow: 'Evidence',
  title: 'A heading that remains clear with extended content',
  description:
    'Supporting copy can grow without changing the component contract or introducing page-specific content.',
} as const;

describe('landing sections', () => {
  it('renders stable navigation IDs and a single section heading', () => {
    const wrapper = mount(ProblemSection, {
      props: {
        intro,
        items: [{ title: 'Problem', description: 'Description' }],
      },
    });

    expect(wrapper.attributes('id')).toBe('problem');
    expect(wrapper.findAll('h2')).toHaveLength(1);
    expect(wrapper.find('h3').text()).toBe('Problem');
  });

  it('composes approved product components for each content collection', () => {
    const solution = mount(SolutionOverviewSection, {
      props: {
        intro,
        items: [
          {
            title: 'Value',
            description: 'Description',
            badgeLabel: 'Sourced',
          },
        ],
      },
    });
    const features = mount(FeatureGridSection, {
      props: {
        intro,
        items: [{ title: 'Feature', description: 'Description' }],
      },
    });
    const process = mount(HowItWorksSection, {
      props: {
        intro,
        steps: [{ step: '01', title: 'Step', description: 'Description' }],
      },
    });

    expect(
      solution.findComponent({ name: 'ValuePropositionCard' }).exists(),
    ).toBe(true);
    expect(features.findComponent({ name: 'FeatureCard' }).exists()).toBe(true);
    expect(process.findComponent({ name: 'ProcessStepCard' }).exists()).toBe(
      true,
    );
  });

  it('keeps product previews at card and slot complexity', () => {
    const wrapper = mount(ProductPreviewSection, {
      props: {
        intro,
        insights: [
          {
            title: 'Account fit',
            badgeLabel: 'Signal',
            insight: 'Externally supplied insight.',
          },
        ],
        variant: 'split-preview',
      },
      slots: { preview: '<div data-test="preview">Preview</div>' },
    });

    expect(wrapper.find('[data-test="preview"]').exists()).toBe(true);
    expect(
      wrapper.findComponent({ name: 'AIInsightPreviewCard' }).exists(),
    ).toBe(true);
    expect(wrapper.classes()).toContain(
      'product-preview-section--split-preview',
    );
  });

  it('does not require prices or marketing statistics for packages', async () => {
    const wrapper = mount(PackagesSection, {
      props: {
        intro,
        packages: [
          {
            name: 'Pilot',
            description: 'Scope supplied by content configuration.',
            features: ['Account research'],
            action: { label: 'Discuss', href: '#contact' },
          },
        ],
      },
    });

    expect(wrapper.attributes('id')).toBe('packages');
    expect(wrapper.text()).not.toContain('€');
    await wrapper.get('a').trigger('click');
    expect(wrapper.emitted('packageAction')?.[0]?.[0]).toBe('Pilot');
  });

  it('emits CTA interactions without implementing navigation logic', async () => {
    const hero = mount(HeroSection, {
      props: {
        intro,
        primaryAction: { label: 'Discuss', href: '#contact' },
      },
    });
    const finalCta = mount(FinalCtaSection, {
      props: {
        intro,
        action: { label: 'Discuss', href: '#contact' },
      },
    });

    await hero.get('a').trigger('click');
    await finalCta.get('a').trigger('click');

    expect(hero.emitted('primaryAction')).toHaveLength(1);
    expect(finalCta.emitted('action')).toHaveLength(1);
    expect(finalCta.attributes('id')).toBe('final-cta');
  });

  it('supports long text and explicit responsive layout variants', () => {
    const wrapper = mount(HowItWorksSection, {
      props: {
        intro: {
          ...intro,
          title: intro.title.repeat(8),
        },
        steps: [{ step: '01', title: 'Step', description: 'Long '.repeat(80) }],
        variant: 'vertical-mobile-layout',
      },
    });

    expect(wrapper.text()).toContain(intro.title);
    expect(wrapper.classes()).toContain(
      'how-it-works-section--vertical-mobile-layout',
    );
  });
});
