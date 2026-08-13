import { expect, test } from '@playwright/test';

test('TASK-MAINT-006 Stage B Single Image formal state', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/demo/content-studio?account=demo-acc-001');
  await expect(
    page.getByRole('heading', { name: 'Content Studio' }),
  ).toBeVisible();
  await expect(page.getByText('LINKEDIN AD PREVIEW')).toBeVisible();
  await expect(page.getByText('BUILT FOR THE ENTERPRISE')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Export' })).toBeDisabled();
  await page.screenshot({
    path: 'test-results/task-maint-006-stage-b-single-image-1440x900.png',
    fullPage: true,
  });
});
