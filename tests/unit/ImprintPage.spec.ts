import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import {
  imprintContent,
  imprintSourceManifest,
} from '../../src/content/legal/imprint.en';
import ImprintPage from '../../src/pages/ImprintPage.vue';

describe('Imprint Page', () => {
  it('preserves the approved source manifest and unique public sections', () => {
    expect(imprintSourceManifest).toEqual({
      sourceType: 'figma_frame',
      figmaPageId: '122:2',
      figmaFrameId: '122:3',
      sourceLanguage: 'de-DE',
      publicationLanguage: 'en',
      sectionCount: 10,
      revision: 'FIGMA-122-3-EN-1.0.0',
      approvedBy: 'Tom',
      approvalType: 'product_owner_content_approval_and_risk_acceptance',
      pdfRequired: false,
      legalCounselReview: 'deferred',
      editorialNotesPublished: false,
      futureAuthorityInformationPublished: false,
    });
    expect(imprintContent.sections).toHaveLength(10);
    expect(new Set(imprintContent.sections.map(({ id }) => id)).size).toBe(10);
    expect(
      imprintContent.sections.every(
        ({ heading, blocks }) => heading.trim() && blocks.length > 0,
      ),
    ).toBe(true);
  });

  it('renders current English content and excludes non-public source notes', () => {
    const wrapper = mount(ImprintPage);

    expect(wrapper.findAll('.imprint-page__section')).toHaveLength(10);
    expect(wrapper.findAll('.imprint-page__index a')).toHaveLength(10);
    expect(wrapper.findAll('h1')).toHaveLength(1);
    expect(wrapper.findAll('.imprint-page__section h2')).toHaveLength(10);
    expect(wrapper.text()).toContain('Miroslav Stanojevic');
    expect(wrapper.text()).toContain('MILOTO GoToMarket');
    expect(wrapper.text()).toContain(
      'Bezirksamt Tempelhof-Schöneberg von Berlin',
    );
    expect(wrapper.get('a[href="tel:+4915116052759"]').text()).toBe(
      '+49 151 16052759',
    );
    expect(wrapper.get('a[href="mailto:hello@mi-goto.com"]').text()).toBe(
      'hello@mi-goto.com',
    );
    expect(wrapper.attributes('data-source-revision')).toBe(
      'FIGMA-122-3-EN-1.0.0',
    );
    expect(wrapper.text()).not.toContain(
      'Final approved legal content belongs',
    );
    expect(wrapper.text()).not.toContain('Treptow-Köpenick');
    expect(wrapper.text()).not.toContain('Kleiner Hinweis');
    expect(wrapper.text()).not.toContain('Ummeldung');
    expect(wrapper.find('a[href$=".pdf"]').exists()).toBe(false);
    expect(wrapper.text()).not.toMatch(/[\u3400-\u9fff]/u);
  });
});
