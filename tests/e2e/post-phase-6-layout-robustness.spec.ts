import { expect, test } from '@playwright/test';

const routes = [
  '/demo',
  '/demo/accounts/demo-acc-001',
  '/demo/accounts/demo-acc-001/dna',
  '/demo/signals',
  '/demo/dna',
  '/demo/content-studio?account=demo-acc-001',
];

for (const width of [1024, 768, 390]) {
  test(`Product routes avoid page overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });

    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator('#demo-main')).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth,
        ),
        `${route} overflowed at ${width}px`,
      ).toBe(false);
    }
  });
}

test('long Outreach Email edits remain reachable without horizontal overflow', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/demo/content-studio?account=demo-acc-001');
  await page
    .getByRole('button', { name: 'Outreach Email', exact: true })
    .click();

  const longText = 'Long source-grounded generated email content '.repeat(20);
  await page.getByRole('textbox', { name: 'Opening' }).fill(longText);
  await page.getByRole('textbox', { name: 'Value' }).fill(longText);
  await page.getByRole('textbox', { name: 'CTA' }).fill(longText);

  await expect(page.getByRole('button', { name: 'Copy' })).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Regenerate' }).last(),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    ),
  ).toBe(false);
});
