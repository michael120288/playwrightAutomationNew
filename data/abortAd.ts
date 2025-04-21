import { Page } from '@playwright/test';

/**
 * Blocks all ads by intercepting known ad network requests
 * and removing ad-related DOM elements (iframes, containers, etc.)
 */
export async function blockAds(page: Page): Promise<void> {
  // 1. Block common ad network requests
  await page.route('**/*ads*', route => route.abort());
  await page.route('**/ads/**', route => route.abort());
  await page.route('**/doubleclick.net/**', route => route.abort());
  await page.route('**/googlesyndication/**', route => route.abort());
  await page.route('**/pagead/**', route => route.abort());
  await page.route('**/securepubads.g.doubleclick.net/**', route => route.abort());

  // 2. After navigation: hide or remove ad DOM elements
  page.once('load', async () => {
    // Remove iframes and ad containers
    await page.evaluate(() => {
      document.querySelectorAll('iframe, .ad, [id*="ad"], [class*="ad"]').forEach(el => {
        el.remove();
      });
    });

    // Optional: Hide any remaining ad containers
    await page.addStyleTag({
      content: `
        iframe, .ad, [id*="ad"], [class*="ad"] {
          display: none !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }
      `,
    });
  });
}