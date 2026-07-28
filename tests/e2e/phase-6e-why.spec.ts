import { expect, test } from '@playwright/test';

for (const viewport of [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
]) {
  test(`renders approved Why page at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('/why-mi-goto');

    await expect(page).toHaveTitle('Why mi-goTo | mi-goTo');
    await expect(page.locator('header.app-navbar--why')).toHaveCount(1);
    await expect(page.locator('footer.app-footer--why')).toHaveCount(1);
    await expect(page.locator('header.app-navbar--landing')).toHaveCount(0);
    await expect(page.locator('header.app-navbar--contact')).toHaveCount(0);
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page.locator('main section')).toHaveCount(7);
    await expect(page.locator('#story')).toBeVisible();
    await expect(page.locator('#mission')).toBeVisible();
    await expect(page.locator('#pillars')).toBeVisible();
    await expect(page.locator('#impact')).toBeVisible();
    await expect(page.getByText('Phase 5 route shell')).toHaveCount(0);

    const bodyWidth = await page.locator('body').evaluate((element) => element.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewport.width);

    await page.screenshot({
      path: `test-results/phase-6e-why-${viewport.name}.png`,
      fullPage: true,
    });
  });
}

test('preserves Landing, Contact and Legal chrome', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('header.app-navbar--solid')).toHaveCount(1);
  await expect(page.locator('header.app-navbar--why')).toHaveCount(0);

  await page.goto('/contact');
  await expect(page.locator('header.app-navbar--contact')).toHaveCount(1);
  await expect(page.locator('footer.app-footer--contact')).toHaveCount(1);

  await page.goto('/imprint');
  await expect(page.locator('header.app-navbar--solid')).toHaveCount(1);
  await expect(page.locator('footer.app-footer--why')).toHaveCount(0);
});
