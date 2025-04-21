// pages/HomePage.ts
import { Page } from '@playwright/test';

export class HomePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Optional path to be appended to baseURL
  async goto(path: string = ''): Promise<void> {
    await this.page.goto('/selenium-playground' + path);
    console.log(`Navigated to: ${this.page.url()}`);
  }
}
