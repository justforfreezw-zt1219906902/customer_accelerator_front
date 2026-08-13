import { expect, test } from '@playwright/test';

const hiringSignal =
  'Hiring: Sr. Field Marketing Specialist – Government, Defense and Intelligence (Demand Gen/Webinar/Field Marketing)';

test.describe('TASK-MAINT-006 Stage E LinkedIn Outreach', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/demo/content-studio?account=demo-acc-001');
    await page.getByRole('button', { name: 'LinkedIn Outreach' }).click();
    await page.getByLabel('Persona').selectOption('sales');
    await page.getByLabel('Anchor Signal').selectOption({ label: hiringSignal });
  });

  test('renders the formal composition and context', async ({ page }) => {
    await expect(page.getByText('DECISION')).toBeVisible();
    await expect(page.getByText('LinkedIn Outreach', { exact: true }).last()).toBeVisible();
    await expect(page.getByLabel('Persona')).toHaveValue('sales');
    await expect(page.getByLabel('Anchor Signal')).toHaveValue(hiringSignal);
    await expect(page.getByRole('button', { name: 'Export' })).toBeDisabled();
    const geometry = await page.locator('.linkedin-outreach-workspace').evaluate((el) => {
      const rect = el.getBoundingClientRect();
      const guidance = el.querySelector('.linkedin-outreach-guidance')!.getBoundingClientRect();
      const region = el.querySelector('.linkedin-outreach-region')!.getBoundingClientRect();
      return { width: rect.width, guidanceWidth: guidance.width, regionWidth: region.width };
    });
    expect(geometry.width).toBe(1152);
    expect(geometry.guidanceWidth).toBe(360);
    expect(geometry.regionWidth).toBe(776);
    await page.screenshot({ path: 'test-results/task-maint-006-stage-e-linkedin-outreach-1440x900.png', fullPage: true });
  });

  test('supports local editing and reactive connection-note validation', async ({ page }) => {
    await page.getByRole('button', { name: 'Edit' }).click();
    const note = page.getByLabel('Connection note');
    await note.fill('x'.repeat(301));
    await expect(note).toHaveAttribute('aria-invalid', 'true');
    await expect(page.getByText('301/300 characters')).toBeVisible();
  });
});
