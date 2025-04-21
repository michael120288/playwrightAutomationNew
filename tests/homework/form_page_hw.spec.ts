import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Basic HTML Form Tests', () => {
  test('Should fill and submit the form', async ({ page }) => {
    // Navigate to the test page
    await page.goto('https://testpages.eviltester.com/styled/basic-html-form-test.html');

    // Fill text fields
    await page.locator('input[name="username"]').fill('TestUser');
    await page.locator('input[type="password"]').fill('TestPassword');

    // Fill text area
    await page.locator('textarea[name="comments"]').fill('This is a test comment.');

    // Select checkboxes
    await page.locator('input[name="checkboxes[]"][value="cb1"]').check();
    await page.locator('input[name="checkboxes[]"][value="cb2"]').check();
    // Select radio button
    await page.locator('input[name="radioval"][value="rd3"]').check();

    // Select from dropdown
    await page.locator('select[name="dropdown"]').selectOption('dd2');

    // Select multiple items in multi-select dropdown
    await page.locator('select[name="multipleselect[]"]').selectOption(['ms1', 'ms3']);

    // Upload a file (Playwright uses setInputFiles for file uploads)
    //await page.setInputFiles('input[name="filename"]', './../../data/pasv_logo.svg');
    const filePath = path.resolve(__dirname, '../../data/pasv_logo.svg');

    await page.setInputFiles('input[name="filename"]', filePath);
    await page.pause();
    // Submit the form
    await page.locator('input[type="submit"]').click();

    // Verify successful submission by checking the response page
    await expect(page.locator('h1')).toHaveText('Processed Form Details');
    
    // Validate submitted values
    await expect(page.locator('#_username')).toContainText('TestUser');
    await expect(page.locator('#_password')).toContainText('TestPassword');
    await expect(page.locator('#_comments')).toContainText('This is a test comment.');
    await expect(page.locator('#_filename')).toContainText('pasv_logo.svg');
    await expect(page.locator('#_hiddenField')).toContainText('Hidden Field Value');
    await expect(page.locator('#_checkboxes')).toContainText('cb2');
    await expect(page.locator('#_radioval')).toContainText('rd2');
    await expect(page.locator('#_multipleselect')).toContainText('ms1');
    await expect(page.locator('#_dropdown')).toContainText('dd2');
    await expect(page.locator('#_submitbutton')).toContainText('submit');
  });
});

test.describe("Automation Practice Form Test", () => {
    test("Fill and submit the practice form successfully", async ({ page }) => {
        
      // Navigate to the Automation Practice Form page
      await page.goto("https://demoqa.com/automation-practice-form");
  
      // Fill in the student details
      await page.fill("#firstName", "John"); // First Name
      await page.getByPlaceholder("Last Name").fill("Doe"); // Last Name
      await page.getByRole("textbox", {name:"name@example.com"}).fill('name@example.com'); // Email
      await page.getByText("Male", { exact: true }).click();
        await page.pause();
      //await page.locator('[for="gender-radio-3"]').check(); // Gender
      await page.fill("#userNumber", "1234567890"); // Mobile Number
      await page.fill("#dateOfBirthInput", "01 Jan 2000"); // Date of Birth (manual fill)
      await page.press("#dateOfBirthInput", "Enter"); // Confirm date selection
  
      // // Fill subjects and hobbies
      await page.fill("#subjectsInput", "Math"); // Subject
      await page.press("#subjectsInput", "Enter"); // Add the subject
      await page.check('label[for="hobbies-checkbox-1"]'); // Hobby: Sports
      // Replace with an actual image file path
  
      // Upload a picture
       //const filePath = '../../data/pasv_logo.svg';
       const filePath = path.join(__dirname, '../../data/pasv_logo.svg');
      //await page.getByLabel('[for="uploadPicture"]').setInputFiles(filePath);
     await page.setInputFiles('#uploadPicture', filePath); // Replace with an actual image file path
  
      // // Fill in address
      await page.fill("#currentAddress", "123 Main St, New York, NY"); // Current Address
      await page.click("#state"); // Open the state dropdown
      //await page.click('div[role="option"]:has-text("NCR")'); // Select NCR
      await page.getByText("NCR", { exact: true }).click();
  
      await page.click("#city"); // Open the city dropdown
      //wait page.click('div[role="option"]:has-text("Delhi")'); // Select Delhi
      await page.getByText("Delhi", { exact: true }).click();
  
      // // Submit the form
      await page.click("#submit");
  
      // // Verify the submission success by checking the modal title
      const modalTitle = page.locator("#example-modal-sizes-title-lg");
      await expect(modalTitle).toHaveText("Thanks for submitting the form");

      // Verify some submitted values (optional)
    const table = page.locator('.table-responsive');
    await expect(table).toContainText('John Doe');
    await expect(table).toContainText('name@example.com');
    await expect(table).toContainText('Male');
    await expect(table).toContainText('1234567890');
    await expect(table).toContainText('Math');
    await expect(table).toContainText('Sports');
    await expect(table).toContainText('pasv_logo.svg');
    await expect(table).toContainText('123 Main St');
    await expect(table).toContainText('NCR');

    // await page.evaluate(() => {
    //     const ad = document.querySelector('#fixedban');
    //     const iframe = document.querySelector('iframe');
    //     if (ad) ad.remove(); // or ad.style.display = 'none';
    //     if (iframe) iframe.remove(); // also can be hidden instead
    //   });
    // // Close the modal
    // await page.click('#closeLargeModal');
     });
  });