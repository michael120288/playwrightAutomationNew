import { test, expect } from './lc_login';

test('User lands on profile after login', async ({ loggedInPage }) => {
  await expect(loggedInPage).toHaveURL(/.*\/profile\//);
  await expect(loggedInPage.locator('.me-2 ~ h1')).toContainText('Michael Sheptun'); // Adjust if needed
});
