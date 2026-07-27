import { expect, test } from '@playwright/test';

test('renders the Contact UI at desktop without backend submission', async ({
  page,
}, testInfo) => {
  const leadRequests: string[] = [];
  page.on('request', (request) => {
    if (request.url().includes('/api/lead')) leadRequests.push(request.url());
  });

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/contact');

  const header = page.locator('.app-navbar--contact');
  const form = page.locator('.lead-form');
  const footer = page.locator('.app-footer--contact');

  await expect(header).toHaveCount(1);
  await expect(footer).toHaveCount(1);
  await expect(form).toHaveCount(1);
  await expect(header).toContainText('HOME');
  await expect(header).not.toContainText('THE METHOD');
  await expect(footer).toContainText('Home');
  await expect(footer).toContainText('Imprint');
  await expect(footer).toContainText('Data protection');
  await expect(footer).not.toContainText(
    'Technology should understand before it speaks.',
  );
  await expect(page).toHaveTitle('Contact | mi-goTo');
  await expect(page.locator('#contact-page-title')).toBeFocused();
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Let’s start with the right context.',
    }),
  ).toBeVisible();
  await expect(page.locator('input')).toHaveCount(4);
  await expect(page.locator('input[name="owner"]')).toHaveCount(0);

  await header.screenshot({
    path: testInfo.outputPath('contact-header-1440.png'),
  });
  await form.screenshot({
    path: testInfo.outputPath('contact-form-1440.png'),
  });
  await footer.screenshot({
    path: testInfo.outputPath('contact-footer-1440.png'),
  });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.locator('#contact-page-title').focus();
  await page.screenshot({
    path: testInfo.outputPath('contact-1440.png'),
    fullPage: true,
  });

  await page.locator('input[name="workEmail"]').press('Enter');
  await expect(page.locator('.lead-form__error-summary')).toContainText(
    'First name is required.',
  );
  expect(leadRequests).toHaveLength(0);
});

test('renders the Contact UI responsively at 390px', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/contact');

  await expect(page.locator('.app-navbar--contact')).toHaveCount(1);
  await expect(page.locator('.app-footer--contact')).toHaveCount(1);
  await expect(page.locator('.contact-page__trust-column')).toBeVisible();
  await expect(page.locator('.lead-form')).toBeVisible();
  await expect(page.locator('input')).toHaveCount(4);

  await page.locator('.app-navbar--contact').screenshot({
    path: testInfo.outputPath('contact-header-390.png'),
  });
  await page.locator('.lead-form').screenshot({
    path: testInfo.outputPath('contact-form-390.png'),
  });
  await page.locator('.app-footer--contact').screenshot({
    path: testInfo.outputPath('contact-footer-390.png'),
  });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.locator('#contact-page-title').focus();
  await page.screenshot({
    path: testInfo.outputPath('contact-390.png'),
    fullPage: true,
  });
});
