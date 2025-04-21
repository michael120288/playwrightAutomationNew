import { expect, test, Page, FrameLocator } from "@playwright/test";

test.describe("IFRAME", () => {
  test("iframe test", async ({ page }: { page: Page }) => {
    // Navigate to the test page
    await page.goto("https://www.lambdatest.com/selenium-playground/nested-frames/");

    // Get outer frame (frame-bottom)
    const frameBottom: FrameLocator = page.frameLocator('[name="frame-bottom"]');

    // Get text content from left frame
    const leftFrameText: string | null = await frameBottom
      .frameLocator('[name="frame-left"]')
      .locator("body")
      .textContent();

    const middleFrameText: string | null = await frameBottom
      .frameLocator('[name="frame-middle"]')
      .locator("body")
      .textContent();

    const rightFrameText: string | null = await frameBottom
      .frameLocator('[name="frame-right"]')
      .locator("body")
      .textContent();

    // Assertions
    expect(leftFrameText).toContain("Left");
    expect(middleFrameText).toContain("Middle");
    expect(rightFrameText).toContain("Right");

    // Debug logs
    console.log(leftFrameText, "→ leftFrame");
    console.log(middleFrameText, "→ middleFrame");
    console.log(rightFrameText, "→ rightFrame");
  });
});