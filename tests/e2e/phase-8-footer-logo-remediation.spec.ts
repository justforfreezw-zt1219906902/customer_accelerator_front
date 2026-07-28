import { expect, test } from '@playwright/test';

const footerPaths = [
  '/',
  '/why-mi-goto',
  '/contact',
  '/data-protection',
  '/imprint',
  '/thank-you',
  '/missing-route',
] as const;

test('every shared Footer uses one approved transparent Home logo', async ({
  page,
}) => {
  for (const path of footerPaths) {
    await page.goto(path);
    const footer = page.locator('.app-footer');
    const logo = footer.getByRole('link', { name: 'mi-goTo home' });

    await expect(footer).toHaveCount(1);
    await expect(logo).toHaveCount(1);
    await expect(logo).toHaveAttribute('href', '/');
    await expect(logo.locator('img')).toHaveAttribute(
      'src',
      /mi-goto-lockup-light-hidpi/,
    );
    await expect(logo).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await expect(logo.locator('img')).toHaveCSS('filter', 'none');
    await expect(logo.locator('img')).toHaveCSS('opacity', '1');
  }
});

test('Footer logo supports visible focus and keyboard Home navigation', async ({
  page,
}) => {
  await page.goto('/contact');
  const logo = page
    .locator('.app-footer')
    .getByRole('link', { name: 'mi-goTo home' });

  await logo.scrollIntoViewIfNeeded();
  await logo.focus();
  await expect(logo).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/$/);
});

test('captures responsive Footer logo evidence without regressions', async ({
  page,
}, testInfo) => {
  for (const width of [1440, 1024, 768, 390]) {
    for (const [name, path] of [
      ['landing', '/'],
      ['contact', '/contact'],
    ] as const) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      const footer = page.locator('.app-footer');
      const logo = footer.getByRole('link', { name: 'mi-goTo home' });

      await footer.scrollIntoViewIfNeeded();
      await expect(footer).toBeVisible();
      await expect(logo).toBeVisible();
      await expect(logo).toHaveCount(1);
      await expect(footer.locator('a[href="/imprint"]')).toHaveCount(1);
      await expect(footer.locator('a[href="/data-protection"]')).toHaveCount(1);

      await footer.screenshot({
        path: testInfo.outputPath(`footer-${name}-${width}.png`),
      });
    }
  }
});
