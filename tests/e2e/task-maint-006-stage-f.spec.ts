import { expect, test } from '@playwright/test';

const hiringSignal =
  'Hiring: Sr. Field Marketing Specialist – Government, Defense and Intelligence (Demand Gen/Webinar/Field Marketing)';

test('TASK-MAINT-006 Stage F Sales Talking Points formal state', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/demo/content-studio?account=demo-acc-001');
  await page.getByRole('button', { name: 'Sales Talking Points' }).click();
  await page.getByLabel('Persona').selectOption('sales');
  await page.getByLabel('Anchor Signal').selectOption({ label: hiringSignal });
  await expect(
    page.getByText('OPEN WITH WHAT CHANGED', { exact: false }),
  ).toBeVisible();
  await expect(page.getByText('THREE ANGLES')).toBeVisible();
  await expect(page.getByText('LIKELY OBJECTIONS')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Export' })).toBeDisabled();
  const geometry = await page
    .locator('.sales-talking-points-workspace')
    .evaluate((el) => ({
      width: el.getBoundingClientRect().width,
      guidance: el.querySelector('.sales-guidance')!.getBoundingClientRect()
        .width,
      draft: el.querySelector('.sales-draft-region')!.getBoundingClientRect()
        .width,
    }));
  expect(geometry).toEqual({ width: 1152, guidance: 360, draft: 776 });
  await page.screenshot({
    path: 'test-results/task-maint-006-stage-f-sales-talking-points-1440x900.png',
    fullPage: true,
  });
});

test('Sales Talking Points supports structured editing and copy', async ({
  page,
}) => {
  await page.goto('/demo/content-studio?account=demo-acc-001');
  await page.getByRole('button', { name: 'Sales Talking Points' }).click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.getByLabel('Opening shift').fill('Edited local opening');
  await expect(page.getByLabel('Opening shift')).toHaveValue(
    'Edited local opening',
  );
  await page
    .locator('.sales-draft-card')
    .getByRole('button', { name: 'Copy' })
    .click();
  await expect(page.locator('.sales-draft-card')).toContainText(
    'Sales Talking Points',
  );
});
