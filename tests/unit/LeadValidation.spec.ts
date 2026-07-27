import { describe, expect, it } from 'vitest';

import type { LeadFormValues } from '../../src/types/lead';
import {
  validateLead,
  validateLeadField,
} from '../../src/utils/leadValidation';

describe('lead validation', () => {
  it('requires every visible contract field', () => {
    expect(
      validateLead({
        firstName: '',
        familyName: ' ',
        company: '',
        workEmail: '',
      }),
    ).toEqual({
      firstName: 'First name is required.',
      familyName: 'Family name is required.',
      company: 'Company is required.',
      workEmail: 'Work email is required.',
    });
  });

  it('validates email format without adding unconfirmed fields', () => {
    const values: LeadFormValues = {
      firstName: 'Ada',
      familyName: 'Lovelace',
      company: 'Analytical Engines',
      workEmail: 'not-an-email',
    };

    expect(validateLead(values)).toEqual({
      workEmail: 'Enter a valid work email address.',
    });
    expect(validateLeadField('workEmail', 'ada@example.com')).toBeUndefined();
    expect(Object.keys(values)).toEqual([
      'firstName',
      'familyName',
      'company',
      'workEmail',
    ]);
  });
});
