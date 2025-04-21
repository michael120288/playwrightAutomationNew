// page_objects/DemoQABrowserPage.ts
import { Page, Locator } from '@playwright/test';

export class DemoQABrowserPage {
  private page: Page;
  private newTabBtn: Locator;
  private newWindowBtn: Locator;
  private messageWindowBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTabBtn = page.locator('#tabButton');
    this.newWindowBtn = page.locator('#windowButton');
    this.messageWindowBtn = page.locator('#messageWindowButton');
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://demoqa.com/browser-windows', { waitUntil: 'domcontentloaded' });
  }

  async openNewTab(): Promise<Page> {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.newTabBtn.click()
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }

  async openNewWindow(): Promise<Page> {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.newWindowBtn.click()
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }

  async openMessageWindow(): Promise<Page> {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.messageWindowBtn.click()
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }
}
