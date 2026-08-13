import { expect, test } from '@playwright/test';

const assets = [
  'LinkedIn Ad',
  'Landing Page',
  'Outreach Email',
  'LinkedIn Outreach',
  'Sales Talking Points',
];
const widths = [1024, 768, 390];

for (const width of widths) {
  for (const asset of assets) {
    test(`${asset} remains usable at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/demo/content-studio?account=demo-acc-001');
      await page.getByRole('button', { name: asset, exact: true }).click();
      await expect(
        page.getByRole('button', { name: asset, exact: true }),
      ).toHaveClass(/active/);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
      expect(overflow).toBe(false);
      await page.screenshot({
        path: `test-results/task-maint-006-stage-g-${width}-${asset.toLowerCase().replaceAll(' ', '-')}.png`,
        fullPage: true,
      });
    });
  }
}
