import { test, expect, Page } from '@playwright/test';
import { DemoQAFramesPage } from '../../page_object/Iframe';

test.describe('DemoQA Frames Page', () => {
  test('should extract and validate text from both iframes', async ({ page }: { page: Page }) => {
    const framesPage = new DemoQAFramesPage(page);

    await framesPage.navigate();

    const text1 = await framesPage.getFrame1Text();
    const text2 = await framesPage.getFrame2Text();

    expect(text1).toBe('This is a sample page');
    expect(text2).toBe('This is a sample page');

    console.log('Frame 1 text:', text1);
    console.log('Frame 2 text:', text2);
  });
});