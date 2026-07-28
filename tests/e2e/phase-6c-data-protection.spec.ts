import { expect, test } from '@playwright/test';

for (const viewport of [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
]) {
  test(`renders all approved Data Protection content at ${viewport.width}px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize(viewport);
    await page.goto('/data-protection');

    await expect(page).toHaveTitle('Data Protection | mi-goTo');
    await expect(page.locator('.app-navbar')).toHaveCount(1);
    await expect(page.locator('.app-footer')).toHaveCount(1);
    await expect(page.locator('.data-protection__section')).toHaveCount(35);
    await expect(page.locator('.data-protection__sidebar nav a')).toHaveCount(
      35,
    );
    await expect(page.locator('#data-protection-title')).toBeFocused();
    await expect(
      page.getByText('Final approved legal content belongs'),
    ).toHaveCount(0);
    await expect(page.locator('[data-source-revision]')).toHaveAttribute(
      'data-source-revision',
      'FIGMA-128-3-EN-1.0.0',
    );

    await page.locator('a[href="#section-35"]').click();
    await expect(page).toHaveURL(/#section-35$/);
    await expect(page.locator('#section-35')).toBeVisible();

    await page.screenshot({
      path: testInfo.outputPath(`data-protection-${viewport.name}.png`),
      fullPage: true,
    });
  });
}
