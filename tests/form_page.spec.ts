import { Browser, expect, test as it, Page } from "@playwright/test";

it.beforeAll(() => {
  console.log("beforeAll");
});
it.describe("FORM PAGE", () => {

  it.beforeEach(() => {
    console.log("beforeEach");
  });
  it.afterEach(() => {
    console.log("afterEach");
  });
  it.afterAll(() => {
    console.log("afterAll");
  });

  it("Test1", () => {
    console.log("test1");
  });
  it("Test2", () => {
    console.log("test2");
  });
});

// DRY
//dump test

it.describe("FORM PAGE TYPE", () => {
  it("Fill all fields", async ({ page }) => {
    //   const browser: Browser = await chromium.launch({ headless: false });
    // const context = await browser.newContext();
    // const page: Page = await context.newPage();
   
    await page.goto(
      "https://www.lambdatest.com/selenium-playground/input-form-demo",
    );
    await page.locator("#name").fill("Mike");
    await page
      .locator(
        '[class="w-full border border-gray-90 text-size-14 rounded mt-10 px-10 py-5"][type="email"]',
      )
      .pressSequentially("mike@test.com", { delay: 200 });
      //await page.pause();
      await page.locator('input[placeholder="Password"]').fill('test1234')
      await page.locator('[for="companyname"] ~ input[placeholder="Company"]').fill('LLC Happy')
      await page.selectOption('select[name="country"]', {label: 'United States'})
      await page.locator('label:has-text("City*") ~ input#inputCity').fill('Orlando')
      await page.locator('label:has-text("Website*") ~ input#websitename').fill('mike.com')
      await page.getByPlaceholder('Address 1').fill('704 Tobie Ct')
      await page.getByPlaceholder('Address 2').fill('705 Tobie Ct')
      await page.getByRole('textbox',{name:"Zip code"}).fill('32825')
      await page.getByRole('textbox',{name:"State"}).fill('Florida')
      await page.getByRole('button',{name:"Submit"}).click()
      await expect(page.locator('h2:has-text("Input form validations")')).toBeVisible()
      await page.pause();
  });
});
