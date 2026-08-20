import { describe, expect, it } from 'vitest';
import { accountInitials, accountIdentityTone } from '../../src/utils/accountIdentity';

describe('canonical account identity', () => {
  it.each([
    ['Oracle', 'O'],
    ['Oracle Corporation', 'OC'],
    ['NVIDIA Corporation', 'NC'],
    ['Siemens', 'S'],
    ['Siemens AG', 'SA'],
    ['  Siemens   AG  ', 'SA'],
    ['', '—'],
  ])('derives %s as %s', (name, expected) => {
    expect(accountInitials(name)).toBe(expected);
  });

  it('keeps presentation tone stable for the same account identifier', () => {
    expect(accountIdentityTone('demo-acc-001')).toBe(accountIdentityTone('demo-acc-001'));
    expect(accountIdentityTone('demo-acc-001')).toBe(accountIdentityTone('demo-acc-001'));
  });
});
