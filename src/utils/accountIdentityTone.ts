export type AccountIdentityTone = 'brand' | 'amber' | 'success' | 'deep';

const tones: readonly AccountIdentityTone[] = ['brand', 'amber', 'success', 'deep'];

/** Presentation-only identity tone; stable for the same account identifier. */
export function accountIdentityTone(id: string): AccountIdentityTone {
  let hash = 0;
  for (const character of id) hash = (hash * 31 + character.charCodeAt(0)) | 0;
  return tones[Math.abs(hash) % tones.length];
}
