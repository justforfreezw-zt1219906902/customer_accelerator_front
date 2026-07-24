import { expect, test } from '@playwright/test';

test('renders the foundation placeholder', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', {
      name: 'Vue foundation is ready for review',
    }),
  ).toBeVisible();
});
