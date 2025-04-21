import { test, expect } from './demoqa_login';

test('User lands on profile after login', async ({ loggedInPageDemoQA }) => {
  await expect(loggedInPageDemoQA).toHaveURL(/profile/);
  await expect(loggedInPageDemoQA.locator('#userName-value')).toContainText('MichaelPasv'); // Adjust if needed
});

