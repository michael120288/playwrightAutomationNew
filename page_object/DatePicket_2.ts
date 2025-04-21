// pages/DatePicker.ts
import { HomePage } from "./HomePage";
import { Locator, Page, expect } from "@playwright/test";
import _ from "lodash";

export class DatePicker extends HomePage {
  constructor(page: Page) {
    super(page);
  }

  header = (): Locator => this.page.getByText("Data Range Picker");
  fromInput = (): Locator => this.page.getByRole("textbox", { name: "From" });
  toInput = (): Locator => this.page.getByRole("textbox", { name: "To" });
  monthDropdown = (): Locator => {
    return this.page.getByRole("combobox");
  };

  // Action method: Select a month (e.g., "March")
  async selectMonth(monthValue: string): Promise<void> {
    await this.monthDropdown().selectOption(monthValue);
  }
  

  prevYear = (): Locator => this.page.getByText("Prev");
  nextYear = (): Locator => this.page.getByText("Next");

  getDate = (date: string): Locator =>
    this.page.getByRole("link", { name: date });

  dateFromComponent = (): Locator => this.page.locator("#ui-datepicker-div");

  dateOfTheYear = (): Locator =>
    this.page.locator('[class="ui-datepicker-year"]');

  dateOfTheMonth = (): Locator =>
    this.page.locator('[class="ui-datepicker-month"]');
  public async verifyHeader() {
    const header = this.header();
    await expect(header).toContainText("Data Range Picker");
  }
  randomYearNumber = _.random(1, 50);
  date = _.random(1, 30);
  public async dateFromToday() {
    const obj = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    await this.fromInput().click();
    console.log(this.randomYearNumber);
    for (let i = 0; i < this.randomYearNumber; i++) {
      await this.prevYear().click();
    }
    let year = await this.dateOfTheYear().textContent();
    let month = await this.dateOfTheMonth()
      .locator('[selected="selected"]')
      .textContent();
    console.log(year);
    console.log(month);
    console.log(this.date);
    await this.dateFromComponent()
      .getByRole("link", { name: this.date.toString(), exact: true })
      .click();
    const formattedMonth = obj[month! as keyof typeof obj];
    const paddedDay = String(this.date).padStart(2, "0");

    expect(await this.fromInput().inputValue()).toBe(
      `${formattedMonth}/${paddedDay}/${year}`
    ); //mm/dd/yyyy
  }

  async navigateToDatePicker(): Promise<void> {
    await this.goto("/jquery-date-picker-demo");
  }
}
