import { expect, test } from '@playwright/test';

test('captures Phase 6A desktop visual-fidelity evidence', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');

  const header = page.locator('.app-navbar');
  const hero = page.locator('#hero');
  const insufficientDataCard = page.getByTestId('insufficient-data-card');
  const finalCta = page.locator('#final-cta');
  const footer = page.locator('.app-footer');

  await expect(header).toBeVisible();
  await expect(hero).toBeVisible();
  await expect(insufficientDataCard).toContainText('INSUFFICIENT_DATA');
  await expect(page.locator('body')).not.toContainText(
    'Preview content is not available.',
  );
  await expect(finalCta).toContainText(
    'Let’s decode your first account together',
  );
  await expect(finalCta).toContainText('STRATEGY DISCUSSION');
  await expect(page.locator('#main-content section').last()).toHaveAttribute(
    'id',
    'final-cta',
  );
  await expect(footer.locator('#final-cta')).toHaveCount(0);
  await expect(footer).toBeVisible();

  await header.screenshot({ path: testInfo.outputPath('header-1440.png') });
  await hero.screenshot({ path: testInfo.outputPath('hero-1440.png') });
  await insufficientDataCard.screenshot({
    path: testInfo.outputPath('insufficient-data-card-1440.png'),
  });
  await finalCta.screenshot({
    path: testInfo.outputPath('final-cta-1440.png'),
  });
  await footer.screenshot({ path: testInfo.outputPath('footer-1440.png') });
  await page.screenshot({
    path: testInfo.outputPath('landing-1440.png'),
    fullPage: true,
  });
});

test('resolves Landing Team and FAQ anchors without duplicate IDs', async ({
  page,
}) => {
  await page.goto('/imprint');
  await page.locator('.app-footer a[href="/#team"]').click();

  await expect(page).toHaveURL(/\/#team$/);
  await expect(page.locator('#team')).toHaveCount(1);
  await expect(page.locator('#faq')).toHaveCount(1);
  await expect(page.locator('#team')).toBeInViewport();
});

test('renders the current two-person Team in the approved responsive tracks', async ({
  page,
}) => {
  for (const { width, columns } of [
    { width: 1440, columns: 4 },
    { width: 1024, columns: 2 },
    { width: 390, columns: 1 },
  ]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
    await page.goto('/#team');

    const team = page.locator('#team');
    const grid = team.locator('.team-section__grid');
    const cards = grid.locator('.team-section__card');

    await expect(cards).toHaveCount(2);
    await expect(cards.nth(0)).toContainText('Miroslav Stanojevic');
    await expect(cards.nth(1)).toContainText('Wei Zhao');
    await expect(team).not.toContainText('Longfei Li');
    await expect(team).not.toContainText('Bharghav BK');
    await expect(grid).toHaveJSProperty(
      'scrollWidth',
      await grid.evaluate((node) => node.clientWidth),
    );

    const resolvedColumns = await grid.evaluate((node) =>
      getComputedStyle(node).gridTemplateColumns.split(' ').filter(Boolean)
        .length,
    );
    expect(resolvedColumns).toBe(columns);
  }
});

test('captures shared Header and Footer mobile evidence', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const header = page.locator('.app-navbar');
  const footer = page.locator('.app-footer');
  const menuButton = page.getByRole('button', {
    name: 'Toggle navigation menu',
  });

  await expect(menuButton).toBeVisible();
  await menuButton.click();
  await expect(
    page.getByRole('navigation', { name: 'Primary navigation' }),
  ).toBeVisible();
  await header.screenshot({ path: testInfo.outputPath('header-390.png') });

  await footer.scrollIntoViewIfNeeded();
  await expect(footer).toBeVisible();
  await footer.screenshot({ path: testInfo.outputPath('footer-390.png') });
  await page.screenshot({
    path: testInfo.outputPath('landing-390.png'),
    fullPage: true,
  });
});

test('uses the approved Landing Header and Footer across default consumers', async ({
  page,
}) => {
  for (const path of ['/', '/imprint', '/data-protection', '/missing-route']) {
    await page.goto(path);

    await expect(page.locator('.app-navbar')).toHaveCount(1);
    await expect(page.locator('.app-footer')).toHaveCount(1);
    await expect(page.locator('.app-navbar')).toContainText('THE METHOD');
    await expect(page.locator('.app-navbar')).toContainText('WHY MI-GOTO');
    await expect(page.locator('.app-footer')).toContainText(
      'Technology should understand before it speaks.',
    );
    await expect(page.locator('.app-footer')).toContainText(
      'Source-grounded ABM intelligence for B2B growth companies',
    );
    await expect(page.locator('body')).not.toContainText(
      'ABM-first Revenue Marketing Partner for B2B growth companies.',
    );
  }
});
