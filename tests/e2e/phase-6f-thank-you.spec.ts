import { expect, test } from '@playwright/test';

for (const viewport of [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet-wide', width: 1024, height: 900 },
  { name: 'tablet-boundary', width: 768, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
]) {
  test(`renders the Thank You Page at ${viewport.name}`, async ({
    page,
  }, testInfo) => {
    const leadRequests: string[] = [];
    page.on('request', (request) => {
      if (request.url().includes('/api/lead')) leadRequests.push(request.url());
    });

    await page.setViewportSize(viewport);
    await page.goto('/thank-you');

    await expect(page).toHaveTitle('Thank You | mi-goTo');
    await expect(page.locator('.app-navbar--contact')).toHaveCount(1);
    await expect(page.locator('.app-footer--contact')).toHaveCount(1);
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Thank you. We have your request.',
      }),
    ).toBeFocused();
    await expect(page.locator('.thank-you-page__step')).toHaveCount(3);
    await expect(
      page.getByRole('link', { name: 'BACK TO HOME' }),
    ).toHaveAttribute('href', '/');
    await expect(
      page.getByRole('link', { name: 'hello@mi-goto.com' }),
    ).toHaveAttribute('href', 'mailto:hello@mi-goto.com');
    expect(leadRequests).toHaveLength(0);

    await page.screenshot({
      path: testInfo.outputPath(`thank-you-${viewport.width}.png`),
      fullPage: true,
    });
  });
}
