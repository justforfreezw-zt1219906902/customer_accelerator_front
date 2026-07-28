export interface LegalSourceManifest {
  sourceType: 'figma_frame';
  figmaPageId: string;
  figmaFrameId: string;
  sourceLanguage: 'de-DE';
  publicationLanguage: 'en';
  sectionCount: number;
  revision: string;
  approvedBy: string;
  approvalType:
    | 'product_owner_risk_acceptance'
    | 'product_owner_content_approval_and_risk_acceptance';
  pdfRequired?: boolean;
  legalCounselReview?: 'deferred' | 'completed';
  editorialNotesPublished?: boolean;
  futureAuthorityInformationPublished?: boolean;
}

export interface LegalTable {
  type: 'table';
  caption: string;
  headers: string[];
  rows: string[][];
}

export interface LegalParagraph {
  type: 'paragraph';
  text: string;
}

export interface LegalList {
  type: 'list';
  items: string[];
}

export interface LegalContact {
  type: 'contact';
  lines: string[];
}

export interface LegalLink {
  type: 'link';
  label: string;
  href: string;
}

export type LegalContentBlock =
  LegalParagraph | LegalList | LegalTable | LegalContact | LegalLink;

export interface LegalSection {
  id: string;
  number: number;
  sourceNodeId: string;
  heading: string;
  blocks: LegalContentBlock[];
}

export interface LegalDocument {
  title: string;
  eyebrow: string;
  revisionLabel: string;
  introduction: string;
  manifest: LegalSourceManifest;
  sections: LegalSection[];
}
