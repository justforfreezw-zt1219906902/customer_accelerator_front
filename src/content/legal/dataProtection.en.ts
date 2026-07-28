import type { LegalDocument, LegalSection } from '../../types/legalContent';

export const dataProtectionManifest = {
  sourceType: 'figma_frame',
  figmaPageId: '128:2',
  figmaFrameId: '128:3',
  sourceLanguage: 'de-DE',
  publicationLanguage: 'en',
  sectionCount: 35,
  revision: 'FIGMA-128-3-EN-1.0.0',
  approvedBy: 'Tom',
  approvalType: 'product_owner_risk_acceptance',
} as const;

const p = (text: string) => ({ type: 'paragraph' as const, text });
const list = (...items: string[]) => ({ type: 'list' as const, items });
const contact = (...lines: string[]) => ({ type: 'contact' as const, lines });
const section = (
  number: number,
  sourceNodeId: string,
  heading: string,
  blocks: LegalSection['blocks'],
): LegalSection => ({
  id: `section-${number}`,
  number,
  sourceNodeId,
  heading,
  blocks,
});

export const dataProtectionContent: LegalDocument = {
  title: 'Data Protection Notice',
  eyebrow: 'LEGAL INFORMATION',
  revisionLabel: 'Last updated: May 2026',
  introduction:
    'Complete English translation of the Data Protection Notice approved from Figma frame 128:3.',
  manifest: dataProtectionManifest,
  sections: [
    section(1, '131:39', 'Controller', [
      p(
        'The controller responsible for processing personal data within the meaning of the General Data Protection Regulation is:',
      ),
      contact(
        'Miroslav Stanojevic, trading as MILOTO GoToMarket',
        'Ostendstraße 19',
        '12459 Berlin',
        'Germany',
        'Phone: +49 151 16052759',
        'Email: hello@mi-goto.com',
        'Website: https://mi-goto.com',
      ),
    ]),
    section(2, '131:46', 'Data Protection Officer', [
      p(
        'No Data Protection Officer has been appointed because there is currently no statutory obligation to appoint one.',
      ),
      p(
        'For data protection enquiries, you can contact us at hello@mi-goto.com.',
      ),
    ]),
    section(3, '131:53', 'General Information on Data Processing', [
      p(
        'We process personal data only to the extent permitted by applicable data protection laws. Personal data is any information relating to an identified or identifiable natural person, for example a name, email address, telephone number, IP address, communication content, usage data or business contact details.',
      ),
      p('We process personal data in particular for the following purposes:'),
      list(
        'Providing and technically operating our website',
        'Ensuring the security and stability of our systems',
        'Communicating with prospects, customers, partners and service providers',
        'Handling enquiries',
        'Initiating and performing contracts',
        'Customer and lead management',
        'Scheduling appointments and business organisation',
        'Using email, calendar and cloud services',
        'Web analytics and marketing, where activated and consented to',
        'Using CRM, analytics, social-media and AI tools, where activated',
        'Meeting statutory retention and documentation obligations',
      ),
      p('The legal bases for processing include in particular:'),
      list(
        'Art. 6(1)(a) GDPR where you have given us consent',
        'Art. 6(1)(b) GDPR where processing is necessary to perform a contract or take pre-contractual steps',
        'Art. 6(1)(c) GDPR where we are legally required to process data',
        'Art. 6(1)(f) GDPR where processing is necessary for our legitimate interests or those of third parties and your interests or fundamental rights do not override them',
      ),
    ]),
    section(4, '131:77', 'Retention Period', [
      p(
        'We store personal data only for as long as required for the relevant purposes or while statutory retention obligations apply. The following retention periods generally apply:',
      ),
      {
        type: 'table',
        caption: 'General retention periods',
        headers: ['Data type', 'Retention period'],
        rows: [
          ['Server log files', '7 to 30 days'],
          [
            'Contact enquiries',
            '6 months after the enquiry is closed, unless a business relationship arises',
          ],
          [
            'Customer, contract and invoice data',
            '6 to 10 years in accordance with statutory requirements',
          ],
          [
            'Business communications',
            'Up to 6 years where relevant under commercial or tax law',
          ],
          [
            'CRM prospect data',
            '24 months after the last contact unless a legitimate reason for longer storage exists',
          ],
          ['Cookie consent records', '6 to 12 months'],
          ['Google Analytics data, where activated', '14 months'],
          [
            'HubSpot tracking data, where activated',
            'Up to 24 months, depending on the specific configuration',
          ],
          [
            'LinkedIn marketing data, where activated',
            'According to LinkedIn settings and our campaign configuration',
          ],
          [
            'Internal AI API logs',
            '30 to 90 days unless longer storage is required',
          ],
          [
            'Crawling and research data',
            '6 to 12 months unless a business relationship or another legitimate purpose exists',
          ],
        ],
      },
      p(
        'Where statutory retention periods apply, deletion takes place only after those periods expire.',
      ),
    ]),
    section(5, '131:84', 'Recipients and Service Providers', [
      p(
        'We use service providers that may process personal data on our behalf or under their own responsibility. These include in particular:',
      ),
      {
        type: 'table',
        caption: 'Service providers and status',
        headers: ['Service provider / tool', 'Purpose', 'Status'],
        rows: [
          [
            'Railway',
            'Hosting / server infrastructure',
            'Active; DPA in place',
          ],
          ['IONOS', 'Domain management', 'Active'],
          [
            'Google Workspace',
            'Email, calendar, files and collaboration',
            'Active; DPA confirmed',
          ],
          [
            'Borlabs Cookie',
            'Consent management',
            'Planned / when a cookie banner is used',
          ],
          [
            'Google Analytics',
            'Web analytics',
            'Only after consent and conclusion of the DPA',
          ],
          [
            'HubSpot CRM / Analytics',
            'CRM, lead management and analytics',
            'Only after the DPA and, for tracking, consent',
          ],
          [
            'LinkedIn',
            'Social media, communication and company page',
            'Where used',
          ],
          ['LinkedIn API', 'LinkedIn integrations', 'Where used'],
          [
            'LinkedIn Insight Tag',
            'Conversion tracking, retargeting and campaign measurement',
            'Only after consent and compliant setup',
          ],
          [
            'Google Gemini API',
            'AI-supported functions',
            'Where used; Google DPA in place',
          ],
          [
            'OpenAI API',
            'AI-supported functions',
            'Only after compliant setup / DPA',
          ],
          [
            'Anthropic Claude API',
            'AI-supported functions',
            'Only after compliant setup / DPA',
          ],
          ['Crawl4AI', 'Web crawling and data extraction', 'Where used'],
        ],
      },
      p(
        'Where legally required, we conclude data processing agreements under Art. 28 GDPR with service providers that process personal data on our behalf.',
      ),
    ]),
    section(6, '131:91', 'Transfers to Third Countries', [
      p(
        'Some service providers we use or plan to use are based outside the European Union or European Economic Area, or may process data there, particularly in the United States.',
      ),
      p(
        'Personal data is transferred to third countries only where an appropriate data-protection basis exists, in particular:',
      ),
      list(
        'An adequacy decision by the European Commission',
        'The recipient’s certification under the EU-U.S. Data Privacy Framework',
        'EU Standard Contractual Clauses',
        'Additional technical and organisational safeguards',
        'Or explicit consent where required',
      ),
      p(
        'For US providers, we check in particular whether they are certified under the EU-U.S. Data Privacy Framework or whether other appropriate safeguards exist.',
      ),
    ]),
    section(7, '132:39', 'Security of Processing', [
      p(
        'We take appropriate technical and organisational measures to protect personal data against loss, misuse, unauthorised access, alteration or disclosure. These include in particular:',
      ),
      list(
        'TLS/SSL encryption of the website',
        'Access restrictions',
        'Secure passwords',
        'Two-factor authentication where available',
        'Role-based access rights',
        'Regular updates to the systems used',
        'Selection of service providers suitable for data protection',
        'Data processing agreements where required',
        'Limiting processing to necessary data',
      ),
    ]),
    section(8, '132:54', 'Hosting via Railway', [
      p(
        'Our website is hosted through Railway. The server region is EU / Frankfurt.',
      ),
      p(
        'When our website is accessed, technically necessary data is processed, including:',
      ),
      list(
        'IP address',
        'Date and time of access',
        'Requested URL',
        'Referrer URL',
        'Browser type and version',
        'Operating system',
        'Device information',
        'HTTP status codes',
        'Amount of data transferred',
        'Technical log data',
      ),
      p(
        'Processing serves the provision, stability, security and error analysis of our website. The legal basis is Art. 6(1)(f) GDPR. Our legitimate interest is the secure and functional operation of our website. A Data Processing Agreement is in place with Railway.',
      ),
      p(
        'Server log files are generally stored for 7 to 30 days and then deleted unless longer storage is required to investigate security incidents.',
      ),
    ]),
    section(9, '132:76', 'Domain Management via IONOS', [
      p(
        'Our domain is managed through IONOS. Technical and administrative data may be processed, particularly domain information, contract data, DNS data, technical contact details and communication data.',
      ),
      p(
        'Processing is carried out to register, manage and technically provide our domain. The legal bases are Art. 6(1)(b) and Art. 6(1)(f) GDPR. Our legitimate interest is secure domain management and the availability of our website.',
      ),
    ]),
    section(10, '132:84', 'Contacting Us', [
      p(
        'If you contact us by email, telephone, social media or another channel, we process the data you provide. This may include:',
      ),
      list(
        'Name',
        'Email address',
        'Telephone number',
        'Company',
        'Position',
        'Content of your message',
        'Time of contact',
        'Communication history',
        'Technical metadata',
      ),
      p(
        'Processing is carried out to handle your enquiry, communicate with you and document business transactions. The legal basis is Art. 6(1)(b) GDPR where your enquiry concerns a contract or pre-contractual steps. In all other cases, the legal basis is Art. 6(1)(f) GDPR.',
      ),
      p(
        'We generally store contact enquiries for 6 months after final processing. If a business relationship arises or statutory retention obligations apply, we store the data for correspondingly longer.',
      ),
    ]),
    section(11, '132:103', 'Google Workspace', [
      p(
        'We use Google Workspace for business email, calendars, file storage, document editing, video conferences and internal collaboration. Depending on use, the following data may be processed:',
      ),
      list(
        'Email content and metadata',
        'Contact details',
        'Calendar data and appointments',
        'Files and documents',
        'Spreadsheets and presentations',
        'Chat and communication content',
        'User and access data',
        'Technical security and log data',
      ),
      p(
        'Processing serves business communication, organisation, collaboration, contract performance and administration of our company data. The legal bases are Art. 6(1)(b), Art. 6(1)(c) and Art. 6(1)(f) GDPR. The data processing terms for Google Workspace have been confirmed.',
      ),
    ]),
    section(12, '132:122', 'Cookies and Similar Technologies', [
      p(
        'Our website may use cookies and similar technologies, such as cookies, local storage, pixels, tags or scripts.',
      ),
      p(
        'Technically necessary cookies and technologies are required for the website to function, operate securely or store privacy settings. The legal basis is Art. 6(1)(f) GDPR and Section 25(2) TDDDG.',
      ),
      p(
        'Analytics, marketing and tracking technologies are used only after you have consented. The legal basis is Art. 6(1)(a) GDPR and Section 25(1) TDDDG. No analytics or marketing tools are currently activated without consent. Services such as Google Analytics, HubSpot Tracking or the LinkedIn Insight Tag are used only after consent and compliant setup.',
      ),
    ]),
    section(13, '133:39', 'Consent Management with Borlabs Cookie', [
      p(
        'We use or plan to use Borlabs Cookie to obtain, manage and document consent for cookies and comparable technologies. The following data may be processed:',
      ),
      list(
        'Consent status',
        'Cookie selection',
        'Time of consent or refusal',
        'Technical information used to assign the consent',
        'Cookie banner version',
        'Website domain and path',
      ),
      p(
        'Borlabs Cookie is used to obtain legally required consent and document it verifiably. The legal basis is Art. 6(1)(c) GDPR in conjunction with our obligation to demonstrate consent, and Art. 6(1)(f) GDPR. Technically necessary information is also stored under Section 25(2) TDDDG.',
      ),
      p(
        'Once a cookie banner is used, you can change or withdraw your consent at any time through the cookie settings on our website.',
      ),
    ]),
    section(14, '133:54', 'Cookie and Tool Overview', [
      {
        type: 'table',
        caption: 'Cookie and tool overview',
        headers: [
          'Service',
          'Category',
          'Purpose',
          'Legal basis',
          'Activation',
        ],
        rows: [
          [
            'Borlabs Cookie',
            'Technically necessary',
            'Cookie consent management and evidence',
            'Art. 6(1)(c)/(f) GDPR; Section 25(2) TDDDG',
            'Always active if a cookie banner is used',
          ],
          [
            'Railway',
            'Technically necessary',
            'Hosting, security and server operation',
            'Art. 6(1)(f) GDPR',
            'Always active',
          ],
          [
            'IONOS',
            'Technically necessary',
            'Domain management',
            'Art. 6(1)(b)/(f) GDPR',
            'Always active',
          ],
          [
            'Google Workspace',
            'Communication / organisation',
            'Email, calendar, files and collaboration',
            'Art. 6(1)(b)/(c)/(f) GDPR',
            'Active in business operations',
          ],
          [
            'Google Analytics',
            'Analytics',
            'Reach measurement and website optimisation',
            'Art. 6(1)(a) GDPR; Section 25(1) TDDDG',
            'Only after consent',
          ],
          [
            'HubSpot Tracking',
            'Analytics / marketing',
            'Lead tracking, form analytics and CRM assignment',
            'Art. 6(1)(a) GDPR; Section 25(1) TDDDG',
            'Only after consent',
          ],
          [
            'HubSpot CRM',
            'CRM',
            'Contact and lead management',
            'Art. 6(1)(b)/(f) GDPR',
            'After compliant setup',
          ],
          [
            'LinkedIn Insight Tag',
            'Marketing',
            'Conversion tracking, retargeting and campaign analytics',
            'Art. 6(1)(a) GDPR; Section 25(1) TDDDG',
            'Only after consent',
          ],
          [
            'LinkedIn',
            'Social media / marketing',
            'Company page, communication and B2B network',
            'Art. 6(1)(f) GDPR',
            'Where used',
          ],
          [
            'LinkedIn API',
            'Integration',
            'LinkedIn functions and interfaces',
            'Art. 6(1)(a)/(b)/(f) GDPR',
            'Where used',
          ],
          [
            'Google Gemini API',
            'AI',
            'AI-supported processing',
            'Art. 6(1)(b)/(f) GDPR',
            'Where used',
          ],
          [
            'OpenAI API',
            'AI',
            'AI-supported processing',
            'Art. 6(1)(b)/(f) GDPR',
            'After compliant setup',
          ],
          [
            'Anthropic Claude API',
            'AI',
            'AI-supported processing',
            'Art. 6(1)(b)/(f) GDPR',
            'After compliant setup',
          ],
          [
            'Crawl4AI',
            'Research / data extraction',
            'Crawling and structuring publicly accessible information',
            'Art. 6(1)(f) GDPR',
            'Where used',
          ],
        ],
      },
    ]),
    section(15, '133:67', 'Google Analytics', [
      p(
        'We plan to use Google Analytics to analyse use of our website and improve our offering. Google Analytics is used only after you consent through our cookie banner and the compliant setup, including the required data processing agreement, has been completed.',
      ),
      p('The following data may be processed:'),
      list(
        'Pages visited',
        'Click paths',
        'Time spent',
        'Scroll and interaction data',
        'Approximate location data',
        'Device information',
        'Browser information',
        'Referrer',
        'Campaign parameters',
        'IP address in truncated or otherwise protected form',
        'Cookie or device identifiers',
      ),
      p(
        'Processing takes place exclusively on the basis of your consent under Art. 6(1)(a) GDPR and Section 25(1) TDDDG. Data retention in Google Analytics is set to 14 months. You can withdraw consent at any time through our website’s cookie settings.',
      ),
    ]),
    section(16, '133:89', 'HubSpot CRM and HubSpot Analytics', [
      p(
        'We plan to use HubSpot for customer relationship management, contact administration, lead management, sales, marketing, communication and analytics. HubSpot will be used only after the required data-protection agreements have been concluded. Tracking and analytics functions are activated only after consent through our cookie banner.',
      ),
      p('The following data may be processed:'),
      list(
        'Name',
        'Email address',
        'Telephone number',
        'Company',
        'Position',
        'Business contact details',
        'Communication history',
        'Enquiry content',
        'Interests and interactions',
        'Website visits where tracking is activated and consented to',
        'Form submissions',
        'Campaign and lead status',
        'Technical usage data',
      ),
      p(
        'CRM processing is used to manage customer and prospect data, handle enquiries, initiate contracts, maintain business relationships and organise sales processes. The legal bases are Art. 6(1)(b) and Art. 6(1)(f) GDPR. For HubSpot tracking, marketing cookies and analytics, the legal basis is Art. 6(1)(a) GDPR and Section 25(1) TDDDG.',
      ),
    ]),
    section(17, '133:112', 'LinkedIn Company Page and Social Media', [
      p(
        'We use LinkedIn to present our company, communicate in a B2B context, initiate business and maintain professional contacts. When you visit our LinkedIn page or interact with us there, LinkedIn may process personal data under its own responsibility. We may also process data you provide to us through LinkedIn.',
      ),
      list(
        'Profile name',
        'Public profile information',
        'Comments',
        'Direct messages',
        'Reactions',
        'Shared content',
        'Professional contact details',
        'Communication content',
      ),
      p(
        'We process this data for communication, public relations, business initiation and maintenance of our professional network. The legal basis is Art. 6(1)(f) GDPR. Our legitimate interests are professional communication, brand presence and business development. Art. 6(1)(b) GDPR also applies where your enquiry concerns a contract or pre-contractual steps.',
      ),
    ]),
    section(18, '133:130', 'LinkedIn API', [
      p(
        'We plan to use, or use, the LinkedIn API where required for integrations with LinkedIn functions. Depending on the integration, the following may be processed:',
      ),
      list(
        'LinkedIn profile information',
        'Professional contact details',
        'Company data',
        'Interaction data',
        'Campaign data',
        'API usage data',
        'Authentication and authorisation data',
      ),
      p(
        'Processing takes place only within the relevant LinkedIn permissions and API access. Depending on the use, the legal basis is Art. 6(1)(a), Art. 6(1)(b) or Art. 6(1)(f) GDPR.',
      ),
    ]),
    section(19, '134:39', 'LinkedIn Insight Tag', [
      p(
        'We plan to use the LinkedIn Insight Tag for conversion tracking, campaign measurement, retargeting and audience analysis. It is used only after you consent through our cookie banner and the compliant setup is complete.',
      ),
      list(
        'URL',
        'Referrer URL',
        'IP address',
        'Device and browser characteristics',
        'Timestamp',
        'Page views',
        'Interactions',
        'Pseudonymous LinkedIn member information',
        'Campaign and conversion data',
      ),
      p(
        'Processing takes place exclusively on the basis of your consent under Art. 6(1)(a) GDPR and Section 25(1) TDDDG. You can withdraw consent at any time through our website’s cookie settings.',
      ),
    ]),
    section(20, '134:58', 'Direct Marketing and Business Outreach', [
      p(
        'We may process personal data of prospects and business contacts to provide information about our services, establish business relationships or maintain existing contacts. This may include:',
      ),
      list(
        'Name',
        'Business email address',
        'Telephone number',
        'Company',
        'Position',
        'Industry',
        'Publicly available professional information',
        'Communication history',
        'Interest in our services',
      ),
      p(
        'The legal basis is Art. 6(1)(f) GDPR. Our legitimate interest is B2B communication, business initiation, customer care and marketing our own services. For advertising requiring consent, particularly newsletters or certain electronic marketing measures, we obtain consent in advance under Art. 6(1)(a) GDPR. You may object to processing for direct marketing at any time.',
      ),
    ]),
    section(21, '134:77', 'Customer, Contract and Invoice Data', [
      p(
        'If you are a customer, prospect, supplier or business partner, we process personal data for contract initiation and performance, billing, communication and statutory documentation. This includes in particular:',
      ),
      list(
        'Name',
        'Contact details',
        'Company',
        'Billing address',
        'Contract data',
        'Payment information',
        'Service data',
        'Communication history',
        'Tax-relevant information',
      ),
      p(
        'The legal bases are Art. 6(1)(b) and Art. 6(1)(c) GDPR. We store business correspondence, invoices and tax-relevant documents for 6 to 10 years in accordance with statutory retention obligations.',
      ),
    ]),
    section(22, '134:94', 'Calendars, Appointments and Video Conferences', [
      p(
        'We use Google Workspace in particular for scheduling, calendar management and business communication. The following data may be processed:',
      ),
      list(
        'Name',
        'Email address',
        'Company',
        'Appointment data',
        'Calendar content',
        'Meeting links',
        'Communication content',
        'Technical connection data',
      ),
      p(
        'The legal bases are Art. 6(1)(b) and Art. 6(1)(f) GDPR. Our legitimate interest is efficient scheduling and business communication.',
      ),
    ]),
    section(23, '134:110', 'AI Systems and AI APIs', [
      p(
        'We use or plan to use AI systems and AI APIs to support our business activities. These include Google Gemini API, OpenAI API, Anthropic Claude API and Crawl4AI where used for web crawling and data extraction.',
      ),
      p('We use AI systems in particular for:'),
      list(
        'Drafting text',
        'Summaries',
        'Research support',
        'Analysis of publicly accessible information',
        'Support for sales, marketing and go-to-market processes',
        'Technical automation',
        'Data structuring',
        'Internal productivity and communication processes',
      ),
      p(
        'Depending on the use, prompts and inputs, uploaded files or text excerpts, business communication, public company and contact information, technical metadata, generated responses, and usage and log data may be processed.',
      ),
      p(
        'As a rule, we do not use AI APIs to process special categories of personal data under Art. 9 GDPR, confidential customer data or trade secrets unless an explicit legal basis, contractual safeguards and appropriate protective measures exist. Depending on the case, the legal bases are Art. 6(1)(b) and Art. 6(1)(f) GDPR; where consent is required, processing is based on Art. 6(1)(a) GDPR.',
      ),
    ]),
    section(24, '134:139', 'Google Gemini API', [
      p(
        'We use or plan to use the Google Gemini API for AI-supported functions. Inputs, outputs, files, system instructions, technical metadata and log data may be processed. The data processing terms with Google are in place.',
      ),
      p(
        'Depending on the use, the legal bases are Art. 6(1)(b) and Art. 6(1)(f) GDPR. Our legitimate interest is efficient processing, automation, analysis, quality assurance and increased productivity.',
      ),
    ]),
    section(25, '135:39', 'OpenAI API', [
      p(
        'We plan to use the OpenAI API for AI-supported functions. It will be used only once the compliant setup is complete and, where required, a suitable data processing agreement or Data Processing Addendum is in place.',
      ),
      list(
        'Prompts',
        'Inputs',
        'Outputs',
        'Technical metadata',
        'API logs',
        'Usage data',
      ),
      p(
        'Depending on the use, the legal bases are Art. 6(1)(b) and Art. 6(1)(f) GDPR.',
      ),
    ]),
    section(26, '135:53', 'Anthropic Claude API', [
      p(
        'We plan to use the Anthropic Claude API for AI-supported functions. It will be used only once the compliant setup is complete and, where required, a suitable data processing agreement or Data Processing Addendum is in place.',
      ),
      list(
        'Prompts',
        'Inputs',
        'Outputs',
        'Technical metadata',
        'Security and usage information',
        'API logs',
      ),
      p(
        'Depending on the use, the legal bases are Art. 6(1)(b) and Art. 6(1)(f) GDPR.',
      ),
    ]),
    section(27, '135:67', 'Crawl4AI and Web Crawling', [
      p(
        'We use or plan to use Crawl4AI to collect and structure publicly accessible website content or prepare it for internal analysis and research. Depending on the use, the following may be processed:',
      ),
      list(
        'Publicly accessible website content',
        'URLs',
        'Company information',
        'Business contact details where publicly available',
        'Technical retrieval data',
        'Retrieval times',
        'Structured extracts from public sources',
      ),
      p(
        'We do not use crawling to bypass protected areas, login areas, paywalls or obviously confidential information. As far as technically and organisationally possible, we observe robots.txt, terms of use, objections and data-protection limits.',
      ),
      p(
        'The legal basis is Art. 6(1)(f) GDPR. Our legitimate interest is market research, business development, data structuring and analysis of publicly available information. We generally store personal data from crawling for 6 to 12 months unless a business relationship arises or another legitimate purpose justifies longer storage. Data subjects may object for reasons arising from their particular situation.',
      ),
    ]),
    section(
      28,
      '135:85',
      'CRM, Lead Management and Publicly Available Business Data',
      [
        p(
          'We may process publicly available business data, data from professional networks and data from direct communications in our CRM. This includes in particular:',
        ),
        list(
          'Name',
          'Company',
          'Position',
          'Business email address',
          'Business telephone number',
          'Professional profiles',
          'Industry',
          'Company size',
          'Communication history',
          'Interest in our services',
          'Lead status',
          'Notes on conversations and meetings',
        ),
        p(
          'Processing is carried out for business initiation, customer administration, sales organisation, communication and documentation. The legal basis is Art. 6(1)(f) GDPR. Our legitimate interest is conducting and organising our B2B business activities.',
        ),
        p(
          'We generally retain CRM prospect data for 24 months after the last contact unless a business relationship arises or another legitimate reason for longer storage exists. You may object to processing for direct marketing at any time.',
        ),
      ],
    ),
    section(29, '135:107', 'No Automated Decisions with Legal Effect', [
      p(
        'We do not make decisions based solely on automated processing within the meaning of Art. 22 GDPR that produce legal effects concerning you or similarly significantly affect you.',
      ),
      p(
        'If we use such procedures in the future, we will inform you separately.',
      ),
    ]),
    section(30, '135:113', 'Your Rights', [
      p(
        'Subject to the statutory requirements, you have the following rights:',
      ),
      list(
        'Right of access under Art. 15 GDPR',
        'Right to rectification under Art. 16 GDPR',
        'Right to erasure under Art. 17 GDPR',
        'Right to restriction of processing under Art. 18 GDPR',
        'Right to data portability under Art. 20 GDPR',
        'Right to object under Art. 21 GDPR',
        'Right to withdraw consent under Art. 7(3) GDPR',
        'Right to lodge a complaint with a data protection supervisory authority under Art. 77 GDPR',
      ),
      p('To exercise your rights, contact us at hello@mi-goto.com.'),
    ]),
    section(31, '136:39', 'Right to Object', [
      p(
        'Where we process personal data on the basis of Art. 6(1)(f) GDPR, you may object to that processing at any time for reasons arising from your particular situation.',
      ),
      p(
        'Where we process personal data for direct marketing, you may object at any time to processing for that purpose. Following such an objection, we will no longer use your data for direct marketing.',
      ),
    ]),
    section(32, '136:46', 'Withdrawal of Consent', [
      p(
        'Where you have given us consent, you may withdraw it at any time with effect for the future. The lawfulness of processing before withdrawal remains unaffected.',
      ),
      p(
        'You can change or withdraw cookie and tracking consent at any time through our website’s cookie settings once a cookie banner is in use.',
      ),
    ]),
    section(
      33,
      '136:53',
      'Right to Lodge a Complaint with the Supervisory Authority',
      [
        p(
          'You have the right to lodge a complaint with a data protection supervisory authority. The following supervisory authority is generally responsible for us:',
        ),
        contact(
          'Berlin Commissioner for Data Protection and Freedom of Information',
          'Alt-Moabit 59–61',
          '10555 Berlin',
          'Germany',
          'Phone: +49 30 13889-0',
          'Email: mailbox@datenschutz-berlin.de',
        ),
      ],
    ),
    section(34, '136:60', 'Information for Users Outside the European Union', [
      p(
        'Our offering is primarily directed at users, customers and business partners in Germany and the European Union. Where people outside the European Union or European Economic Area use our website or services, additional privacy rights may apply depending on their place of residence.',
      ),
      p(
        'We do not sell personal data in the conventional sense in exchange for money. Certain analytics or marketing services, particularly tracking and retargeting technologies, may be regarded as “sharing”, “sale” or “targeted advertising” under individual international privacy laws. Such services are used only when activated and, where required, consent has been given.',
      ),
      p('Privacy rights requests may be sent to hello@mi-goto.com.'),
    ]),
    section(35, '136:70', 'Changes to This Data Protection Notice', [
      p(
        'We may amend this Data Protection Notice if our data processing, services used, technical procedures or legal requirements change.',
      ),
      p('The current version published on our website applies.'),
    ]),
  ],
};
