import { expect, test } from '@playwright/test';

for (const width of [1440, 1024, 768]) {
  test(`Demo shell renders at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/demo');
    await expect(page.locator('.demo-layout')).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex, nofollow',
    );
    await page.screenshot({
      path: `test-results/task-maint-003-demo-${width}.png`,
      fullPage: true,
    });
  });
}

test('mobile Drawer opens, closes and preserves the Demo URL', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/demo');
  await page.screenshot({
    path: 'test-results/task-maint-003-demo-390-closed.png',
    fullPage: true,
  });
  await page.getByRole('button', { name: 'Open product navigation' }).click();
  await expect(page.locator('.demo-layout__sidebar')).toHaveClass(/is-open/);
  await page.waitForTimeout(250);
  await page.screenshot({
    path: 'test-results/task-maint-003-demo-390-open.png',
    fullPage: true,
  });
  await page.keyboard.press('Escape');
  await expect(page).toHaveURL(/\/demo$/);
  await expect(
    page.getByRole('button', { name: 'Open product navigation' }),
  ).toBeFocused();
});

test('invalid accounts stay inside Product chrome', async ({ page }) => {
  await page.goto('/demo/accounts/unknown');
  await expect(
    page.getByRole('heading', { name: 'Account not found' }),
  ).toBeVisible();
  await expect(
    page.getByRole('navigation', { name: 'Product navigation' }),
  ).toBeVisible();
});

for (const path of ['/', '/why-mi-goto', '/contact']) {
  test(`Marketing route ${path} remains outside Demo`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('.demo-layout')).toHaveCount(0);
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  });
}
