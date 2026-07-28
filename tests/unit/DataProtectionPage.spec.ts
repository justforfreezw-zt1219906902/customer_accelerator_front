import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import { dataProtectionContent } from '../../src/content/legal/dataProtection.en';
import DataProtectionPage from '../../src/pages/DataProtectionPage.vue';

describe('Data Protection Page', () => {
  it('preserves the approved source manifest and exactly 35 ordered sections', () => {
    expect(dataProtectionContent.manifest).toEqual({
      sourceType: 'figma_frame',
      figmaPageId: '128:2',
      figmaFrameId: '128:3',
      sourceLanguage: 'de-DE',
      publicationLanguage: 'en',
      sectionCount: 35,
      revision: 'FIGMA-128-3-EN-1.0.0',
      approvedBy: 'Tom',
      approvalType: 'product_owner_risk_acceptance',
    });
    expect(dataProtectionContent.sections).toHaveLength(35);
    expect(dataProtectionContent.sections.map(({ number }) => number)).toEqual(
      Array.from({ length: 35 }, (_, index) => index + 1),
    );
    expect(
      new Set(dataProtectionContent.sections.map(({ id }) => id)).size,
    ).toBe(35);
    expect(
      dataProtectionContent.sections.every(
        ({ heading, blocks }) => heading.trim() && blocks.length > 0,
      ),
    ).toBe(true);
  });

  it('renders English structured content, anchors, tables and contact details', () => {
    const wrapper = mount(DataProtectionPage);

    expect(wrapper.findAll('.data-protection__section')).toHaveLength(35);
    expect(wrapper.findAll('.data-protection__sidebar nav a')).toHaveLength(35);
    expect(wrapper.findAll('h1')).toHaveLength(1);
    expect(wrapper.findAll('.data-protection__section h2')).toHaveLength(35);
    expect(wrapper.findAll('table').length).toBeGreaterThanOrEqual(3);
    expect(wrapper.text()).toContain('Miroslav Stanojevic');
    expect(wrapper.text()).toContain('hello@mi-goto.com');
    expect(wrapper.text()).toContain('Changes to This Data Protection Notice');
    expect(wrapper.attributes('data-source-revision')).toBe(
      'FIGMA-128-3-EN-1.0.0',
    );
    expect(wrapper.text()).not.toContain(
      'Final approved legal content belongs',
    );
    expect(wrapper.text()).not.toContain('Datenschutzerklärung');
    expect(wrapper.text()).not.toMatch(/[\u3400-\u9fff]/u);
  });
});
