// tests/demoqa-browser-windows.spec.ts
import { test, expect } from '@playwright/test';
import { DemoQABrowserPage } from '../../page_object/newPageDemoQa';
import { blockAds } from '../../data/abortAd';

test.describe('DemoQA Browser Windows Test (Desktop & Mobile)', () => {
  test.beforeEach(async ({ page }) => {
    const demoqaPage = new DemoQABrowserPage(page);
    await demoqaPage.navigate();
  });

  test('should open and verify New Tab content', async ({ page }, testInfo) => {
    await blockAds(page);
    const demoqaPage = new DemoQABrowserPage(page);
    const newTab = await demoqaPage.openNewTab();

    const tabContent = await newTab.locator('h1#sampleHeading').textContent();
    expect(tabContent).toBe('This is a sample page');

    // 📸 Screenshot
    await newTab.screenshot({ path: `screenshots/new-tab-${testInfo.project.name}.png` });

    console.log(`✅ [${testInfo.project.name}] Verified New Tab`);
    await newTab.close();
  });

  test('should open and verify New Window content', async ({ page }, testInfo) => {
    await blockAds(page);
    const demoqaPage = new DemoQABrowserPage(page);
    const newWindow = await demoqaPage.openNewWindow();

    const windowContent = await newWindow.locator('h1#sampleHeading').textContent();
    expect(windowContent).toBe('This is a sample page');

    await newWindow.screenshot({ path: `screenshots/new-window-${testInfo.project.name}.png` });

    console.log(`✅ [${testInfo.project.name}] Verified New Window`);
    await newWindow.close();
  });

  test('should open and verify New Window Message content', async ({ page }, testInfo) => {
    await blockAds(page);
    const demoqaPage = new DemoQABrowserPage(page);
    const messageWindow = await demoqaPage.openMessageWindow();

    const bodyText = await messageWindow.locator('body').textContent();
    expect(bodyText?.trim()).toContain('Knowledge increases by sharing but not by saving.');

    await messageWindow.screenshot({ path: `screenshots/message-window-${testInfo.project.name}.png` });

    console.log(`✅ [${testInfo.project.name}] Verified Message Window`);
    await messageWindow.close();
  });
});
