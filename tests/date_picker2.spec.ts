// tests/datePicker.spec.ts
import { test, expect } from '@playwright/test';
import { DatePicker } from '../page_object/DatePicket_2';

test('Navigate to Date Picker Page', async ({ page }) => {
  const datePicker = new DatePicker(page);
  await datePicker.navigateToDatePicker();
  await datePicker.verifyHeader()
  await datePicker.dateFromToday()
  console.log(page.url());
  await expect(page).toHaveURL(/.*jquery-date-picker-demo/);
});