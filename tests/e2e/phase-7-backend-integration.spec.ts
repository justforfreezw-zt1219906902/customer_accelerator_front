import { expect, test } from '@playwright/test';

const fillLead = async (page: import('@playwright/test').Page) => {
  await page.locator('input[name="firstName"]').fill('Integration');
  await page.locator('input[name="familyName"]').fill('Tester');
  await page.locator('input[name="company"]').fill('Synthetic Test Company');
  await page
    .locator('input[name="workEmail"]')
    .fill('integration@example.invalid');
};

test('submits API-CONTRACT-R1 once and navigates to a privacy-safe Thank You route', async ({
  page,
}) => {
  const requests: Array<Record<string, unknown>> = [];
  await page.route('http://localhost:8080/api/lead', async (route) => {
    requests.push(route.request().postDataJSON() as Record<string, unknown>);
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        message: 'lead submitted successfully',
        hubspot_contact_id: 'synthetic-contact-id',
      }),
    });
  });

  await page.goto('/contact');
  await fillLead(page);
  await Promise.all([
    page.waitForURL('**/thank-you'),
    page.getByRole('button', { name: 'SEND REQUEST' }).dblclick(),
  ]);

  expect(requests).toHaveLength(1);
  expect(requests[0]).toEqual({
    firstName: 'Integration',
    familyName: 'Tester',
    company: 'Synthetic Test Company',
    workEmail: 'integration@example.invalid',
  });
  expect(requests[0]).not.toHaveProperty('owner');
  expect(requests[0]).not.toHaveProperty('website');
  expect(requests[0]).not.toHaveProperty('phoneNumber');
  expect(requests[0]).not.toHaveProperty('message');
  await expect(page).toHaveURL(/\/thank-you$/);
  await expect(page).not.toHaveURL(/Integration|synthetic-contact-id/);
  await expect(page.getByText('synthetic-contact-id')).toHaveCount(0);
});

test('retains the Contact form and exposes safe errors without automatic retry', async ({
  page,
}) => {
  let requestCount = 0;
  await page.route('http://localhost:8080/api/lead', async (route) => {
    requestCount += 1;
    await route.fulfill({
      status: 502,
      contentType: 'application/json',
      body: JSON.stringify({
        error: 'failed to create contact in HubSpot',
      }),
    });
  });

  await page.goto('/contact');
  await fillLead(page);
  await page.getByRole('button', { name: 'SEND REQUEST' }).click();

  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.locator('.lead-form__error-summary')).toContainText(
    'We cannot accept the submission right now.',
  );
  await expect(page.locator('.lead-form__error-summary')).not.toContainText(
    'HubSpot',
  );
  await expect(page.locator('input[name="workEmail"]')).toHaveValue(
    'integration@example.invalid',
  );
  expect(requestCount).toBe(1);
  await page.waitForTimeout(100);
  expect(requestCount).toBe(1);
});

test('client validation prevents requests and owner remains non-editable', async ({
  page,
}) => {
  let requestCount = 0;
  await page.route('http://localhost:8080/api/lead', async (route) => {
    requestCount += 1;
    await route.abort();
  });

  await page.goto('/contact');
  await page.getByRole('button', { name: 'SEND REQUEST' }).click();

  await expect(page.locator('.lead-form__error-summary')).toContainText(
    'First name is required.',
  );
  await expect(page.locator('input[name="owner"]')).toHaveCount(0);
  expect(requestCount).toBe(0);
});
