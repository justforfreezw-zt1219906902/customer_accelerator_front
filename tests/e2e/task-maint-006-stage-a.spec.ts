import { expect, test } from '@playwright/test';

test.describe('TASK-MAINT-006 Stage A Company Preview', () => {
  test.use({ viewport: { width: 1440, height: 900 } });
  test('captures formal Company Preview and verifies Page 18 foundation', async ({
    page,
  }) => {
    await page.goto('/demo/content-studio');
    await expect(
      page.getByRole('heading', { name: 'Content Studio' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Select Oracle' }),
    ).toBeVisible();
    await expect(page.locator('.studio-account-card')).toHaveCount(6);
    await expect(page.getByText('140 of 140')).toBeVisible();
    expect(await page.evaluate(() => [innerWidth, innerHeight])).toEqual([
      1440, 900,
    ]);
    const geometry = await page.locator('.studio-page').evaluate((root) => {
      const filter = root.querySelector<HTMLElement>('.studio-page__filters')!;
      const grid = root.querySelector<HTMLElement>('.studio-page__grid')!;
      const card = root.querySelector<HTMLElement>('.studio-account-card')!;
      return {
        page: filter.getBoundingClientRect().width,
        filter: filter.getBoundingClientRect().width,
        grid: grid.getBoundingClientRect().width,
        card: card.getBoundingClientRect().width,
        columns: getComputedStyle(grid).gridTemplateColumns,
        gap: getComputedStyle(grid).columnGap,
      };
    });
    expect(geometry.page).toBeCloseTo(1152, 0);
    expect(geometry.filter).toBeCloseTo(1152, 0);
    expect(geometry.grid).toBeCloseTo(1152, 0);
    expect(geometry.card).toBeCloseTo(373.33, 1);
    for (const column of geometry.columns.split(' ')) {
      expect(Number.parseFloat(column)).toBeCloseTo(373.33, 1);
    }
    expect(geometry.gap).toBe('16px');
    await expect(page.locator('.demo-topbar__context')).toHaveText(
      'Content Studio',
    );
    await page.screenshot({
      path: 'test-results/task-maint-006-stage-a-company-preview-1440x900.png',
      fullPage: true,
    });
  });
  test('supports query selection, invalid query, filters and noindex', async ({
    page,
  }) => {
    await page.goto('/demo/content-studio');
    await page.getByRole('button', { name: 'Select Oracle' }).click();
    await expect(page).toHaveURL(
      /\/demo\/content-studio\?account=demo-acc-001$/,
    );
    await expect(
      page.getByRole('heading', { name: 'Build context' }),
    ).toBeVisible();
    await page.goto('/demo/content-studio?account=not-real');
    await expect(page.getByRole('alert')).toContainText('Account not found');
    await page
      .getByRole('button', { name: 'Back to account selection' })
      .click();
    await page.getByLabel('Search accounts').fill('Oracle');
    await expect(page.locator('.studio-account-card')).toHaveCount(1);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex, nofollow',
    );
  });
  test('preserves the Demo Shell and Marketing isolation', async ({ page }) => {
    await page.goto('/demo/content-studio');
    await expect(page.locator('.demo-layout')).toBeVisible();
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole('button', { name: 'Open product navigation' }).click();
    await expect(page.locator('.demo-layout__sidebar')).toHaveClass(/is-open/);
    await page.keyboard.press('Escape');
    await expect(page).toHaveURL(/\/demo\/content-studio$/);
    await page.goto('/');
    await expect(page.locator('.demo-layout')).toHaveCount(0);
  });
});
