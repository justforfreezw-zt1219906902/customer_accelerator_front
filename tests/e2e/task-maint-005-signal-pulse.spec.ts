import { expect, test } from '@playwright/test';

test.describe('TASK-MAINT-005 Stage B Signal Pulse', () => {
  test.use({ viewport: { width: 1440, height: 900 } });
  test('captures formal Overview at exact 1440 viewport', async ({ page }) => {
    await page.goto('/demo/signals');
    await expect(
      page.getByRole('heading', { name: 'Signal Pulse' }),
    ).toBeVisible();
    expect(await page.evaluate(() => [innerWidth, innerHeight])).toEqual([
      1440, 900,
    ]);
    await expect(page.locator('.pulse-page__metrics button')).toHaveCount(5);
    await expect(page.locator('.market-pattern-card')).toHaveCount(3);
    await expect(page.locator('.signal-urgency-card')).toHaveCount(3);
    await page.screenshot({
      path: 'test-results/task-maint-005-page-16-overview-1440x900.png',
      fullPage: true,
    });
  });
  test('filters deterministically and supports all persona tabs without URL mutation', async ({
    page,
  }) => {
    await page.goto('/demo/signals');
    await page.getByRole('button', { name: /New This Week/ }).click();
    await expect(page.locator('.signal-urgency-card')).toHaveCount(2);
    for (const tab of [
      'Prioritize',
      'Outreach',
      'Content',
      'Strategy',
      'Overview',
    ]) {
      await page.getByRole('tab', { name: tab }).click();
      await expect(page).toHaveURL(/\/demo\/signals$/);
    }
  });
  test('keeps Dell non-routable and routes approved account/list/content actions', async ({
    page,
  }) => {
    await page.goto('/demo/signals');
    await expect(
      page.locator('[data-routability="representative_non_routable_fixture"]'),
    ).toHaveJSProperty('tagName', 'ARTICLE');
    await expect(
      page.getByLabel('Open Oracle account overview'),
    ).toHaveAttribute('href', '/demo/accounts/demo-acc-001');
    await page.getByRole('tab', { name: 'Content' }).click();
    await expect(
      page.getByRole('button', { name: 'Save Brief' }).first(),
    ).toBeDisabled();
    await page.getByRole('button', { name: 'Draft Content' }).first().click();
    await expect(page).toHaveURL(/\/demo\/content-studio$/);
    await page.goto('/demo/signals');
    await page.getByRole('link', { name: /View Account List/ }).click();
    await expect(page).toHaveURL(/\/demo$/);
  });
});
