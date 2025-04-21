import { test as base, chromium, Page } from '@playwright/test';

type MyFixtures = {
  loggedInPage: Page;
};

export const test = base.extend<MyFixtures>({
  loggedInPage: async ({ }, use) => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://coding.pasv.us/user/login');
    await page.getByPlaceholder('Email').fill('Michael.sheptun@gmail.com');
    await page.getByRole('textbox', { name: 'Пароль' }).fill('michael12SH');
    await page.getByRole('button', { name: 'Войти', exact: true }).click();

    await page.waitForURL('**/profile/**');
    await page.pause();
    await use(page); // Expose logged-in page to test

    await browser.close();
  },
});

export { expect } from '@playwright/test';
