import fs from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import {
  breakpoints,
  colors,
  fontFamilies,
  fontWeights,
  layout,
  motion,
  opacity,
  radius,
  shadows,
  spacing,
  stroke,
  typography,
} from '../../src/design-system/tokens';

const themePath = path.resolve(
  process.cwd(),
  'src/design-system/theme/variables.css',
);
const theme = fs.readFileSync(themePath, 'utf8');
const cssVariableNames = [...theme.matchAll(/^\s*(--[a-z0-9-]+):/gm)].map(
  (match) => match[1],
);

const tokenGroups = {
  colors,
  fontFamilies,
  fontWeights,
  layout,
  motion,
  opacity,
  radius,
  shadows,
  spacing,
  stroke,
  typography,
};

const flatten = (
  value: unknown,
  prefix = '',
): Array<{ key: string; value: string }> => {
  if (typeof value === 'string') return [{ key: prefix, value }];
  if (!value || typeof value !== 'object') return [];

  return Object.entries(value).flatMap(([key, child]) =>
    flatten(child, prefix ? `${prefix}.${key}` : key),
  );
};

describe('design tokens', () => {
  it('declares valid CSS variable names and limits theme overrides to colors', () => {
    expect(cssVariableNames.length).toBeGreaterThan(0);
    expect(
      cssVariableNames.every((name) =>
        /^--[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name),
      ),
    ).toBe(true);

    const repeatedNames = cssVariableNames.filter(
      (name, index) => cssVariableNames.indexOf(name) !== index,
    );

    expect(repeatedNames.length).toBeGreaterThan(0);
    expect(repeatedNames.every((name) => name.startsWith('--color-'))).toBe(
      true,
    );
    expect(new Set(repeatedNames).size).toBe(repeatedNames.length);
  });

  it('exports unique semantic TypeScript keys backed by CSS variables', () => {
    const entries = Object.entries(tokenGroups).flatMap(([group, value]) =>
      flatten(value, group),
    );
    const keys = entries.map(({ key }) => key);

    expect(new Set(keys).size).toBe(keys.length);
    expect(
      entries.every(({ value }) => /^var\(--[a-z0-9-]+\)$/.test(value)),
    ).toBe(true);

    for (const { value } of entries) {
      const cssName = value.slice(4, -1);
      expect(cssVariableNames).toContain(cssName);
    }
  });

  it('keeps breakpoints empty until Figma or a human defines them', () => {
    expect(breakpoints).toEqual({});
  });

  it('maps the Figma-confirmed bold Header/Footer weight', () => {
    expect(fontWeights.bold).toBe('var(--font-weight-bold)');
    expect(theme).toContain('--font-weight-bold: 700;');
  });
});
