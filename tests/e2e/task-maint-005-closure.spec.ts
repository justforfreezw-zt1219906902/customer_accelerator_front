import { expect, test } from '@playwright/test';

const pages = [
  {
    id: 15,
    path: '/demo/accounts/demo-acc-001/dna',
    heading: 'Communication DNA — Oracle',
  },
  { id: 16, path: '/demo/signals', heading: 'Signal Pulse' },
  { id: 17, path: '/demo/dna', heading: 'Communication DNA' },
] as const;

for (const width of [1024, 768, 390]) {
  for (const target of pages) {
    test(`Page ${target.id} remains responsive at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
      await page.goto(target.path);
      await expect(
        page.getByRole('heading', { name: target.heading, exact: true }),
      ).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        'content',
        'noindex, nofollow',
      );

      if (target.id === 15) {
        await expect(page.locator('.dna-page__buying-sources li')).toHaveCount(
          14,
        );
        await expect(
          page.getByRole('button', { name: 'Export DNA Report' }),
        ).toBeDisabled();
        await expect(
          page.getByRole('heading', { name: 'Mirroring Guidelines' }),
        ).toBeVisible();
      } else if (target.id === 16) {
        await expect(page.locator('.pulse-page__metrics button')).toHaveCount(
          5,
        );
        await expect(page.getByRole('tab')).toHaveCount(5);
        await expect(
          page.locator(
            '[data-routability="representative_non_routable_fixture"]',
          ),
        ).toBeVisible();
      } else {
        await expect(
          page.getByRole('button', { name: 'All (140)' }).first(),
        ).toBeVisible();
        await expect(
          page.getByRole('button', { name: 'Telecom (5)' }),
        ).toBeVisible();
        await expect(page.getByRole('checkbox')).toHaveCount(6);
      }

      await page.screenshot({
        path: `test-results/task-maint-005-page-${target.id}-${width}.png`,
        fullPage: true,
      });
    });
  }
}

for (const target of pages) {
  test(`Page ${target.id} keeps the accepted mobile Drawer contract`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(target.path);
    const trigger = page.getByRole('button', {
      name: 'Open product navigation',
    });
    await trigger.click();
    await expect(page.locator('.demo-layout__sidebar')).toHaveClass(/is-open/);
    await expect(page.locator('.demo-layout__workspace')).toHaveAttribute(
      'inert',
      '',
    );
    await expect(
      page
        .locator('.demo-layout__sidebar button, .demo-layout__sidebar a')
        .first(),
    ).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(page).toHaveURL(
      new RegExp(`${target.path.replaceAll('/', '\\/')}$`),
    );
    await expect(trigger).toBeFocused();
  });
}

test('integrated routes and representative data boundaries remain intact', async ({
  page,
}) => {
  for (const path of [
    '/demo',
    '/demo/accounts/demo-acc-001',
    '/demo/accounts/demo-acc-001/dna',
    '/demo/signals',
    '/demo/dna',
    '/demo/content-studio',
  ]) {
    await page.goto(path);
    await expect(page.locator('.demo-layout')).toBeVisible();
  }
  await page.goto('/demo/signals');
  const metrics = await page
    .locator('.pulse-page__metrics button strong')
    .allTextContents();
  expect(metrics).toEqual(['42', '2', '3', '129', '3']);
  await page.goto('/demo/dna');
  for (const label of [
    'All (140)',
    'Focus Accounts (8)',
    'Tier 1 (2)',
    'Tier 2 (130)',
  ]) {
    await expect(
      page.getByRole('button', { name: label }).first(),
    ).toBeVisible();
  }
  await expect(page.locator('.dna-portfolio-card')).toHaveCount(6);
});
