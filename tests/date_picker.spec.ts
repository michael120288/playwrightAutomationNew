// tests/datePicker.spec.ts
import { test, expect } from '@playwright/test';
//import { test, expect } from '../page_object/base_page';
import { DatePicker } from '../page_object/DatePicket';
import { DatePickerPage } from '../page_object/DatePicker_demoQA';

test('Navigate to Date Picker Page', async ({ page }) => {
   const datePicker = new DatePicker(page);
  await datePicker.navigateToDatePicker();
  await datePicker.verifyHeader()
  await datePicker.dateFromToday()
  console.log(page.url());
  await expect(page).toHaveURL(/.*jquery-date-picker-demo/);
});

test('Navigate to Date Picker Page Homework', async ({ page }) => {
  const datePicker = new DatePicker(page);
  await datePicker.navigateToDatePicker();
  await datePicker.verifyHeader()
  await datePicker.dateFromOrTo(datePicker.toInput)
  console.log(page.url());
  await expect(page).toHaveURL(/.*jquery-date-picker-demo/);
});

// tests/datePicker.spec.ts

test.describe('DemoQA Date Picker', () => {
  test('Should select and verify date of birth', async ({ page }) => {
    const datePickerDemo = new DatePickerPage(page);
    await datePickerDemo.navigate();

    const day = 4;
    const month = 'May'; // Must be full name as required by <select>
    const year = 1995;
    const expectedDate = '04 May 1995'; // Format in input field

    await datePickerDemo.selectDate(day, month, year);
    await datePickerDemo.verifyDate(expectedDate);
  });
});
