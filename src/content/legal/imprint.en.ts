import type { LegalDocument, LegalSection } from '../../types/legalContent';

export const imprintSourceManifest = {
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
} as const;

const p = (text: string) => ({ type: 'paragraph' as const, text });
const contact = (...lines: string[]) => ({ type: 'contact' as const, lines });
const link = (label: string, href: string) => ({
  type: 'link' as const,
  label,
  href,
});
const section = (
  number: number,
  id: string,
  sourceNodeId: string,
  heading: string,
  blocks: LegalSection['blocks'],
): LegalSection => ({ id, number, sourceNodeId, heading, blocks });

export const imprintContent: LegalDocument = {
  title: 'Imprint',
  eyebrow: 'LEGAL INFORMATION',
  revisionLabel: 'Information pursuant to Section 5 DDG',
  introduction:
    'Legal provider identification for mi-goTo / MILOTO GoToMarket.',
  manifest: imprintSourceManifest,
  sections: [
    section(1, 'provider', '122:470', 'Provider', [
      p('Name'),
      p('Miroslav Stanojevic'),
      p('Trading as'),
      p('MILOTO GoToMarket'),
      contact('Ostendstraße 19', '12459 Berlin', 'Germany'),
    ]),
    section(2, 'contact', '122:483', 'Contact', [
      p('Telephone'),
      link('+49 151 16052759', 'tel:+4915116052759'),
      p('Email'),
      link('hello@mi-goto.com', 'mailto:hello@mi-goto.com'),
      p('Website'),
      link('https://mi-goto.com', 'https://mi-goto.com'),
    ]),
    section(
      3,
      'legal-form-and-business-registration',
      '122:498',
      'Legal Form and Business Registration',
      [
        p('Legal form'),
        p('Sole proprietorship'),
        p('The business is registered.'),
        p('Currently responsible trade authority'),
        contact(
          'Bezirksamt Tempelhof-Schöneberg von Berlin',
          'Ordnungsamt – FB Gewerbe – Gew14',
          'Tempelhofer Damm 165',
          '12099 Berlin',
          'Germany',
        ),
      ],
    ),
    section(4, 'vat-id', '122:504', 'VAT Identification Number', [
      p(
        'A VAT identification number pursuant to Section 27a of the German VAT Act is not currently available and will be added once issued.',
      ),
      p('The tax number is not published publicly in the Imprint.'),
    ]),
    section(5, 'commercial-register', '122:510', 'Commercial Register', [
      p('There is currently no entry in the Commercial Register.'),
      p(
        'If an entry is made in the Commercial Register in the future, the register court and registration number will be added here.',
      ),
    ]),
    section(
      6,
      'responsible-for-content',
      '122:515',
      'Responsible for Content Pursuant to Section 18(2) MStV',
      [
        contact(
          'Miroslav Stanojevic',
          'Ostendstraße 19',
          '12459 Berlin',
          'Germany',
        ),
      ],
    ),
    section(
      7,
      'consumer-dispute-resolution',
      '122:521',
      'Consumer Dispute Resolution',
      [
        p(
          'Our offering is directed predominantly at entrepreneurs within the meaning of Section 14 BGB.',
        ),
        p(
          'We are neither obliged nor willing to participate in dispute-resolution proceedings before a consumer arbitration board.',
        ),
      ],
    ),
    section(8, 'liability-for-content', '122:527', 'Liability for Content', [
      p(
        'As a service provider, we are responsible for our own content on these pages in accordance with the general laws. However, we are not obliged to permanently monitor transmitted or stored third-party information or to investigate circumstances indicating unlawful activity.',
      ),
      p(
        'Obligations under the general laws to remove or block the use of information remain unaffected. Liability in this respect is possible only from the time we become aware of a specific infringement. If we become aware of corresponding infringements, we will remove the content immediately.',
      ),
    ]),
    section(9, 'liability-for-links', '122:533', 'Liability for Links', [
      p(
        'Our website may contain links to external third-party websites over whose content we have no influence. We therefore cannot accept any responsibility for that third-party content. The respective provider or operator is always responsible for the content of linked pages.',
      ),
      p(
        'The linked pages were checked for possible legal violations at the time the links were created. Unlawful content was not identifiable at that time. Permanent monitoring of linked pages is not reasonable without specific indications of an infringement. If we become aware of infringements, we will remove the corresponding links immediately.',
      ),
    ]),
    section(10, 'copyright', '122:540', 'Copyright', [
      p(
        'The content and works created by us on this website are subject to German copyright law.',
      ),
      p(
        'Reproduction, editing, distribution and any form of exploitation beyond the limits of copyright law require our prior written consent unless otherwise permitted by law.',
      ),
      p(
        'Where content on this website was not created by us, third-party copyrights are respected. If you nevertheless become aware of a copyright infringement, please notify us. If we become aware of infringements, we will remove the corresponding content immediately.',
      ),
    ]),
  ],
};
