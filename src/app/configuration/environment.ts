const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const hubspotOwnerId = import.meta.env.VITE_HUBSPOT_OWNER_ID;

if (apiBaseUrl) {
  try {
    new URL(apiBaseUrl);
  } catch {
    throw new Error('VITE_API_BASE_URL must be a valid URL.');
  }
}

export const publicEnvironment = Object.freeze({
  apiBaseUrl,
  hubspotOwnerId,
});
