import { expect, test } from '@playwright/test';

test.describe('TASK-MAINT-005 Stage C DNA Portfolio', () => {
  test.use({ viewport: { width: 1440, height: 900 } });
  test('captures the formal default state at exact 1440 viewport', async ({
    page,
  }) => {
    await page.goto('/demo/dna');
    await expect(
      page.getByRole('heading', { name: 'Communication DNA' }),
    ).toBeVisible();
    expect(await page.evaluate(() => [innerWidth, innerHeight])).toEqual([
      1440, 900,
    ]);
    await expect(page.locator('.dna-portfolio-card')).toHaveCount(6);
    await expect(page.locator('.portfolio-page__analysis')).toHaveCount(0);
    const geometry = await page.locator('.portfolio-page').evaluate((root) => {
      const grid = root.querySelector<HTMLElement>('.portfolio-page__grid')!;
      const selection = root.querySelector<HTMLElement>(
        '.portfolio-page__selection',
      )!;
      const card = grid.querySelector<HTMLElement>('.dna-portfolio-card')!;
      const style = getComputedStyle(grid);
      return {
        pageWidth: root.getBoundingClientRect().width,
        gridWidth: grid.getBoundingClientRect().width,
        selectionWidth: selection.getBoundingClientRect().width,
        gridRight: grid.getBoundingClientRect().right,
        selectionRight: selection.getBoundingClientRect().right,
        cardWidth: card.getBoundingClientRect().width,
        columns: style.gridTemplateColumns,
        gap: style.columnGap,
      };
    });
    expect(geometry.pageWidth).toBeCloseTo(1200, 0);
    expect(geometry.gridWidth).toBeCloseTo(1152, 0);
    expect(geometry.selectionWidth).toBeCloseTo(1152, 0);
    expect(geometry.selectionRight).toBeCloseTo(geometry.gridRight, 1);
    expect(geometry.cardWidth).toBeCloseTo(373.33, 1);
    for (const column of geometry.columns.split(' ')) {
      expect(Number.parseFloat(column)).toBeCloseTo(373.33, 1);
    }
    expect(geometry.gap).toBe('16px');
    await expect(page.locator('.demo-topbar__context')).toHaveText(
      'Communication DNA',
    );
    await page.screenshot({
      path: 'test-results/task-maint-005-page-17-default-1440x900.png',
      fullPage: true,
    });
  });
  test('expands all Page 17 content tracks together on wide desktop', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 2048, height: 1034 });
    await page.goto('/demo/dna');
    const geometry = await page.locator('.portfolio-page').evaluate((root) => {
      const grid = root.querySelector<HTMLElement>('.portfolio-page__grid')!;
      const selection = root.querySelector<HTMLElement>(
        '.portfolio-page__selection',
      )!;
      return {
        gridWidth: grid.getBoundingClientRect().width,
        selectionWidth: selection.getBoundingClientRect().width,
        gridRight: grid.getBoundingClientRect().right,
        selectionRight: selection.getBoundingClientRect().right,
        cards: [
          ...grid.querySelectorAll<HTMLElement>('.dna-portfolio-card'),
        ].map((card) => card.getBoundingClientRect().width),
      };
    });
    expect(geometry.selectionWidth).toBeCloseTo(geometry.gridWidth, 1);
    expect(geometry.selectionRight).toBeCloseTo(geometry.gridRight, 1);
    expect(new Set(geometry.cards.map(Math.round)).size).toBe(1);
    await page.screenshot({
      path: 'test-results/task-maint-005-page-17-wide-2048x1034.png',
      fullPage: true,
    });
  });
  test('filters, resets Industry and exposes an accessible empty state', async ({
    page,
  }) => {
    await page.goto('/demo/dna');
    await page.getByRole('button', { name: 'Technology (29)' }).click();
    await expect(page.locator('.dna-portfolio-card')).toHaveCount(1);
    await page.getByRole('button', { name: 'Tier 1 (2)' }).click();
    await expect(
      page.getByRole('button', { name: 'All (140)' }).nth(1),
    ).toHaveAttribute('aria-pressed', 'true');
    await page.getByRole('button', { name: 'Aerospace & Defense (7)' }).click();
    await expect(page.getByRole('status')).toContainText(
      'No curated demo accounts',
    );
  });
  test('supports selection threshold and opaque View Full DNA routing', async ({
    page,
  }) => {
    await page.goto('/demo/dna');
    await expect(page.locator('.portfolio-page__analysis')).toHaveCount(0);
    await page.getByRole('checkbox', { name: 'Select Oracle' }).click();
    await expect(
      page.getByRole('heading', { name: 'Cross-account analysis' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Export Campaign Brief' }),
    ).toBeDisabled();
    await page.getByRole('button', { name: 'View Full DNA →' }).first().click();
    await expect(page).toHaveURL(/\/demo\/accounts\/demo-acc-001\/dna$/);
  });
});
