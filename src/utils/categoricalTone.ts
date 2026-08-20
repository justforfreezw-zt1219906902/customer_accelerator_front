export type CategoricalTone = 'brand' | 'amber' | 'success' | 'deep';
const tones: readonly CategoricalTone[] = ['amber', 'success', 'brand', 'deep'];
const commonTagTones: Record<string, CategoricalTone> = {
  'customer 360': 'amber',
  agentforce: 'success',
  trailblazer: 'brand',
};
export function normalizeCategoricalValue(value: string): string { return value.trim().replace(/\s+/g, ' ').toLocaleLowerCase(); }
export function categoricalTagTone(value: string): CategoricalTone {
  const normalized = normalizeCategoricalValue(value);
  if (commonTagTones[normalized]) return commonTagTones[normalized];
  let hash = 0;
  for (const character of normalized) hash = (hash * 31 + character.charCodeAt(0)) | 0;
  return tones[Math.abs(hash) % tones.length];
}
const dimensionTones: Record<string, CategoricalTone> = {
  tone: 'amber', vocabulary: 'success', 'value propositions': 'brand', 'problem framing': 'deep',
  'proof style': 'amber', 'cta patterns': 'success', 'recurring phrases': 'brand', 'signal types': 'deep',
};
export function dnaDimensionTone(dimension: string): CategoricalTone { return dimensionTones[normalizeCategoricalValue(dimension)] ?? 'brand'; }
