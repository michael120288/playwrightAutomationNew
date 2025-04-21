import { test as setup, expect } from "@playwright/test";

const authFile: string = "./.auth/user.json";

// setup('authenticate', async ({ page }) => {
//   // Perform authentication steps. Replace these actions with your own.
//   await page.goto('https://demoqa.com/login');
//   await page.getByPlaceholder('UserName').fill('MichaelPasv');
//   await page.getByPlaceholder('Password').fill('m!chael12SH');
//   await page.getByRole('button', { name: 'Login' }).click();
//   // Wait until the page receives the cookies.
//   //
//   // Sometimes login flow sets cookies in the process of several redirects.
//   // Wait for the final URL to ensure that the cookies are actually set.
//   await page.waitForURL('https://demoqa.com/profile');
//   //await page.screenshot({ path: './screen/authenticate.png' });
//   // Alternatively, you can wait until the page reaches a state where all cookies are set.
//   await expect(page.locator('#userName-value')).toHaveText('MichaelPasv');

//   // End of authentication steps.

//   await page.context().storageState({ path: authFile });
// });

setup("Login through UI", async ({ page }) => {
  await page.goto("https://coding.pasv.us/user/login");

  await page.getByPlaceholder("Email").fill("Michael.sheptun@gmail.com"); // ✅ Use actual credentials
  await page.getByRole("textbox", { name: "Пароль" }).fill("michael12SH");
  await page.getByRole("button", { name: "Войти", exact: true }).click();

  await page.waitForURL("**/profile/**");
  await expect(page).toHaveURL(/.*profile/);

  await page.context().storageState({ path: authFile });
});
