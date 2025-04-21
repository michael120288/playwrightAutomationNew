import { test as base,expect as baseExpect } from "@playwright/test";
import { DatePickerPage } from "./DatePicker_demoQA";
import { DatePicker } from "./DatePicket";

export const test = base.extend<{
  datePickerPage: DatePickerPage;
  datePicker: DatePicker;
}>({
  datePickerPage: async ({ page }, use) => {
    await use(new DatePickerPage(page));
  },
  datePicker: async ({ page }, use) => {
    await use(new DatePicker(page));
  },
});

export const expect = baseExpect;
