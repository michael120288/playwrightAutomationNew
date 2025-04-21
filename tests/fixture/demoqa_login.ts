import {
  test as base,
  expect as baseExpect,
  chromium,
  Page,
} from "@playwright/test";

type AuthFixtures = {
  loggedInPageDemoQA: Page;
};

export const test = base.extend<AuthFixtures>({
  loggedInPageDemoQA: async ({}, use) => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    //Perform authentication steps. Replace these actions with your own.
    await page.goto("https://demoqa.com/login");
    await page.getByPlaceholder("UserName").fill("MichaelPasv");
    await page.getByPlaceholder("Password").fill("m!chael12SH");
    await page.getByRole("button", { name: "Login" }).click();
    // Wait for the final URL to ensure that the cookies are actually set.
    await page.waitForURL("https://demoqa.com/profile");
    await use(page);
    await context.close();
  },
});

export const expect = baseExpect;
