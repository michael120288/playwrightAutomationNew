// tests/new-tab.spec.ts
import { test, expect } from '@playwright/test';
import {blockAds} from '../data/abortAd'
import { NewTabPage } from '../page_object/NewTabgPage';

test('should open a new tab and verify content on all viewports', async ({ page }) => {
    await blockAds(page);

  const newTabPage = new NewTabPage(page);

  await newTabPage.navigate();
  await page.pause(); 
  const newPage = await newTabPage.openNewTab();

  const textContent = await newPage.locator('h1').textContent();

  expect(textContent).toContain('Example of a new window page for Automation Testing Practice');

  console.log(`✅ Test passed for project: ${test.info().project.name}`);
});