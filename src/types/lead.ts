export interface LeadFormValues {
  firstName: string;
  familyName: string;
  company: string;
  workEmail: string;
  context?: string;
}

export interface LeadRequest {
  firstName: string;
  familyName: string;
  company: string;
  workEmail: string;
  context?: string;
}

export interface LeadSuccessResponse {
  message: string;
  hubspot_contact_id: string;
}

export type LeadFieldName = 'firstName' | 'familyName' | 'company' | 'workEmail';
export type LeadFieldErrors = Partial<Record<LeadFieldName, string>>;
