import { expect, test } from '@playwright/test';

test.describe('TASK-MAINT-005 Page 15 Account DNA', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('renders the formal Oracle Page 15 evidence', async ({ page }) => {
    await page.goto('/demo/accounts/demo-acc-001/dna');
    await expect(
      page.getByRole('heading', { name: 'Communication DNA — Oracle' }),
    ).toBeVisible();
    await expect(
      page.getByText('Account Discovery', { exact: true }).nth(1),
    ).toBeVisible();
    await expect(
      page.getByText('Communication DNA', { exact: true }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Export DNA Report' }),
    ).toBeDisabled();
    await expect(page.locator('.dna-page__buying-sources li')).toHaveCount(14);

    expect(await page.evaluate(() => [innerWidth, innerHeight])).toEqual([
      1440, 900,
    ]);
    const content = await page.locator('.dna-page').boundingBox();
    expect(content?.x).toBe(240);
    expect(content?.width).toBe(1200);
    await page.screenshot({
      path: 'test-results/task-maint-005-page-15-1440x900.png',
      fullPage: true,
    });
  });

  test('supports approved actions and invalid-account handling', async ({
    page,
  }) => {
    await page.goto('/demo/accounts/demo-acc-001/dna');
    await page
      .getByRole('button', { name: 'Generate Mirrored Content' })
      .click();
    await expect(page).toHaveURL(
      /\/demo\/content-studio\?account=demo-acc-001$/,
    );
    await page.goto('/demo/accounts/demo-acc-001/dna');
    await page.getByRole('button', { name: /Back/ }).click();
    await expect(page).toHaveURL(/\/demo\/accounts\/demo-acc-001$/);
    await page.goto('/demo/accounts/not-real/dna');
    await expect(
      page.getByRole('heading', { name: 'Account not found' }),
    ).toBeVisible();
  });

  test('preserves explicit safe source links and Demo privacy controls', async ({
    page,
  }) => {
    await page.goto('/demo/accounts/demo-acc-001/dna');
    const source = page.locator('.dna-page__buying-sources a').first();
    await expect(source).toHaveAttribute('href', /^https:\/\//);
    await expect(source).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex, nofollow',
    );
  });
});
