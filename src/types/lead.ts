export interface LeadFormValues {
  firstName: string;
  familyName: string;
  company: string;
  workEmail: string;
}

export interface LeadRequest extends LeadFormValues {
  owner?: string;
}

export interface LeadSuccessResponse {
  message: string;
  hubspot_contact_id: string;
}

export type LeadFieldName = keyof LeadFormValues;
export type LeadFieldErrors = Partial<Record<LeadFieldName, string>>;
