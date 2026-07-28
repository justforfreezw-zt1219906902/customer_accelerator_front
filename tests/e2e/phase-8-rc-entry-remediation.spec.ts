import { expect, test } from '@playwright/test';

const sharedLayoutPaths = [
  '/',
  '/why-mi-goto',
  '/contact',
  '/data-protection',
  '/imprint',
  '/thank-you',
  '/missing-route',
] as const;

test('shared Header logo is crisp, accessible, unique, and navigates Home', async ({
  page,
}) => {
  for (const path of sharedLayoutPaths) {
    await page.goto(path);
    const logo = page
      .locator('.app-navbar')
      .getByRole('link', { name: 'mi-goTo home' });

    await expect(logo).toHaveCount(1);
    await expect(logo).toHaveAttribute('href', '/');
    await expect(logo.locator('img')).toHaveAttribute(
      'src',
      /mi-goto-lockup-light-hidpi/,
    );
    await logo.focus();
    await expect(logo).toBeFocused();
  }

  await page.goto('/contact');
  await page
    .locator('.app-navbar')
    .getByRole('link', { name: 'mi-goTo home' })
    .focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/$/);
});

test('desktop Packages cards and CTA regions align within tolerance', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/#packages');

  const cards = page.locator('#packages .packages-section__card');
  const actions = page.locator('#packages .packages-section__action');
  await expect(cards).toHaveCount(4);
  await expect(actions).toHaveCount(4);
  await expect(cards.nth(2)).toContainText('RECOMMENDED');

  const cardBoxes = await cards.evaluateAll((elements) =>
    elements.map((element) => element.getBoundingClientRect().toJSON()),
  );
  const actionBoxes = await actions.evaluateAll((elements) =>
    elements.map((element) => element.getBoundingClientRect().toJSON()),
  );
  const tolerance = 2;
  const spread = (values: number[]) =>
    Math.max(...values) - Math.min(...values);

  expect(spread(cardBoxes.map((box) => box.y))).toBeLessThanOrEqual(tolerance);
  expect(
    spread(cardBoxes.map((box) => box.y + box.height)),
  ).toBeLessThanOrEqual(tolerance);
  expect(spread(actionBoxes.map((box) => box.y))).toBeLessThanOrEqual(
    tolerance,
  );

  await page.locator('#packages').screenshot({
    path: testInfo.outputPath('packages-aligned-1440.png'),
  });
});

test('Not Found is final, responsive, and uses shared chrome', async ({
  page,
}, testInfo) => {
  for (const width of [1440, 1024, 768, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/this-route-is-missing');

    await expect(page).toHaveTitle('Page not found | mi-goTo');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Page not found',
    );
    await expect(page.getByText('404', { exact: true })).toBeVisible();
    await expect(
      page.getByText(
        'The page you’re looking for doesn’t exist or may have moved.',
      ),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'BACK TO HOME' }),
    ).toHaveAttribute('href', '/');
    await expect(page.locator('.app-navbar')).toHaveCount(1);
    await expect(page.locator('.app-footer')).toHaveCount(1);
    await expect(page.getByText('Return to the Landing Page')).toHaveCount(0);

    await page.screenshot({
      path: testInfo.outputPath(`not-found-${width}.png`),
      fullPage: true,
    });
  }
});

test('captures Header and Packages responsive remediation evidence', async ({
  page,
}, testInfo) => {
  for (const width of [1440, 1024, 768, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/#packages');

    const header = page.locator('.app-navbar');
    const packages = page.locator('#packages');
    await expect(header).toBeVisible();
    await expect(packages).toBeVisible();
    await expect(page.locator('#packages .packages-section__card')).toHaveCount(
      4,
    );

    await header.screenshot({
      path: testInfo.outputPath(`header-${width}.png`),
    });
    await packages.screenshot({
      path: testInfo.outputPath(`packages-${width}.png`),
    });
  }
});
