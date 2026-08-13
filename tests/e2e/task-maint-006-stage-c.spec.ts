import { expect, test } from '@playwright/test';

test('TASK-MAINT-006 Stage C Landing Page formal state', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/demo/content-studio?account=demo-acc-001');
  await page.getByRole('button', { name: 'Landing Page' }).click();
  await expect(page.locator('.landing-workspace')).toBeVisible();
  await expect(page.getByText('MICRO-SITE · ORACLE')).toBeVisible();
  await expect(page.getByText('CONSIDERATION')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Export' })).toBeDisabled();
  await expect(page.locator('.landing-workspace')).toHaveCSS(
    'grid-template-columns',
    '360px 760px',
  );
  await expect(page.locator('.landing-draft')).toHaveCSS('width', '760px');
  await page.screenshot({
    path: 'test-results/task-maint-006-stage-c-landing-page-1440x900.png',
    fullPage: true,
  });
});

test('TASK-MAINT-006 Stage C local edit and regeneration', async ({ page }) => {
  await page.goto('/demo/content-studio?account=demo-acc-001');
  await page.getByRole('button', { name: 'Landing Page' }).click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page
    .getByRole('textbox', { name: 'Landing hero headline' })
    .fill('A local headline');
  await expect(
    page.getByRole('textbox', { name: 'Landing hero headline' }),
  ).toHaveValue('A local headline');
  await page.getByRole('button', { name: 'Regenerate' }).click();
  await expect(
    page.getByRole('textbox', { name: 'Landing hero headline' }),
  ).toHaveValue(
    '“Complete and integrated” — backed by intelligence, not guesswork.',
  );
  expect(page.url()).toContain('/demo/content-studio?account=demo-acc-001');
});
