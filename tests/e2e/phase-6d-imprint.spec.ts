import { expect, test } from '@playwright/test';

for (const viewport of [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
]) {
  test(`renders approved Imprint content at ${viewport.width}px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize(viewport);
    await page.goto('/imprint');

    await expect(page).toHaveTitle('Imprint | mi-goTo');
    await expect(page.locator('.app-navbar')).toHaveCount(1);
    await expect(page.locator('.app-footer')).toHaveCount(1);
    await expect(page.locator('.app-navbar--solid')).toHaveCount(1);
    await expect(page.locator('.app-footer--landing')).toHaveCount(1);
    await expect(page.locator('.imprint-page__section')).toHaveCount(10);
    await expect(page.locator('.imprint-page__index a')).toHaveCount(10);
    await expect(page.locator('#imprint-title')).toBeFocused();
    await expect(page.locator('[data-source-revision]')).toHaveAttribute(
      'data-source-revision',
      'FIGMA-122-3-EN-1.0.0',
    );
    await expect(
      page.getByText('Final approved legal content belongs'),
    ).toHaveCount(0);
    await expect(page.getByText('Treptow-Köpenick')).toHaveCount(0);
    await expect(page.getByText('Kleiner Hinweis')).toHaveCount(0);
    await expect(page.locator('a[href$=".pdf"]')).toHaveCount(0);

    await page.locator('a[href="#copyright"]').click();
    await expect(page).toHaveURL(/#copyright$/);
    await expect(page.locator('#copyright')).toBeVisible();

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: testInfo.outputPath(`imprint-${viewport.name}.png`),
      fullPage: true,
    });
  });
}

test('preserves approved legal and marketing layouts', async ({ page }) => {
  await page.goto('/data-protection');
  await expect(page.locator('.data-protection__section')).toHaveCount(35);
  await expect(page.locator('.app-navbar')).toHaveCount(1);
  await expect(page.locator('.app-footer')).toHaveCount(1);

  await page.goto('/');
  await expect(page.locator('.landing-page')).toHaveCount(1);
  await expect(page.locator('.app-navbar')).toHaveCount(1);
  await expect(page.locator('.app-footer')).toHaveCount(1);

  await page.goto('/contact');
  await expect(page.locator('.lead-form')).toHaveCount(1);
  await expect(page.locator('.app-navbar--contact')).toHaveCount(1);
  await expect(page.locator('.app-footer--contact')).toHaveCount(1);
});
