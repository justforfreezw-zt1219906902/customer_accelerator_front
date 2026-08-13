import { expect, test } from '@playwright/test';

for (const width of [1440, 1024, 768, 390]) {
  test(`Account Discovery visual evidence at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
    await page.goto('/demo');
    await expect(
      page.getByRole('heading', { name: 'Account Discovery' }),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: /Open Oracle/ })).toBeVisible();
    if (width === 1440) {
      expect(page.viewportSize()).toEqual({ width: 1440, height: 900 });
      await expect(page.locator('.discovery-page')).toHaveCSS(
        'width',
        '1200px',
      );
      const content = await page.locator('.discovery-page').boundingBox();
      const table = await page.locator('.discovery-page__table').boundingBox();
      const row = await page
        .locator('.account-row__link')
        .first()
        .boundingBox();
      expect(content?.x).toBe(240);
      expect(table?.x).toBe(264);
      expect(table?.width).toBe(1152);
      expect(row?.height).toBe(72);

      await expect(page.locator('.discovery-page__columns')).toHaveCSS(
        'grid-template-columns',
        '236px 111px 86px 106px 90px 70px 193px 130px',
      );

      const headerStarts = await page
        .locator('.discovery-page__columns > span')
        .evaluateAll((columns) =>
          columns.map((column) => Math.round(column.getBoundingClientRect().x)),
        );
      const rowStarts = await page
        .locator('.account-row__link')
        .first()
        .locator(':scope > *')
        .evaluateAll((columns) =>
          columns.map((column) => Math.round(column.getBoundingClientRect().x)),
        );
      expect(headerStarts).toEqual([281, 531, 656, 756, 876, 980, 1064, 1271]);
      expect(rowStarts).toEqual(headerStarts);
    }
    await page.screenshot({
      path: `test-results/task-maint-004-discovery-${width}.png`,
      fullPage: true,
    });
  });

  test(`Account Overview visual evidence at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
    await page.goto('/demo/accounts/demo-acc-001');
    await expect(
      page.getByRole('heading', { name: 'Oracle Account Overview' }),
    ).toBeAttached();
    await expect(
      page.getByRole('heading', { name: 'Buying Signals' }),
    ).toBeVisible();
    if (width === 1440) {
      await expect(page.locator('.overview-page')).toHaveCSS('width', '1200px');
      const content = await page.locator('.overview-page').boundingBox();
      const reasons = await page
        .locator('.overview-page__reasons article')
        .first()
        .boundingBox();
      expect(content?.x).toBe(240);
      expect(reasons?.height).toBe(170);
    }
    await page.screenshot({
      path: `test-results/task-maint-004-overview-${width}.png`,
      fullPage: true,
    });
  });
}

test('Discovery search and navigation remain keyboard operable', async ({
  page,
}) => {
  await page.goto('/demo');
  await page.getByRole('searchbox', { name: 'Search accounts' }).fill('Oracle');
  await expect(page.getByRole('link', { name: /Oracle/ })).toHaveCount(1);
  await page.getByRole('link', { name: /Oracle/ }).focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/demo\/accounts\/demo-acc-001$/);
});

test('Account Discovery wide-desktop composition expands proportionally', async ({
  page,
}) => {
  await page.setViewportSize({ width: 2048, height: 1024 });
  await page.goto('/demo');

  expect(page.viewportSize()).toEqual({ width: 2048, height: 1024 });
  await expect(
    page.getByRole('heading', { name: 'Account Discovery' }),
  ).toBeVisible();

  const content = await page.locator('.discovery-page').boundingBox();
  const table = await page.locator('.discovery-page__table').boundingBox();
  expect(content?.x).toBe(240);
  expect(content?.width).toBe(1808);
  expect(table?.x).toBe(264);
  expect(table?.width).toBe(1760);

  const resolvedTracks = await page
    .locator('.discovery-page__columns')
    .evaluate((header) =>
      getComputedStyle(header)
        .gridTemplateColumns.split(' ')
        .map(Number.parseFloat),
    );
  const formalTracks = [236, 111, 86, 106, 90, 70, 193, 130];
  const scale = resolvedTracks[0] / formalTracks[0];
  resolvedTracks.forEach((track, index) => {
    expect(track / formalTracks[index]).toBeCloseTo(scale, 2);
  });

  await page.screenshot({
    path: 'test-results/task-maint-004-discovery-wide-2048.png',
    fullPage: true,
  });
});

test('Account Overview preserves the accepted mobile Drawer shell', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/demo/accounts/demo-acc-001');
  await page.getByRole('button', { name: 'Open product navigation' }).click();
  await expect(page.locator('.demo-layout__sidebar')).toHaveClass(/is-open/);
  await expect(
    page.getByRole('heading', { name: 'Oracle Account Overview' }),
  ).toBeAttached();
  await page.keyboard.press('Escape');
  await expect(page).toHaveURL(/\/demo\/accounts\/demo-acc-001$/);
  await expect(
    page.getByRole('button', { name: 'Open product navigation' }),
  ).toBeFocused();
});

test('Overview actions retain opaque account context in deferred route hosts', async ({
  page,
}) => {
  await page.goto('/demo/accounts/demo-acc-001');
  await page.getByRole('button', { name: 'Generate Content' }).click();
  await expect(page).toHaveURL(/\/demo\/content-studio\?account=demo-acc-001$/);
  await expect(page.locator('.demo-route-host')).toBeAttached();
  await page.goto('/demo/accounts/demo-acc-001');
  await page.getByRole('button', { name: 'View Communication DNA' }).click();
  await expect(page).toHaveURL(/\/demo\/accounts\/demo-acc-001\/dna$/);
  await expect(page.locator('.dna-page')).toBeAttached();
});

test('Marketing routes remain isolated from Product pages', async ({
  page,
}) => {
  for (const path of ['/', '/why-mi-goto', '/contact']) {
    await page.goto(path);
    await expect(page.locator('.discovery-page, .overview-page')).toHaveCount(
      0,
    );
  }
});
