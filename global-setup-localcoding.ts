import { chromium } from '@playwright/test';


export default async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("https://coding.pasv.us/user/login");

  await page.getByPlaceholder("Email").fill("Michael.sheptun@gmail.com"); // ✅ Use actual credentials
  await page.getByRole("textbox", { name: "Пароль" }).fill("michael12SH");
  await page.getByRole("button", { name: "Войти", exact: true }).click();

  await page.waitForURL("**/profile/**");


  await page.context().storageState({ path: './.auth/user.json' });
  await browser.close();
}