// global-setup.ts
import { chromium, FullConfig } from '@playwright/test';
import fs from 'fs';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Perform login
  await page.goto('https://demoqa.com/login');
  await page.getByPlaceholder('UserName').fill('MichaelPasv');
  await page.getByPlaceholder('Password').fill('m!chael12SH');
  await page.getByRole('button', { name: 'Login' }).click();

  // Wait until fully logged in
  await page.waitForURL('https://demoqa.com/profile');

  // Optional: validate login was successful
  const user = await page.locator('#userName-value').textContent();
  console.log('✅ Logged in as:', user);

  // Save storage state to use in all tests
  await context.storageState({ path: './.auth/user.json' });

  await browser.close();
}

export default globalSetup;
