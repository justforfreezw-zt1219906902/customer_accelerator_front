import { expect, test } from '@playwright/test';
test('TASK-MAINT-006 Stage D Outreach Email formal state', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/demo/content-studio?account=demo-acc-001');
  await page.getByRole('button', { name: 'Outreach Email' }).click();
  await expect(page.getByText('Email preview · plain text')).toBeVisible();
  await expect(page.getByText('Cold-email checks')).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Export .txt' }),
  ).toBeDisabled();
  await page.screenshot({
    path: 'test-results/task-maint-006-stage-d-outreach-email-1440x900.png',
    fullPage: true,
  });
});
