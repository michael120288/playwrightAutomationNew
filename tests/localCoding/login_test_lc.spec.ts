import { test, expect } from '@playwright/test';

test('Should access dashboard when authenticated', async ({ page }) => {
  await page.goto('https://coding.pasv.us/profile/5fb95c1f360c14003c7ab541');
  await expect(page.locator('h1')).toContainText('Michael Sheptun'); // or whatever heading appears
});