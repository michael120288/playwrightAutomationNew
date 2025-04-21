// page_objects/NewTabPage.ts
import { Page, Locator } from '@playwright/test';

export class NewTabPage {
  private page: Page;
  private newTabLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTabLink = page.locator('a[href="/windows/new"]');
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://practice.expandtesting.com/windows');
  }

  async openNewTab(): Promise<Page> {
    await this.newTabLink.scrollIntoViewIfNeeded();

    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.newTabLink.click({ force: true }), // safely force the click
    ]);

    await newPage.waitForLoadState();
    return newPage;
  }
}