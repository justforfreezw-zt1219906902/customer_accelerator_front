import type {
  LeadFieldErrors,
  LeadFieldName,
  LeadFormValues,
} from '../types/lead';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const leadValidationMessages: Record<LeadFieldName, string> = {
  firstName: 'First name is required.',
  familyName: 'Family name is required.',
  company: 'Company is required.',
  workEmail: 'Work email is required.',
};

export const validateLeadField = (
  field: LeadFieldName,
  value: string,
): string | undefined => {
  const candidate = value.trim();

  if (!candidate) return leadValidationMessages[field];
  if (field === 'workEmail' && !emailPattern.test(candidate)) {
    return 'Enter a valid work email address.';
  }

  return undefined;
};

export const validateLead = (values: LeadFormValues): LeadFieldErrors => {
  const errors: LeadFieldErrors = {};

  (Object.keys(values) as LeadFieldName[]).forEach((field) => {
    const error = validateLeadField(field, values[field]);
    if (error) errors[field] = error;
  });

  return errors;
};
