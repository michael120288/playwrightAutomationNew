// page_objects/DemoQAFramesPage.ts
import { Page, FrameLocator } from '@playwright/test';

export class DemoQAFramesPage {
  private page: Page;
  private frame1: FrameLocator;
  private frame2: FrameLocator;

  constructor(page: Page) {
    this.page = page;
    this.frame1 = page.frameLocator('#frame1');
    this.frame2 = page.frameLocator('#frame2');
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://demoqa.com/frames');
  }

  async getFrame1Text(): Promise<string | null> {
    return await this.frame1.locator('h1#sampleHeading').textContent();
  }

  async getFrame2Text(): Promise<string | null> {
    return await this.frame2.locator('h1#sampleHeading').textContent();
  }
}