import { accountIdentityTone, type AccountIdentityTone } from './accountIdentityTone';

export function accountInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return '—';
  return words.slice(0, 2).map((word) => Array.from(word)[0]).join('').toUpperCase();
}

export { accountIdentityTone };
export type { AccountIdentityTone };
