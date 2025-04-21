import { test, expect } from '@playwright/test';

test.describe('UI Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the profile page directly
    await page.goto('https://demoqa.com/books');
  });

  test('Verify authentication and log out button', async ({ page, browserName }) => {
    const logOutButton = page.locator('#submit');
    await expect(logOutButton).toHaveText('Log out');

    // Take a screenshot to verify the state
    await page.screenshot({ path: `screenshots/${browserName}-profile.png` });
  });
});